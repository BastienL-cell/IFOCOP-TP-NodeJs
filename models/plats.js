const mongoose = require('mongoose');

const platSchema = mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categorie : { type: String, required: true},
    prix: { type: Number, required: true },
    highlighted: { type: Boolean, required: true},
    published : { type: Boolean, required: true}
});


const Plats = mongoose.model('plats', platSchema);

module.exports = Plats;