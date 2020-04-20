const express = require('express');
const router = express.Router();
const db = require('../db/data_base');
const collection = "Students";

router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

router.post('/', async (req, res) => {
    var totalGrade = 0.0;
    var average = 0.0;
    await db.getDB().collection(collection).find({} , (err, result) => {
        if (err) console.log(err);
        else {
            let allStudents;
            result.toArray(function(err, result) {
            if (err) console.log(err);
            else {
                for (let index = 0; index<result.length; index ++) {
                    totalGrade += parseFloat(result[index]['cgrade']);
                }
                average = totalGrade / result.length;
                
                res.render('index', { title: 'Home Page', showAverage: true, gradeAverage: average});
            }
          });

        }
    });
    
    //
});
module.exports = router;