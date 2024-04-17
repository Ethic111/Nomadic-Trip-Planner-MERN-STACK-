const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    title: String,
    url: String,
    subtitle: String,
    info: String,
    
  });
  
const exploreSchema = new mongoose.Schema({
    title: String,
    url: String,
    
  });
  
const reviewSchema = new mongoose.Schema({
    url: String,
    review_content: String,
    rating: String,
    
  });
  
const HomeSchema = new mongoose.Schema({
    cardData: [cardSchema],
    exploreData: [exploreSchema],
    reviewData: [reviewSchema],
  });

const HomeModel = mongoose.model("homes", HomeSchema)


module.exports = HomeModel
                  