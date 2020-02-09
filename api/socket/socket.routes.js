
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('post newComment', msg => {
            console.log(msg)
            console.log(io)
            io.emit('post addComment', msg)
            // emits only to sockets in the same room
            // io.to(socket.myTopic).emit('post addComment', msg)
        })

        // socket.on('chat topic', topic => {
        //     if (socket.myTopic) {
        //         socket.leave(socket.myTopic)
        //     }
        //     socket.join(topic)
        //     socket.myTopic = topic;
        // })

    })
}