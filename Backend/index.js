const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ToursModel = require("./models/Tours.js");
const HomeModel = require("./models/home.js");
const StoriesModel = require("./models/stories.js");
const PlannerModel = require("./models/planner.js");
const BlogModel = require("./models/blog.js");
const AdminToursModel = require("./models/admincities.js");

require("dotenv").config();

// For online Deployment
// app.use(cors(
//     {

//         origin : ['https://nomadics.vercel.app'],
//         methods : ['POST', 'GET'],
//         credentials : true
//     }
// ))

app.use(cors());
app.use(express.json({ limit: "10GB" }));

mongoose.connect(
  "mongodb+srv://explorenomadictrips:SRKS2003@cluster0.lu4bqm2.mongodb.net/Trip-Planner?retryWrites=true&w=majority"
);

app.get("/gettours", (req, res) => {
  ToursModel.find()
    .then((tours) => res.json(tours))
    .catch((err) => res.json(err));
});

app.post("/addcity", async (req, res) => {
  try {
    const cityData = req.body;

    // delete cityData.__v;

    const db = mongoose.connection.db;
    const collection = db.collection("tours");

    const result1 = await collection.findOne({ title: cityData.title });
    if (result1) {
      res.status(400).send("City already exists.");
      return;
    }
    const result = await collection.insertOne(cityData);
    res.status(200).send("City added successfully.");
  } catch (error) {
    console.error("Error adding city:", error);
    res.status(500).send("Error adding city.");
  }
});

app.delete("/deletecity/:title", async (req, res) => {
  try {
    const cityname = req.params.title;
    // console.log("cityname Title:", cityname);

    const db = mongoose.connection.db;
    const collection = db.collection("tours");

    const result = await collection.deleteOne({ title: cityname });
    // console.log("City deleted successfully:");

    res.status(200).send("City deleted successfully.");
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).send("Error deleting city.");
  }
});

app.put("/enablecity/:title", async (req, res) => {
  try {
    const cityname = req.params.title;
    const db = mongoose.connection.db;
    const toursCollection = db.collection("tours");
    // const disabledToursCollection = db.collection("toursdisabled");

    // Check if the city exists in the disabled tours collection
    const cityData = await toursCollection.findOne({ title: cityname });
    if (cityData) {
      // Move the city from disabled tours collection to active tours collection
      // await toursCollection.insertOne(cityData);
      // await disabledToursCollection.deleteOne({ title: cityname });
      await toursCollection.updateOne(
        { title: cityname },
        { $set: { view: true } }
      );
      res.status(200).send("City enabled successfully.");
    } else {
      // City not found in disabled tours collection
      res.status(404).send("City not present in tours collection.");
    }
  } catch (error) {
    console.error("Error enabling city:", error);
    res.status(500).send("Error enabling city.");
  }
});

app.put("/disablecity/:title", async (req, res) => {
  try {
    const cityname = req.params.title;
    const db = mongoose.connection.db;
    const toursCollection = db.collection("tours");
    // const disabledToursCollection = db.collection("toursdisabled");

    // Check if the city exists in the active tours collection
    const cityData = await toursCollection.findOne({ title: cityname });
    if (cityData) {
      // Move the city from active tours collection to disabled tours collection
      // await disabledToursCollection.insertOne(cityData);
      // await toursCollection.deleteOne({ title: cityname });
      await toursCollection.updateOne(
        { title: cityname },
        { $set: { view: false } }
      );
      res.status(200).send("City disabled successfully.");
    } else {
      // City not found in active tours collection
      res.status(404).send("City not found in tours collection.");
    }
  } catch (error) {
    console.error("Error disabling city:", error);
    res.status(500).send("Error disabling city.");
  }
});

app.post("/addplaces", async (req, res) => {
  try {
    const placeData = req.body;
    console.log("placeData:", placeData);

    // delete placeData.__v;

    const db = mongoose.connection.db;
    const collection = db.collection("stories");
    for (var i = 0; i < placeData.length; i++) {
      const result1 = await collection.findOne({ title: placeData[i].title });
      if (!result1) {
        const result = await collection.insertOne(placeData[i]);
      }
      
    }
    res.status(200).send("Places added successfully.");
    //   const result1 = await collection.findOne({ title: placeData.title });
    //   if (result1) {
    //     res.status(400).send("Place already exists.");
    //     return;
    //   }
    //   const result = await collection.insertOne(placeData);
    //   res.status(200).send("Place added successfully.");
  } catch (error) {
    console.error("Error adding place:", error);
    res.status(500).send("Error adding place.");
  }
});

app.get("/gethomes", (req, res) => {
  HomeModel.findOne({})
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.get("/getstories", (req, res) => {
  StoriesModel.find()
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.post("/getplanner", (req, res) => {
  const cityname = req.body.cityname;

  PlannerModel.findOne({ cityname: cityname })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.get("/blogs/:cityname", (req, res) => {
  const cityname = req.params.cityname;
  BlogModel.findOne({ name: cityname })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running.");
});
