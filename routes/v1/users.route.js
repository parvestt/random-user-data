const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.get("/random", usersController.getRandomUser);
router.get("/all", usersController.getAllUser);
router.post("/save", usersController.saveUser);
router.patch("/update/:id", usersController.updateAUser);
router.patch("/bulk-update", usersController.updateMultipleUser);
router.delete("/delete/:id", usersController.deleteUser);

module.exports = router;