const mongoose = require("mongoose");

// EMBEDDING: detail kendaraan disimpan di dalam ServiceOrder
const kendaraanSchema = new mongoose.Schema(
  {
    merk: {
      type: String,
      required: true,
      trim: true,
    },

    tipe: {
      type: String,
      required: true,
      trim: true,
    },

    tahun: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

// Schema utama pesanan servis
const serviceOrderSchema = new mongoose.Schema(
  {
    platNomor: {
      type: String,
      required: true,
      trim: true,
    },

    namaPelanggan: {
      type: String,
      required: true,
      trim: true,
    },

    // EMBEDDING
    detailKendaraan: {
      type: kendaraanSchema,
      required: true,
    },

    // REFERENCING: terhubung ke model Service
    jenisServis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    biaya: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["antre", "dikerjakan", "selesai"],
      default: "antre",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ServiceOrder", serviceOrderSchema);
