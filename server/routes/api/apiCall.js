var express = require('express');
var router = express.Router();

var fs = require('fs');

//Connect to server
var connectionInfo = require('./../connect.js');

//File Path
var pixelFile = './public/json/pixel.json';//data for exercise

const http = require('http');

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


//get a external url page source
router.get('/get_active_clients', function(req, res, next) {
    //Using In_Play_Status_Page to obtain the active clients
    http.get('http://172.16.100.189/bigip/In_Play_Status_Page/index.html', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            var splitByWords = function(text) {
                // split string by spaces (including spaces, tabs, and newlines)
                var wordsArray = text.split(/\s+/);
                return wordsArray;
              }
              
              var createWordMap = function(wordsArray) {
                // create map for word counts
                var wordsMap = {};
                wordsArray.forEach(function (key) {
                  if (wordsMap.hasOwnProperty(key)) {
                    wordsMap[key]++;
                  } else {
                    wordsMap[key] = 1;
                  }
                });
              
                return wordsMap;
              
              }
              
            var wordsArray = splitByWords(data);
            var wordsMap = createWordMap(wordsArray);

            var keys = [];
            for(var k in wordsMap) keys.push(k);
            var activeClient = keys.filter(function(e){
                if(/color=darkblue>/i.test(e)) {
                    return e
                }
            }).map(function(e){
                e = e.replace(/color=darkblue>|<\/a><\/td><td/g,'')
                return e
            })
            res.json(activeClient);
            //res.render('api', { title: 'Play Status Page Source', message:activeClient });
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

})
/*
* Connect to server
*/
var Client = require('ssh2').Client;

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



//Count Pixel by Client - TODO WIP
//http://localhost:3001/api/searchpixel/pixel_lib.DoubleClickPixel
router.get('/searchpixel/:pixel/:clientID', function(req, res, next) {
    let conn = new Client();
    let pixelString = req.params.pixel;//pixel_lib.DoubleClickPixel
    let clientID = req.params.clientID;
    //slet final = []
    ///-------------------
    //console.log(pixelString)
    if(typeof req.params.clientID==='string' && !/devsrc72|awstest|cicd72-amtx|cicd80-amtx|baylortest/i.test(req.params.clientID) ){
        conn.on('ready', function() {
            //console.log('Client :: ready1');
            conn.sftp(function(err, sftp) {
                if (err) throw err;
                console.log('----------------Start:'+clientID+'-------------------------')
                // console.log(clientID)
                try {
                    sftp.readFile('/home/webdev/evenue/customize/ev_'+clientID+'/script/pixels.js', 'utf-8', function (err, data) {
                        
                        //console.log(data)
                        if(typeof data!='undefined'){
                            var replace = pixelString;
                            var re = new RegExp(replace,"g");
                            var count = (data.match(re) || []).length;
                            
                            
                            let finalData = {
                                folderData:{
                                    client:clientID,
                                    pixel:pixelString,
                                    pcount:count,
                                    folder:'script'
                                }
                            }
                            //console.log(finalData)
                            console.log('----------------End:'+clientID+'-------------------------')
                            res.json(finalData);
                        } else {
                            sftp.readFile('/home/webdev/evenue/customize/ev_'+clientID+'/pixel/js/pixels.js', 'utf-8', function (err, data) {
                        
                                //console.log(data)
                                if(typeof data!='undefined'){
                                    var replace = pixelString;
                                    var re = new RegExp(replace,"g");
                                    var count = (data.match(re) || []).length;
                                    
                                    
                                    let finalData = {
                                        folderData:{
                                            client:clientID,
                                            pixel:pixelString,
                                            pcount:count,
                                            folder:'pixel'
                                        }
                                    }
                                    console.log('----------------End:'+clientID+'-------------------------')
                                    res.json(finalData);
                                } else {
                                    /*let finalData = {
                                        folderData:{
                                            code:2
                                        }
                                    }
                                    res.json(finalData);*/
                                    console.log('//----'+clientID+'-----//')
                                    let finalData = {
                                        folderData:{
                                            client:clientID,
                                            pixel:pixelString,
                                            pcount:0,
                                            folder:''
                                        }
                                    }
                                    res.json(finalData);
                                }
                                
                            });
                            
                        }

                    });
                } catch(e) {
                    console.log('//----NO NO NO-----//')
                    console.log(e)
                    
                }
            });
        }).connect(connectionInfo);
    } else {

        res.json({
            folderData:{
                code:2
            }
        });
        console.log(e)
        
    }


});

//TODO Get active accounts
//http://172.16.100.189/bigip/In_Play_Status_Page/index.html
//Search all clients by certain pixel WIP
/*
router.get('/searchpixel/:pixel', function(req, res, next) {
    let conn = new Client();
    let pixelString = req.params.pixel;
    let count = 0;

    http.get('http://172.16.100.189/bigip/In_Play_Status_Page/index.html', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            var splitByWords = function(text) {
                // split string by spaces (including spaces, tabs, and newlines)
                var wordsArray = text.split(/\s+/);
                return wordsArray;
              }
              
              var createWordMap = function(wordsArray) {
                // create map for word counts
                var wordsMap = {};
                wordsArray.forEach(function (key) {
                  if (wordsMap.hasOwnProperty(key)) {
                    wordsMap[key]++;
                  } else {
                    wordsMap[key] = 1;
                  }
                });
              
                return wordsMap;
              
              }
              
            var wordsArray = splitByWords(data);
            var wordsMap = createWordMap(wordsArray);

            var keys = [];
            for(var k in wordsMap) keys.push(k);
            var activeClient = keys.filter(function(e){
                if(/color=darkblue>/i.test(e)) {
                    return e
                }
            }).map(function(e){
                e = e.replace(/color=darkblue>|<\/a><\/td><td/g,'')
                return e
            })
            //console.log(activeClient)
            //res.json(activeClient);
            //Start to search

            function processFile(sftp,clientID,pixelString) {
                return new Promise(function(resolve, reject) {
                    var count = 0;
                    sftp.readFile('/home/webdev/evenue/customize/ev_'+clientID+'/script/pixels.js', 'utf-8', function (err, data) {
                        if(typeof data!='undefined'){
                            var replace = pixelString;
                            var re = new RegExp(replace,"g");
                            count = (data.match(re) || []).length;
                            resolve(count);
                        } 
                    })
                })
            }
            
            let final = [];
            conn.on('ready', function() {
                console.log('Client :: ready');
                conn.sftp(function(err, sftp) {
                    if (err) throw err;
                    console.log('------------------------------------------')
                    var t = 0;
                    var myVar = setInterval(myTimer, 500);
                    function myTimer() {
                        try {
                            sftp.readFile('/home/webdev/evenue/customize/ev_'+activeClient[t]+'/script/pixels.js', 'utf-8', function (err, data) {
                                if(typeof data!='undefined'){
                                    var replace = pixelString;
                                    var re = new RegExp(replace,"g");
                                    count = (data.match(re) || []).length;
                                    final.push({ client:activeClient[t],pcount:count})
                                } 
                            })
                        } catch(e) {
                            console.log(e)
                            
                        }
                        t++
                        if(t == activeClient.length ){
                            clearInterval(myVar)
                            res.json(final);
                        }
                        console.log(final)
                    }
                    

                });
            }).connect(connectionInfo);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});
*/

//View each client's pixels.js - Done
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
                      var folder = 'script'
                      var isPixelFolderExist = folderList.indexOf('pixel')>-1
                      if(isPixelFolderExist){
                          filePath ='/home/webdev/evenue/customize/ev_'+clientID+'/pixel/js/pixels.js'
                          folder = 'pixel';
                      }

                      sftp.readFile(filePath, 'utf-8', function (err, data) {
                          let finalData = {
                              data:data,
                              folder:folder
                          }
                          res.json(finalData);
                      });
                  });
              } else {
                  res.render('api', { title: 'Review Live pixels.js file', message:'No such this client' });
              }

          });
      });
  }).connect(connectionInfo);
});
//View each client's json - Done
//http://localhost:3001/api/viewpixeljson
//http://localhost:3001/api/viewpixeljson/pitt
router.get('/viewpixeljson/:clientid', function(req, res, next) {
  var conn = new Client();
  var clientID = req.params.clientid;
  var filePath = '/home/webdev/evenue/customize/ev_'+clientID+'/pixel/json/client-pixel.json'
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

                      sftp.readFile(filePath, 'utf-8', function (err, data) {
                          if(!isPixelFolderExist){
                              res.json(err);
                          } else {
                              res.json(JSON.parse(data));
                          }
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
