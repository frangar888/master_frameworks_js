'use strict'

//Cargar modulos e node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');


//Ejecutar express (http)
var app = express();


//Cargar ficheros rutas
var article_routes = require('./routes/article');


//Cargar middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS Para permitir acceder al Backend desde cualquier frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Añadir prefijos a rutas
app.use('/api',article_routes);


//Exportar el modulo (fichero actual)
module.exports = app;