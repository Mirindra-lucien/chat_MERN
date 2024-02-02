const net = require('http');
const socketio = require('socket.io');
const server = net.createServer();
const io = socketio(server);

io.on("connection", (socket) => {
    socket.id = "123456";
    socket.on("message", (data) => {
        console.log(data);
        socket.emit("response", {message: "message received", id: socket.id});
    });
    socket.on("disconnect", () => {
        console.log("client is disconnected");
    })
});

server.listen(9000, "127.0.0.1");