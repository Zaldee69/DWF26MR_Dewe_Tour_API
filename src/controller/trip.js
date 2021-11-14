const { trip, country } = require("../../models");

exports.addTrip = async (req, res) => {
  try {
    const { ...data } = req.body;

    console.log(req.body);

    const allImage = req.files.image.map((el) => el.filename);

    const imageToString = JSON.stringify(allImage);
    await trip.create({
      ...data,
      image: imageToString,
      quota_filled: 0,
    });

    res.status(200).send({
      status: "success",
      message: "add trip success",
      ...data,
      image: allImage.map((el) => `http://localhost:5000/uploads/${el}`),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
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
          id: el.id,
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
          quota_filled: el.quota_filled,
          description: el.description,
          image: JSON.parse(el.image).map(
            (el) => `http://localhost:5000/uploads/${el}`
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
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      exclude: ["createdAt", "updatedAt", "countries"],
      where: {
        id,
      },
    });

    const newImg = JSON.parse(dataTrip.dataValues.image);

    console.log(dataTrip);

    res.send({
      status: "success",
      message: "get detail trip success",
      id: dataTrip.id,
      title: dataTrip.title,
      countries: dataTrip.country,
      accomodation: dataTrip.accomodation,
      transportation: dataTrip.transportation,
      eat: dataTrip.eat,
      day: dataTrip.day,
      night: dataTrip.night,
      dateTrip: dataTrip.dateTrip,
      price: dataTrip.price,
      quota: dataTrip.quota,
      quota_filled: dataTrip.quota_filled,
      description: dataTrip.description,
      image: newImg.map((el) => `http://localhost:5000/uploads/${el}`),

      // image: newData.image,
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
    console.log(req.body);
    const existTrip = await trip.findOne({
      where: {
        id,
      },
    });

    // const allImage = req.files.image.map((el) => el.filename);

    // const imageToString = JSON.stringify(allImage);

    console.log(req.body);

    // const data = {
    //   ...existTrip,
    //   title: req.body.title,
    //   countries: req.body.country,
    //   accomodation: req.body.accomodation,
    //   transportation: req.body.transportation,
    //   eat: req.body.eat,
    //   day: req.body.day,
    //   night: req.body.night,
    //   dateTrip: req.body.dateTrip,
    //   price: req.body.price,
    //   quota: req.body.quota,
    //   description: req.body.description,
    //   image: imageToString,
    // };

    await trip.update(
      { quota_filled: req.body.quota_filled },
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
          data: req.body,
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
