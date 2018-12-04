var express = require('express');
var router = express.Router();

/* GET additem page. */
router.get('/', function(req, res, next) {
    res.send('Please enter id -> /id/:id');
});
router.get('/id/:id', function(req, res, next) {
    var id = req.params.id
    res.send(id);
});

module.exports = router;
