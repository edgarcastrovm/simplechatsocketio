
const SocketIO = require('socket.io')

const socket = function(server){

    const io = SocketIO(server)
    //websockets
    io.on('connection',(socket)=>{
        const list_users = {
            "001":{"name":"Rash"    ,"avatar":"/component/images/avatar/","state":false},
            "002":{"name":"Dragon"  ,"avatar":"/component/images/avatar/","state":false},
            "003":{"name":"Crista"  ,"avatar":"/component/images/avatar/","state":false},
            "004":{"name":"Robin"   ,"avatar":"/component/images/avatar/","state":false},
            "005":{"name":"Simbad"  ,"avatar":"/component/images/avatar/","state":false}
        }
        console.log('New conection'+ socket.id)
        socket.on('disconnect', function (data) {
            console.log('user disconnected',data);
          })
          socket.on('chat:setuserid',(data)=>{
              list_users[data.user_id].state = true
              io.sockets.emit('server:users',list_users)
          })
          socket.on('chat:message',(data,from)=>{
              data.username= list_users[data.username].name
              console.log(from,data)
              io.sockets.emit('server:message',data)
          })
        socket.on('chat:typing',( data,from)=>{
            console.log(from,data)
            socket.broadcast.emit('server:typing',data)
            console.log(socket.rawListeners())
        })
    
        // setInterval(() =>{ 
        //     console.log("cargando usuarios")
           
        // }, 5000); 
    })
    
}

module.exports = socket