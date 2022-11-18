var crypto = require('crypto');
var express = require('express');
var secret = 'MIIDDTCCAfWgAwIBAgIJJACYXtGC0O6GMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV';
var app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("well")
})
app.post("/event/webhook", async (req, res) => {
    console.log(req.headers);
    console.log("from webhook", req.body);
    const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex');
    if (
        // hash == req.headers['Chapa-signature'] 
        // && 
        hash == req.headers['x-chapa-signature']
    ) { 
        return res.status(200).send('OK');
    }
    else {
        return res.status(400).send('Invalid signature');
    }
});
app.listen(4000, 
    () =>
     console.log('Listening on port 3000!')
     )
