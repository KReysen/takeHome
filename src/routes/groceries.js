const express = require("express");
const router = express.Router();

const groceryController = require("../controllers/groceryController");

router.get("/lists/:listId/groceries/new", groceryController.new);
router.get("/lists/:listId/groceries/:id", groceryController.show);

router.post("/lists/:listId/groceries/create", groceryController.create);

module.exports = router;