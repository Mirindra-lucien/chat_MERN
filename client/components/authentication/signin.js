import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function signin() {
    const navigator = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleChange = (name, e) => {
        switch(name) {
            case "Email": setEmail(e.target.value);
            break;
            case "Password": setPassword(e.target.value);
            break;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        fetch("http://localhost:8080/api/signin", {
            method: "post",
            body: data
        }).then((res) => {
            return res.json();
        }).then((res) => {
            let result = res;
            sessionStorage.setItem("name", result.name);
            sessionStorage.setItem("id", result.id);
            sessionStorage.setItem("identity", result.identity);
            sessionStorage.setItem("profile", result.profile);
            sessionStorage.setItem("lastName", result.lastName);
            navigator("/web/home");
        });
    }
    return <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Your email address</label>
        <input
            name="email" type="email" placeholder="example@base.com"
            value={email}
            onChange={(e) => handleChange("Email", e)}
            required
            />
        <label htmlFor='password'>Your password</label>
        <input
            name="password" type="password" placeholder="password"
            value={password}
            onChange={(e) => handleChange("Password", e)}
            required
        />
        <button type='submit'>Singn in</button>
        <Link to="/web/signup">Sign up</Link>
    </form>
}

export default signin;