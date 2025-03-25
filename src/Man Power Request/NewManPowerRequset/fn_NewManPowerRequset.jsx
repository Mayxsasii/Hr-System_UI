import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { fn_Header } from "../../Header/fn_Header";
import Swal from "sweetalert2";
import moment from "moment";
function fn_NewManPowerRequset(formData1, setFormData1) {
  const { datauser } = fn_Header();
  const { showLoading, hideLoading } = useLoading();
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
    GetPosition(formData1.SL_Factory);
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
    if (value.includes("MR0202")) {
      console.log("External selected");
    }
    else{
      handleChange('SL_EmployeeType',null)
      handleChange('txt_EmpType_Other','')
    }
    if (value.includes("MR0290")) {
    console.log("Internal selected");
    }else{
      handleChange("txt_EmpReq_Other", '')
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

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };

  const GetStatusCode = async () => {
    let status_code = "";
    await axios
      .post("/api/RequestManPower/FindStatusCodebyDesc", {
        Status_Desc: formData1.txt_ReqStatus,
      })
      .then((res) => {
        console.log(res.data, "StatusCode");
        status_code = res.data[0].StatusCode;
        handleChange("StatusCode ", res.data[0].StatusCode);
      });
    return status_code;
  };

  // const GetRunningNo = async () => {
  //   let GenNo = "";
  //   console.log(formData1.CB_EmpRequirment.length, "GetRunningNo");
  //   const factory = Factory.find((f) => f.value === formData1.SL_Factory);

  //   let status_code = await GetStatusCode();
  //   if (
  //     formData1.SL_Factory != null &&
  //     formData1.txt_Email != "" &&
  //     formData1.txt_TelNo != "" &&
  //     formData1.SL_Department != null &&
  //     formData1.SL_Position != null &&
  //     formData1.Date_Target != null &&
  //     formData1.CB_EmpRequirment.length > 0
  //   ) {

  //     if(formData1.CB_EmpRequirment.includes("MR0202") && formData1.SL_EmployeeType === null){
  //       Swal.fire({
  //         icon: "error",
  //         text: "Please Select Employee Type.",
  //       });
  //      return
  //     }
  //     if(formData1.CB_EmpRequirment.includes("MR0202") && formData1.SL_EmployeeType === 'MR0390'){
  //       Swal.fire({
  //         icon: "error",
  //         text: "Please Input Employee Type Other",
  //       });
  //      return
  //     }
  //     else if(formData1.CB_EmpRequirment.includes("MR0290") && formData1.txt_EmpReq_Other === ""){
  //       Swal.fire({
  //         icon: "error",
  //         text: "Please Input Employee Requirment Other",
  //       });
  //      return
  //     }
       
  //     showLoading("กำลัง Gen Request No.");
  //     await axios
  //       .post("/api/RequestManPower/GenRunNo", {
  //         Fac_code: factory.value,
  //         Fac_Desc: factory.label,
  //       })
  //       .then((res) => {
  //         console.log(res.data, "GenRunNo");
  //         GenNo = res.data[0].RUNNING;
  //       });
  //     const formattedReqDate = moment(
  //       formData1.txt_ReqDate,
  //       "DD/MM/YYYY"
  //     ).format("YYYY-MM-DD");

  //     const formattedTargetDate = moment(
  //       formData1.Date_Target,
  //       "DD/MM/YYYY"
  //     ).format("YYYY-MM-DD");

  //     await axios
  //       .post("/api/RequestManPower/InsGenNoRequest", {
  //         ReqNo: GenNo,
  //         Fac_Desc: factory.value,
  //         Stats_Code: status_code,
  //         ReqBy: formData1.txt_ReqBy || datauser.LOGIN,
  //         ReqDate: formattedReqDate,
  //         ReqDept: formData1.SL_Department,
  //         Email: formData1.txt_Email,
  //         ReqTel: formData1.txt_TelNo,
  //         Position: formData1.SL_Position,
  //         TargetDate: formattedTargetDate,
  //         totalAmount:
  //           formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional,
  //         Remark: formData1.txt_Remark,
  //       })
  //       .then((res) => {
  //         console.log(res.data, "InsGenNoRequest");
  //       });

  //     for (let i = 0; i < formData1.CB_EmpRequirment.length; i++) {
  //       if (formData1.CB_EmpRequirment[i] === "MR0201") {
  //         await axios
  //           .post("/api/RequestManPower/InsGenNoRequest2", {
  //             ReqNo: GenNo,
  //             EmpType: "",
  //             txt_Other: "",
  //             Create_by: datauser.LOGIN,
  //             Emp_Req: formData1.CB_EmpRequirment[i],
  //           })
  //           .then((res) => {
  //             console.log(res.data, "InsGenNoRequest2");
  //           });
  //       } else if (formData1.CB_EmpRequirment[i] === "MR0202") {
  //         await axios
  //           .post("/api/RequestManPower/InsGenNoRequest2", {
  //             ReqNo: GenNo,
  //             EmpType: formData1.SL_EmployeeType,
  //             txt_Other: formData1.txt_EmpType_Other,
  //             Create_by: datauser.LOGIN,
  //             Emp_Req: formData1.CB_EmpRequirment[i],
  //           })
  //           .then((res) => {
  //             console.log(res.data, "InsGenNoRequest4");
  //           });
  //       } else if (formData1.CB_EmpRequirment[i] === "MR0290") {
  //         await axios
  //           .post("/api/RequestManPower/InsGenNoRequest2", {
  //             ReqNo: GenNo,
  //             EmpType: "",
  //             txt_Other: formData1.txt_EmpReq_Other,
  //             Create_by: datauser.LOGIN,
  //             Emp_Req: formData1.CB_EmpRequirment[i],
  //           })
  //           .then((res) => {
  //             console.log(res.data, "InsGenNoRequest3");
  //           });
  //       }
  //     }
  //     handleChange("txt_ReqNo", GenNo);
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Please fill in all the details.",
  //     });
  //   }
  //   hideLoading();
  // };
  const GetRunningNo = async () => {
    let GenNo = "";
    console.log(formData1.CB_EmpRequirment.length, "GetRunningNo");
    const factory = Factory.find((f) => f.value === formData1.SL_Factory);
  
    let status_code = await GetStatusCode();
  
    if (!formData1.SL_Factory) {
      Swal.fire({
        icon: "error",
        text: "Please select a factory.",
      });
      return;
    }
  

    if (!formData1.SL_Department) {
      Swal.fire({
        icon: "error",
        text: "Please select a department.",
      });
      return;
    }

    if (!formData1.txt_Email) {
      Swal.fire({
        icon: "error",
        text: "Please enter an email.",
      });
      return;
    }
    if (!formData1.txt_TelNo) {
      Swal.fire({
        icon: "error",
        text: "Please enter a telephone number.",
      });
      return;
    }
  

  
    if (!formData1.SL_Position) {
      Swal.fire({
        icon: "error",
        text: "Please select a position.",
      });
      return;
    }
  
    if (!formData1.Date_Target) {
      Swal.fire({
        icon: "error",
        text: "Please select a target date.",
      });
      return;
    }
  
    if (formData1.CB_EmpRequirment.length === 0) {
      Swal.fire({
        icon: "error",
        text: "Please select at least one employee requirement.",
      });
      return;
    }
  
    if (formData1.CB_EmpRequirment.includes("MR0202") && !formData1.SL_EmployeeType) {
      Swal.fire({
        icon: "error",
        text: "Please select an employee type.",
      });
      return;
    }
  
    if (formData1.CB_EmpRequirment.includes("MR0202") && formData1.SL_EmployeeType === 'MR0390' && !formData1.txt_EmpType_Other) {
      Swal.fire({
        icon: "error",
        text: "Please input employee type other.",
      });
      return;
    }
  
    if (formData1.CB_EmpRequirment.includes("MR0290") && !formData1.txt_EmpReq_Other) {
      Swal.fire({
        icon: "error",
        text: "Please input employee requirement other.",
      });
      return;
    }
  
    showLoading("กำลัง Gen Request No.");
    await axios
      .post("/api/RequestManPower/GenRunNo", {
        Fac_code: factory.value,
        Fac_Desc: factory.label,
      })
      .then((res) => {
        console.log(res.data, "GenRunNo");
        GenNo = res.data[0].RUNNING;
      });
  
    const formattedReqDate = moment(formData1.txt_ReqDate, "DD/MM/YYYY").format("YYYY-MM-DD");
    const formattedTargetDate = moment(formData1.Date_Target, "DD/MM/YYYY").format("YYYY-MM-DD");
  
    await axios
      .post("/api/RequestManPower/InsGenNoRequest", {
        ReqNo: GenNo,
        Fac_Desc: factory.value,
        Stats_Code: status_code,
        ReqBy: formData1.txt_ReqBy || datauser.LOGIN,
        ReqDate: formattedReqDate,
        ReqDept: formData1.SL_Department,
        Email: formData1.txt_Email,
        ReqTel: formData1.txt_TelNo,
        Position: formData1.SL_Position,
        TargetDate: formattedTargetDate,
        totalAmount: formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional,
        Remark: formData1.txt_Remark,
        Create_by: datauser.LOGIN,
      })
      .then((res) => {
        console.log(res.data, "InsGenNoRequest");
      });
  
    for (let i = 0; i < formData1.CB_EmpRequirment.length; i++) {
      const requirement = formData1.CB_EmpRequirment[i];
      let data = { ReqNo: GenNo, EmpType: '', txt_Other: '', Create_by: datauser.LOGIN, Emp_Req: requirement };
  
      if (requirement === "MR0202") {
        data.EmpType = formData1.SL_EmployeeType;
        data.txt_Other = formData1.txt_EmpType_Other;
      } else if (requirement === "MR0290") {
        data.txt_Other = formData1.txt_EmpReq_Other;
      }
  
      await axios.post("/api/RequestManPower/InsGenNoRequest2", data)
        .then((res) => {
          console.log(res.data, "InsGenNoRequest2");
        });
    }
  
    handleChange("txt_ReqNo", GenNo);
    hideLoading();
  };
  return {
    Factory,
    Department,
    Position,
    datauser,
    DateToday,
    handleEmpRequirment,
    EmployeeType,
    GetPosition,
    handleChange,
    GetRunningNo,
  };
}

export { fn_NewManPowerRequset };
