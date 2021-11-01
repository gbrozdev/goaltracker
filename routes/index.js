var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId
const Quote = require('inspirational-quotes');
const Generator = require('quotes-photos-generator');
const generator = new Generator();


/* GET home page. */
router.get('/', async function (req, res) {
    let Q = Quote.getQuote()
    let noAQ = Quote.getQuote({ author: false })
    let RQ = Quote.getRandomQuote({ author: true })

    res.render('index', { Q, noAQ, RQ });
});

router.get('/notes', async function (req, res) {
    let notes = await db.get().collection('notes').find().toArray()
    res.render('notes/notes', { notes });
});


router.get('/links', function (req, res) {
    res.render('links/links');
});

//products






//new note
router.get('/newnote', function (req, res) {
    res.render('notes/newnote');
});
router.post('/newnote', function (req, res) {
    console.log(req.body);
    let note = req.body
    db.get().collection('notes').insertOne(note).then(async (response) => {
        let id = response.insertedId
        let note = await db.get().collection('notes').findOne({ _id: ObjectId(id) })
        res.render('notes/note', { note });
    })
});


router.get('/note/:id', async function (req, res) {
    let id = req.params.id
    let note = await db.get().collection('notes').findOne({ _id: ObjectId(id) })
    res.render('notes/note', { note });
});


// all search bars functional part
router.post('/search/:page', async function (req, res) {
    let page = req.params.page
    var content = req.body.search
    if (page === 'notes') {

        let notes = await db.get().collection('notes').findOne({ title: content })
        if (notes) {
            res.render('notes/notes', { notes, search: true })
        } else {
            let notes = await db.get().collection('notes').find().toArray()
            res.render('notes/notes', { notes, err: true });
        }
    }

});


module.exports = router;
