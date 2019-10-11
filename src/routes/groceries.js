const express = require("express");
const router = express.Router();

const groceryController = require("../controllers/groceryController");

router.get("/lists/:listId/groceries/new", groceryController.new);
router.get("/lists/:listId/groceries/:id", groceryController.show);
router.get("/lists/:listId/groceries/:id/edit", groceryController.edit);

router.post("/lists/:listId/groceries/create", groceryController.create);
router.post("/lists/:listId/groceries/:id/destroy", groceryController.destroy);
router.post("/lists/:listId/groceries/:id/update", groceryController.update);

module.exports = router;