const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://phuke02kanhaiya_db_user:v8SPc7nvq99gC7Zw@kpsworkspace.ykeuwnz.mongodb.net/'

mongoose.connect(mongoURL, {
})

const db = mongoose.connection;

db.on('connected', () => { console.log('Connected to MongoDB Server'); });
db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => { console.log('MongoDB diconnected'); });

module.exports = db;

