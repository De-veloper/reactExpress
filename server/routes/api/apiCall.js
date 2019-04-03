var express = require('express');
var router = express.Router();

var fs = require('fs');

//Connect to server
var connectionInfo = require('./../connect.js');

//File Path
var pixelFile = './public/json/pixel.json';//data for exercise


/* API main page */
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
//TODO
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
          //console.log(data)
        var wordsArray = splitByWords(data);
        var wordsMap = createWordMap(wordsArray);
        var finalWordsArray = sortByCount(wordsMap);

        //console.log(finalWordsArray);
        //console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
        //    finalWordsArray[0].total + ' times');

        res.render('api', { title: 'All API is here', message:data.replace(/ /g,'&nbsp;').replace(/\n/g,'<br>') });
    });
    //end TODO
    //res.render('api', { title: 'All API is here' });
});



/*
* Connect to server
*/
var Client = require('ssh2').Client;

/*var connectionInfo = {
  host:'172.31.100.25',
  port: 22,
  username: 'webdev',
  password: 'r@1d3r'
}*/

//List (To get all the clients)
router.get('/list', function(req, res, next) {
    var conn = new Client();
    conn.on('ready', function() {
        console.log('Client :: ready');
        conn.sftp(function(err, sftp) {
            if (err) throw err;
            sftp.readdir('/home/webdev/evenue/customize/', function(err, list) {
                if (err) throw err;
            
                let finalData = {
                    folderData:list.map(function(e){
                        return e.filename.replace('ev_','')
                    }).sort()
                }
                res.json(finalData);
                //console.log(finalData.folderData)
                //res.render('api', { title: 'All client are here', message:finalData.folderData.join('<br/>') });
                //**** WARNING: If connection ends, it cant read the file  */
                //conn.end();
            });
        });
    }).connect(connectionInfo);
});
//Test for view each client's pixels.js
//http://localhost:3001/api/viewpixel
//http://localhost:3001/api/viewpixel/pitt
router.get('/viewpixel/:clientid', function(req, res, next) {
  var conn = new Client();
  var clientID = req.params.clientid;
  var filePath = '/home/webdev/evenue/customize/ev_'+clientID+'/script/pixels.js'
  conn.on('ready', function() {
      console.log('Client :: ready');
      conn.sftp(function(err, sftp) {
          //if (err) throw err;
          sftp.readdir('/home/webdev/evenue/customize/', function(err, list) {
              var folderList = list.map(function(e){ return e.filename.replace('ev_','')})
              var isClientExist = folderList.indexOf(clientID)>-1
              if(isClientExist){
                  sftp.readdir('/home/webdev/evenue/customize/ev_'+clientID, function(err, list) {
                      var folderList = list.map(function(e){ return e.filename})
                      var isPixelFolderExist = folderList.indexOf('pixel')>-1
                      if(isPixelFolderExist){
                          filePath ='/home/webdev/evenue/customize/ev_'+clientID+'/pixel/js/pixels.js'
                      }

                      sftp.readFile(filePath, 'utf-8', function (err, data) {
                          res.json(data);
                      });
                  });
              } else {
                  res.render('api', { title: 'Review Live pixels.js file', message:'No such this client' });
              }

          });
      });
  }).connect(connectionInfo);
});
/******************************************************* 
Test python
********************************************************/ 

router.get('/search', function(req, res, next) {

    var spawn = require("child_process").spawn;
    //http://localhost:3000/search?client=cits&pixel=pixel_lib.FB

    var process = spawn('python',['./python/test2.py',req.query.client,req.query.pixel] );
 
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        console.log(data)
        //console.log(data.toString().split('<br>')[0])
        res.send(data.toString());
    } )

});
/******************************************************* 
End Test python
********************************************************/ 

module.exports = router;
