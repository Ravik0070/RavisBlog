const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res, next) => {
  try {
    //generate password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new User
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save the newly created user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.Login = async (req, res, next) => {
  try {
    //check for user already exists
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json({ mesasge: "user not found" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(404).json({ message: "Wrong Password" });
    const token = jwt.sign({ id: user._id }, "jwtKey");
    const { password, ...other } = user;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.Logout = async (req, res, next) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out")
};
exports.UpdateUser = async (req,res,next) =>{
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");
    jwt.verify(token, "jwtKey", async (err, userInfo) => {
      if (err) return res.status(403).json("Token is invalid");
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json("No blog found");
      if (req.params.id === userInfo.id) {
        user.username = req.body.username;
        user.email = req.body.email;
        if(req.body.profilePicture != "")
        {user.profilePicture = req.body.profilePicture}
        user.save();
        res.status(200).json({ message: "User has been updated." });
      } else {
        res.status(403).json({ message: "Something went wrong." });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}
