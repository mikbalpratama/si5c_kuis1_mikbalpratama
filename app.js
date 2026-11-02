require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // tambahkan di antara require lainnya

const logger = require("./middlewares/logger");

const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");

const serviceOrderRoutes = require("./routes/serviceOrderRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware global
app.use(logger);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());

// Route utama
app.get("/", (req, res) => {
  res.json({
    nama: process.env.NAMA,
    nim: process.env.NPM,
    topik: 23,
    endpoints: [
      "GET /service-orders",
      "GET /service-orders/:id",
      "GET /service-orders?status=antre",
      "POST /service-orders",
      "PUT /service-orders/:id",
      "DELETE /service-orders/:id",
    ],
  });
});

// Route service orders
app.use("/service-orders", serviceOrderRoutes);

// Error handler
app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB");
    app.listen(PORT, () =>
      console.log(`Server berjalan di http://localhost:${PORT}`),
    );
  })
  .catch((err) => {
    console.error("Gagal terhubung:", err.message);
    process.exit(1);
  });
