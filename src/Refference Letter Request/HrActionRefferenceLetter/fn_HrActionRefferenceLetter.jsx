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
    const DateToday2 = `${today.getFullYear()}-${String(
    today.getMonth() + 1 //YYYY-MM-DD
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const userlogin = localStorage.getItem("username");

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
      GetDatamailSend(formData1.txt_ReqNo);
      setTimeout(() => {
        hideLoading();
      }, 1000);
      if(save='Submit'){
        // window.location.href = "/HrSystem/HrActionRefferenceLetter";
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
          .post("/api/Common/GetEmailUser", {
            user: formData1.Sl_Supervisor,
            formenu: "LETTER",
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
        .post("/api/Common/GetEmailUser", {
          user: formData1.Sl_Supervisor,
          formenu: "LETTER",
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
        .post("/api/Common/GetEmailUser", {
          user: formData1.Sl_Supervisor,
          formenu: "LETTER",
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
      if (formData1.Rd_HRStatus == "LT0107") {
        statusDesc = "Closed";
      } else if (formData1.Rd_HRStatus == "LT0108") {
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
        <p>Dear Khun ${Dear} ,</p>
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
        <td style="font-size: 14px; color: #333333; text-align: left;">HR Online >> Refference Letter</td>
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
        <td style="font-size: 14px; color: #333333; text-align: left;">HR Online >> Refference Letter</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">RequestNo.:</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqNo}</td>
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
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_SendDate}</td>
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
        <td style="font-size: 14px; color: #333333; text-align: left;">${Datamail.Comment}</td>
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
        </html>
      `;
    }
    return strEmailFormat;
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
    handleChange("Date_HrConfirmAcDate", DateToday2);
    handleChange("txt_HrComment", null);
    handleChange("txt_RecriveById", '');
    handleChange("txt_RecriveByName", '');
    handleChange("txt_RecriveByJobGrade", '');
    handleChange("txt_RecriveByDepartment", '');
    handleChange("txt_RecriveByEmail", '');
    handleChange("txt_RecriveByTel", '');
    handleChange("Date_RecriveDate", DateToday2);
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
