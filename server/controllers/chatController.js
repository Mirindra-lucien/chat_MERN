const Msg = require('../models/message');
function handleChat(server) {
    const rooms = new Map();
    const users = new Map();
    const io = require('socket.io')(server);
    io.on("connection", (socket) => {

        //emit when user veiw message or want to send message
        socket.once("authentication", (data) => {
            let id = data.identity;
            let rec = data.receiver;
            users.set(socket.id, id);
            if(rooms.get(rec) && rooms.get(rec) == rec + "miri" + id) {
                rooms.set(id, rooms.get(rec));
                socket.join(rooms.get(rec));
            } else {
                rooms.set(id, id + "miri" + rec);
            }
            socket.emit("auth", {message: "authenticated"});
        });

        //emit on user left the discussion
        socket.on("disconnect", () => {
            rooms.delete(users.get(socket.id));
            users.delete(socket.id);
        });

        //emit when user send message
        socket.on("message", async (data) => {
            let id = data.identity,
                fr = data.receiver,
                tp = data.type,
                mes = data.message;
            socket.join(rooms.get(id));
            try {
                const messg = [
                    {
                        identity: id,
                        friend: fr,
                        type: tp,
                        content: mes,
                        sens: "sen"
                    },
                    {
                        identity: fr,
                        friend: id,
                        type: tp,
                        content: mes,
                        sens: "rec"
                    }
                ]
                await Msg.insertMany(messg);
                socket.to(rooms.get(id)).emit(
                    "response",
                    {message: mes, color: ""}
                );
                socket.emit("response", {message: mes, color: "blue"});
            } catch(err) {
                socket.emit("response", {message: "error"});
            }
        });

        //emit when user delete message
        socket.on("delete", async (data) => {
            try {
                await Msg.findByIdAndDelete(data.message.id);
                socket.emit("response", {message: "deleted"});
            } catch(err) {
                socket.emit("response", {message: "error"});
            }
        });
    });
}

module.exports = handleChat;