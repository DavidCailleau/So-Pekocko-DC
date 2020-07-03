const express = require("express"); //importation d'express => Framework basé sur node.js
const bodyParser = require("body-parser"); //Permet d'extraire l'objet JSON des requêtes POST
const mongoose = require("mongoose"); // Plugin Mongoose pour se connecter à la data base Mongo Db
const path = require("path"); // Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier.
const helmet = require("helmet"); // Plugin qui permet de protéger l'application de certaines vulnérabilités en configurant de manière appropriée des en-têtes HTTP.
//protection contre les attaques de type cross-site scripting et autres injections intersites
//Protection contre les attaques de sniffing et clickjacking

const sauceRoutes = require("./routes/sauce"); //Déclaration de la route sauce
const userRoutes = require("./routes/user"); //Déclaration de la route user

mongoose  //Connection à la base de données avec login et mot de passe
  .connect(
    "mongodb+srv://Pochonas:1234@so-pekocko-dc-p6-mi4xb.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  ) 
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express(); //L'application utilise le framework express

//Middleware Header
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // accéder à l'API depuis toutes origines
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //Tous les headers de requêtes autorisés vers l'API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //Toutes les méthodes de requêtes autorisées
  next();
});

app.use (helmet()); // L'application utilise toutes les protections helmet
app.use(bodyParser.json()); // L'application utilise bodyparser

app.use("/images", express.static(path.join(__dirname, "images"))); //L'application utilise des images

app.use("/api/auth", userRoutes); //L'application utilise la route des users
app.use("/api/sauces", sauceRoutes); //L'application utilise la route des sauces

module.exports = app; //Export de app pour déclaration dans server.js
