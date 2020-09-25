const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


// Middleware
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')))


app.post('/subscribe', (req, res) => {
    const {
        email,
        js
    } = req.body;
    console.log(req.body);

    const mcData = {
        members: [{
            email_address: email,
            status: 'pending'
        }]
    }

    const mcDataPost = JSON.stringify(mcData)
    const options = {
        url: 'https://us2.api.mailchimp.com/3.0/lists/5358c58be2',
        method: 'POST',
        headers: {
            Authorization: `auth ${process.env.jam_n_jelly}`
        },
        body: mcDataPost
    }

    if (email) {
        request(options, (err, response, body) => {
            if (err) {
                res.json({
                    error: err
                })
            } else {
                if (js) {
                    res.sendStatus(200)
                } else {
                    console.log("JS Failed!");
                }
            }
        })
    } else {
        res.status(404).send({
            message: 'Failed'
        })
    }
})

const PORT = process.env.PORT || 6969;

app.listen(PORT, console.log('Server Started! @ http://127.0.0.1:6969/'))