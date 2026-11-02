// seed.js
// Mengisi basis data dengan 4 jenis servis dan 25 pesanan servis.
// Aman dijalankan berulang: data lama dihapus terlebih dahulu.

require("dotenv").config({ quiet: true });

const mongoose = require("mongoose");
const Service = require("./models/serviceModel");
const ServiceOrder = require("./models/serviceOrderModel");

const NAMA = [
  "Hendra Wijaya",
  "Sari Utami",
  "Budi Santoso",
  "Andi Saputra",
  "Dina Maharani",
  "Rizky Pratama",
  "Agus Setiawan",
  "Rina Oktavia",
  "Doni Kurniawan",
  "Maya Sari",
  "Fajar Ramadhan",
  "Putri Amelia",
  "Rudi Hartono",
  "Citra Lestari",
  "Eko Prasetyo",
  "Nanda Putra",
  "Fitri Handayani",
  "Joko Susanto",
  "Lina Marlina",
  "Tono Wijaya",
  "Yuni Astuti",
  "Wawan Setiawan",
  "Indra Gunawan",
  "Siska Permata",
  "Dedi Kurniawan",
];

const KENDARAAN = [
  { merk: "Toyota", tipe: "Avanza", tahun: 2022 },
  { merk: "Honda", tipe: "Brio", tahun: 2021 },
  { merk: "Suzuki", tipe: "Ertiga", tahun: 2020 },
  { merk: "Mitsubishi", tipe: "Xpander", tahun: 2023 },
  { merk: "Daihatsu", tipe: "Xenia", tahun: 2022 },
];

const STATUS = ["antre", "dikerjakan", "selesai"];

async function main() {
  await mongoose.connect(process.env.DB_URI);

  // Menghapus data lama
  await ServiceOrder.deleteMany({});
  await Service.deleteMany({});

  // Data jenis servis
  const services = await Service.insertMany([
    {
      nama: "Ganti Oli",
      deskripsi: "Penggantian oli mesin kendaraan",
      hargaDasar: 150000,
    },
    {
      nama: "Tune Up",
      deskripsi: "Pemeriksaan dan penyetelan mesin kendaraan",
      hargaDasar: 300000,
    },
    {
      nama: "Ganti Kampas Rem",
      deskripsi: "Penggantian kampas rem kendaraan",
      hargaDasar: 200000,
    },
    {
      nama: "Service Berkala",
      deskripsi: "Pemeriksaan dan perawatan kendaraan berkala",
      hargaDasar: 250000,
    },
  ]);

  // Membuat 25 data pesanan servis
  const serviceOrders = NAMA.map((nama, i) => ({
    platNomor: `BG ${1000 + i} ${String.fromCharCode(65 + (i % 26))}Z`,
    namaPelanggan: nama,

    // EMBEDDING: detail kendaraan tersimpan langsung
    detailKendaraan: KENDARAAN[i % KENDARAAN.length],

    // REFERENCING: mengambil ID jenis servis
    jenisServis: services[i % services.length]._id,

    biaya: services[i % services.length].hargaDasar,
    status: STATUS[i % STATUS.length],
  }));

  await ServiceOrder.insertMany(serviceOrders);

  console.log(
    `Seed selesai: ${services.length} jenis servis, ${serviceOrders.length} pesanan servis`,
  );

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err.message);

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  process.exit(1);
});
