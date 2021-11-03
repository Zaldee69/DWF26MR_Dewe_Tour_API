const { trip, country } = require("../../models");

exports.addTrip = async (req, res) => {
  try {
    const { ...data } = req.body;

    const allImage = req.files.image.map((el) => el.filename);

    const imageToString = JSON.stringify(allImage);
    await trip.create({
      ...data,
      image: imageToString,
    });
    console.log(req.files.image);

    res.send({
      status: "success",
      message: "add trip success",
      ...data,
      image: allImage.map((el) => `http://localhost:3000/api/v1/uploads/${el}`),
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
      exclude: ["createdAt", "updatedAt"],
    });

    const newData = [];

    for (let item of dataTrip) {
      newData.push(item);
    }

    res.send({
      status: "success",
      message: "get trip success",
      data: newData.map((el) => {
        return {
          title: el.title,
          countries: el.country,
          accomodation: el.accomodation,
          transportation: el.transportation,
          eat: el.eat,
          day: el.day,
          night: el.night,
          dateTrip: el.dateTrip,
          price: el.price,
          quota: el.quota,
          description: el.description,
          image: JSON.parse(el.image).map(
            (el) => `http://localhost:3000/api/v1/uploads/${el}`
          ),
        };
      }),
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
    const dataTrip = await trip.findOne({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "get detail trip success",
      data: dataTrip,
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
    const { id } = req.params;
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
