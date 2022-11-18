var crypto = require('crypto');
var express = require('express');
// var secret = process.env.SECRET_KEY;
// Using Express
var app = express();
app.get('/', (req, res) => {
    res.send("well")
})
app.post("/event/webhook", function (req, res) {
    //validate event
    console.log(req.body)
    const hash = crypto.createHmac('sha256', 'MIIDDTCCAfWgAwIBAgIJJACYXtGC0O6GMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV').update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['Chapa-Signature']) {
        // Retrieve the request's body
        const event = req.body;
        // Do something with event  
    }
    res.send(200);
});
app.listen(4000, () => console.log('Listening on port 3000!'))
