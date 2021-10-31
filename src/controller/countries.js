const { country } = require("../../models");

exports.addCountry = async (req, res) => {
  const countryExist = await country.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (countryExist) {
    res.status(400).send({
      status: "failed",
      message: "country already exist",
    });
  }
  try {
    const dataCountry = await country.create(req.body);
    res.send({
      status: "success",
      message: "add country succesfully",
      data: dataCountry,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "failed to add country",
    });
  }
};

exports.getCountry = async (req, res) => {
  try {
    const dataCountry = await country.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "get country success",
      data: dataCountry,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "get country failed",
    });
  }
};

exports.getDetailCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const dataCountry = await country.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "get detail country success",
      data: dataCountry,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.editCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    await country.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send({
      status: "success",
      message: "edit country success",
      data: {
        id,
        name,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "edit country failed",
    });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await country.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "succces",
      message: "delete country succes",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "delete country failed",
    });
  }
};
