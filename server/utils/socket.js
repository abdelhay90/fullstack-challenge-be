const io = require('socket.io');
let socket = null;
module.exports = function(httpServer) {
    if (httpServer) socket = io(httpServer);
    return socket;
};
