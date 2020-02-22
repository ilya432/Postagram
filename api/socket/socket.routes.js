

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('post newComment', newComment => {
            io.to(socket.myPost).emit('post addComment', newComment)
        })

        socket.on('post', post => {
            if (socket.myPost) {
                socket.leave(socket.myPost)
            }
            socket.join(post)
            socket.myPost = post;
        })
    })
}
module.exports = connectSockets
