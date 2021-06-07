const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    release_year:{
        type:String
    },
    genre:{
        name:{
            type:String,
            required:true
        },
        imageURL:{
            type:String,
            required:true
        }
    },
    rating:{
        type:Number,
        required:true
    },
    imageURL:{
        type:String
    }
});

module.exports = Movie = mongoose.model("movie",MovieSchema);