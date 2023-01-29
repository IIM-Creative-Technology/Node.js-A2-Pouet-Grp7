const btn = document.getElementById("btn");
const btnSocket = document.getElementById("btnSocket");
const ul = document.querySelector("ul");

const msgInput = document.getElementById("msgInput");

const btnNote = document.getElementById("btnNote");
const btnGlobal = document.getElementById("btnGlobal");
const btnSuperGlobal = document.getElementById("btnSuperGlobal");

let pseudo = document.querySelector("#name")
let email = document.querySelector("#email")
let mdp = document.querySelector("#password")
let vie = document.querySelector("#age")
let submitBtn = document.querySelector("#submitBtn")

let loginPseudo = document.querySelector("#loginName")
let loginPassword = document.querySelector("#loginPassword")
let SessionName = document.querySelector("#SessionName")
let SessionName2 = document.querySelector("#SessionName2")
let submitBtnLogin = document.querySelector("#submitBtnLogin")

submitBtn.addEventListener("click", function(){
    fetch("http://localhost:3000/api/register", {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json;charset=utf-8"
        // },
        body: JSON.stringify({
            name: pseudo.value,
            mail: email.value,
            password: mdp.value,
            age: vie.value
        })
    }).then(d => {
        return d.json()
    }).then(dd => {
        console.log(dd)
        pseudo.value= ''
        email.value = ''
        mdp.value = ''
        vie.value = ''
    })
})

submitBtnLogin.addEventListener("click", function() {
    fetch(`http://localhost:3000/api/login/${loginName.value}/${loginPassword.value}`, {
    method: "POST",
    // headers: {
    //     "Content-Type": "application/json"
    // }
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        if(data[0].length != 0) {
            SessionName.innerText = "Connecté avec : "
            SessionName2.innerText = data[0].name
            let userConnecte = [data[0]]
        }
    })
})

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
    // li.addEventListener("click", function() {
    //     deleteMsg(data.msg.id)
    // })
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

// function deleteMsg(msgId){
//     console.log(msgId)
//     fetch("http://localhost:3000/api/msg", {
//         method: "DELETE",
//         body: {
//             "id": msgId
//         }
//     })
// }