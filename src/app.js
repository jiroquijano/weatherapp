const path = require('path');
const express = require('express');
const hbs = require('hbs');
const {getGeoLocaton} = require('./utils/geocode');
const {forecast} = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location.
//app.set is used for setting application variables which could be reserved or custom. You can use get to fetch the values.
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath); //register partials

app.use(express.static(publicDirectoryPath)); //expose static directory to serve

app.get('',(req,res)=>{ //default route
    res.render('index', {
        pageTitle: 'WEATHER',
        title: 'Weather app',
        name: 'Jiro Quijano'
    });
});

app.get('/about', (req,res)=>{
    res.render('about',{
        pageTitle: 'ABOUT',
        name: 'Jiro Quijano'
    });
});

app.get('/weather', (req,res)=>{ //sets up route for weather
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    getGeoLocaton(req.query.address,(err,data={})=>{
        if(err){
            return res.send({
                error: err
            });
        }
        forecast(data,(err,forecastData)=>{
            if(err){
                return res.send({
                    error:err
                });
            }
            res.send({
                forecastData,
                locationData: data
            });
        });
    });
});

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'please provide a search term'
        });
    } 
    res.send({
        products: []
    });
});

app.get('/help', (req,res)=>{
    res.render('help', {
        pageTitle: 'HELP',
        topic: "I don't know",
        name: 'Jiro Quijano'
    });
});

app.get('/help/*', (req,res)=>{
    res.render('404page',{
        errorreason: `${req.url.replace('/help','')} Help article not found`,
        name: 'Jiro Quijano'
    });
});

app.get('*',(req,res)=>{
    res.render('404page',{
        errorreason: `Page '${req.url.replace('/','')}' not found`,
        name: 'Jiro Quijano'
    });
});

app.listen(3000,()=>{ //starts listening to localhost port
    console.log('Server is up on port 3000');
});