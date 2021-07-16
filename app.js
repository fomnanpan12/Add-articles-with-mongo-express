var express = require('express');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

var app = express();

// bring in models
let Article = require('./models/articles')

// check connection
db.once('open', function(){
    console.log('Connected to db');
});

// check for db errors
db.on('error', function(err){
    console.log(err);
});


// eat up template engine
app.set('view engine', 'ejs');

// parser middleware // parse json
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// static files
app.use(express.static('./public'));

app.get('/', function(req, res){
    Article.find({}, function(err, articles){
        if (err){
            console.log(err);
        } else{
            res.render('index', {
                title:'Articles',
                articles: articles
            });
        };
        
    });
    
});

app.get('/add', function(req, res){
    res.render('add-article');
});

app.post('/articles/add', function(req, res){
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/')
        }
    });
});

// listen to port
app.listen(3000);
console.log('you are on port 3000');

