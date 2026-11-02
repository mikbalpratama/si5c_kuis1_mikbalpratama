const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/serviceController");

// GET: Menampilkan semua jenis servis
router.get("/", serviceController.getAllServices);

// GET: Menampilkan jenis servis berdasarkan ID
router.get("/:id", serviceController.getServiceById);

// POST: Menambahkan jenis servis
router.post("/", serviceController.createService);

// PUT: Mengubah jenis servis
router.put("/:id", serviceController.updateService);

// DELETE: Menghapus jenis servis
router.delete("/:id", serviceController.deleteService);

module.exports = router;
