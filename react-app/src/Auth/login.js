import React, { useState } from 'react'
import axios from "axios";
import ErrorMessage from './ErrorMessage';



const Login = () => {

  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [error,setError] = useState(false);
  const [message, setMessage] = useState(null);

  
  
  const saveData =async (e)=>{
     e.preventDefault();
    const userInfo = localStorage.getItem("userInfo");
    try {

      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      
      const {data} = await axios.post(
        "http://localhost:9000/user/login",
        {useremail,userpassword},config
      );
      console.log(data);
      localStorage.setItem("userInfo",JSON.stringify(data));
      
    } catch (error) {
       setError(error.resposne.data.message);
    }  
 
    if (userInfo) {
      setMessage("Success");
      window.location.assign("/home");
     
    } else {
      setMessage("Invalid Credentials");     
    }
  }
  return (
    <div>
      <h1>User Login</h1>
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
        <button style={{ margin: 5 }}>Submit</button>
        New user? <a href="/register">Register</a>
      </form>
    </div>
  );
}

export default Login