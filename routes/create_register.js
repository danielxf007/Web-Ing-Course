const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser =  bodyParser.urlencoded({ extended: false });
const db = require('../db/data_base');
const collection = "Students";


router.get('/create_register', (req, res) => {
    res.render('create_register', { title: 'Register' });
});

router.post('/create_register', urlencodedParser, async (req, res) => {
    const student = req.body;
    await db.getDB().collection(collection).insertOne(student, (err, result) => {
        if (err) console.log(err);
    });
    res.render('create_register', { title: 'Register' });
});

module.exports = router;