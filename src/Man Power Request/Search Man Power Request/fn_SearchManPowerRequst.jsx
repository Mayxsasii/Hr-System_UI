import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";

import { fn_Header } from "../../Header/fn_Header";

function fn_SearchManPowerRequst() {
  const userlogin = localStorage.getItem("username");
  const { showLoading, hideLoading } = useLoading();
  const { datauser } = fn_Header();
  console.log(datauser, "datauser");
  const [Factory, setFactory] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Position, setPosition] = useState([]);
  const [JobGrade, setJobGrade] = useState([]);
  // select
  const [SL_Factory, setSL_Factory] = useState(null);
  const [SL_Department, setSL_Department] = useState(null);
  const [SL_Position, setSL_Position] = useState(null);
  const [SL_JobGrade, setSL_JobGrade] = useState(null);

  //txt
  const [txt_ReqNoFrom, settxt_ReqNoFrom] = useState("");
  const [txt_ReqNoTo, settxt_ReqNoTo] = useState("");
  const [DateFrom, setDateFrom] = useState("");
  const [DateTo, setDateTo] = useState("");

  useEffect(() => {
    GetFactory();
    GetDepartment();
  }, []);

  const GetFactory = async () => {
    await axios
      .post("/api/RequestManPower/GetFactory", { User_login: userlogin || "" })
      .then((res) => {
        console.log(res.data, "GetFactory");
        setFactory(res.data);
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

  const GetJobGrade = async (position) => {
    await axios
      .post("/api/RequestManPower/GetJobGrade", {
        DDLFactory: SL_Factory || "",
        DDLPosition: position || "",
      })
      .then((res) => {
        console.log(res.data, "GetJobGrade");
        setJobGrade(res.data);
      });
  };

  const handleFactory = (value) => {
    setSL_Factory(value);
    GetPosition(value);
  };
  const handlePosition = (value) => {
    setSL_Position(value);
    GetJobGrade(value);
    console.log("Selected factory:", value);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  const bt_New = async () => {
    showLoading("");
    window.location.href = "/HrSystem/NewManPowerRequest";
  };
  return {
    columns,
    data,
    Factory,
    bt_New,
    Department,
    Position,
    JobGrade,
    SL_Factory,
    SL_Department,
    SL_Position,
    SL_JobGrade,
    setSL_Factory,
    setSL_Department,
    setSL_Position,
    setSL_JobGrade,
    GetPosition,
    GetJobGrade,
    handleFactory,
    handlePosition,
    datauser,
    DateFrom,
    DateTo,
    txt_ReqNoFrom,
    txt_ReqNoTo,
    setDateFrom,
    setDateTo,
    settxt_ReqNoFrom,
    settxt_ReqNoTo,
    GetFactory
  };
}

export { fn_SearchManPowerRequst };
