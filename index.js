let express = require("express");
let axios = require('axios');
let app = express();

app.use(express.static('JS'));

// Route browser to index.html
app.get('/',function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

// Send the Spotify access token in response to client ajax request
app.get('/token', function(req,res) {
    var auth = 'Basic ' + Buffer.from('9e5a220335ce4a0f84976771850e0c55:61254f20eea94b1ba1b79234ce60b83f').toString('base64');

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': auth
        },
        params: {
            grant_type: 'client_credentials'
        }
    })
        .then(function(response) {
            console.log("Token Received.");
            res.status(200).send(response.data.access_token);
        })
        .catch(function(error) {
            console.log("Token Not Received.");
            console.log(error);
        });
});

app.listen(8080);

console.log("Sidechannel listening on 8080");