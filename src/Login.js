import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { setUser } from './Utils/Common';
import "./LoginForm.css";

function Login(props) {
  
  const { register, handleSubmit, errors } = useForm();

  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = (data) => {
    setError(null);
    axios.post('http://192.168.0.105:1111/api/v1/auth/signin', data).then(response => {
      setUser(response.data._token);
      props.history.push('/dashboard');
    }).catch(error => {
      console.log("====",error.response);
      if (error.response && error.response.status === 401) setError(error.response.data.error);
      else if (error.response && error.response.status === 400) setError(error.response.data.error);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      <div className="login-form">
        <strong>Login Here</strong><br /><br />
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        <label htmlFor="inputEmail">Username</label>
        <input
          type="email"
          id="inputEmail"
          name="emailAddress"
          ref={register({
            required: "Enter your username",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.emailAddress && <p className="error">{errors.emailAddress.message}</p>}

        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          id="inputPassword"
          name="password"
          ref={register({ required: "Enter your password" })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}


export default Login;