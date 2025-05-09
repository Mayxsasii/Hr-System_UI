// FILE: fn_login.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
function fn_home() {
  const [ManPower, setManPower] = useState([]);
  const User = localStorage.getItem("username");
  const Roll = localStorage.getItem("ROLL");
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const User = queryParams.get("username");
  // const Roll = queryParams.get("ROLL");
 
  useEffect(async () => {
    console.log(User,'User2222');
    // if(User) {
      await axios
      .post("/api/RequestManPower/HomeStatusCountManPower", {
        UserLogin: User,
        Roll: Roll
      })
      .then((res) => {
        console.log(res.data, "ManPower2222");
        setManPower(res.data);
      });
    // }
   
  }, []);
  return {ManPower};
}

export { fn_home };
