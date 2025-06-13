// FILE: fn_login.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
function fn_home() {
  const [ManPower, setManPower] = useState([]);
  const [Letter, setLetter] = useState([]);
  const [EmpCard, setEmpCard] = useState([]);
  const User = localStorage.getItem("username");
  const Roll = localStorage.getItem("ROLL");
  const Fac = localStorage.getItem("FAC_CODE");
  useEffect(() => {
    getmenucount();
  }, []);
  const getmenucount = async () => {
    await axios
      .post("/api/RequestManPower/HomeStatusCountManPower", {
        UserLogin: User,
        Roll: [Roll],
        Fac:Fac||''
      })
      .then((res) => {
        setManPower(res.data);
      });

      await axios
      .post("/api/RefferenceLetter/HomeStatusCountLetter", {
        UserLogin: User,
        Roll: [Roll],
        Fac:Fac||''
      })
      .then((res) => {
        setLetter(res.data);
        console.log("Letter", res.data);
      });
       await axios
      .post("/api/EmployeeCard/HomeStatusCountEmpCard", {
        UserLogin: User,
        Roll: [Roll],
        Fac:Fac||''
      })
      .then((res) => {
        setEmpCard(res.data);
        console.log("EmpCard", res.data);
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
   const GoPathEmpCard = (Page,Count) => {
    if (Page == "C") {
      window.location.href = "/HrSystem/NewEmployeeCard";
    }
    if(Count>0){
      if(Page == "A"){
        window.location.href = "/HrSystem/ApproveEmployeeCard";
      }
      if(Page == "H"){
        window.location.href = "/HrSystem/HrActionEmployeeCard";
      }
    }
  };
  return { ManPower, GoPathManPower,GoPathLetter,Letter,GoPathEmpCard,EmpCard};
}

export { fn_home };
