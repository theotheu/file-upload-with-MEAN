/**
 * Created by theotheu on 02-11-13.
 */

/**
 * Module dependencies.
 */
var mongoose;
mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Schema definitions */
var schemaName = Schema({
    title: {type: String, required: true, unique: true},
    author: {type: String, required: true},
    description: {type: String},
    image: {                                // <--- nested document (not sub document)
        modificationDate: {type: Date},
        name: {type: String},
        size: {type: Number},
        type: {type: String},
        filename: {type: String}
    },
    modificationDate: {type: Date, "default": Date.now}
});

// Custom validator
schemaName.path('title').validate(function (val) {
    return (val !== undefined && val !== null && val.length >= 8);
}, 'Invalid title');

/*
 If collectionName is absent as third argument, than the modelName should always end with an -s.
 Mongoose pluralizes the model name. (This is not documented)
 */
var modelName = "Book";
var collectionName = "books"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);

