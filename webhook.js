var crypto = require('crypto');
var secret = process.env.SECRET_KEY;
// Using Express

const handler = async (req, res) => {

    //validate event
    const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['Chapa-Signature']) {
        // Retrieve the request's body
        console.log(req.body);
        const event = req.body;
        console.log(event.body);
        // Do something with event  
    }
    res.send(200);

}
