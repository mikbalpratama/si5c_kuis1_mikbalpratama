let serviceOrders = [
  {
    id: 1,
    platNomor: "B 4321 XYZ",
    namaPelanggan: "Hendra Wijaya",
    jenisServis: "Ganti oli + tune up",
    biaya: 450000,
    status: "antre",
  },
  {
    id: 2,
    platNomor: "BG 1234 AB",
    namaPelanggan: "Sari Utami",
    jenisServis: "Ganti kampas rem",
    biaya: 300000,
    status: "dikerjakan",
  },
  {
    id: 3,
    platNomor: "BG 5678 CD",
    namaPelanggan: "Budi Santoso",
    jenisServis: "Service berkala",
    biaya: 250000,
    status: "selesai",
  },
];

let nextId = 4;

const STATUS_VALID = ["antre", "dikerjakan", "selesai"];

function getAll(status) {
  if (status) {
    return serviceOrders.filter((order) => order.status === status);
  }

  return serviceOrders;
}

function getById(id) {
  return serviceOrders.find((order) => order.id === id);
}

function create(data) {
  const baru = {
    id: nextId++,
    platNomor: data.platNomor,
    namaPelanggan: data.namaPelanggan,
    jenisServis: data.jenisServis,
    biaya: data.biaya,
    status: data.status,
  };

  serviceOrders.push(baru);

  return baru;
}

function update(id, data) {
  const index = serviceOrders.findIndex((order) => order.id === id);

  if (index === -1) {
    return null;
  }

  serviceOrders[index] = {
    id,
    platNomor: data.platNomor,
    namaPelanggan: data.namaPelanggan,
    jenisServis: data.jenisServis,
    biaya: data.biaya,
    status: data.status,
  };

  return serviceOrders[index];
}

function remove(id) {
  const index = serviceOrders.findIndex((order) => order.id === id);

  if (index === -1) {
    return false;
  }

  serviceOrders.splice(index, 1);

  return true;
}

function validate(data) {
  const { platNomor, namaPelanggan, jenisServis, biaya, status } = data;

  if (!platNomor) {
    return "Field platNomor wajib diisi";
  }

  if (!namaPelanggan) {
    return "Field namaPelanggan wajib diisi";
  }

  if (!jenisServis) {
    return "Field jenisServis wajib diisi";
  }

  if (biaya === undefined || biaya === null || typeof biaya !== "number") {
    return "Field biaya wajib diisi (number)";
  }

  if (!status) {
    return "Field status wajib diisi";
  }

  if (!STATUS_VALID.includes(status)) {
    return "Field status harus antre, dikerjakan, atau selesai";
  }

  return null;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  validate,
};
