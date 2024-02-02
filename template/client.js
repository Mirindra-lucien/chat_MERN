const io = require('socket.io-client').io;

const socket = io("http://localhost:8080");
console.log("work");
socket.emit("message", {name: "mirindra", message: "hello"});
socket.on("response", (data) => {
    console.log(data, socket.id);
    console.log("Mirindra Lucien");
});
console.log((new Number(new Date("2024-01-27T09:05:46.212Z"))));
