const mongoose = require('mongoose');
const comedorSchema = new mongoose.Schema({
    plato: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = {comedorSchema}