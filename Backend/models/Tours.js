const mongoose = require("mongoose")

const ToursSchema = new mongoose.Schema({
    title : String,
    sub_title : String,
    description : String,
    img : String,
    view: Boolean
})

const ToursModel = mongoose.model("tours", ToursSchema)
module.exports = ToursModel
