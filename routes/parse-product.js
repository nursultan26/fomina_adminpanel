var express = require('express');
var router = express.Router();

var request = require('request');
const cheerio = require('cheerio')
const utf8 = require('utf8');
var async = require('async')

module.exports = function(app, db) {



	var addBooks = function(link) {
		console.log('https://shop.aravia-prof.ru'+link)
		var promise = new Promise(function(resolve, reject) {
			request({uri: 'https://shop.aravia-prof.ru'+link, method:'GET', encoding: 'binary'}, function (err, res, page) {

				let $ = cheerio.load(page, { decodeEntities: true });

				var title = utf8.decode($('div .catalog-element-page').find('h1').text())
				if (title == "Колыбельная звезд Карен Уайт") {
					var description = utf8.decode($('div .js-text').text())
				} else {

				var description = utf8.decode($('div .box_tab').find('p').text())
				}
				var imgLink = $('div .image_big gallery popup-gallery').find('img').attr('src')

				resolve({
					title,
					author: "",
					description,
					imgLink
				});
			});		
		});

		return  promise


	}	

	router.get('/test',function(req, res) {
		res.send(utf8.decode('ÐÐ¸Ð½ÐµÑÐ°Ð»Ð¸Ð·Ð¾Ð²Ð°Ð½Ð½Ð°Ñ Ð²Ð¾Ð´Ð° Ñ ÑÑÐ¿Ð¾ÐºÐ°Ð¸Ð²Ð°ÑÑÐ¸Ð¼ Ð´ÐµÐ¹ÑÑÐ²Ð¸ÐµÐ¼ Ð´Ð»Ñ ÑÑÐ²ÑÑÐ²Ð¸ÑÐµÐ»ÑÐ½Ð¾Ð¹ ÐºÐ¾Ð¶Ð¸'))
	})
		
	router.get('/',function(req, res) {
		
		var books = []

		request({uri: 'http://localhost:3009/parse/pages', method:'GET', encoding: 'binary'}, function (err, response, urls) {
	
			urls = JSON.parse(urls)
			async.eachSeries(urls, function iterator(url, callback) {
				addBooks(url).then(function(resolve, reject) {
					books.push(resolve)
					callback()
				})
			}, function() {
				res.send(books)
			});	
		});	
	});

	router.get('/pages',function(req, res) {

		var urls = []
		var ids = []

		for (var i = 1; i <= 1; i++) {
			ids.push(i)
		}

		async.eachSeries(ids, function iterator(id, callback) {	
			request({uri: 'https://shop.aravia-prof.ru/aravia_professional/depilyatsiya/', method:'GET', encoding:'binary'}, function (err, res, page) {
				let $ = cheerio.load(page, { decodeEntities: true });
				let elem = $('div .catalog_item').each(function(index,elem) {
					elem = $(elem).find('a')
					elem = utf8.decode($(elem).attr('href'))
					urls.push(elem)
				});
				callback()
			});	
		}, function() {
			res.send(urls)
		});
	});

	app.use('/parse', router);
};