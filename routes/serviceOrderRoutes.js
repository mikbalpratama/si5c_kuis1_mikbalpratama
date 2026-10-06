const express = require("express");

const router = express.Router();

const controller = require("../controllers/serviceOrderController");
const cekApiKey = require("../middlewares/cekApiKey");

// GET semua data
router.get("/", controller.getAll);

// GET berdasarkan ID
router.get("/:id", controller.getById);

// POST data baru
router.post("/", cekApiKey, controller.create);

// PUT data
router.put("/:id", cekApiKey, controller.update);

// DELETE data
router.delete("/:id", cekApiKey, controller.remove);

module.exports = router;
