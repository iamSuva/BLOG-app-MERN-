import {
  compareHashepassword,
  generateHashPassword,
  generateToken,
} from "../middleware/auth.js";
import userModel from "../models/usermodel.js";

export const registerController = async (req, res) => {
  try {
    console.log("body", req.body);
    const { username, email, password } = req.body;
    if (!username || !password || !email)
      return res.status(201).send({
        success: false,
        message: "Please enter a username | password | email.",
      });
    const user = await userModel.findOne({ email: email });

    if (user) {
      return res
        .status(201)
        .send({ success: false, message: "User already exists." });
    }

    const hashPassword = await generateHashPassword(password);
    const newUser = new userModel({
      username: username,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).send({
      message: "Successfully registered",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!password || !email)
      return res.status(400).send({
        success: false,
        message: "Please enter both email and password.",
      });

    const user = await userModel.findOne({ email: email });
    console.log("login user", user);
    if (!user) {
      console.log("user not exist");
      return res
        .status(200)
        .send({success:false, message: "User does not exist." });
    }

    const isMatch = await compareHashepassword(password, user.password);
    console.log(isMatch);

    if (!isMatch)
      return res
        .status(200)
        .send({ success: false, message: "Incorrect password." });
    const token = await generateToken(user);
    return res.status(200).send({
      success: true,
      message: "Successfully logged in.",
      token: token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error.",
    });
  }
};
