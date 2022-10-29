require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const routes = require('./routes');

const PORT = process.env.PORT | 8000;
const mongo_uri = process.env.MONGODB_URI;
const BASE_API = "/api";

mongoose.connect(mongo_uri);

const db = mongoose.connection;
const app = express();
app.use(cors());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));


db.on('error', (error) => console.log(error))
db.once('connected', () => console.log("DB Connected"));


app.use(express.json());
app.use(BASE_API, routes);
app.use(`${BASE_API}/membership`, require('./routes/membership'));
app.use(`${BASE_API}/health`, require('./routes/health'));
app.use(`${BASE_API}/finance`, require('./routes/financials'));


app.options("*", cors());


app.listen(PORT, () => {
  console.log(`Port: ${PORT}`)
});

