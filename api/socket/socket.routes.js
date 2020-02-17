

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('post newComment', newComment => {
            io.emit('post addComment', newComment)
        })
    })
}
module.exports = connectSockets
