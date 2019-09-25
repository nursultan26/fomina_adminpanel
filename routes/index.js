var express = require('express');
var router = express.Router();

module.exports = function(app, db) {


	router.get('/',function(req, res) {
		res.render('index', {title: 'Express'})
	});

	router.get('/add-product',function(req, res) {
		res.render('add-product', {title: 'Express'})
	});

	router.post('/add-product',function(req, res) {
		db.Product.create({
	        name: req.body.name,
	        category: req.body.category,
	        subcategory: req.body.subcategory,
	        img: req.body.img,
	        price: req.body.price,
	        description: req.body.description,
	        appointment: req.body.appointment,
	        result: req.body.result,
	        structure: req.body.structure,
	        note: req.body.note,
	        volume: req.body.volume,
	        articul: req.body.articul
		})		
	});

	app.use('/', router);
};
