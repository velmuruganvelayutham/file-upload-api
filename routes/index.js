var express = require('express');
var router = express.Router();
var Busboy = require('busboy');
var fs = require('fs');
var inspect = require('util').inspect;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.use('/upload', function(req, res, next) {

    var busboy = new Busboy({
        headers: req.headers
    });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename);
        file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });
        console.log('we can stream it to diffent project! ' + typeof file);
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.json('upload successful! ');
    });
    req.pipe(busboy);

})

module.exports = router;
