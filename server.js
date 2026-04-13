const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "https://ram420-ctrl.github.io"
}));
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://ram:Ramesh%402005@cluster0.5yjx6yi.mongodb.net/realestate")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const propertySchema = new mongoose.Schema({
  title: String,
  price: String,
  location: String,
  landmark: String,
  description: String,
  image: String
});

// Model
const Property = mongoose.model("Property", propertySchema);

// GET all properties
app.get("/properties", async (req, res) => {
  const data = await Property.find();
  res.json(data);
});

// POST new property
app.post("/properties", async (req, res) => {
  const p = new Property(req.body);
  await p.save();
  res.json(p);
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
