const mongoose = require("mongoose");

const questionnaireSchema  = new mongoose.Schema ({
    "data": {
        "type": String,
        "attributes": {
        "input": Object
        }
    }
});

module.exports = mongoose.model("Questionnaire", questionnaireSchema)



