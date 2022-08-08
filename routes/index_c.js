var express = require('express');
var router = express.Router();
// Import the functions you need from the SDKs you need
const initializeApp = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyAnn4OuC-yf4cPTeVpmD4lI8KK220p6Ggg",
    authDomain: "getip-9f648.firebaseapp.com",
    databaseURL: "https://getip-9f648-default-rtdb.firebaseio.com",
    projectId: "getip-9f648",
    storageBucket: "getip-9f648.appspot.com",
    messagingSenderId: "478139365602",
    appId: "1:478139365602:web:881860e8f0f6c3724b46bb",
    measurementId: "G-R90KXNBRBL"
};

// Initialize Firebase
const app = initializeApp.initializeApp(firebaseConfig);
const firebase = require("firebase/database");
function writeUserData(data) {
    const db = firebase.getDatabase();
    let date = new Date().toLocaleDateString().replace('/', '-') + '-' + new Date().toLocaleTimeString().replace('/', '-');
    firebase.set(firebase.ref(db, 'users/' + date), {
        userData: data

    });
}
router.get('/', function (req, res, next) {

    res.render('index_c', {});
});
// const axios = require('axios');

router.post('/getIp', function (req, res) {
    writeUserData(JSON.parse(req.body.result));
})


module.exports = router;
