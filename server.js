const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method}, ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', () => {
		console.log('Log created.');
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (request, response) => {
	response.render('home.hbs', {
		pageTitle: 'Homepage',
		welcomeMessage: 'Hi, how\'s your day? :)'
	})
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to fulfill request'
	});
});

app.listen(3000, () => {
	console.log(`Server is up on port ${port}`);
});