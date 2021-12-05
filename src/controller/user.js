const { user } = require("../../models");
const cloudinary = require("../thirdparty/cloudinary");

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "id", "role"],
      },
    });
    res.send({
      status: "succes",
      data: users,
    });
  } catch (error) {
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
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const dataUser = await user.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    const results = await cloudinary.uploader.upload(req.files.image[0].path, {
      folder: "dewe_tour",
      use_filename: true,
    });

    const data = {
      ...dataUser,
      image: results.public_id,
    };

    await user.update(data, {
      where: {
        id: req.user.id,
      },
    });

    res.status(200).send({
      message: "Edit user success",
    });
  } catch (error) {
    res.status(400).send({
      message: "server error",
    });
  }
};
