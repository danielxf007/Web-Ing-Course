const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser =  bodyParser.urlencoded({ extended: false });
const db = require('../db/data_base');
const collection = "Students";

router.get('/delete_register', (req, res) => {
    res.render('delete_register', { title: 'Delete' });
});

router.post('/delete_register', urlencodedParser, async (req, res) => {
    const query = req.body;
    await db.getDB().collection(collection).deleteOne(query, (err, _) => {
        if (err) console.log(err);
    });
    res.render('delete_register', { title: 'Delete' });
});

module.exports = router;