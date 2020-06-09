const socket = io("http://localhost:3000")

let message = document.getElementById('message')
let username = document.getElementById('username')
let send = document.getElementById('send')
let chat_output = document.getElementById('chat-output')
let chat_actions = document.getElementById('chat-actions')
let chat_users = document.getElementById('chat-users')

$( document ).ready(function() {
    socket.emit('chat:setuserid',{
        user_id : username.value
    })
});
socket.on('server:users',function (data){
    loadUsers(data)
})

send.addEventListener('click',function(){
    socket.emit('chat:message',{
        username:username.value,
        message:message.value
    })
    message.value=""
})
message.addEventListener('keypress',function(){
    socket.emit('chat:typing',{
        username:username.value
    })
})
socket.on('server:message',function (data){
    chat_actions.innerHTML =''
    chat_output.innerHTML += `<p>
        <span>${data.username}  :</span>
        <span>${data.message} </span>
    </p>`

    $("#chat-output").animate({ scrollTop: $('#chat-output')[0].scrollHeight}, 100);
})

socket.on('server:typing',function (data){
    chat_actions.innerHTML= `<p>
        <span>${data.username} :</span>
        <span> Esta escribiendo </span>
    </p>`
})

/**
 * Declaracion de Funciones
 */

 function loadUsers(data){
    
    chat_users.innerHTML=""
    for (const key in data) {
        //&& key != username.value
        if (data.hasOwnProperty(key) && key != username.value) {
            const element = data[key]
            chat_users.innerHTML +='<div class="card" style="width: 100%;">'+
                                '<div class="row no-gutters">'+
                                '  <div class="col">'+
                                '    <img src="/components/images/user_none.png" class="card-img img-thumbnail" alt="Imagen participante" style="height: 64px;width: 64px;">'+
                                '  </div>'+
                                '  <div class="col-8">'+
                                '    <div class="card-body">'+
                                '      <span>'+element.name+'</span> <span></span>'+
                                '    </div>'+
                                '  </div>'+
                                '</div>'+
                                '</div>'
            console.log(element)
            //'+(element.state?"ACTIVO":"INACTIVO")+'
            // username.innerHTML += '<option value="'+key+'" >'+element.name+' </option>'
        }
    }

 }