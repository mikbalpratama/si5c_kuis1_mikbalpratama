const serviceOrderModel = require("../models/serviceOrderModel");

function getAll(req, res, next) {
  try {
    const { status } = req.query;

    const data = serviceOrderModel.getAll(status);

    res.json(data);
  } catch (error) {
    next(error);
  }
}

function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const order = serviceOrderModel.getById(id);

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: `Data dengan id ${id} tidak ditemukan`,
        data: null,
      });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
}

function create(req, res, next) {
  try {
    const pesan = serviceOrderModel.validate(req.body);

    if (pesan) {
      return res.status(400).json({
        status: "error",
        message: pesan,
        data: null,
      });
    }

    const baru = serviceOrderModel.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Data berhasil ditambahkan",
      data: baru,
    });
  } catch (error) {
    next(error);
  }
}

function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const existingData = serviceOrderModel.getById(id);

    if (!existingData) {
      return res.status(404).json({
        status: "error",
        message: `Data dengan id ${id} tidak ditemukan`,
        data: null,
      });
    }

    const pesan = serviceOrderModel.validate(req.body);

    if (pesan) {
      return res.status(400).json({
        status: "error",
        message: pesan,
        data: null,
      });
    }

    const updated = serviceOrderModel.update(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Data berhasil diubah",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const deleted = serviceOrderModel.remove(id);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: `Data dengan id ${id} tidak ditemukan`,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: `Data order servis dengan id ${id} berhasil dihapus`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
