'use strict'

var validator = require('validator');
var fs        = require('fs');
var path      = require('path');
var Article   = require('../models/article'); //con los dos puntos salgo del directorio actual


var controller = {

    datosCurso: (req,res) => {
        var hola = req.body.hola;
        return res.status(200).send({
            curso:'Master en Framework JS',
            autor:'Fran',
            URL:'www.fran.com.ar',
            hola
        });
    },

    test: (req,res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de articulos'
        });
    }, 

    save: (req,res) => {
        //Obtener los parametros de POST
        var params = req.body;

        //Validar datos con validator
        try {
            var validate_title      = !validator.isEmpty(params.title);
            var validate_content    = !validator.isEmpty(params.content);

        } catch(err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos'
            }); 
        }

        if(validate_title && validate_content) {

            //Crear objeto a guardar
            var article     = new Article();

            //Asignar valores
            article.title   = params.title;
            article.content = params.content;
            article.image   = null;

            //Guardar articulo
            article.save((err,articleStored) => {

                if(err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    }); 
                }
                //Devolver respuesta
                return res.status(200).send({
                    status:'success',
                    article: articleStored
                }); 
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Datos invalidos'
            }); 
        }
    },

    getArticles:(req,res) => {

        var query = Article.find({});

        var last = req.params.last;
        if(last || last != undefined) {
            query.limit(5); //obtengo los ultimos 5 articulos
        }

        //find, con el -_id le digo que me orden descendente por _id
        query.sort('-_id').exec((err,articles) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener articulos'
                }); 
            }
            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar'
                }); 
            }
            return res.status(200).send({
                status: 'success',
                articles
            }); 
        })  
    },
    getArticle:(req,res) => {
        var articleId = req.params.id;

        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo'
            }); 
        }
        Article.findById(articleId,(err,article) => {
            if (err || !article) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en el server'
                }); 
            }
            return res.status(404).send({
                status: 'success',
                message: article
            }); 
        })

    },
    update: (req,res) => {
        var articleId = req.params.id;

        var params  = req.body;

        try {
            var validate_title   = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch(err) {
            return res.status(500).send({
                status: 'error',
                message: 'Faltan datos: '+err
            }); 
        }

        if (validate_title && validate_content) {
            Article.findOneAndUpdate({_id:articleId}, params, {new:true}, (err,articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    }); 
                } 
                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    }); 
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                }); 

            });
        } else {
            return res.status(500).send({
                status: 'error',
                message: 'Error en validación'
            }); 
        }
    },
    delete: (req,res) => {
        var articleId = req.params.id;

        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo'
            }); 
        }

        Article.findOneAndDelete({_id:articleId}, (err,articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                }); 
            } 
            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                }); 
            }
            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            }); 
        });
    },
    upload:(req,res) => {
        //configurar el modulo connect multiparty router/article.js

        //Recoger el fichero de la peticion
        var fileName = 'Imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: fileName
            });
        }
        //Obtener el nombre y extension del archivo
        var filePath = req.files.file0.path;
        //ESTO FUNCION SOLO EN WINDOWS
        //PAR LINUX O MAC filePath.split('/')
        var file_split      = filePath.split('\\');
        var fileName        = file_split[2];
        var ext_split       = fileName.split('\.');
        var fileExtension   = ext_split[1];

        //Comprobar la extension, solo imagenes
        if(fileExtension != 'png' && fileExtension != 'jpg'
        && fileExtension != 'jpeg' && fileExtension != 'gif') {
            fs.unlink(filePath,(err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'Extensión invalida'
                });
            });
        } else {
            var articleId = req.params.id;
            Article.findOneAndUpdate({_id: articleId},{image:fileName}, {new:true}, (err,articleUpdated) => {
                if(err || !articleUpdated) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar imagen'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                   article:articleUpdated
                });
            });
        }
    },
    getImage: (req,res) => {
        var file = req.params.image;
        var pathFile = './upload/articles/'+file;
        fs.exists(pathFile,(exists) => {
            if(exists) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe imagen'
                });
            }
        });
    },
    search: (req,res) => {
        //Obtener string a buscar
        var searchString = req.params.search;
        Article.find({
            "$or": [
                {"title":{"$regex":searchString, "$options": "i"}},
                {"content":{"$regex":searchString, "$options": "i"}}
            ]
        })
        .sort([['date','descending']])
        .exec((err,articles) => {
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición '+err
                });
            }
            if(!articles || articles.length <= 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos '+err
                });
            }
            return res.status(200).send({
                status: 'success',
               articles
            });
        });
    }

}; //end controller

module.exports = controller;