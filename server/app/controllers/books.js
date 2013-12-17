/**
 * Created by theotheu on 27-10-13.
 */

var mongoose = require('mongoose')
    , fs = require('fs')
    , Book = mongoose.model('Book')
    ;


// CREATE
exports.upload = function (req, res) {

    var oldPath = req.files.myFile.path;
    var filename = oldPath.split("/")[2];
    var newPath = __dirname + "/../../../client/images/uploads/" + filename;

    fs.rename(oldPath, newPath, function (err) {
        if (err === null) {
            var book = {
                title: req.body.title || "???",
                author: req.body.author || "???",
                description: req.body.description || "???",
                image: {
                    modificationDate: req.files.myFile.modifiedDate || new Date(),
                    name: req.files.myFile.name || "???",
                    size: req.files.myFile.size || 0,
                    type: req.files.myFile.type || "???",
                    filename: filename
                }
            };
            doc = new Book(book);

            doc.save(function (err) {

                var retObj = {
                    meta: {"action": "upload", 'timestamp': new Date(), filename: __filename},
                    doc: doc,
                    err: err
                };
                return res.send(retObj);
            });
        }
    });
}

exports.create = function (req, res) {

    console.log('CREATE book.');

    var doc = new Book(req.body);

    doc.save(function (err) {

        var retObj = {
            meta: {"action": "create", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);

    });

}

// RETRIEVE
// Get all books
exports.list = function (req, res) {
    var conditions, fields, options;

    console.log('GET books.');

    conditions = {};
    fields = {};
    sort = {'modificationDate': -1};

    Book
        .find(conditions, fields, options)
        .sort(sort)
        .exec(function (err, doc) {

            var retObj = {
                meta: {"action": "list", 'timestamp': new Date(), filename: __filename},
                doc: doc, // array
                err: err
            };

            return res.send(retObj);

        })
}

// Get 1 book
exports.detail = function (req, res) {
    var conditions, fields, options;

    console.log('GET book. ' + req.params._id);

    conditions = {_id: req.params._id}
        , fields = {}
        , options = {'createdAt': -1};

    Book
        .find(conditions, fields, options)
        .exec(function (err, doc) {
            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
                doc: doc[0], // only the first document, not an array when using "find"
                err: err
            };
            return res.send(retObj);
        })
}

// UPDATE
exports.update = function (req, res) {

    console.log('Updating book...\n', req.params_id, req.body);

    var conditions =
        {_id: req.params._id}
        , update = {
            title: req.body.title || '',
            author: req.body.author || '',
            description: req.body.description || ''
        }
        , options = { multi: false }
        , callback = function (err, doc) {
            var retObj = {
                meta: {"action": "update", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        };

    Book
        .findOneAndUpdate(conditions, update, options, callback);
}


// DELETE
exports.delete = function (req, res) {
    var conditions, callback, retObj;

    console.log('Deleting book. ', req.params._id);

    conditions = {_id: req.params._id}
        , callback = function (err, doc) {
        retObj = {
            meta: {"action": "delete", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    }

    Book
        .remove(conditions, callback);
}
