const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}
async function getUsers(req, res) {
    const users = await userService.query(req.query)
    // logger.debug('backend/user.controller/getUsers -> req.query: ' + users)
    res.send(users)
}
async function addUser(req, res) {
    // const user = req.body;
    await userService.add(req.params.id)
    // logger.debug('addUser -  ' + user.username + ' id: ' + req.params.id)
    res.send();
}
async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}
async function updateUser(req, res) {
    const user = req.body;
    await userService.update(user)
    // logger.debug('updateUser -  ' + user.username + ' id: ' + user._id + ' pass: ' + user.password)
    res.send(user)
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    addUser
}