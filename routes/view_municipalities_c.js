var express = require('express');
var router = express.Router();
 
 router.get('/', function (req, res, next) {
    res.render('view_municipalities_c', {});
});

module.exports = router;
