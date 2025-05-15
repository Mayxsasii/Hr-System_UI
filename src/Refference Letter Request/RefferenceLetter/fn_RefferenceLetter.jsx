import React, { useState, useEffect } from "react";
import { theme } from "antd";
import Step1 from "../NewRefferenceLetter/NewRefferenceLetter";
import Step2 from "../ApproveRefferenceLetter/ApproveRefferenceLetter";
import Step3 from "../HrActionRefferenceLetter/HrActionRefferenceLetter";
// import Step4 from "./HRStaffAction/HRStaffAction";
// import { fn_Header } from "../Header/fn_Header";
import Swal from "sweetalert2";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { Await, useLocation } from "react-router-dom";

function fn_RefferenceLetter() {
  const steps = [
    {
      title: "New Refference Letter Request",
      content: (props) => <Step1 {...props} />,
    },
    {
      title: "Letter Type/For Approve",
      content: (props) => <Step2 {...props} />,
    },
    {
      title: "HR Staff Action",
      content: (props) => <Step3 {...props} />,
    },
  ];
  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ReqNo = queryParams.get("ReqNo");
  const Email = localStorage.getItem("Email");
  const UserLogin = localStorage.getItem("username");

  const { token } = theme.useToken();
  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  const [current, setCurrent] = useState(0);

  const [formData1, setFormData1] = useState({
    //Step1
   txt_ReqNo: "",
   txt_ReqDate: "",
   txt_ReqStatusValue: "",
   txt_ReqStatusDesc:'',
   txt_Reqby: "",
   txt_ReqbyName: "",
   txt_Factory: "",
   txt_Department: "",
   txt_EppType: "",
   txt_JoinDate: "",
   txt_JobGrade: "",
   txt_Email: "",
   Date_Target: "",
   txt_Tel:'',
  });


  useEffect(() => {

  }, []);


  const validateStep1 = () => {
    // if (formData1.txt_ReqNo == "") {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Please Generate Req No.",
    //   });
    //   return false;
    // }
    return true;
  };

  const validateStep4 = async () => {
    let check = true;
    await axios
      .post("/api/RequestManPower/GetHrStarff", {
        User: UserLogin,
      })
      .then(async (res) => {
        console.log(res.data, "GetPersonData");
        if (res.data.length <= 0) {
          Swal.fire({
            icon: "error",
            title: "For HR Staff Only",
          });
          check = false;
        }
      });
    return check;
  };

  const next = async () => {
    console.log(current, "currentnext");
    if (current === 0 && !validateStep1()) {
      // return;
    } else if (current == 2 && !(await validateStep4())) {
      // console.log("validateStep4");
      return;
    }

    setCurrent(current + 1);
  };

  const prev = () => {
    console.log(current-1, "currentprev");
    if(current-1 == -1){
       showLoading("Loading...");
      window.history.back(); // ย้อนกลับไปยังหน้าก่อนหน้า
      hideLoading();
      return;
    }else{
      setCurrent(current - 1);
    }
    // setCurrent(current - 1);
  };

  const onChange = async (current) => {
    if (current > 0 && !validateStep1()) {
      return;
    }
    if (current == 3 && !(await validateStep4())) {
      return;
    }
    setCurrent(current);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    // padding: "10px",
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    // marginTop: 30,
    // marginRight: 10,
  };



  

  return {
    current,
    onChange,
    items,
    steps,
    formData1,
    setFormData1,
    prev,
    next,
    contentStyle,
    setCurrent,
    // GetdataEdit,
  };
}

export { fn_RefferenceLetter };
