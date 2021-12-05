const { wishlist, country, trip } = require("../../models");

exports.addWishlist = async (req, res) => {
  try {
    const wishlistExist = await wishlist.findOne({
      where: {
        trip: req.body.trip,
      },
    });

    if (wishlistExist && wishlistExist.dataValues.user === req.user.id) {
      res.status(400).send({
        status: "failed",
        message: "Wishlist already exist",
      });
    } else {
      await wishlist.create({
        user: req.user.id,
        trip: req.body.trip,
      });

      res.status(200).send({
        status: "success",
        message: "Added to wishlist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "Add wishlist failed",
    });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    const wishlistData = await wishlist.findAll({
      where: {
        user: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: trip,
          as: "trips",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt", "countries"],
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "countries"],
            },
          },
        },
      ],
    });
    const newWishListData = [];

    for (let item of wishlistData) {
      newWishListData.push(item.trips);
    }

    res.status(200).send({
      status: "success",
      message: "get wishlist success",
      trip: newWishListData.map((el, i) => {
        return {
          wishlistId: wishlistData[i].id,
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
    res.status(500).send({
      status: "failed",
      message: "Get wishlist failed",
    });
  }
};

exports.deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    await wishlist.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({
      status: "success",
      message: " delete wishlist succes",
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: " delete wishlist failed",
    });
  }
};
