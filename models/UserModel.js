const mongoose = require('mongoose');
const Schema = mongoose.Schema

// require passport auth
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema ({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type: String, 
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    child : {
        type : String,
        required : true
    },
    numberGame : {
        timesPlayed: Number,
        correctCount: Number,
        incorrectCount: Number
    },
    cardGame : {
        timesPlayed: Number,
        times: [Number],
    },
    colorGame : {
        timesPlayed: Number,
        correct: Number,
        incorrect: Number
    },
    shapeGame : {
        timesPlayed: Number,
        scores: [Number],
    },
});

UserSchema.plugin(passportLocalMongoose, {
    findByUsername : function(query) {
        return model.findOne(query)
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User

