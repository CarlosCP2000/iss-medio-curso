const mongoose = require('mongoose');
const { usuarioSchema } = require('./schemas');

const usuarioModel = mongoose.model('Usuario', usuarioSchema);

module.exports = {usuarioModel };