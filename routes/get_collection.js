const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser =  bodyParser.urlencoded({ extended: false });
const db = require('../db/data_base');
const collection = "Students";

function create_JSON_from_JSON(keys, json){
    var newJson = {};
    for (let i = 0; i<keys.length; i++){
        newJson[keys[i]] = json[keys[i]];
    };
    return newJson;
}
router.get('/get_collection', (req, res) => {
    res.render('get_collection', { title: 'Collection' });
});

router.post('/collection', urlencodedParser, async (req, res) => {
    const query = req.body;
    const queryKeys = Object.keys(query).filter((key) => query[key] != '');
    const finalQuery = create_JSON_from_JSON(queryKeys, query);
    if (Object.keys(finalQuery).length === 0){
        res.render('get_collection', { title: 'Search', nothingFilled: true});
    }else{
        await db.getDB().collection(collection).find(finalQuery , (err, result) => {
            if (err) console.log(err);
            else result.toArray(function(err, result) {
                if (err) console.log(err);
                else res.render('see_collection', { title: 'Collection', student: result});
              });
        });
    }
});

module.exports = router;