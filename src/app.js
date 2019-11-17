const path = require('path');

const express = require('express');
const hbs = require('hbs');

const getGeoCode = require('./utils/geocode');
const getWeather = require('./utils/weather');

const app = express();

// Paths for Express
const sPublicDirPath = path.join(__dirname, './../public');
const sViewsPath = path.join(__dirname, './../templates/views');
const sTemplatesPath = path.join(__dirname, './../templates/partials');

// Setting render engine and views
app.set('view engine', 'hbs');
app.set('views', sViewsPath);
hbs.registerPartials(sTemplatesPath);

// Setting static directory to serve
app.use(express.static(sPublicDirPath));

app.get('', (req, res) => {
    res.render('index', {title:'Home', msg:"Weather", footerText: 'Created by Raghuram'});
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'Raghuram Lakamraju', footerText: 'Created by Raghuram'});
})

app.get('/help', (req, res) => {
    res.render('help', {title:'Help', context: 'Help context goes here ...', footerText: 'Created by Raghuram'});
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({ error:'Address is not provided'});
    }

    getGeoCode(req.query.address, (error, {sLatitude, sLongitude} = {}) => {
        getWeather(sLatitude, sLongitude, (error, {currently} = {}) => {
            res.send(currently);
        })
    })
  
})

app.get('/help/*', (req, res) => {
    res.render('404', {title:'Oops !!!', errorMsg: 'Help topic not found', footerText: 'Created by Raghuram'});
})

app.get('*', (req, res) => {
    res.render('404', {title:'Oops !!!', errorMsg: 'Page not found', footerText: 'Created by Raghuram'});
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})