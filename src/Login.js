import React, { useState } from "react";
import styled from "styled-components";
// useNavigate - react-router-dom

const LogBox = styled.div`
display: flex;
border: solid black;
padding: 20px;
margin: 20px;
`

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(userName, password);
    const newUser = {
        username: userName,
        password: password
    }
    const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jsonwebtoken')}`
        },
        body: JSON.stringify(newUser),
      });
      const result = await response.json()
console.log(result)
localStorage.setItem("jsonwebtoken", result.jwt)
  
}

const handleChange = (e) => {
    if(e.target.name === "user"){
        setUserName(e.target.value)
    } else {
        setPassword(e.target.value)
    }
}

  return (
    <div>
      <LogBox>
        <h1>Login</h1>

      <form style={{
                    display: 'flex',
                    border: 'solid black',
                    padding: '10px',
                    margin: '10px'
    }} onSubmit={handleSubmit}>
        <input type='text' value={userName} name="user" placeholder="username" onChange={handleChange}/>
        <br/>
        <input type="password" value={password} name="password" placeholder="password"  onChange={handleChange}/>
        <br/>
        <button type="submit">Submit</button>
      </form>
      </LogBox>
    </div>
  );
}

export default Login;