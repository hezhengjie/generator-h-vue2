/**
 * Created by hugh on 17/3/1.
 */
'use strict'

const jsonServer = require('json-server')
const db = require('./src/mock/data')
const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, function () {
    console.log('JSON Server is running:http://localhost:3000')
})