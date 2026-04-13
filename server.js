const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://ram:Ramesh%402005@cluster0.5yjx6yi.mongodb.net/realestate");

const propertySchema = new mongoose.Schema({
  title: String,
  price: String,
  location: String,
  landmark: String,
  description: String,
  image: String
});
// GET
app.get("/properties", async (req, res) => {
  const data = await Property.find();
  res.json(data);
});

// POST
app.post("/properties", async (req, res) => {
  const p = new Property(req.body);
  await p.save();
  res.json(p);
});

app.listen(5000, () => console.log("Server running"));
