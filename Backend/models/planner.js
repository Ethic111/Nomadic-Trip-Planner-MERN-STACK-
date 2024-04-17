const mongoose = require('mongoose')

const Day1Schema = new mongoose.Schema({
    
    place_type: String,
    place_name: String,
    place_img: String,
    rating: String,
    time: String,
    price: String,
    icon: String,
    icon_color: String,
    icon_bgcolor: String,
})
const Day2Schema = new mongoose.Schema({
    
    place_type: String,
    place_name: String,
    place_img: String,
    rating: String,
    time: String,
    price: String,
    icon: String,
    icon_color: String,
    icon_bgcolor: String,
})
const Day3Schema = new mongoose.Schema({
    
    place_type: String,
    place_name: String,
    place_img: String,
    rating: String,
    time: String,
    price: String,
    icon: String,
    icon_color: String,
    icon_bgcolor: String,
})
const PlannerSchema = new mongoose.Schema({
    cityname : String,
    Day1 : [Day1Schema],
    Day2 : [Day2Schema],
    Day3 : [Day3Schema],
})

const PlannerModel = mongoose.model("planners", PlannerSchema)

module.exports = PlannerModel