// body-parser
var bodyParser = require('body-parser');

// express
var express = require('express');

// multer
var multer = require('multer');

//creating instance
var myapp = express();
var path = require('path');

myapp.use(bodyParser.json());
myapp.use(bodyParser.urlencoded({ extended: true }));

myapp.use(express.static(
    path.join(__dirname, '/resources')
));

//folder where view files are kept
myapp.set('views', __dirname + '/views');

// setting the view engine to ejs
myapp.set('view engine', 'ejs');

myapp.get('/', function (req, res) {
    res.send('express is working');
});

myapp.get('/admin/login', function (req, res) {
    res.render('backend/upload-image', { message: '' });
});

var storeapp = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'resources/uploads')
    },
    filename: function (req, file, cb) {
        var profile_name = file.originalname;
        cb(null, profile_name);
    }
});
var upload = multer({ storage: storeapp });


myapp.get('/admin/PostLoginSubmit', function (req, res) {
    res.render('backend/upload-image', { message: '' });
});

myapp.post('/admin/postSubmit', upload.single('profile-photo'), function (req, res) {
    console.log(req.file);
    console.log(req.body);
    console.log(req.body.fullname);
    console.log(req.body.address);
    console.log(req.body.collegeid);
    console.log(req.body.batch);
    console.log(req.file.originalname);
    console.log("Uploaded successfully.")

});

// PORT
myapp.listen(3000);
