/**
 * Created by theotheu on 27-10-13.
 */
module.exports = {
    development: {
        debug: true,                        // set debugging on/off
        db: 'mongodb://localhost/theotheu', // change theotheu with your database
        port: 3000,                         // change 3000 with your port number
        separator: '/',                     // file separator. You have to change this according to your OS
                                            // windows: \
                                            // linux: /
                                            // OS X: /
        base: '/Users/theotheu/workspaces/file-upload-with-MEAN/'
                                            // The base of your application, eg. /Users/theotheu/workspaces/file-upload-with-MEAN/
    }, test: {
        debug: true,                        // set debugging on/off
        db: 'mongodb://localhost/theotheu', // change theotheu with your database
        port: 1300,                         // change 1300 with your port number
        separator: '/',                     // file separator. You have to change this according to your OS
                                            // windows: \
                                            // linux: /
                                            // OS X: /
        base: '/Users/theotheu/workspaces/file-upload-with-MEAN/'
        // The base of your application, eg. /Users/theotheu/workspaces/file-upload-with-MEAN/

    }, production: {

    }
};