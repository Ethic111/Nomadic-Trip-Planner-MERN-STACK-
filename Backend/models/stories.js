const mongoose = require('mongoose')


const StoriesSchema = new mongoose.Schema({
    
        image:String,
        title:String,
        text:String,
        category :String,

})

const StroiesModel = mongoose.model("stories", StoriesSchema)

module.exports = StroiesModel