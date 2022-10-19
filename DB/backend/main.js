require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const PORT = process.env.PORT | 8000;
const mongo_uri = process.env.MONGODB_URI;
const BASE_API = "/api";

mongoose.connect(mongo_uri);

const db = mongoose.connection;
const app = express();


db.on('error', (error) => console.log(error))
db.once('connected', () => console.log("DB Connected"));


app.use(express.json());
app.use(BASE_API, routes);
app.use(`${BASE_API}/membership`, require('./routes/membership'));
app.use(`${BASE_API}/health`, require('./routes/health'));

app.use(cors());

app.options("*", cors());


app.listen(PORT, () => {
  console.log(`Port: ${PORT}`)
});

