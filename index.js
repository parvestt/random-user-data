const express = require("express");
const cors = require("cors");
const app = express();
const usersRoutes = require("./routes/v1/users.route");

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.all("*", (req, res) => {
  res.send("No route found");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App running on server http://localhost:${PORT}`);
});
