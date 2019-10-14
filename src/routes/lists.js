const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");

const listController = require("../controllers/listController");

router.get("/lists", listController.index);
router.get("/lists/new", listController.new);
router.get("/lists/:id", listController.show);
router.get("/lists/:id/edit", listController.edit);

router.post("/lists/create",  helper.ensureAuthenticated, listController.create);
router.post("/lists/:id/destroy", listController.destroy);
router.post("/lists/:id/update", listController.update);

module.exports = router;