const functions = require('firebase-functions');
const express = require("express");
const app = express();

app.get('/hello', (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.send("Hello world");
});


exports.app = functions.https.onRequest(app);


