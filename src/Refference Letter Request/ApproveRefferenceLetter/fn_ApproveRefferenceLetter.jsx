import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";

function fn_ApproveRefferenceLetter(formData1, setFormData1) {
  const { showLoading, hideLoading } = useLoading();
  const [Supervisor, setSupervisor] = useState([]);
  const [options, setoptions] = useState([]);
  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  const userlogin = localStorage.getItem("username");
  const typeGH_Bank = [
    "PMG,Permanent Management",
    // "PFF,Permanent Expatiate/Foreigner",
    "PM,Permanent Monthly/Foreigner",
  ];
  useEffect(() => {
    GetSupervisor();
    GetOptionLetter();
  }, []);

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };

  const GetSupervisor = async () => {
    await axios
      .post("/api/RefferenceLetter/GetSupervisorUp", {
        IdCode: formData1.txt_ReqbyID,
        // Dept: formData1.txt_Department,
      })
      .then((res) => {
        setSupervisor(res.data);
      });
  };

  const HandleChange_CheckBoxLetter = async (checkedValues) => {
    console.log("CB", checkedValues);
    if (checkedValues.includes("LT0204")) {
      if (typeGH_Bank.some((type) => formData1.txt_EmpType.includes(type))) {
        handleChange("CB_letterType", checkedValues);
      } else {
        Swal.fire({
          icon: "warning",
          text: "Unable to request documents/ไม่สามารถขอเอกสารได้",
        });
        return;
      }
    }
    handleChange("CB_letterType", checkedValues);
    if (!checkedValues.includes("LT0203")) {
      handleChange("Date_Resignation", null);
    }
    if (!checkedValues.includes("LT0205")) {
      handleChange("txt_LetterOther", "");
    }
  };

  const GetOptionLetter = async () => {
    await axios
      .post("/api/RefferenceLetter/GetOptionLetter", {})
      .then((res) => {
        console.log(res.data, "GetOptionLetter");
        setoptions(res.data);
      });
  };

  const SendApprove = async () => {
    try {
      showLoading("กำลังบันทึกข้อมูล...");
      if (formData1.CB_letterType.length == 0) {
        Swal.fire({
          icon: "warning",
          text: "Please Select Letter Type/กรุณาเลือกประเภทเอกสาร",
        });
        hideLoading();
        return;
      } else {
        if (formData1.CB_letterType.includes("LT0201")) {
          if (
            formData1.txt_LetterThai == "0" &&
            formData1.txt_LetterEng == "0"
          ) {
            Swal.fire({
              icon: "warning",
              // text: "Please Input Number of documents required (Thai/English)/กรุณากรอกจำนวนหนังสือรับเงินเดือนที่ต้องการ (ไทย/อังกฤษ)",
              text: "กรุณากรอกจำนวนหนังสือรับเงินเดือนที่ต้องการ",
            });
            hideLoading();
            return;
          }
        }
         if (formData1.CB_letterType.includes("LT0202")) {
          if (
            formData1.txt_WorkCerThai == "0" &&
            formData1.txt_WorkCerEng == "0"
          ) {
            Swal.fire({
              icon: "warning",
              text: "กรุณากรอกจำนวนหนังสือรับรองการทำงานที่ต้องการ",
            });
            hideLoading();
            return;
          }
        }

        if (formData1.CB_letterType.includes("LT0203")) {
          if (formData1.Date_Resignation == null) {
            Swal.fire({
              icon: "warning",
              text: "กรุณากรอกวันที่ลาออกจากบริษัท",
            });
            hideLoading();
            return;
          }
        }
        if (formData1.CB_letterType.includes("LT0205")) {
          if (formData1.txt_LetterOther == "") {
            Swal.fire({
              icon: "warning",
              text: "กรุณากรอกเอกสารที่ต้องการอื่นๆ",
            });
            hideLoading();
            return;
          }
        }
      }

      if (formData1.Sl_Supervisor == null) {
        Swal.fire({
          icon: "warning",
          text: "Please Select Supervisor Up/กรุณาเลือกหัวหน้างาน",
        });
        hideLoading();
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

      for (let i = 0; i < formData1.CB_letterType.length; i++) {
        let detail = "";
        console.log("formData1.CB_letterType[i]", formData1.CB_letterType[i]);
        if (formData1.CB_letterType[i] == "LT0203") {
          let date = formData1.Date_Resignation;
          const formattedDate = date ? date.split("-").reverse().join("/") : "";
          detail = formattedDate;
        } else if (formData1.CB_letterType[i] == "LT0205") {
          detail = formData1.txt_LetterOther;
        }
        console.log(detail, "hhhhhhh", formData1.CB_letterType[i]);
        await axios
          .post("/api/RefferenceLetter/InsSendSubmit2", {
            ReqNo: ReqNo,
            letter_type: formData1.CB_letterType[i] || "",
            detail: detail || "",
            ReqBy: formData1.txt_ReqbyID || "",
            Thai:
              formData1.CB_letterType[i] == "LT0201" &&
              formData1.txt_LetterThai > 0
                ? formData1.txt_LetterThai
                : formData1.CB_letterType[i] == "LT0202" &&
                  formData1.txt_WorkCerThai > 0
                ? formData1.txt_WorkCerThai
                : null,
            Eng:
              formData1.CB_letterType[i] == "LT0201" &&
              formData1.txt_LetterEng > 0
                ? formData1.txt_LetterEng
                : formData1.CB_letterType[i] == "LT0202" &&
                  formData1.txt_WorkCerEng > 0
                ? formData1.txt_WorkCerEng
                : null,
          })
          .then((res) => {
            console.log(res.data, "InsSendSubmit2");
          });
      }
      await GetDatamailSend(ReqNo);
      Swal.fire({
        icon: "success",
        title: "Save Success",
      }).then(() => {
        window.location.href = "/HrSystem/Home";
      });
      hideLoading();
    } catch (error) {
      console.error("Error in SendApprove:", error);
      Swal.fire({
        icon: "error",
        title: error,
      });
      hideLoading();
      return;
    }
  };

  const Bt_Submit = async () => {
    showLoading("กำลังบันทึกข้อมูล...");
    let nextstatus = "LT0102";
    if (formData1.Rd_SupervisorApprove == null) {
      Swal.fire({
        icon: "warning",
        text : "Please Approve or Reject/กรุณาเลือก Approve หรือ Reject",
      });
      hideLoading();
      return;
    }
    if (formData1.Rd_SupervisorApprove == "R") {
      if (
        formData1.txt_SupervisorComment == "" ||
        formData1.txt_SupervisorComment == null
      ) {
        Swal.fire({
          icon: "warning",
          text: "Please Input Comment/กรุณากรอกความคิดเห็น",
        });
        hideLoading();
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
        Status: nextstatus,
        Sv_Radio: formData1.Rd_SupervisorApprove || "",
        Sv_Comment: formData1.txt_SupervisorComment || "",
        Sv_by: userlogin || "",
      })
      .then((res) => {
        console.log(res.data, "UpdateSvApprove");
      });
    if (formData1.Rd_SupervisorApprove == "A") {
      await GetDatamailSend(formData1.txt_ReqNo);
    }
    Swal.fire({
      icon: "success",
      title: "Submit Success",
    }).then(() => {
      window.location.href = "/HrSystem/ApproveReferenceLetter";
    });
    hideLoading();
  };

  const Bt_Reset = async () => {
    console.log("btreset", formData1.txt_ReqStatusValue);
    if (formData1.txt_ReqStatusValue == "LT0101") {
      console.log("เข้านี้่11111");
      handleChange("CB_letterType", []);
      handleChange("Date_Resignation", null);
      handleChange("txt_LetterOther", "");
      handleChange("txt_Remark", "");
      handleChange("Sl_Supervisor", null);
    }
    if (formData1.txt_ReqStatusValue == "LT0102") {
      console.log("เข้านี้่2222");
      handleChange("Rd_SupervisorApprove", null);
      handleChange("txt_SupervisorComment", "");
    }
  };

  const GetDatamailSend = async (ReqNo) => {
    console.log("GetmailSend", formData1.txt_ReqStatusValue);

    // let ReqNo = formData1.txt_ReqNo;
    let strSubject = "";
    let status = formData1.txt_ReqStatusValue;
    let Usermail = [];
    let Dear = formData1.txt_Userlogin;
    if (status === "LT0101" || status === "LT0102") {
      strSubject = `Please Approve Letter Request : (${ReqNo})`;
      if (status === "LT0101") {
        Dear = `Khun ${formData1.Sl_Supervisor}  (Supervisor up)`;
        await axios
          .post("/api/Common/GetEmailUserOther", {
            user: formData1.Sl_Supervisor,
          })
          .then((res) => {
            console.log("GetEmailSend", res.data);
            if (res.data.length > 0) {
              Usermail = res.data;
            }
          });
      }
      if (status == "LT0102") {
        Dear = "HR Staff";
        await axios
          .post("/api/Common/GetEmailHrStaff", {
            Fac: formData1.txt_FactoryValue,
            formenu: "LETTER",
          })
          .then((res) => {
            console.log(res.data, "GetEmailHrStaff");
            Usermail = res.data;
          });
      }
    } else if (status === "LT0103") {
      await axios
        .post("/api/Common/GetEmailUserOther", {
          user: formData1.Sl_Supervisor,

        })
        .then((res) => {
          console.log("GetEmailSend", res.data);
          if (res.data.length > 0) {
            Usermail = res.data;
          }
        });
      Dear = `All Concern`;
      if (formData1.Rd_HRStatus == "LT0104") {
        strSubject = `Letter Request : (${ReqNo}) On Process`;
      } else if (formData1.Rd_HRStatus == "LT0107") {
        strSubject = `Letter Request : (${ReqNo}) Close`;
      } else if (formData1.Rd_HRStatus == "LT0108") {
        strSubject = `Letter Request : (${ReqNo}) Closed by condition`;
      }
    } else {
      await axios
        .post("/api/Common/GetEmailUserOther", {
          user: formData1.Sl_Supervisor,

        })
        .then((res) => {
          console.log("GetEmailSend", res.data);
          if (res.data.length > 0) {
            Usermail = res.data;
          }
        });
      Dear = `All Concern`;
      if (formData1.Rd_HRStatus == "LT0107") {
        strSubject = `Letter Request : (${ReqNo}) Close`;
      } else if (formData1.Rd_HRStatus == "LT0108") {
        strSubject = `Letter Request : (${ReqNo}) Closed by condition`;
      }
    }

    const fomathtml = await fomatmail(Dear, ReqNo);

    Usermail.forEach((user) => {
      console.log(user.User, "GetEmailSend", user.Email);

      SendEmail(user.Email, strSubject, fomathtml);
    });
  };

  const SendEmail = async (Email, strSubject, fomathtml) => {
    console.log(Email, "SendEmail", strSubject, fomathtml);
    await axios
      .post("/api/Common/EmailSend", {
        strSubject: strSubject,
        strEmailFormat: fomathtml,
        strEmail: Email,
      })
      .then((res) => {
        console.log(res.data, "EmailSend");
      });
  };

  const DataSendmail = () => {
    let status = formData1.txt_ReqStatusValue;
    let statusDesc = "";
    let ActionComment = "";
    if (status === "LT0101") {
      statusDesc = "Wait Supervisor up Approve";
    }
    if (status === "LT0102") {
      ActionComment = formData1.txt_SupervisorComment;
      statusDesc = "Wait HR Staff Action";
    }
    if (status === "LT0103") {
      ActionComment = formData1.txt_HrComment;
      statusDesc = "On Process";
    }
    if (status === "LT0104") {
      ActionComment = formData1.txt_HrComment;
      if (formData1.Radio_HrStatus == "LT0107") {
        statusDesc = "Closed";
      } else if (formData1.Radio_HrStatus == "LT0108") {
        statusDesc = "Closed by HR condition";
      }
    }
    return {
      Status: statusDesc,
      Comment: ActionComment,
    };
  };

  const fomatmail = async (Dear, ReqNo) => {
    const Datamail = DataSendmail();
    console.log(Datamail, "Datamail");
    let status = formData1.txt_ReqStatusValue;
    let TargetDate = formData1.Date_Target
      ? formData1.Date_Target.split("-").reverse().join("/")
      : "";
    const formattedRemark = formData1.txt_Remark.replace(/(.{60})/g, "$1<br>");
    const formattedComment = (Datamail.Comment || "").replace(
      /(.{60})/g,
      "$1<br>"
    );
    let strEmailFormat = "";
    if (status === "LT0101") {
      strEmailFormat = `
               <!DOCTYPE html>
        <html lang="en">
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #dddddd; background-color: #ffffff;">
        <!-- Header -->
        <tr>
        <td align="center" bgcolor="#5F99AE" style="padding: 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
                                HR Online System Notification
        </td>
        </tr>
        <!-- Content -->
        <tr>
        <td style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.5;">
        <p>Dear ${Dear} ,</p>
        <p>
                                  This Request creates as follow ${formData1.txt_Userlogin}
        </p>
        <!-- Details -->
        <table width="100%" border="0" cellpadding="10" cellspacing="0" style="background-color: #f9f9f9; border: 1px solid #dddddd; margin: 20px 0;">
        <tr>
        <td  style="font-size: 20px; color: #555555; font-weight: bold;width:120px " colspan="2" >
        <p><strong>รายละเอียด :</strong></p>
        </td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;width:120px ">System :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">HR Online >> Reference Letter</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">RequestNo.:</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${ReqNo}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Factory :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_Factory}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Department :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_Department}</td>
        </tr>

        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Target Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${TargetDate}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_Userlogin}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqDate}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_Userlogin}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_Sendate}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Remark :</td>
        <td style="font-size: 14px; color: #333333; text-align: left; ">
            ${formattedRemark}
        </td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Status :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${Datamail.Status}</td>
        </tr>
        </table>
        <p>
                                    กรุณาตรวจสอบข้อมูลผ่านระบบของคุณ และดำเนินการต่อให้เรียบร้อย
        </p>
        <!-- Button -->
        <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0;">
        <tr>
        <td align="center" bgcolor="#5F99AE" style="padding: 12px 25px; border-radius: 5px;">
        <a href="http://10.17.100.183:4006/HrSystem/Home" style="text-decoration: none; color: #ffffff; font-size: 16px; font-weight: bold; display: inline-block;">
                                ตรวจสอบรายการ
        </a>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        <!-- Footer -->
        <tr>
        <td align="center" bgcolor="#e4e4e7" style="padding: 15px; font-size: 12px; color: #777777;">
                                                    Best Regards,<br/>
                                © 2025 Fujikura Electronics (Thailand) Ltd. All rights reserved.
        </td>
        </tr>
        </table>
        </body>
        </html>`;
    } else {
      strEmailFormat = `
      <!DOCTYPE html>
        <html lang="en">
        
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #dddddd; background-color: #ffffff;">
        <!-- Header -->
        <tr>
        <td align="center" bgcolor="#5F99AE" style="padding: 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
                                HR Online System Notification
        </td>
        </tr>
        <!-- Content -->
        <tr>
        <td style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.5;">
        <p>Dear ${Dear} ,</p>
        <p>
                                  This Request creates as follow ${
                                    formData1.txt_Userlogin
                                  }
        </p>
        <!-- Details -->
        <table width="100%" border="0" cellpadding="10" cellspacing="0" style="background-color: #f9f9f9; border: 1px solid #dddddd; margin: 20px 0;">
        <tr>
        <td  style="font-size: 20px; color: #555555; font-weight: bold;width:120px " colspan="2" >
        <p><strong>รายละเอียด :</strong></p>
        </td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;width:120px ">System :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">HR Online >> Reference Letter</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">RequestNo.:</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_ReqNo
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Factory :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_Factory
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Department :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_Department
        }</td>
        </tr>

        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Target Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${TargetDate}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_Userlogin
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_ReqDate
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_Userlogin
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_SendDate
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Remark :</td>
        <td style="font-size: 14px; color: #333333; text-align: left; ">
            ${formattedRemark}
        </td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Last Action By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${userlogin}</td>
        </tr>
                  <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Last Action Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${DateToday}</td>
        </tr>
                            <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Last Action Comment :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formattedComment || ""
        }</td>
        </tr>
                  <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Status :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          Datamail.Status
        }</td>
        </tr>
        </table>
        <p>
                                    กรุณาตรวจสอบข้อมูลผ่านระบบของคุณ และดำเนินการต่อให้เรียบร้อย
        </p>
        <!-- Button -->
        <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0;">
        <tr>
        <td align="center" bgcolor="#5F99AE" style="padding: 12px 25px; border-radius: 5px;">
        <a href="http://10.17.100.183:4006/HrSystem/Home" style="text-decoration: none; color: #ffffff; font-size: 16px; font-weight: bold; display: inline-block;">
                                ตรวจสอบรายการ
        </a>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        <!-- Footer -->
        <tr>
        <td align="center" bgcolor="#e4e4e7" style="padding: 15px; font-size: 12px; color: #777777;">
                                                    Best Regards,<br/>
                                © 2025 Fujikura Electronics (Thailand) Ltd. All rights reserved.
        </td>
        </tr>
        </table>
        </body>
        </html>
      `;
    }
    return strEmailFormat;
  };

  return {
    handleChange,
    options,
    Supervisor,
    SendApprove,
    Bt_Submit,
    Bt_Reset,
    HandleChange_CheckBoxLetter,
  };
}

export { fn_ApproveRefferenceLetter };
