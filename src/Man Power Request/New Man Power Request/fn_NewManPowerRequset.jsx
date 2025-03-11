import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { fn_Header } from "../../Header/fn_Header";

function fn_NewManPowerRequset() {
  const { datauser } = fn_Header();
  const userlogin = localStorage.getItem("username");
  const [Factory, setFactory] = useState([]);
  const [Position, setPosition] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [EmployeeType, setEmployeeType] = useState([]);
  // select
  const [SL_Factory, setSL_Factory] = useState(null);
  const [SL_Department, setSL_Department] = useState(null);
  const [SL_Position, setSL_Position] = useState(null);
  const [SL_Employee, setSL_Employee] = useState(null);

  //CheckBox
  const [CB_EmpRequirment, setCB_EmpRequirment] = useState([]);
  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`; // รูปแบบ DD/MM/YYYY

  //   //txt
  const [txt_TelNo, settxt_TelNo] = useState("");
  const [txt_EmpType, settxt_EmpType] = useState("");
  const [txt_EmpReq_Other, settxt_EmpReq_Other] = useState("");
  const [txt_Remark, settxt_Remark] = useState("");
  const [Date_Target, setDate_Target] = useState(null);

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

  const handleFactory = (value) => {
    setSL_Factory(value);
    GetPosition(value);
  };

  const handleEmpRequirment = (value) => {
    setCB_EmpRequirment(value);
    console.log(value, "handleEmpRequirment");
    if (value.includes("External")) {
      console.log("External selected");
    }
    if (value.includes("Other")) {
      console.log("Other selected");
    }
  };

  const GetPosition = async (Fac) => {
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
    setFactory,
    setDepartment,
    setPosition,
    setSL_Department,
    setSL_Factory,
    setSL_Position,
    datauser,
    handleFactory,
    GetDepartment,
    SL_Department,
    SL_Factory,
    SL_Position,
    DateToday,
    settxt_TelNo,
    txt_TelNo,
    Date_Target,
    setDate_Target,
    setEmployeeType,
    EmployeeType,
    SL_Employee,
    setSL_Employee,
    CB_EmpRequirment,
    setCB_EmpRequirment,
    handleEmpRequirment,
    settxt_EmpReq_Other,
    settxt_EmpType,
    txt_EmpType,
    txt_EmpReq_Other,
    txt_Remark,
    settxt_Remark,
  };
}

export { fn_NewManPowerRequset };
