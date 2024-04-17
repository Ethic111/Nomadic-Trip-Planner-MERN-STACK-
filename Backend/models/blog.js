const mongoose = require('mongoose')


const BlogSchema = new mongoose.Schema({
    name : String,
    img_source : String,
    details : [String]
})

const BlogModel = new mongoose.model("blogs", BlogSchema)
module.exports = BlogModel