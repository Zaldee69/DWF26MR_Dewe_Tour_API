const { country } = require("../../models");

exports.addCountry = async (req, res) => {
  try {
    const dataCountry = await country.create(req.body);
    res.send({
      status: "succes",
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
    const dataCountry = await country.findAll();
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
    });
    res.send({
      status: "success",
      message: "get detail country success",
      data: dataCountry,
    });
  } catch (error) {}
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
