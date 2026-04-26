const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://phuke02kanhaiya_db_user:Kanha12345@kpsworkspace.ykeuwnz.mongodb.net/mydb?retryWrites=true&w=majority&appName=kpsWorkspace';

mongoose.connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB Server');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    });

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;