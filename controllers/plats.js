const mongoose = require('mongoose');
const express = require('express')
const Plat = require('../models/plats')

exports.affichagePageAcceuil = (req, res) => {
    res.render('index');
}


exports.affichagePageLogin = (req, res) => {
    res.render('login');
}


exports.affichagePageCarte = (req, res) => {
    Plat.find().sort("highlighted").exec((err, data) => {
        if(err) throw err;
        res.render('carte', { data: data, affichage: 0 });
    })
}

exports.affichageCarteProduit = (req, res) => {
    Plat.find({ categorie: req.params.id }).sort({ "highlighted": -1} ).exec((err, data) => {
        switch(req.params.id) {
            case "Pizza":
                affichage = 1;
            break;
            case "Pates":
                affichage = 2;
            break;
            case "Salades":
                affichage = 3;
            break;
            case "Desserts":
                affichage = 4;
            break;
            case "Boissons-fraiches":
                affichage = 5;
            break;
            default: 
                affichage = 6;
        }
        res.render('carte', { data: data });
    });
}

exports.affichagePage404 = (req, res, next) => {
    res.setHeader('Content-type', 'text/plain');
    res.status(404).send('Page introuvable');
    next();
}

