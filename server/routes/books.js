/**
 * Created by theotheu on 02-11-13.
 */

module.exports = function (app) {
    /*  book routes
     ---------------
     We create a variable "user" that holds the controller object.
     We map the URL to a method in the created variable "user".
     In this example is a mapping for every CRUD action.
     */
    var controller = require('../app/controllers/books.js');

    // CREATE
    app.post('/books', controller.create);
    app.post('/upload', controller.upload);

    // RETRIEVE
    app.get('/books', controller.list);
    app.get('/books/:_id', controller.detail);

    // UPDATE
    app.put('/books/:_id', controller.update);

    // DELETE
    app.delete('/books/:_id', controller.delete);

}
