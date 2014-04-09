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
    var controller = require('../app/controllers/images.js');

    // CREATE
    app.post('/images', controller.create);
    app.post('/upload', controller.upload);

    // RETRIEVE
    app.get('/images', controller.list);
    app.get('/images/:_id', controller.detail);

    // UPDATE
    app.put('/images/:_id', controller.update);

    // DELETE
    app.delete('/images/:_id', controller.delete);

}
