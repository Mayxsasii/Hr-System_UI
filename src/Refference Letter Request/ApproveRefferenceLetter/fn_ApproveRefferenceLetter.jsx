import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";

function fn_ApproveRefferenceLetter(formData1, setFormData1) {
  const { showLoading, hideLoading } = useLoading();
  const [Supervisor, setSupervisor] = useState([]);
  const userlogin = localStorage.getItem("username");
  useEffect(() => {
    GetSupervisor();
  }, []);

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };

  const options = [
    { label: "หนังสือรับรองเงินเดือน", value: "LT0201" },
    { label: "หนังสือรับรองการทำงาน", value: "LT0202" },
    {
      label: "หนังสือรับรองการผ่านงาน (เฉพาะพนักงานที่ลาออก)",
      value: "LT0203",
    },
    { label: "หนังสือผ่านสิทธิสวัสดิการ ธอส.", value: "LT0204" },
    { label: "อื่นๆ (ใส่ชื่อเอกสารที่ต้องการ)", value: "LT0205" },
  ];

  const GetSupervisor = async () => {
    await axios
      .post("/api/RefferenceLetter/GetSupervisorUp", {
        Fac: formData1.txt_FactoryValue,
        Dept: formData1.txt_Department,
      })
      .then((res) => {
        setSupervisor(res.data);
      });
  };

  const SendApprove = async () => {
    showLoading('กำลังบันทึกข้อมูล...')
    if (formData1.CB_letterType.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "Please Select Letter Type",
      });
      hideLoading()
      return;
    } else {
      if (formData1.CB_letterType.includes("LT0203")) {
        if (formData1.Date__Resignation == null) {
          Swal.fire({
            icon: "warning",
            title: "Please Select Resignation Date",
          });
          hideLoading()
          return;
        }
      }
      if (formData1.CB_letterType.includes("LT0205")) {
        if (formData1.txt_LetterOther == "") {
          Swal.fire({
            icon: "warning",
            title: "Please Input Required documents",
          });
          hideLoading()
          return;
        }
      }
    }

    if (formData1.Sl_Supervisor == null) {
      Swal.fire({
        icon: "warning",
        title: "Please Select Supervisor Up",
      });
      hideLoading()
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

    await axios
      .post("/api/RefferenceLetter/InsSendSubmit", {
        ReqNo: ReqNo,
        Fac_value: formData1.txt_FactoryValue,
        Stats_value: formData1.txt_ReqStatusValue,
        ReqBy: formData1.txt_ReqbyID,
        Dept: formData1.txt_Department,
        Tel: formData1.txt_Tel,
        Email: formData1.txt_Email,
        TargetDate: formData1.Date_Target
          ? new Date(formData1.Date_Target).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "",
        Remark: formData1.txt_Remark,
        Supervisor: formData1.Sl_Supervisor || "",
        User: formData1.txt_Userlogin,
      })
      .then((res) => {
        console.log(res.data, "InsSendSubmit");
      });
    let detail = "";
    for (let i = 0; i < formData1.CB_letterType.length; i++) {
      if (formData1.CB_letterType[i].includes("LT0203")) {
        detail = formData1.Date__Resignation;
      }
      if (formData1.CB_letterType[i].includes("LT0205")) {
        detail = formData1.txt_LetterOther;
      }
      await axios
        .post("/api/RefferenceLetter/InsSendSubmit2", {
          ReqNo: ReqNo,
          letter_type: formData1.CB_letterType[i] || "",
          detail: detail || "",
          ReqBy: formData1.txt_ReqbyID || "",
        })
        .then((res) => {
          console.log(res.data, "InsSendSubmit2");
        });
    }
    Swal.fire({
      icon: "success",
      title: "Save Success",
    }).then(() => {

      window.location.href = "/HrSystem/Home";
    });
    hideLoading()
  };

  const Bt_Submit = async () => {
    showLoading('กำลังบันทึกข้อมูล...')
    let nextstatus = "LT0102";
    if (formData1.Rd_SupervisorApprove == null) {
      Swal.fire({
        icon: "warning",
        title: "Please Approve or Reject",
      });
      hideLoading()
      return;
    }
    if (formData1.Rd_SupervisorApprove == "R") {
      if (
        formData1.txt_SupervisorCooment == "" ||
        formData1.txt_SupervisorCooment == null
      ) {
        Swal.fire({
          icon: "warning",
          title: "Please Input Comment.",
        });
        hideLoading()
        return;
      } else {
        nextstatus = "LT0109";
      }
    } else {
      nextstatus = "LT0103";
    }
    await axios
      .post("/api/RefferenceLetter/UpdateSvApprove", {
        ReqNo: formData1.txt_ReqNo,
        Status:nextstatus,
        Sv_Radio: formData1.Rd_SupervisorApprove || "",
        Sv_Comment: formData1.txt_SupervisorCooment || "",
        Sv_by: userlogin || "",
      })
      .then((res) => {
        console.log(res.data, "UpdateSvApprove");
      });
      Swal.fire({
        icon: "success",
        title: "Submit Success",
      }).then(() => {
  
        window.location.href = "/HrSystem/ApproveRefferenceLetter";
      });
      hideLoading()

  };

  const Bt_Reset = async () => {
    console.log("btreset", formData1.txt_ReqStatusValue);
    if (formData1.txt_ReqStatusValue == "LT0101") {
      console.log("เข้านี้่11111");
      handleChange("CB_letterType", []);
      handleChange("Date__Resignation", null);
      handleChange("txt_LetterOther", "");
      handleChange("txt_Remark", "");
      handleChange("Sl_Supervisor", null);
    }
    if (formData1.txt_ReqStatusValue == "LT0102") {
      console.log("เข้านี้่2222");
      handleChange("Rd_SupervisorApprove", null);
      handleChange("txt_SupervisorCooment", "");
    }

  };

  return {
    handleChange,
    options,
    Supervisor,
    SendApprove,
    Bt_Submit,
    Bt_Reset,
  };
}

export { fn_ApproveRefferenceLetter };
