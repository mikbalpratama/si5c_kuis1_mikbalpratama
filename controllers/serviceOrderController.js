const ServiceOrder = require("../models/serviceOrderModel");

// GET: Menampilkan pesanan servis
// Dilengkapi filtering, pagination, sorting, projection, dan populate
exports.getAllServiceOrders = async (req, res) => {
  try {
    // FILTERING
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.q) {
      filter.$or = [
        { platNomor: { $regex: req.query.q, $options: "i" } },
        { namaPelanggan: { $regex: req.query.q, $options: "i" } },
      ];
    }

    // PAGINATION
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;

    // SORTING
    const sort = {};
    if (req.query.sort) {
      const sortFields = req.query.sort.split(",");

      sortFields.forEach((field) => {
        const descending = field.startsWith("-");
        const fieldName = descending ? field.substring(1) : field;

        if (
          [
            "platNomor",
            "namaPelanggan",
            "biaya",
            "status",
            "createdAt",
          ].includes(fieldName)
        ) {
          sort[fieldName] = descending ? -1 : 1;
        }
      });
    } else {
      sort.createdAt = -1;
    }

    // PROJECTION
    const allowedFields = [
      "platNomor",
      "namaPelanggan",
      "detailKendaraan",
      "jenisServis",
      "biaya",
      "status",
      "createdAt",
      "updatedAt",
    ];

    let projection;
    if (req.query.fields) {
      const requestedFields = req.query.fields
        .split(",")
        .filter((field) => allowedFields.includes(field));

      if (requestedFields.length > 0) {
        projection = requestedFields.join(" ");
      }
    }

    // QUERY DATABASE
    const [orders, total] = await Promise.all([
      ServiceOrder.find(filter)
        .select(projection)
        .populate("jenisServis")
        .sort(sort)
        .skip(skip)
        .limit(limit),

      ServiceOrder.countDocuments(filter),
    ]);

    res.status(200).json({
      message: "Data pesanan servis berhasil ditampilkan",
      pagination: {
        totalData: total,
        totalHalaman: Math.ceil(total / limit),
        halamanSekarang: page,
        limit: limit,
      },
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET: Menampilkan pesanan berdasarkan ID
exports.getServiceOrderById = async (req, res) => {
  try {
    const order = await ServiceOrder.findById(req.params.id).populate(
      "jenisServis",
    );

    if (!order) {
      return res.status(404).json({
        message: "Pesanan servis tidak ditemukan",
      });
    }

    res.status(200).json({
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// POST: Menambahkan pesanan servis
exports.createServiceOrder = async (req, res) => {
  try {
    const order = await ServiceOrder.create(req.body);

    const result = await order.populate("jenisServis");

    res.status(201).json({
      message: "Pesanan servis berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// PUT: Mengubah pesanan servis
exports.updateServiceOrder = async (req, res) => {
  try {
    const order = await ServiceOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).populate("jenisServis");

    if (!order) {
      return res.status(404).json({
        message: "Pesanan servis tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Pesanan servis berhasil diperbarui",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE: Menghapus pesanan servis
exports.deleteServiceOrder = async (req, res) => {
  try {
    const order = await ServiceOrder.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Pesanan servis tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Pesanan servis berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
