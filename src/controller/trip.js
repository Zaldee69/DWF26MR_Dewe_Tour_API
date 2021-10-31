const { trip, country } = require("../../models");

exports.addTrip = async (req, res) => {
  try {
    const { ...data } = req.body;
    const { ...attachment } = req.files.image;
    const allImage = [];

    for (let item in attachment) {
      allImage.push(req.files.image[item].filename);
    }
    const imageToString = JSON.stringify(allImage);
    console.log(imageToString);
    let dataTrip = await trip.create({
      ...data,
      image: imageToString,
    });

    res.send({
      status: "success",
      message: "add trip success",
      data: dataTrip,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: error,
    });
  }
};

exports.getTrip = async (req, res) => {
  try {
    const dataTrip = await trip.findAll({
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt", "countries"],
        },
      },
    });
    res.send({
      status: "success",
      message: "get trip success",
      data: dataTrip,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "get trip failed",
    });
  }
};

exports.getDetailTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const dataCountry = await trip.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "get detail trip success",
      data: dataCountry,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "get detail trip failed",
    });
  }
};

exports.editTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      countryId,
      accomodation,
      transportation,
      eat,
      day,
      night,
      dateTrip,
      price,
      quota,
      description,
      image,
    } = req.body;
    await trip.update(
      {
        title,
        countryId,
        accomodation,
        transportation,
        eat,
        day,
        night,
        dateTrip,
        price,
        quota,
        description,
        image,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send({
      status: "success",
      message: "edit trip success",
      data: [
        {
          title,
          countryId,
          accomodation,
          transportation,
          eat,
          day,
          night,
          dateTrip,
          price,
          quota,
          description,
          image,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "edit trip failed",
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.body;
    await trip.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "delete trip succes",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "delete trip failed",
    });
  }
};
