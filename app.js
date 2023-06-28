require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const routesAuth = require('./routes/auth');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/auth', routesAuth);


mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conection Successfully')
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
})
.catch((error) => {
    console.error('Error al conectar a MongoDB', error);
})






