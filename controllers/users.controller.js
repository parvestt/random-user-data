const fs = require("fs");
let users = [];

fs.readFile("./users.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    users = JSON.parse(data);
  }
});


const writeJSONFile = () => {
  fs.writeFile("./users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.getRandomUser = (req, res) => {
  const random = Math.floor(Math.random() * users.length);

  res.status(200).send({
    success: true,
    message: "Success",
    data: users[random],
  });
};

module.exports.getAllUser = (req, res) => {
  let allUser = users;
  const { limit } = req.query;

  if (limit) {
    allUser = allUser.slice(0, limit);
  }

  res.status(200).send({
    success: true,
    message: "Success",
    data: allUser,
  });
};

module.exports.saveUser = (req, res) => {
  const user = req.body;
  user.id = users[users.length - 1].id + 1;

  if (
    user.gender &&
    user.name &&
    user.contact &&
    user.address &&
    user.photoUrl
  ) {
    users.push(user);
    writeJSONFile();

    res.status(201).send({
      success: true,
      message: "User saved",
    });
  } else {
    res.status(400).send({
      success: false,
      message: "Missing user data",
    });
  }
};

module.exports.updateAUser = (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  if (isNaN(id)) {
    res.status(400).send({
      success: false,
      message: "Wrong id",
    });
    return;
  }

  const userInd = users.findIndex((user) => user.id === id);

  if (userInd < 0) {
    res.status(400).send({
      success: false,
      message: "User not found",
    });
    return;
  }

  for (const key in data) {
    users[userInd][key] = data[key];
  }
  writeJSONFile();

  res.status(200).send({
    success: true,
    message: "User updated",
  });
};

module.exports.updateMultipleUser = (req, res) => {
  const { ids, data } = req.body;

  if (!ids.length) {
    res.status(400).send({
      success: false,
      message: "No ID found",
    });
    return;
  }

  ids.forEach((id) => {
    const userInd = users.findIndex((user) => user.id === id);

    for (const key in data) {
      users[userInd][key] = data[key];
    }
  });
  writeJSONFile();

  res.status(200).send({
    success: true,
    message: "Users updated",
  });
};

module.exports.deleteUser = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({
      success: false,
      message: "Wrong id",
    });
    return;
  }

  const userInd = users.findIndex((user) => user.id === id);

  if (userInd < 0) {
    res.status(400).send({
      success: false,
      message: "User not found",
    });
    return;
  }

  users.splice(userInd, 1);
  writeJSONFile();

  res.status(200).send({
    success: true,
    message: "User deleted",
  });
};
