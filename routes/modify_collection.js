const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser =  bodyParser.urlencoded({ extended: false });
const db = require('../db/data_base');
const collection = "Students";
var query;
function create_JSON_from_JSON(keys, json){
    var newJson = {};
    for (let i = 0; i<keys.length; i++){
        newJson[keys[i]] = json[keys[i]];
    };
    return newJson;
}
router.get('/modify_criterium', (req, res) => {
    res.render('modify_criterium', { title: 'Criterium' });
});

router.post('/modify_criterium', urlencodedParser, (req, res) => {
    query = req.body;
    const queryKeys = Object.keys(query).filter((key) => query[key] != '');
    query = create_JSON_from_JSON(queryKeys, query);
    if (Object.keys(query).length === 0){
        res.render('modify_criterium', { title: 'Criterium', nothingFilled: true});
    }else res.render('modify_collection', { title: 'Criterium' });
});

router.post('/modify', urlencodedParser, async (req, res) => {
    if(Object.keys(query).length === 0) res.render('modify_criterium', { title: 'Criterium', nothingFilled: true});
    else {
    var update = req.body;
    const updateKeys = Object.keys(update).filter((key) => update[key] != '');
    update = create_JSON_from_JSON(updateKeys, update);
    if (update === {}) alert('You need to fill some field');
    else{
        await db.getDB().collection(collection).updateMany(query, {$set: update}, (err, result) => {
            if (err) console.log(err);
        });
        query = {};
        res.render('index', { title: 'Home Page'});
    }
}
});


module.exports = router;