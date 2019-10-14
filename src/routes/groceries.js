const express = require("express");
const router = express.Router();
const validation = require("./validation");
const helper = require("../auth/helpers");

const groceryController = require("../controllers/groceryController");

router.get("/lists/:listId/groceries/new", groceryController.new);
router.get("/lists/:listId/groceries/:id", groceryController.show);
router.get("/lists/:listId/groceries/:id/edit", groceryController.edit);

router.post("/lists/:listId/groceries/create", helper.ensureAuthenticated, validation.validateGroceries, groceryController.create);
router.post("/lists/:listId/groceries/:id/destroy", groceryController.destroy);
router.post("/lists/:listId/groceries/:id/update", validation.validateGroceries, groceryController.update);

module.exports = router;