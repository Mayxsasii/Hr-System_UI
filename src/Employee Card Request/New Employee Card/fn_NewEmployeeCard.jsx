import React, { useState, useEffect } from "react";
import { theme } from "antd";

import Swal from "sweetalert2";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { Await, useLocation } from "react-router-dom";

function fn_NewEmployeeCard() {

  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ReqNo = queryParams.get("ReqNo");
  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  // const Email = localStorage.getItem("Email");
  const [Reason, setReason] = useState([])
  const [isCalculating, setIsCalculating] = useState(false);
  const [formData1, setFormData1] = useState({
    //Step1
    txt_ReqNo: "",
    txt_ReqDate: DateToday,
    txt_ReqStatusValue: "CD0101",
    txt_ReqStatusDesc: "Create",
    txt_ReqbyID: "",
    txt_Userlogin: "",
    txt_ReqbyName: "",
    txt_Factory: "",
    txt_FactoryValue: "",
    txt_Department: "",
    txt_EmpType: "",
    txt_JoinDate: "",
    txt_JobGrade: "",
    txt_Email: "",
    txt_Tel: "",
    Sl_Reason:null,
    txt_ReasonOther:'',
    txt_expenses:'',
    Date_WorkingForm:null,
    Date_WorkingTo:null,
    Date_DayWork:'',
    Date_DayWork2:[],
    txt_Remark: "",

    //step2.2
    Sl_Supervisor: null,
    Rd_SupervisorApprove: "",
    Date_SupervisorActionDate: '',
    txt_SupervisorCooment: "",
    //step3
    Rd_HRStatus: "",
    Sl_HrCondion: null,
    txt_HrStaff: "",
    txt_HrActionDate: '',
    Date_HrConfirmAcDate: '',
    txt_HrComment: "",
    txt_RecriveById: "",
    txt_RecriveByName: "",
    txt_RecriveByJobGrade: "",
    txt_RecriveByDepartment: "",
    txt_RecriveByEmail: "",
    txt_RecriveByTel: "",
    Date_RecriveDate: '',
  });

  useEffect(() => {
    GetReason();
    FetchData();
  }, []);

  const FetchData = async () => {
    // console.log('reqqq',ReqNo)
    if (ReqNo != null && ReqNo != "") {
      // queryParams.delete("ReqNo");
      // const newUrl = `${location.pathname}?${queryParams.toString()}`;
      // window.history.replaceState(
      //   null,
      //   "",
      //   newUrl.endsWith("?") ? newUrl.slice(0, -1) : newUrl
      // );
      showLoading("Loading...");
      await GetdataEdit();
      hideLoading();
    }
  };

  const fomatdate = (date) => {
    console.log(date, "datedate");
    let formattedDate;
    if (date) {
      const [day, month, year] = date.split("/");
      formattedDate = `${year}-${month}-${day}`;
    }
    return formattedDate;
  };

  const GetDataPerson = async (ID_Code) => {
    showLoading('')
    await axios
    
      .post("/api/RefferenceLetter/GetDataPersonByIDCode", {
        Id_Code: ID_Code || "",
      })
      .then((res) => {
        console.log(res.data, "GetDataPerson");
        if (res.data.length === 0) {
          handleChange("txt_Userlogin", '');
          handleChange("txt_ReqbyID", "");
          handleChange("txt_ReqbyName", "");
          handleChange("txt_Factory", "");
          handleChange("txt_FactoryValue", "");
          handleChange("txt_Department", "");
          handleChange("txt_EmpType", "");
          handleChange("txt_JoinDate", "");
          handleChange("txt_JobGrade", "");
          handleChange("txt_Email", "");
          Swal.fire({
            icon: "warning",
            title: "User not found!",
            // text: "User not found!",
          });
        } else {
          handleChange("txt_Userlogin", res.data[0].User);
          handleChange("txt_ReqbyName", res.data[0].name_surname);
          handleChange("txt_Factory", res.data[0].factory);
          handleChange("txt_FactoryValue", res.data[0].factory_code);
          handleChange("txt_Department", res.data[0].dept);
          handleChange("txt_EmpType", res.data[0].emptype);
          handleChange("txt_JoinDate", res.data[0].joindate);
          handleChange("txt_JobGrade", res.data[0].jobgrade);
          handleChange("txt_Email", res.data[0].email);
        }
      });
      hideLoading()
  };

  const GetReason = async () => {

    await axios
      .post("/api/EmployeeCard/GetReason")
      .then((res) => {
        console.log(res.data, "GetReason");
        setReason(res.data);
      })
      .catch((error) => {
        console.error("Error fetching reasons:", error);
      });

  }

  const GetDayWork = async (DateForm,DateTo) => {
    console.log(DateForm,DateTo, "cccccccc");
    handleChange("Date_DayWork", '');
    setIsCalculating(true);
    if(DateForm !=null&& DateTo!=null) {
    await axios
      .post("/api/EmployeeCard/GetDayWork", {
        DateForm: DateForm || "",
        DateTo: DateTo || "",
      })
      .then((res) => {
        console.log(res.data, "GetDayWork");
        handleChange("Date_DayWork", res.data.stringCheckDate);
        handleChange("Date_DayWork2", res.data.arrayCheckDate2);
        setIsCalculating(false);
      })
      .catch((error) => {
        console.error("Error fetching reasons:", error);
        setIsCalculating(false);
      });
    }else{
      Swal.fire({
        icon: "warning",
        text: "Please Select Record Working Time!",
      });
      setIsCalculating(false);
    }
  }

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };
 

  return {
    formData1,handleChange,GetDataPerson,Reason,GetDayWork,isCalculating
  };
}

export { fn_NewEmployeeCard };
