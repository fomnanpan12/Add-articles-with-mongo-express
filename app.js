var express = require('express');

var app = express();
app.set('view engine', 'ejs');

// // render page with text
// app.get('/', function(req, res){
//     res.send('this is the homepage');
// });

// // render page with text
// app.get('/contact', function(req, res){
//     res.send('this is the contact');
// });

// // render page with profile id
// app.get('/profile/:name', function(req, res){
//     res.send('You request to view a profile with name of ' + req.params.name);
// });

// render files

// render html
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/contact', function(req, res){
    res.sendFile(__dirname + '/contact.html');
});

// render profile view
app.get('/profile/:name', function(req, res){
    var data = {age:29, job:'developer', hobbies:['eating', 'fighting', 'fishing']};
    res.render('profile', {person: req.params.name, data : data});
});

app.listen(3000);
