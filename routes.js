const routes = require('next-routes')

module.exports = routes()
.add('home', '/:topic?', "home")
.add('profile', '/profile/:id', "profile")