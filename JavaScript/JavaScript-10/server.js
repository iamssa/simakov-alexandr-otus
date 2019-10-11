var express = require('express')
var graphQL = require('express-graphql')
var schema = require('./data/schema')
var app = express()

app.use('/graphql', graphQL({schema: schema, pretty: true, graphiql: true}))

app.listen(8002, function(){
    console.log ('server start')
})