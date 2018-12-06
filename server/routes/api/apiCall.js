var express = require('express');
var router = express.Router();

/* GET additem page. */
router.get('/', function(req, res, next) {
    res.render('api', { title: 'All API is here' });
});


router.get('/get/', function(req, res, next) {
    res.send('Enter id in url');
});
router.get('/get/:id', function(req, res, next) {
    var id = req.params.id
    res.send(id);
});


router.post('/post/', function(req, res, next) {
    var getName = req.body.name;
    //res.send('en');
    res.json({ message: 'Bear created!' });
});
module.exports = router;
