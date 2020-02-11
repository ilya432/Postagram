
// import commentService from '../comment/comment.service'

module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('post addComment', (comment, postId) => {

            io.emit('post newComment', (comment, postId) => {
                // commentService.add(comment, postId)
            })
        })
    })
}
