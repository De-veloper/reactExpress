var express = require('express');
var router = express.Router();

/* GET additem page. */
router.get('/', function(req, res, next) {
    res.render('api', { title: 'All API is here' });
});


router.get('/getid/', function(req, res, next) {
    res.send('Enter id in url');
});
router.get('/getid/:id', function(req, res, next) {
    var id = req.params.id
    res.send(id);
});

module.exports = router;
