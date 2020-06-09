//const util = require('util')
const path = require('path')
const express = require('express')
const app = express()
const router = require('./router/chatRouter')
const Twig = require( 'twig' )
const socket = require('./socket')
//setttings
app.set('port',process.env.PORT || 3000)
app.set('view engine', 'twig');
app.set("views", path.join(__dirname, "public"));
//statics files
app.use(express.static(path.join(__dirname,'public')))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));

//router

app.use(router)

const server = app.listen(app.get('port'),()=>{
    console.log('server run on port ' + app.get('port'))
});

socket(server)