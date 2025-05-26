import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { fn_Header } from "../../Header/fn_Header";
function fn_HrActionRefferenceLetter(formData1, setFormData1) {
  const { showLoading, hideLoading } = useLoading();
  const [Condition, setCondition] = useState([]);
  const { datauser } = fn_Header();
  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  useEffect(() => {
    GetConditionClose();
  }, []);

  useEffect(() => {
    if (
      formData1.Date_HrConfirmAcDate != null &&
      formData1.txt_RecriveById != "" &&
      formData1.txt_RecriveByTel != "" &&
      formData1.Date_RecriveDate != null
    ) {
      handleChange("Rd_HRStatus", "LT0107");
    } else {
      handleChange("Rd_HRStatus", "LT0104");
    }
  }, [
    formData1.Date_HrConfirmAcDate,
    formData1.txt_RecriveById,
    formData1.txt_RecriveByTel,
    formData1.Date_RecriveDate,
  ]);

  const handleStatus = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue, "selectedValue");

    if (selectedValue == "LT0107") {
      if (
        formData1.Date_HrConfirmAcDate == null ||
        formData1.txt_RecriveById == "" ||
        formData1.txt_RecriveByTel == "" ||
        formData1.Date_RecriveDate == null
      ) {
        Swal.fire({
          icon: "warning",
          title: "Cannot be closed",
          text: `Please input Data for close`,
        });
      } else {
        handleChange("Rd_HRStatus", selectedValue);
      }
    } else {
      handleChange("Rd_HRStatus", selectedValue);
    }
  };

  const GetConditionClose = async () => {
    await axios
      .post("/api/RefferenceLetter/GetConditionClose", {})
      .then(async (res) => {
        setCondition(res.data);
      });
  };

  const GetDataPerson = async (ID_Code) => {
    showLoading("");
    await axios
      .post("/api/RefferenceLetter/GetDataPersonByIDCode", {
        Id_Code: ID_Code || "",
      })
      .then((res) => {
        console.log(res.data, "GetDataPerson");
        if (res.data.length === 0) {
          handleChange("txt_RecriveById", "");
          handleChange("txt_RecriveByName", "");
          handleChange("txt_RecriveByJobGrade", "");
          handleChange("txt_RecriveByDepartment", "");
          handleChange("txt_RecriveByEmail", "");
          Swal.fire({
            icon: "warning",
            title: "User not found!",
          });
        } else {
          handleChange("txt_RecriveByName", res.data[0].name_surname);
          handleChange("txt_RecriveByDepartment", res.data[0].dept);
          handleChange("txt_RecriveByJobGrade", res.data[0].jobgrade);
          handleChange("txt_RecriveByEmail", res.data[0].email);
        }
      });
    hideLoading();
  };

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };

  const Save = async (save) => {
    showLoading("กำลังบันทึก...");
    let status = "";
    let Condition = "";
    let lastBy = "";
    let lastDate = null;
    let date_submit = null;
    let HrBy = datauser.LOGIN;
    if (save == "Submit") {
      console.log(formData1,'mmmmmmmmmmmmmm')
      status = formData1.Rd_HRStatus;
      date_submit = DateToday;
      if (formData1.Date_HrConfirmAcDate == null) {
        Swal.fire({
          icon: "warning",
          title: "Please Select confim action date",
        });
        hideLoading()
        return;
      }
    
      if (formData1.txt_RecriveById == "") {
        Swal.fire({
          icon: "warning",
          title: "Please Input Receive By",
        });
        hideLoading()
        return;
      }
      if (formData1.txt_RecriveByTel == "") {
        Swal.fire({
          icon: "warning",
          title: "Please Input Tel",
        });
        hideLoading()
        return;
      }
      if (formData1.Date_RecriveDate == null) {
        Swal.fire({
          icon: "warning",
          title: "Please Select Recrive Date",
        });
        hideLoading()
        return;
      }
    } else if ((save = "SaveDarft")) {
      status = "LT0104";
    }
    if (formData1.Rd_HRStatus == "LT0108") {
      if (formData1.Sl_HrCondion == "") {
        Swal.fire({
          icon: "warning",
          title: "Please Select Condition Close",
        });
        hideLoading()
        return;
      } else {
        Condition = formData1.Sl_HrCondion;
      }
    }
    if (formData1.txt_ReqStatusValue != "LT0103") {
      lastBy = datauser.LOGIN;
      lastDate = DateToday;
    }

    await axios
      .post("/api/RefferenceLetter/UpdateHrStaff", {
        ReqNo:formData1.txt_ReqNo,
        status: status,
        rd_status: formData1.Rd_HRStatus,
        sl_condition: Condition,
        hr_by: HrBy,
        date_confirm: formData1.Date_HrConfirmAcDate
          ? `'${formData1.Date_HrConfirmAcDate}'`
          : null,
        hr_comment: formData1.txt_HrComment,
        receive_by: formData1.txt_RecriveById,
        receive_email: formData1.txt_RecriveByEmail,
        receive_date: formData1.Date_RecriveDate
          ? `'${formData1.Date_RecriveDate}'`
          : null,
        receive_tel: formData1.txt_RecriveByTel,
        lastBy: lastBy,
        last_date: lastDate ? `'${formatDate(lastDate)}'` : null,
        date_submit: date_submit ? `'${formatDate(date_submit)}'` : null,
      })
      .then(async (res) => {

        console.log("UpdateHrStaff", res.data);
      });
      setTimeout(() => {
        hideLoading();
      }, 1000);
      if(save='Submit'){
        window.location.href = "/HrSystem/HrActionRefferenceLetter";
      }

  };

  const formatDate = (dateStr) => {
    let date;
    if (!dateStr) return null;
    const [dd, mm, yyyy] = dateStr.split("/");
    date = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    return date;
  };

  const Reset = () => {
    handleChange("Rd_HRStatus", 'LT0104');
    handleChange("Sl_HrCondion", null);
    handleChange("Date_HrConfirmAcDate", null);
    handleChange("txt_HrComment", null);
    handleChange("txt_RecriveById", '');
    handleChange("txt_RecriveByName", '');
    handleChange("txt_RecriveByJobGrade", '');
    handleChange("txt_RecriveByDepartment", '');
    handleChange("txt_RecriveByEmail", '');
    handleChange("txt_RecriveByTel", '');
    handleChange("Date_RecriveDate", null);
  }
  
  return {
    Condition,
    datauser,
    handleStatus,
    handleChange,
    GetDataPerson,
    Save,
    Reset
  };
}

export { fn_HrActionRefferenceLetter };
