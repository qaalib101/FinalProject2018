
connections = []
function init(io) {

    io.on('connect', function(socket){

        console.log('someone connected ', socket.id);

          // send to everyone.


        socket.on('clientStart', function(player){
            // needed?
        });


        socket.on('clientPosition', function(player){
            // find player in players obj and update
            players[player.id] = player;
            io.sockets.emit('allPlayerLocations', players);

        })


        socket.on('send message', function(data){
            // remove player from players object
            console.log('player was eaten', player);
            delete players[player.id];
            io.sockets.emit('new message', {msg: data});

        })

        // Delete this player
        socket.on('disconnect', function() {
            connections.splice(connections.indexOf(socket), 1);
            console.log('Disconnected: %s sockets connected', connections.length)
        });

    })

}

module.exports = init;