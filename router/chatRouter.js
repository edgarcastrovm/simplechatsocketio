const chatRouter = require('express').Router()
var path = require('path')

const list_users = {
    "001":{"name":"Rash"    ,"avatar":"/component/images/avatar/","state":false},
    "002":{"name":"Dragon"  ,"avatar":"/component/images/avatar/","state":false},
    "003":{"name":"Crista"  ,"avatar":"/component/images/avatar/","state":false},
    "004":{"name":"Robin"   ,"avatar":"/component/images/avatar/","state":false},
    "005":{"name":"Simbad"  ,"avatar":"/component/images/avatar/","state":false}
}


chatRouter.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/../public/login.html'))
})

chatRouter.get('/chat/:user_id',function(req,res){
    res.render('chat',{chat_user:list_users[req.params.user_id],chat_user_id: req.params.user_id})
})

module.exports = chatRouter