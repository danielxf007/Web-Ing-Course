const mongoose = require('mongoose');
const mongoClient  = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectID;
const dbName = 'Course';
const url = 'mongodb+srv://danielxf0:alejo1996@cluster0-ytn6u.mongodb.net/test?retryWrites=true&w=majority';
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true};
const state ={
   db : null
};

const connectDB = (cb) => {
   if (state.cb) cb();
   else{
      mongoClient.connect(url, mongoOptions, (err, client) => {
         if(err) cb(err);
         else{
            state.db = client.db(dbName);
            cb();
            console.log('Connected to database');
         }
      });
   }
}

const getDB = () => {
   return state.db;
};
module.exports = {connectDB, getDB};