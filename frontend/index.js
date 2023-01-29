// const btn = document.getElementById("btn");
// const btnSocket = document.getElementById("btnSocket");
const ul = document.querySelector("ul");

const msgInput = document.getElementById("msgInput");

const btnNote = document.getElementById("btnNote");
const btnGlobal = document.getElementById("btnGlobal");
const btnSuperGlobal = document.getElementById("btnSuperGlobal");

// const msgs = document.getElementById("msgs");
// const connect = document.getElementById("connect");
// const email = document.getElementById("email").innerHTML;

// btn.addEventListener("click", () => {
//     fetch("http://localhost:3000/api/user", {
//         method: "GET",
//     }).then(d => {
//         return d.json()
//     }).then(dd => {
//         const firstName = document.querySelector("#firstName");
//         const lastName = document.querySelector("#lastName");
//         const email = document.querySelector("#email");
        
//         firstName.innerHTML = dd.firstName;
//         lastName.innerHTML = dd.lastName;
//         email.innerHTML = dd.email;
//     })
// });

// connect.addEventListener("click", () => {
//     fetch("http://localhost:3000/api/user/" + email, {
//         method: "GET",
//     }).then(d => {
//         return d.json()
//     }).then(dd => {
//         const firstName = document.querySelector("#firstName");
//         const lastName = document.querySelector("#lastName");
//         const email = document.querySelector("#email");
        
//         firstName.innerHTML = dd.firstName;
//         lastName.innerHTML = dd.lastName;
//         email.innerHTML = dd.email;
//     }).catch(e => {
//         console.log(e)
//     })
// });

const socket = io("http://localhost:3000");

btnNote.addEventListener("click", () => {
    socket.emit("msgNote", 
    {
        msg: msgInput.value,
        color: stringToColour(socket.id)
    })
    msgInput.value = ''
});

btnGlobal.addEventListener("click", () => {
    socket.emit("msgGlobal", 
    {
        msg: msgInput.value,
        color: stringToColour(socket.id)
    })
    msgInput.value = ''
});

btnSuperGlobal.addEventListener("click", () => {
    socket.emit("msgSuperGlobal", 
    {
        msg: msgInput.value,
        color: stringToColour(socket.id)
    })
    msgInput.value = ''
});

socket.on("data", (data) => {
    console.log(socket.id); 
    console.log(data)
    const li = document.createElement('li');
    li.innerText = data.msg.msg;
    li.id = data.msg.id
    li.style.color = data.msg.color
    li.addEventListener("click", function() {
        deleteMsg(data.msg.id)
    })
    ul.append(li);
})

socket.on("destroy", (data) => {
    console.log(data)
    msg = document.getElementById(data.id)
    if(msg !== null){
        msg.remove()
    }
})

var stringToColour = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

function deleteMsg(msgId){
    console.log(msgId)
    fetch("http://localhost:3000/api/msg", {
        headers: {'Content-Type':"application/json; charset=utf-8", 'Access-Control-Allow-Origin': '*'},
        method: "DELETE",
        body: {
            "id" : msgId
        },
    })
}