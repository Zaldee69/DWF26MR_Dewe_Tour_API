const { user } = require("../../models");

//import package
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { fullName, email, gender, phone, address, role } = req.body;
  const schema = Joi.object({
    fullName: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(6).required(),
    address: Joi.string().min(1).required(),
    gender: Joi.string().min(1).required(),
    role: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  //do validation and get error
  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  const userExist = await user.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (userExist) {
    res.status(400).send({
      status: "failed",
      message: "email already exist",
    });
  }

  try {
    //generate salt
    const salt = await bcrypt.genSalt(10);
    //hasing password

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      gender,
      role,
    });
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).send({
      status: "success",
      fullName: newUser.fullName,
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.userLogin = async (req, res) => {
  console.log(req.body);
  //validation schema
  const schema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  //do validation adnd get error
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }
  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "credential is invalid",
      });
    }

    //compare password from client and database
    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    //check password valid or not
    if (!isValid) {
      res.status(400).send({
        status: "failed",
        message: "credential is invalid",
      });
    }

    //generate token
    const token = jwt.sign(
      { id: userExist.id, role: userExist.role },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).send({
      status: "success",
      data: {
        email: userExist.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
