var express = require('express');
var router = express.Router();

var fs = require('fs');
//File Path
var pixelFile = './public/json/pixel.json';//data for exercise

/* API main page */
router.get('/', function(req, res, next) {
    //count certain string 
    fs.readFile('./public/json/test.js', 'utf-8', function (err, data) {
        if (err) throw err;
        var splitByWords = function(text) {
            // split string by spaces (including spaces, tabs, and newlines)
            var wordsArray = text.split(/\s+/);
            return wordsArray;
          }
          
          
          var createWordMap = function(wordsArray) {
          
            // create map for word counts
            var wordsMap = {};
            /*
              wordsMap = {
                'Oh': 2,
                'Feelin': 1,
                ...
              }
            */
            wordsArray.forEach(function (key) {
              if (wordsMap.hasOwnProperty(key)) {
                wordsMap[key]++;
              } else {
                wordsMap[key] = 1;
              }
            });
          
            return wordsMap;
          
          }
          
          
          var sortByCount = function(wordsMap) {
          
            // sort by count in descending order
            var finalWordsArray = [];
            finalWordsArray = Object.keys(wordsMap).map(function(key) {
              return {
                name: key,
                total: wordsMap[key]
              };
            });
          
            finalWordsArray.sort(function(a, b) {
              return b.total - a.total;
            });
          
            return finalWordsArray;
          
          }
          console.log(data)
        var wordsArray = splitByWords(data);
        var wordsMap = createWordMap(wordsArray);
        var finalWordsArray = sortByCount(wordsMap);

        console.log(finalWordsArray);
        console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
            finalWordsArray[0].total + ' times');
    });
    //end TODO
    res.render('api', { title: 'All API is here' });
});




/* Submit */
router.get('/submit/', function(req, res, next) {
    //res.json({ message: 'got!' });
    fs.readFile(pixelFile, 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        console.log(arrayOfObjects)
        res.json(arrayOfObjects);
    })
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
