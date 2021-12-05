const { user } = require("../../models");

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
    console.log(req.files.image[0].filename);

    const dataUser = await user.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    const image = JSON.stringify(req.files.image[0].filename).replace(
      /['"]+/g,
      ""
    );

    const data = {
      ...dataUser,
      image: `http://localhost:5000/uploads/${image}`,
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
