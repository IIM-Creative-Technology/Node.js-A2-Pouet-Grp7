const btn = document.getElementById("btn");
const btnSocket = document.getElementById("btnSocket");
const ul = document.querySelector("ul");


const block = document.querySelector("block");


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
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
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
    headers: {
        "Content-Type": "application/json"
    }
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
