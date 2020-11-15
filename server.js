/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Dependencies */
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));


// TODO-Spin up the server

const port = 5000;

const server = app.listen(port, listening);

function listening() {
	console.log(`running on localhost: ${port}`);
};

// get route
app.get('/all', sendData);

function sendData(req, res) {
	console.log('GET');
	res.send(projectData);
};

// post route
app.post('/addWeather', addWeather)

function addWeather(req, res) {
	let data = req.body;
	console.log('Data from server side', data);
	projectData.date = data.date;
	projectData.name = data.name;
	projectData.temp = data.main.temp;
	projectData.content = data.content;
	projectData.pressure = data.main.pressure;
	projectData.humidity = data.main.humidity;
	res.send(projectData);
}