var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

    res.render('view_municipaliti_profile_c', { address: req.query.address })
});

module.exports = router;
