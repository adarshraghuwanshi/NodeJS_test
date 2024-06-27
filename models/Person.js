const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://adarshraghu1c50:adarsh123@cluster0.u3lagny.mongodb.net/");
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    mobile: String
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
