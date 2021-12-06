const { transaction, user, trip, country } = require("../../models");
const cloudinary = require("../thirdparty/cloudinary");

exports.addTransaction = async (req, res) => {
  try {
    const { ...bookingData } = req.body;
    const transactionData = await transaction.create({
      ...bookingData,
      status: "Waiting Payment",
    });
    res.send({
      status: "success",
      message: "add transaction success",
      transactionData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "add transaction failed",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const dataTransaction = await transaction.findAll({
      where: {
        status: [["Pending", "Approve", "Cancel"]],
      },
      exclude: ["createdAt", "updatedAt", "id"],
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "email",
              "id",
              "role",
              "status",
            ],
          },
        },
        {
          model: trip,
          as: "trips",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt", "countries"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "countries"],
          },
        },
      ],
    });
    res.send({
      status: "success",
      message: "get all transaction success",
      data: dataTransaction,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error,
    });
  }
};
exports.getTransactionPending = async (req, res) => {
  try {
    const dataTransaction = await transaction.findAll({
      where: {
        status: [["Pending"]],
      },
      exclude: ["createdAt", "updatedAt", "id"],
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "email",
              "id",
              "role",
              "status",
            ],
          },
        },
        {
          model: trip,
          as: "trips",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt", "countries"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "countries"],
          },
        },
      ],
    });

    res.send({
      status: "success",
      message: "get all transaction success",
      ...dataTransaction,
      attachment: dataTransaction.map((el) => cloudinary.url(el.attachment)),
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "get all trasnsaction failed",
    });
  }
};

exports.getTransactionByUserID = async (req, res) => {
  try {
    const dataTransaction = await transaction.findAll({
      where: {
        user: req.user.id,
      },
      exclude: ["createdAt", "updatedAt", "id"],
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "email",
              "id",
              "role",
              "status",
            ],
          },
        },
        {
          model: trip,
          as: "trips",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt", "countries"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "countries"],
          },
        },
      ],
    });

    res.status(200).send({
      status: "success",
      message: "get details transaction success",
      data: dataTransaction,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error,
    });
  }
};
exports.getHistoryTransactions = async (req, res) => {
  try {
    const dataTransaction = await transaction.findAll({
      where: {
        user: req.user.id,
        status: [["Approve", "Cancel"]],
      },
      exclude: ["createdAt", "updatedAt", "id"],
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "email",
              "id",
              "role",
              "status",
            ],
          },
        },
        {
          model: trip,
          as: "trips",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt", "countries"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "countries"],
          },
        },
      ],
    });

    res.send({
      status: "success",
      message: "get details transaction success",
      data: dataTransaction,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "get details transaction failed",
    });
  }
};

exports.getTransactionByID = async (req, res) => {
  try {
    const { id } = req.params;
    const dataTransaction = await transaction.findOne({
      where: {
        id,
      },
      exclude: ["createdAt", "updatedAt", "id", "trip"],
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "email",
              "id",
              "role",
              "status",
            ],
          },
        },
        {
          model: trip,
          as: "trips",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt", "countries"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "countries"],
          },
        },
      ],
    });

    res.status(200).send({
      message: "success",
      data: dataTransaction,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const results = await cloudinary.uploader.upload(req.files.image[0].path, {
      folder: "dewe_tour",
      use_filename: true,
    });

    const dataTransaction = await transaction.findOne({
      where: {
        id,
      },
    });

    await transaction.update(
      {
        ...dataTransaction,
        status: req.body.status,
        attachment: `http://res.cloudinary.com/dpfsxu9uk/image/upload/v1/${results.public_id}`,
      },
      {
        where: {
          id,
        },
      }
    );

    await trip.update(req.body.quota, {
      where,
    });

    res.send({
      status: "success",
      message: "update transaction success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "update transaction failed",
    });
  }
};
exports.approvementTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await transaction.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id,
        },
      }
    );

    res.send({
      status: "success",
      message: "update transaction success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "update transaction failed",
    });
  }
};
