// FILE: fn_login.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
function fn_home() {
  const [ManPower, setManPower] = useState([]);
  const User = localStorage.getItem("username");
  const Roll = localStorage.getItem("ROLL");
 
  useEffect( () => {
    getmenucount();
   
  }, []);
  const getmenucount = async() => {
    console.log("Roll", Roll);
      await axios
      .post("/api/RequestManPower/HomeStatusCountManPower", {
        UserLogin: User,
        Roll: [Roll]
      })
      .then((res) => {
        console.log(res.data, "ManPower2222");
        setManPower(res.data);
      });
  }
  const GoPathManPower = (value,count) => {
    console.log("GoPathManPower", count,value);
    if(count > 0) {
    if( value === "1") {
      window.location.href = "/HrSystem/ManPowerRequest";
    }
    else if( value === "2") {
      window.location.href = "/HrSystem/ApproveManPower";
    }
    else if( value === "3") {
      window.location.href = "/HrSystem/HrActionManPowerRequest";
    }
  }
  }
  return {ManPower,GoPathManPower};
}

export { fn_home };
