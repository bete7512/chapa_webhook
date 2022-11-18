var crypto = require('crypto');
var express = require('express');
var secret = process.env.SECRET_KEY;
// Using Express
var app = express();
app.get('/', (req,res)=>{
res.send("well")
})
app.post("/event/webhook", function(req, res) {
    //validate event
    const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['Chapa-Signature']) {
    // Retrieve the request's body
    const event = req.body;
    // Do something with event  
    }
    res.send(200);
});
