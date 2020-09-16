const express = require('express');
const Plat = require('../models/plats');
const mongoose = require('mongoose');

exports.affichagePageAdmin = (req, res) => {
    res.render('admin');
}

exports.ajoutDePlats = (req, res) => {
    new Plat({
        titre: req.body.nomPlat,
        description: req.body.descriptionPlat,
        image: req.body.imagePlat,
        categorie: req.body.categoriePlat,
        prix: req.body.prixPlat,
        highlighted: (req.body.highlighted ? true : false),
        published: (req.body.published ? true : false)
    }).save()
        .then(() => console.log("Ajout d'un nouveau plat !"))
        .catch((err) => console.log(err));
    res.redirect('/carte/' + req.body.categoriePlat);
}

exports.listePlats = (req, res) => {
    Plat.find((err, data) => {
        if(err) throw err;
        res.render('liste', { data: data });
    })
}