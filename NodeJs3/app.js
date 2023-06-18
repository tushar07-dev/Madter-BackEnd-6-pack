import express  from "express";
import mongoose from "mongoose";

const app = express();

// middlewear:
app.use(express.json());

// Connect to the MongoDB database
mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "backendAPI",
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", schema);

app.get('/', (req, res) => {
    res.send('Nice');
})

app.get('/users/all', async (req, res) => {
    // User.find({}) will return all users data(Array) in object.
    const users = await User.find({});
    res.json({
        success: true,
        users: users,
    })
})

app.post('/users/new', async (req, res) => {
    // User.find({}) will return all users data(Array) in object.

    const {name, email, password} = req.body;
    console.log(req.query);
    await User.create({
        name: name, email: email, password: password,
    });

    res.status(201).cookie("temporary", "LOL").json({
        success: true,
        message: "registration sucessfully",
    })
});

app.get("/userid", async (req, res) => {
    // using Query
    const {id} = req.query;
    // using Body
    // const {id} = req.body;
    console.log(req.body, req.query);
    const user = await User.findById(id);

    res.json({success : true, user: user,});
});

// Dynamic url using Param
app.get("/userid/special", async (req, res) => {
    res.json({success : true, message: "Just kidding",});
});


//*  Dynamic url using Param (Note Dynamic route should write at bottom of all  routes only) 
app.get("/userid/:id", async (req, res) => {
    const {id} = req.params;
    console.log(req.body, req.query, req.params);
    const user = await User.findById(id); 

    res.json({success : true, user: user,});
});

app.listen(4000, () => {
    console.log("Server is working..")
});