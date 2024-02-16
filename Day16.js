
const express = require('express');
const mongoose = require('mongoose');
const app = express();

function connectToMongoDB() {
    mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Successfully connected to MongoDB using Mongoose!');
    });
}

app.listen(3000, function () {
    console.log('Express server listening on port 3000');
});
