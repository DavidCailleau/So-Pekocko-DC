# Projet 6 - Parcours Développeur Web OpenClassrooms
"Construisez une API sécurisée pour une application d'avis gastronomiques"

## Compétences évaluées :
- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée
- Mettre en œuvre des opérations CRUD de manière sécurisée

## Développement

La partie frontend du projet était déjà existante et a été développée avec Angular CLI version 7.0.2

La partie backend du projet est développée avec NodeJS, Express, et MongoDB.

## Pré requis

Cloner le repository
Node JS doit être installé localement sur la machine et les dépendances => NPM install

Côté backend, plusieurs dépendances npm ont été nécessaires : Mongoose - Bcrypt - Body-Parser - Express - jsonwebtoken - Multer - Helmet - Bouncer - password validator - Nodemon

Côté frontend, CLI Angular est necessaire pour pouvoir faire tourner le serveur de développement.

## Lancement

Frontend => Démarrer `ng serve` pour avoir accès au serveur de développement. Rendez-vous sur http://localhost:4200/. 
Backend => Démarer `node server` ou `nodemon server`  pour accéder à http://localhost:3000

## Création de compte
Au lancement de l'application, il est possible de créer un compte pour s'y connecter les fois d'après.
Le mot de passe doit contenir au minimum 8 caractères avec au moins 1 minuscule, 1 majuscule et 1 chiffre. Pas d'espace autorisé.
