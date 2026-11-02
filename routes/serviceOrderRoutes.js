const express = require("express");
const router = express.Router();

const serviceOrderController = require("../controllers/serviceOrderController");

// GET: Menampilkan semua pesanan servis
router.get("/", serviceOrderController.getAllServiceOrders);

// GET: Menampilkan pesanan berdasarkan ID
router.get("/:id", serviceOrderController.getServiceOrderById);

// POST: Menambahkan pesanan servis
router.post("/", serviceOrderController.createServiceOrder);

// PUT: Mengubah pesanan servis
router.put("/:id", serviceOrderController.updateServiceOrder);

// DELETE: Menghapus pesanan servis
router.delete("/:id", serviceOrderController.deleteServiceOrder);

module.exports = router;
