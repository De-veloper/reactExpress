var express = require('express');
var router = express.Router();

var fs = require('fs');
//File Path
var pixelFile = './public/json/pixel.json';//data for exercise

/* API main page */
router.get('/', function(req, res, next) {
    res.render('api', { title: 'All API is here' });
});


/* Submit */
router.get('/submit/', function(req, res, next) {
    res.json({ message: 'got!' });
}).post('/submit/', function(req, res, next) {
    var getName = req.body.name;
    res.json({ message: 'Created!' });
}).delete('/submit/', function(req, res, next) {
    res.json({ message: 'deleted!' });
}).put('/submit/', function(req, res, next) {
    res.json({ message: 'Edited!' });
}).get('/submit/:case', function(req, res, next) {
    fs.readFile(pixelFile, 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        var getMatch = arrayOfObjects['GA'].find(function(e,i,a){
            if(e.case == req.params.case ){
                console.log(e)
                return e;//a.splice(i,1)
            }
        })
        res.json(getMatch);
    })
})

module.exports = router;
