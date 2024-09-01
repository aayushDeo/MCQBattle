const mongoose = require("mongoose");
 
const mcq = new mongoose.Schema({
    question: {
        type: String,
        required: true 
    },
    option1: {
        type: String,
        required: true,
    },
    option2: {
        type: String,
        required: true,
    },
    option3: {
        type: String,
        required: true,
    },
    correct: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

const Mcq = new mongoose.model("Mcq", mcq);
module.exports = Mcq;
