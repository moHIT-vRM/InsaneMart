const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to the DB"))
  .catch((err) => console.log("Error:", err));

//Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

// Model
const userModel = mongoose.model("user", userSchema);

// API
app.get("/", (request, response) => {
  response.send("Server is working");
});

// SIGN UP API
app.post("/signUp", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    // In Moongoose 6 Version it is not taking the callback function in the model.findOne() function
    const result = await userModel.findOne({ email: email });

    if (result) {
      res.status(400).send({
        message: "Email Is Already Registered",
        isResgistration: false,
      });
    } else {
      const data = new userModel(req.body);
      const saveResult = await data.save();
      res.status(201).send({
        message: "User Registered Successfully",
        isResgistration: true,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
  // userModel.findOne({ email: email }, (err, result) => {
  //   console.log("Result", result);
  //   console.log("Err:", err);
  //   if (result) {
  //     res.send({ message: "Email Is Already Registered" });
  //   } else {
  //     const data= userModel(req.body)
  //     const save= data.save()
  //     res.send({ message: "User Registered Successfully"})
  //   }
  // });
});

// LOGIN API
app.post("/login", async (req, res) => {
  try {
    // In Moongoose 6 Version it is not taking the callback function in the model.findOne() function
    const { email, password } = req.body;
    const result = await userModel.findOne({
      email: email,
      password: password,
    });
    if (result) {
      const dataBody = {
        id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };

      console.log(dataBody, "LOGIN BODY");
      res.status(200).send({
        message: "User Logined Successfully",
        isLogin: true,
        data: dataBody,
      });
    } else {
      res.status(400).send({
        message: "Email Id or Password is Wrong, Please Check",
        isLogin: fasle,
        data: dataBody,
      });
      // const data = new userModel(req.body);
      // const saveResult = await data.save();
      // res.send({ message: "User Logined Successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log("server is runnig at port: " + PORT));
