import React, { use } from 'react';
import {useState, useEffect} from 'react';
import {io} from 'socket.io-client';

const socket = io();

function chat(props) {
    let btn = ">>";
    const [isAuth, setAuth] = useState(false);
    const [auth, setAuthentication] = useState({});
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    let handleChange = (str, e) => {
        e.preventDefault();
        if(str == "message") {
            setMessage(e.target.value);
        }
        else {
            setAuthentication({...auth, [str]: e.target.value});
        }
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        if(!isAuth) {
            socket.emit("authentication",
                {identity: auth.identity, receiver: auth.receiver}
            );
        } else {
            socket.emit("message", 
                {message: message, identity: auth.identity, receiver: auth.receiver, type: auth.type}
            );
            setMessage("");
        }
    }
    useEffect(() => {
        socket.on("auth", (data) => {
            if(data.message == "authenticated") {
                setAuth(true);
            }
        });
        socket.on("response", (data) => {
            if(data.message != "error") {
                setMessages([...messages, {message: data.message, color: data.color}]);
            }
        })
    })
    return <div>
        {isAuth ? <h1 style={{color: "blue"}}>o</h1> : <></>}
        <div>
            {
                messages.map((value, index, arr) => {
                    if(value) {
                        return <p key={index}
                            style={{color: value.color ? value.color : undefined}}
                        >
                            {value.message}
                        </p>
                    }
                })
            }
        </div>
        <div>
            {
                isAuth ? 
                <input name="message" value={message}
                    onChange={(e) => handleChange("message", e)} placeholder="message"
                /> : 
                <div>
                    <input name="identity" value={auth.identity}
                        onChange={(e) => handleChange("identity", e)} placeholder="identity"
                    />
                    <input name="receiver" value={auth.receiver}
                        onChange={(e) => handleChange("receiver", e)} placeholder="receiver"
                    />
                    <input name="type" value={auth.type}
                        onChange={(e) => handleChange("type", e)} placeholder="type"
                    />
                </div>
            }
            <button onClick={handleSubmit} type="submit">{btn}</button>
        </div>
    </div>
}

export default chat;