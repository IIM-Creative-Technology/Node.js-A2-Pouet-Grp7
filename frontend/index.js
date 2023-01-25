const btn = document.getElementById("btn");
const btnSocket = document.getElementById("btnSocket");
const ul = document.querySelector("ul");

const block = document.querySelector("block");

btn.addEventListener("click", () => {
    fetch("http://localhost:3000/api/user", {
        method: "GET",
    }).then(d => {
        return d.json()
    }).then(dd => {
        const firstName = document.querySelector("#firstName");
        const lastName = document.querySelector("#lastName");
        const email = document.querySelector("#email");
        
        firstName.innerHTML = dd.firstName;
        lastName.innerHTML = dd.lastName;
        email.innerHTML = dd.email;
    })
});

const socket = io("http://localhost:3000");

btnSocket.addEventListener("click", () => {
    socket.emit("message", 
    {
        msg: "Hi 👋"
    })
});

socket.on("data", (data) => {
    console.log(socket.id); 
    const li = document.createElement('li');
    li.innerText = data.msg;
    ul.append(li);
})
