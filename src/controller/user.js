require("dotenv").config();
const { user } = require("../../models");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const accessToken = jwt.sign(email, process.env.ACCESS_TOKE_SECRET);
    res.send({
      data: {
        email,
        accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: "error",
    });
  }
};

exports.addUsers = async (req, res) => {
  try {
    await user.create(req.body);
    res.send({
      status: "succes",
      message: "Add user successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    res.send({
      status: "succes",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "delete user successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
