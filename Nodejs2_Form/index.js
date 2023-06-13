import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Connect to the MongoDB database
mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "MadterBackEnd",
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

// Define message schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const app = express();
const users = [];

// Set up middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

// Middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const decoded = jwt.verify(token, "jwtSecreteTvS");
        console.log(decoded);
        req.user = await User.findById(decoded._id);
        next();
    } else {
      res.redirect("/login")
    }
  };


// Home route
app.get("/", (req, res) => {
  console.log(req.cookies.token);
  const token = req.cookies.token;

  if (token) {
    res.render("logout");
  } else {
    res.render("login");
  }
});

// Login route
app.get("/login", (req, res) => {
  res.render("login");
});

// Register route
app.get("/register", (req, res) => {
  res.render("register");
});

// User registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email: email });

  if (user) {
    return res.redirect("/login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: user._id }, "jwtSecreteTvS");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });

  res.redirect("/");
});

// User login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email: email });

  if (!user) {
    return res.redirect("/register");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.render("login", { email, message: "Incorrect password" });
  }

  const token = jwt.sign({ _id: user._id }, "jwtSecreteTvS");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });

  res.redirect("/");
});

app.get("/sucess", (req, res) => {
    res.render("success");
    });
    
// Logout route
app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.render("login");
});

// Success route
app.get("/success", (req, res) => {
    res.render("success");
  });
  
  // Dummy route to add a message
  app.get("/add", async (req, res) => {
    await Message.create({
      name: "Tushar2",
      email: "tushar@gmail.com",
    });
    res.send("nice2");
  });
  
  // Contact form submission
  app.post("/contact", async (req, res) => {
    console.log(req.body, req.body.name);
  
    await Message.create({
      name: req.body.name,
      email: req.body.email,
    });
  
    res.redirect("/success");
  });
  
  // Get all users
  app.get("/users", (req, res) => {
    res.json({
      users,
    });
  });
  
  // Start the server
  app.listen(5050, () => {
    console.log("Server is running...");
  });
  