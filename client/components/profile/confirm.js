import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function confirm() {
    const nav = useNavigate();
    let key = "";
    const [code, setCode] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/confirm/:id", {
            method: "get"
        }).then((res) => {
            return res.json();
        }).then((res) => {
            key = res.code;
        });
    }
    
    return <div>
        <form>
            <input name='code' type='text' value={code}
                onChange={(e) => {
                    e.preventDefault();
                    setCode(e.target.value);
                    if(code == key) {
                        fetch("http://localhost:8080/api/confirm/:id?code=ok", {
                            method: "get"
                        }).then((res) => {
                            return res.json();
                        }).then((res) => {
                            if(res.message == "confirmed") {
                                nav("/web/home");
                            }
                        });             
                    }
                }}
            />
        </form>
        <button onClick={handleClick}>Resend email</button>
    </div>
}

export default confirm;