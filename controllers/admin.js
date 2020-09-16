const Plat = require('../models/plats');
const formidable = require('formidable');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

exports.affichagePageAdmin = (req, res) => {
    res.render('admin');
}

exports.ajoutDePlats = (req, res) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = 'public/img';
    form.parse(req, (err, fields, files) => {
        let oldpath = files.file.path;
        let newpath = "./public/img/" + files.file.name;
        let filename = files.file.name;
        fs.rename(oldpath, newpath, (err) => {
            if (err) throw err;
        });
        new Plat({
            titre: fields.nomPlat,
            description: fields.descriptionPlat,
            image: "img/" + filename,
            categorie: fields.categoriePlat,
            prix: fields.prixPlat,
            highlighted: (fields.highlighted ? true : false),
            published: (fields.published ? true : false)
        }).save()
            .then(() => console.log("Ajout d'un nouveau plat !"))
            .catch((err) => console.log(err));
        res.redirect('/carte/' + fields.categoriePlat);
    });

}

exports.listePlats = (req, res) => {
    Plat.find((err, data) => {
        if (err) throw err;
        res.render('liste', { data: data });
    })
}