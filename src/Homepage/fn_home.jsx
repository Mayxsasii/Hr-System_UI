// FILE: fn_login.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
function fn_home() {
  const [ManPower, setManPower] = useState([]);
  const [Letter, setLetter] = useState([]);
  const User = localStorage.getItem("username");
  const Roll = localStorage.getItem("ROLL");

  useEffect(() => {
    getmenucount();
  }, []);
  const getmenucount = async () => {
    await axios
      .post("/api/RequestManPower/HomeStatusCountManPower", {
        UserLogin: User,
        Roll: [Roll],
      })
      .then((res) => {
        setManPower(res.data);
      });

      await axios
      .post("/api/RefferenceLetter/HomeStatusCountLetter", {
        UserLogin: User,
        Roll: [Roll],
      })
      .then((res) => {
        setLetter(res.data);
        console.log("Letter", res.data);
      });
  };
  const GoPathManPower = (value, count) => {
    if (count > 0) {
      if (value === "1") {
        window.location.href = "/HrSystem/ManPowerRequest";
      } else if (value === "2") {
        window.location.href = "/HrSystem/ApproveManPower";
      } else if (value === "3") {
        window.location.href = "/HrSystem/HrActionManPowerRequest";
      }
    }
  };
  const GoPathLetter = (Page,Count) => {
    if (Page == "C") {
      window.location.href = "/HrSystem/NewRefferenceLetter";
    }
    if(Count>0){
      if(Page == "A"){
        window.location.href = "/HrSystem/ApproveRefferenceLetter";
      }
      if(Page == "H"){
        window.location.href = "/HrSystem/HrActionRefferenceLetter";
      }
    }
  };
  return { ManPower, GoPathManPower,GoPathLetter,Letter};
}

export { fn_home };
