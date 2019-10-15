const express = require("express");
const router = express.Router();
const purchasedController = require("../controllers/purchasedController");

router.post("/lists/:listId/groceries/:groceryId/purchaseds/create", purchasedController.create);

router.post("/lists/:listId/groceries/:groceryId/purchaseds/:id/destroy", purchasedController.destroy);

module.exports = router;