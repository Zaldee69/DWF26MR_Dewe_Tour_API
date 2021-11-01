const { transaction, user, trip } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const { ...data } = req.body;
    const transactionData = await transaction.create(data);
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
    console.log(error);
    res.send({
      status: "failed",
      message: "get all trasnsaction failed",
    });
  }
};

exports.getDetailsTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const dataTransaction = await transaction.findOne({
      where: {
        id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "id", "password", "status"],
        },
        model: trip,
        as: "trips",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      status: "success",
      message: "get details transaction success",
      data: dataTransaction,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "get details transaction failed",
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { counterQty, total, status, attachment } = req.body;
    const { id } = req.params;

    await transaction.update(
      {
        counterQty,
        total,
        status,
        attachment,
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
