const bcrypt = require("bcrypt"); //Plug in pour hasher les passwords
const jwt = require("jsonwebtoken"); //Plug in pour sécuriser la connection avec des tokens uniques
const passwordValidator = require("password-validator"); //Package qui permet de compléxifier un mot de passe

const User = require("../models/User"); //Importation du model User

var schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum 8 caractères
  .is()
  .max(20) // Maximum 20 caractères
  .has()
  .uppercase() // Le mot de passe doit avoir des majuscules
  .has()
  .lowercase() // Le mot de passe doit avoir des minuscules
  .has()
  .digits() // Le mot de passe doit avoir des chiffres
  .has()
  .not()
  .spaces(); // Le mot de passe ne doit pas avoir d'espace

  //Création d'un compte
exports.signup = (req, res, next) => {
  if (!schema.validate(req.body.password)) {
    //Test du format du mot de passe
    return res.status(400).json({ error: "Merci de bien vouloir entrer un mot de passe valide !" });
  } else if (schema.validate(req.body.password)) {
    bcrypt
      .hash(req.body.password, 10) //Salage du mot de passe à 10 reprises
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé!" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

//Connection à un compte existant
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password) //compare le password soumis avec le password de la base de données
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { //TOKEN de 24h qui est généré
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
