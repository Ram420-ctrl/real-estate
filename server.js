const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://username:password@cluster.mongodb.net/realestate");

const Property = mongoose.model("Property", {
  title: String,
  price: String,
  location: String
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