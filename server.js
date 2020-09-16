const express = require('express');
const app = express();
const mongoose = require('mongoose');
const platCtrllr = require('./controllers/plats');
const adminCtrllr = require('./controllers/admin');


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bodega', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à la base de donnée réussie !'))
    .catch((err) => console.log('Erreur de connexion à la base de données : ' + err));


app.set("view engine", "ejs");

app.use(express.static('./public'));


app.route('/')
    .get(platCtrllr.affichagePageAcceuil);

app.route('/login')
    .get(platCtrllr.affichagePageLogin)

app.route("/carte")
    .get(platCtrllr.affichagePageCarte)

app.route('/carte/:id')
    .get(platCtrllr.affichageCarteProduit);

app.route('/admin')
    .get(adminCtrllr.affichagePageAdmin);

app.route('/ajoutPlat')
    .post(adminCtrllr.ajoutDePlats);

app.route('/liste')
    .get(adminCtrllr.listePlats)

app.use(platCtrllr.affichagePage404);

app.listen(process.env.PORT || 3000);
