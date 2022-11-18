var crypto = require('crypto');
var express = require('express');
var secret = 'MIIDDTCCAfWgAwIBAgIJJACYXtGC0O6GMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV';
// Using Express
var app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("well")
})
app.post("/event/webhook", async (req, res) => {
    //validate event
    console.log(req.headers);
    console.log("from webhook", req.body);
    // console.log(req.body)
    // try {
    const hash =  crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex');
    // console.log(hash);
//https://chapa-webhook.vercel.app
    if (
        // hash == req.headers['Chapa-signature'] 
        // && 
    hash == req.headers['x-chapa-signature']
    ) {
        // Retrieve the request's body
        // const event = req.body;
        // Do something with event  
        return res.status(200).send('OK');
    }
    else {
        return res.status(400).send('Invalid signature');
    }
    // res.send(200);
});
app.listen(4000, () => console.log('Listening on port 3000!'))
// x-chapa-signature":"c6e20538cd830d2c1deef379c8d220c2ec5e52aa35ea7d064307e8eb90970806"
