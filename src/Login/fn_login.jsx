// FILE: fn_login.jsx
import React, { useState,useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function fn_login() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const User = queryParams.get("USER_LOGIN");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [datalogin, setdatalogin] = useState("");


  useEffect(async() => {
 console.log(User,'User2222');
    if (User) {
      await axios
      .post("/api/common/Login2", { 
        loginID: User, 
 
      })
      .then((res) => {
        console.log(username,'mayyyyyyyyy');
        if (res.data.length <= 0) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Login',
            text: 'Please check your username and password.',
          });
        } else {
          setdatalogin(res.data);
          console.log(res.data);
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
          });
          localStorage.setItem('username',res.data[0].LOGIN);
          localStorage.setItem('FAC_CODE', res.data[0].FAC_CODE);
          localStorage.setItem('Email', res.data[0].EMAIL);
          localStorage.setItem('ROLL', res.data[0].ROLL_ID);
          window.location.href = "/HrSystem/Home";
        }
      });
    }
  }, []);
  const Login = async () => {
    await axios
      .post("/api/common/Login", { 
        loginID: username, 
        Password: password 
      })
      .then((res) => {
        console.log(username, password,'mayyyyyyyyy');
        if (res.data.length <= 0) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Login',
            text: 'Please check your username and password.',
          });
        } else {
          setdatalogin(res.data);
          console.log(res.data);
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
          });
          localStorage.setItem('username',res.data[0].LOGIN);
          localStorage.setItem('FAC_CODE', res.data[0].FAC_CODE);
          localStorage.setItem('Email', res.data[0].EMAIL);
          localStorage.setItem('ROLL', res.data[0].ROLL_ID);
          window.location.href = "/HrSystem/Home";
        }
      });
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    Login,
    datalogin
  };
}

export { fn_login };