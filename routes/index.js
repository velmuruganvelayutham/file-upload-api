var express = require('express');
var router = express.Router();
var Busboy = require('busboy');
var fs = require('fs');
var request = require('request');
var multiparty = require('multiparty');
var inspect = require('util').inspect;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.put('/upload', function(req, res, next) {

    var form = new multiparty.Form();
    var bucket;
    form.on('field', function(name, value) {
        console.log('field is retrieved from part!');
        if (name === 'bucket') {
            bucket = value;
        }
    });
    form.on('part', function(part) {
        console.log('Done parsing form!');
        var FormData = require("form-data");
        var form = new FormData();

        form.append("thumbnail", part, {
            filename: part.filename,
            contentType: part["content-type"]
        });

        var r = request.put("http://localhost:4000/upload", {
            "headers": {
                "transfer-encoding": "chunked"
            }
        }, function(err, httpResponse, body) {
            res.send(httpResponse);
        });

        r._form = form

    });
    form.parse(req);

})

module.exports = router;
