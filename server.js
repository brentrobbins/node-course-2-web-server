const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// start express
var app = express();

// setup Handlebars / hbs
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to the server log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

// Middleware
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


//register the handeler
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello World'
    });
    // res.send({
    //     name: 'Brent Robbins',
    //     age: 38,
    //     likes: [
    //         'hockey',
    //         'cars'
    //     ]
    // });
});

app.get('/about', (req, res) => {
    //res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

// app.get('/maintenance', (req, res) => {
//     //res.send('About page');
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance'
//     });
// });



app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

// bind the app to a port
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
