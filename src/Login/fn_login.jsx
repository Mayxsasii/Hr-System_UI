// FILE: fn_login.jsx
import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.clear()
    LoginWithPath();
  }, []);
  const LoginWithPath = async () => {
    if (User) {
      setIsLoading(true);
      await axios
        .post("/api/common/Login2", {
          loginID: User,
        })
        .then((res) => {
          if (res.data.length <= 0) {
            Swal.fire({
              icon: "error",
              title: "Invalid Login",
              text: "Please check your username and password.",
            });
            setIsLoading(false);
          } else {
            setdatalogin(res.data);
            localStorage.setItem("username", res.data[0].LOGIN);
            localStorage.setItem("FAC_CODE", res.data[0].FAC_CODE);
            localStorage.setItem("Email", res.data[0].EMAIL);
            localStorage.setItem("ROLL", res.data[0].ROLL_ID||'');

            Swal.fire({
              icon: "success",
              title: "Login Success",
            });
            setTimeout(() => {
              setIsLoading(false);
              window.location.href = "/HrSystem/Home";
            }, 2000);
         
           
          }
        });
    }
  };

  const Login = async () => {
    setIsLoading(true);
    await axios
      .post("/api/common/Login", {
        loginID: username,
        Password: password,
      })
      .then((res) => {

        if (res.data.length <= 0) {
          Swal.fire({
            icon: "error",
            title: "Invalid Login",
            text: "Please check your username and password.",
          });
          setIsLoading(false);
        } else {
          setdatalogin(res.data);
          localStorage.setItem("username", res.data[0].LOGIN);
          localStorage.setItem("FAC_CODE", res.data[0].FAC_CODE);
          localStorage.setItem("Email", res.data[0].EMAIL);
          localStorage.setItem("ROLL", res.data[0].ROLL_ID);
          Swal.fire({
            icon: "success",
            title: "Login Success",
          });
          setTimeout(() => {
            setIsLoading(false);
            window.location.href = "/HrSystem/Home";
          }, 2000);
        
        }
      });
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    Login,
    datalogin,
    isLoading,
  };
}

export { fn_login };
