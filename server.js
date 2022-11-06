const express = require('express');
const app = express();

//run the app by servic static fileds in the dist dir
app.use(express.static(__dirname + '/dist/recalldevbookui'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: '/dist/recalldevbookui' })
);

//start the app by listening on default heroku port
app.listen(process.env.PORT || 8080);