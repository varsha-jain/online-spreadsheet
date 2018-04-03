var connect = require('connect'),
    serveStatic = require('serve-static'),
    PORT = 4000;
connect().use(serveStatic(__dirname)).listen(PORT, function () {
    console.log('Server running on ' + PORT + '...');
});