import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { fn_Header } from "../../Header/fn_Header";

function fn_NewManPowerRequset() {
  const {datauser} = fn_Header();
  const userlogin = localStorage.getItem("username");
  const [Factory, setFactory] = useState([]);
  const [Position, setPosition] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [EmployeeType, setEmployeeType] = useState([]);

  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  useEffect(() => {
    GetFactory();
    GetDepartment();
    GetEmployeeType();
  }, []);

  const GetFactory = async () => {
    await axios
      .post("/api/RequestManPower/GetFactory", { User_login: userlogin || "" })
      .then((res) => {
        console.log(res.data, "GetFactory");
        setFactory(res.data);
      });
  };



  const handleEmpRequirment = (value) => {
    console.log(value, "handleEmpRequirment");
    if (value.includes("External")) {
      console.log("External selected");
    }
    if (value.includes("Other")) {
      console.log("Other selected");
    }
  };

  const GetPosition = async (Fac) => {
    console.log(Fac, "GetPosition");
    await axios
      .post("/api/RequestManPower/GetPosition", {
        DDLFactory: Fac || "",
      })
      .then((res) => {
        console.log(res.data, "GetPosition");
        setPosition(res.data);
      });
  };

  const GetDepartment = async () => {
    await axios
      .post("/api/RequestManPower/GetDepartment", {
        User_login: userlogin || "",
      })
      .then((res) => {
        console.log(res.data, "GetFactGetDepartmentory");
        setDepartment(res.data);
      });
  };

  const GetEmployeeType = async () => {
    await axios
      .post("/api/RequestManPower/GetEmployeeType", {
        User_login: userlogin || "",
      })
      .then((res) => {
        console.log(res.data, "GetEmployeeType");
        setEmployeeType(res.data);
      });
  };

  return {
    Factory,
    Department,
    Position,
    datauser,
    DateToday,
    handleEmpRequirment,
    EmployeeType,
    GetPosition
  };
}

export { fn_NewManPowerRequset };
