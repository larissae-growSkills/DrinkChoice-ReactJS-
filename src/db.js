const mongoose = require("mongoose");
const Questionnaire = require("./model/Questionnaire");

mongoose.connect('mongodb://localhost:27017/questionnaire', {useNewURLParser: true});

mongoose.connection
    .once('open', () => console.log("connected"))
    .on('error', (error) => {
        console.log(error);
    });