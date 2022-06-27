import React from 'react'
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';
const Register = () => {
   const [useremail, setUserEmail] = useState("");
   const [userpassword, setUserPassword] = useState("");
   const [confirmuserpassword, setConfirmUserPassword] = useState("");
const [message, setMessage] = useState(null);
const [error, setError]= useState(false);
   
  const saveData = async (e) => {
    e.preventDefault();

    if(userpassword !== confirmuserpassword){
        setMessage('Passwords are not matching')
    }else{
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "http://localhost:9000/user/register",
          { useremail, userpassword },
          config
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
         window.location.assign("/home");
      } catch (error) {
        setError(error.resposne.data.message);
      }
    }
    
  };
  return (
    <div>
      <h1>User Register</h1>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      <form onSubmit={saveData}>
        <label>User Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={useremail}
          style={{ margin: 5 }}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <br></br>
        <label>User Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={userpassword}
          style={{ margin: 5 }}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br></br>
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={confirmuserpassword}
          style={{ margin: 5 }}
          onChange={(e) => setConfirmUserPassword(e.target.value)}
        />
        <br></br>
        <button style={{ margin: 5 }}>Submit</button>
        Already user? <a href="/">login</a>
      </form>
    </div>
  );
}

export default Register