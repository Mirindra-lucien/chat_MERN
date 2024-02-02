import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'

function create() {
    const nav = useNavigate();
    const myref = useRef();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        pwd: "",
        pwd1: "",
        city: "",
        birthday: undefined
    });
    const handleChange = function(str, e) {
        e.preventDefault();
        setValues({...values, [str]: e.target.value});
    }
    const handleSubmit = function(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("firstName", values.firstName);
        data.append("lastName", values.lastName);
        data.append("city", values.city);
        data.append("birthday", myref.current.value);
        data.append("pwd", values.pwd);
        data.append("email", values.email);
        fetch("http://localhost:8080/api/account", {
            method: "post",
            body: data
        }).then((res) => {
            return res.json()
        }).then((res) => {
            let resp = res;
            if(resp.message == "created") {
                nav("/web/confirm");
            }
        });
    }
    return <form onSubmit={handleSubmit}>
        <label htmlFor=''>Your first name</label><br/>
        <input name='firstName' type='text'
            onChange={(e) => {handleChange("firstName", e)}}
            required
            value={values.firstName}
            placeholder="Name"
        /><br/>

        <label htmlFor=''>Your last name</label><br/>
        <input name='lastName' type='text'
            onChange={(e) => {handleChange("lastName", e)}}
            value={values.lastName}
            placeholder="name"
            /><br/>
        <label htmlFor=''>Email</label><br/>
        <input name='email' type='email'
            value={values.email}
            onChange={(e) => {handleChange("email", e)}}
            required
            placeholder="example@email.com"
            /><br/>
        <label htmlFor=''>Password</label><br/>
        <input name='pwd' type='password'
            onChange={(e) => {handleChange("pwd", e)}}
            required
            value={values.pwd}
            placeholder="password"
            /><br/>
        <label htmlFor=''>Confirm password</label><br/>
        <input name='pwd1' type='password'
            onChange={(e) => {handleChange("pwd1", e)}}
            placeholder="password"
            value={values.pwd1}
            /><br/>
        <label htmlFor=''>City</label><br/>
        <input name='city' type='text'
            onChange={(e) => {handleChange("city", e)}}
            placeholder="Madagascar"
            value={values.city}
            /><br/>
        <label htmlFor=''>Birthday</label><br/>
        <input name='birthday' type='date'
            onChange={(e) => {handleChange("birthday", e)}}
            ref={myref}
        /><br/>
        <button type='submit'>Create</button>
    </form>
}

export default create;