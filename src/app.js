const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const directory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve.
app.use(express.static(directory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kafein'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kafein'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Kafein',
        message: 'Help text'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address needed to continue'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, placeName: location } = {}) => {

        if(error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
    
            res.send({
                location,
                forecast: forecastData
            })
        })
    
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404 Page',
        name: 'Kafein',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Kafein',
        message: "Page doesn't exist"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});