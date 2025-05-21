import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";

function fn_NewRefferenceLetter(formData1, setFormData1, Disable, setDisable) {
  const { showLoading, hideLoading } = useLoading();

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
  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };

  const GenReqNo = async () => {
    if (formData1.txt_ReqbyID == "") {
      Swal.fire({
        icon: "error",
        title: "Please Input Requested By",
      });
      return;
    }
    if(formData1.txt_Email == "") {
      Swal.fire({
        icon: "error",
        title: "Please Input Email",
      });
      return;
    }
    if(formData1.Date_Target == "") {
        Swal.fire({
          icon: "error",
          title: "Please Select Target Date",
        });
        return;
      }
    if(formData1.txt_Tel == "") {
      Swal.fire({
        icon: "error",
        title: "Please Input Tel",
      });
      return;
    }

    let ReqNo = "";
    await axios
      .post("/api/RefferenceLetter/GenReqNo", {
        FacValue: formData1.txt_FactoryValue,
        FacDesc: formData1.txt_Factory,
      })
      .then((res) => {
        console.log(res.data, "GenReqNo");
        ReqNo = res.data[0].ReqNo;
        handleChange("txt_ReqNo", ReqNo);
      });
  };
  return { GetDataPerson, GenReqNo };
}

export { fn_NewRefferenceLetter };
