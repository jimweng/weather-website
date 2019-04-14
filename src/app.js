const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // Set the views as the default extension files route 
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	// render allow us to render one of our views
	// match the name file in the views folder 
	res.render('index', {
		title: 'Weather App',
		name: 'Jim Weng'
	})
})

app.get('/about', (req,res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Jim Weng'
	})	
})

app.get('/help', (req,res) => {
	res.render('help', {
		helpText: 'This is some helpful text.',
		title: 'Help',
		name: "Jim Weng"
	})
})

app.get('/weather', (req,res) => {
	if(!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		})
	}

	geocode(req.query.address, (err, {latitude, longitude, location} = {})=> {
		if (err) {
			return res.send({err})
		}

		forecast(latitude, longitude, (err, forecastData) => {
			if (err) {
				return res.send({err})
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
	})
})



app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	} 

	console.log(req.query.search)
	res.send({
		products:[]
	})
})

app.get('/help/*', (req, res) => {
	res.render('404',{
		title:'404',
		name:'Jim Weng',
		errorMessage:'Help article not found'
	})
})

app.get('*', (req,res) => {
	res.render('404', {
		title: '404',
		name: "Jim Weng",
		errorMessage:'Page not found'
	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})
