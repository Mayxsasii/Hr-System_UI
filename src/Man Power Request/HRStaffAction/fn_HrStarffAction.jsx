import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { fn_Header } from "../../Header/fn_Header";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
function fn_HrStarffAction(formData1, setFormData1) {
  const { datauser } = fn_Header();
  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  const { showLoading, hideLoading } = useLoading();
  const [ConditionClose, setConditionClose] = useState([]);
  const [Factory, setFactory] = useState([]);
  const userlogin = localStorage.getItem("username");

  useEffect(() => {
    GetCondition();
    GetFactory();
    CheckRemain();
  }, []);

  useEffect(() => {
    if (formData1.txt_TotalRemain == 0) {
      handleChange("Radio_HrStatus", "MR0107");
    } else {
      handleChange("Radio_HrStatus", "MR0106");
    }
  }, [formData1.txt_TotalRemain]);

  const GetCondition = async () => {
    await axios
      .post("/api/RequestManPower/GetConditionForClose", {})
      .then((res) => {
        console.log(res.data, "GetConditionForClose");
        setConditionClose(res.data);
      });
  };

  const GetFactory = async () => {
    await axios
      .post("/api/RequestManPower/GetFactory", { User_login: userlogin || "" })
      .then((res) => {
        console.log(res.data, "GetFactory");
        setFactory(res.data);
      });
  };

  const GetUserJoin = async (IdCode, index, Reason) => {
    await axios
      .post("/api/RequestManPower/GetUserJoinHr", { IdCode: IdCode || "" })
      .then((res) => {
        console.log(res.data, "GetUserJoinHr");
        if (res.data.length > 0) {
          if (Reason == "Sub") {
            handleChangeHr_Sub(index, "Emp_name", res.data[0].Name);
            handleChangeHr_Sub(index, "Emp_sername", res.data[0].Sername);
            handleChangeHr_Sub(index, "Emp_JoinDate", res.data[0].JoinDate);
          } else if (Reason == "Add") {
            handleChangeHr_Add(index, "Emp_name", res.data[0].Name);
            handleChangeHr_Add(index, "Emp_sername", res.data[0].Sername);
            handleChangeHr_Add(index, "Emp_JoinDate", res.data[0].JoinDate);
          }
        } else {
          if (Reason == "Sub") {
            handleChangeHr_Sub(index, "Emp_id", "");
            handleChangeHr_Sub(index, "Emp_name", "");
            handleChangeHr_Sub(index, "Emp_sername", "");
            handleChangeHr_Sub(index, "Emp_JoinDate", "");
          } else if (Reason == "Add") {
            handleChangeHr_Add(index, "Emp_id", "");
            handleChangeHr_Add(index, "Emp_name", "");
            handleChangeHr_Add(index, "Emp_sername", "");
            handleChangeHr_Add(index, "Emp_JoinDate", "");
          }

          Swal.fire({
            icon: "warning",
            title: "Not Found User!",
          });
          return;
        }
      });
  };

  const CheckRemain = async () => {
    const totalCompletedSub = formData1.Hr_Sub.filter(
      (person) => person.CB_Complete
    ).length;
    const totalCompletedAdd = formData1.Hr_Add.filter(
      (person) => person.CB_Complete
    ).length;
    const totalRequested =
      formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional;
    const totalRemain =
      totalRequested - (totalCompletedSub + totalCompletedAdd);
    console.log(
      `Completed Sub: ${totalCompletedSub}, Completed Add: ${totalCompletedAdd}`
    );
    console.log(`Total Remain: ${totalRemain}`);
    handleChange("txt_TotalRemain", totalRemain);
    if (totalRemain == 0) {
      handleChange("Radio_HrStatus", "MR0107");
    }
  };

  const Save = async (save) => {
    console.log(formData1.txt_TotalRemain, "checksave");
    console.log(save == "" ? formData1.Radio_HrStatus : "MR0106", "Req_Status");
    showLoading("กำลังบันทึกข้อมูล...");
    await axios
      .post("/api/RequestManPower/SaveDarftHr", {
        ReqNo: formData1.txt_ReqNo,
        UpdateBy: formData1.ID_Status == "MR0105" ? datauser.LOGIN : "",
        UpdateByLast: datauser.LOGIN,
        Radio_Status: formData1.Radio_HrStatus || "",
        Req_Status: save == "" ? formData1.Radio_HrStatus : "MR0106",
        Sl_Condition: formData1.Sl_HrCloseBy || "",
        txt_Comment: formData1.txt_HrComment || "",
        Cb_AttFile: formData1.CB_HrFileAttach ? "Y" : "N",
        txt_TotalComplete:
          formData1.txt_TotalSubstitube +
            formData1.txt_TotalAdditional -
            formData1.txt_TotalRemain >
          0
            ? formData1.txt_TotalSubstitube +
              formData1.txt_TotalAdditional -
              formData1.txt_TotalRemain
            : null,
        FileName: formData1.Hr_NameFileOther || "",
      })
      .then((res) => {
        console.log(res.data, "SaveDarftHr0");
      });
    console.log(formData1.Hr_Sub, "mayyy11111");
    if (formData1.Hr_NameFileOther != "") {
      await UploadFile(formData1.Hr_DataFileOther, "mrh_hrs_fileserver");
    }
    for (let i = 0; i < formData1.Hr_Add.length; i++) {
      const Rec_id = `A${String(i + 1).padStart(2, "0")}`;
      // if (formData1.Hr_Add[i].CB_Complete == true) {
      await axios
        .post("/api/RequestManPower/UpdateUserJoin", {
          FlgComplete: formData1.Hr_Add[i].CB_Complete ? "Y" : "",
          EmpID: formData1.Hr_Add[i].Emp_id || "",
          EmpName: formData1.Hr_Add[i].Emp_name || "",
          EmpSurName: formData1.Hr_Add[i].Emp_sername || "",
          EmpJoinDate: formData1.Hr_Add[i].Emp_JoinDate || null,
          UpdateBy: datauser.LOGIN,
          ReqNo: formData1.txt_ReqNo,
          RecId: Rec_id,
        })
        .then((res) => {
          console.log(res.data, "SaveDarftHr1");
        });
      // }
    }
    for (let i = 0; i < formData1.Hr_Sub.length; i++) {
      const Rec_id = `S${String(i + 1).padStart(2, "0")}`;
      // if (formData1.Hr_Sub[i].CB_Complete == true) {
      await axios
        .post("/api/RequestManPower/UpdateUserJoin", {
          FlgComplete: formData1.Hr_Sub[i].CB_Complete ? "Y" : "",
          EmpID: formData1.Hr_Sub[i].Emp_id || "",
          EmpName: formData1.Hr_Sub[i].Emp_name || "",
          EmpSurName: formData1.Hr_Sub[i].Emp_sername || "",
          EmpJoinDate: formData1.Hr_Sub[i].Emp_JoinDate || null,
          UpdateBy: datauser.LOGIN,
          ReqNo: formData1.txt_ReqNo,
          RecId: Rec_id,
        })
        .then((res) => {
          console.log(res.data, "SaveDarftHr2");
        });
      // }
      // }
    }
    Swal.fire({
      icon: "success",
      title: save == "" ? "Submit Success" : "Save Success",
    }).then(async () => {
      if (formData1.ID_Status == "MR0105") {
        await GetmailSend("On Process");
      } else {
        if (save == "") {
          //submit
          if (formData1.Radio_HrStatus == "MR0107") {
            await GetmailSend("Closed");
          } else if (formData1.Radio_HrStatus == "MR0108") {
            await GetmailSend("Closed by condition");
          }
        }
      }
      window.location.href = "/HrSystem/HrActionManPowerRequest";
      // }
    });

    hideLoading();
  };

  const GetmailSend = async (StatusDesc) => {
    await axios
      .post("/api/Common/GetEmailUser", {
        user: [formData1.txt_ReqBy],
        formenu:'MAN POWER'
      })
      .then((res) => {
        if (res.data.length > 0) {
          res.data.forEach((user) => {
            console.log(user.User, "GetEmailSend", user.Email);
            SendEmail(user.User, user.Email, StatusDesc);
          });
        }
      });
  };

  const SendEmail = async (Dear, Email, StatusDesc) => {
    const fomathtml = fomatmail(Dear, StatusDesc);
    let ReqNo = formData1.txt_ReqNo;
    await axios
      .post("/api/Common/EmailSend", {
        strSubject: `HR Man Power request : ${ReqNo} ${StatusDesc}`,
        strEmailFormat: fomathtml,
        strEmail: Email,
      })
      .then((res) => {
        console.log(res.data, "EmailSend");
      });
  };

  const fomatmail = (Dear, StatusDesc) => {
    const factory = Factory.find((f) => f.value === formData1.SL_Factory);
    const formattedRemark = formData1.txt_Remark.replace(/(.{60})/g, "$1<br>");
    let strEmailFormat = "";
    let Position = `${formData1.SL_Position} ${
      formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional
    } PERSON`;
    const formattedComment = (Datamail.Comment || "").replace(/(.{60})/g, "$1<br>");
    strEmailFormat = `   <!DOCTYPE html>
        <html lang="en">
        
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #dddddd; background-color: #ffffff;">
        <!-- Header -->
        <tr>
        <td align="center" bgcolor="#4caf50" style="padding: 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
                                HR Online System Notification
        </td>
        </tr>
        <!-- Content -->
        <tr>
        <td style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.5;">
        <p>Dear Khun ${Dear} ,</p>
        <p>
                                  This Request creates as follow ${
                                    formData1.txt_ReqBy
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
        <td style="font-size: 14px; color: #333333; text-align: left;">HR Online >> Man Power</td>
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
          factory.label
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Department :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.SL_Department
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Position :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${Position}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Target Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.Date_Target
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_ReqBy
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
        <td style="font-size: 14px; color: #333333; text-align: left;">${userlogin}</td>
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
          formattedComment|| ""
        }</td>
        </tr>
                  <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Status :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${StatusDesc}</td>
        </tr>
        </table>
        <p>
                                    กรุณาตรวจสอบข้อมูลผ่านระบบของคุณ และดำเนินการต่อให้เรียบร้อย
        </p>
        <!-- Button -->
        <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0;">
        <tr>
        <td align="center" bgcolor="#4caf50" style="padding: 12px 25px; border-radius: 5px;">
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

    return strEmailFormat;
  };

  const Submit = async () => {
    if (
      formData1.Radio_HrStatus == "MR0107" ||
      formData1.Radio_HrStatus == "MR0108"
    ) {
      if (formData1.Radio_HrStatus == "MR0108" && !formData1.Sl_HrCloseBy) {
        Swal.fire({
          icon: "warning",
          title: "Cannot be submit",
          text: `Please Select Condition`,
        });
        return;
      } else if (
        formData1.Radio_HrStatus == "MR0108" &&
        formData1.Sl_HrCloseBy
      ) {
        //close by condition
        Save("");
      } else if (formData1.Radio_HrStatus == "MR0107") {
        console.log("กงนี้0001");
        //close
        if (formData1.txt_TotalRemain == 0) {
          //Remain 0
          let isValid = true;

          if (formData1.txt_TotalSubstitube > 0) {
            formData1.Hr_Sub.some((person) => {
              console.log(person, "person0");
              if (!person.Emp_id) {
                Swal.fire({
                  icon: "warning",
                  title: "Cannot be submit",
                  text: `Please Input Name`,
                });
                isValid = false;
                return true;
              } else if (!person.Emp_name) {
                Swal.fire({
                  icon: "warning",
                  title: "Cannot be submit",
                  text: `Please Input Name`,
                });
                isValid = false;
                return true;
              } else if (!person.Emp_sername) {
                Swal.fire({
                  icon: "warning",
                  title: "Cannot be submit",
                  text: `Please Input Sername`,
                });
                isValid = false;
                return true;
              } else if (!person.Emp_JoinDate) {
                Swal.fire({
                  icon: "warning",
                  title: "Cannot be submit",
                  text: `Please Input Sername`,
                });
                isValid = false;
                return true;
              }
            });
          }
          if (formData1.txt_TotalAdditional > 0) {
            formData1.Hr_Add.some((person) => {
              console.log(person, "person0");
              if (person.Emp_name === "") {
                Swal.fire({
                  icon: "warning",
                  title: "Cannot be submit",
                  text: `Please Input Name`,
                });
                isValid = false;
                return true;
              } else if (person.Emp_sername === "") {
                Swal.fire({
                  icon: "warning",
                  title: "Cannot be submit",
                  text: `Please Input Sername`,
                });
                isValid = false;
                return true;
              }
            });
          }

          if (isValid) {
            Save("");
          } else {
            return;
          }
        }
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Cannot be submit",
        text: `Please Select Close or Close by condition`,
      });
      return;
    }
  };

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const allowedExtensions = ["xls", "xlsx", "pdf"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      Swal.fire({
        title: "รองรับเฉพาะไฟล์ .xls, .xlsx, .pdf เท่านั้น",
        icon: "warning",
      });
      return;
    }
    const maxFileSize = 10 * 1024 * 1024;
    if (file.size > maxFileSize) {
      Swal.fire({
        title: "ไฟล์ต้องมีขนาดไม่เกิน 10 MB",
        icon: "warning",
      });
      return;
    }
    if (file) {
      handleChange("Hr_FileAttach", file.name);
      handleChange("Hr_DataFileAttach", file);
    }
  };

  const handleFileOtherChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const allowedExtensions = ["xls", "xlsx", "pdf"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      Swal.fire({
        title: "รองรับเฉพาะไฟล์ .xls, .xlsx, .pdf เท่านั้น",
        icon: "warning",
      });
      return;
    }
    const maxFileSize = 10 * 1024 * 1024;
    if (file.size > maxFileSize) {
      Swal.fire({
        title: "ไฟล์ต้องมีขนาดไม่เกิน 10 MB",
        icon: "warning",
      });
      return;
    }
    if (file) {
      handleChange("Hr_NameFileOther", file.name);
      handleChange("Hr_DataFileOther", file);
    }
  };

  const ManualCompleted = (e) => {
    const inputManual = e;
    console.log(inputManual, "inputManual");
    const TotalReq =
      formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional;
    handleChange("txt_TotalManual", inputManual);
    if (formData1.CB_HrFileAttach) {
      if (inputManual > TotalReq) {
        Swal.fire({
          icon: "warning",
          title: "กรุณากรอกจำนวนให้ถูกต้อง",
          text: "จำนวนที่กรอกต้องน้อยกว่าหรือเท่ากับจำนวน Total Request",
        });
        handleChange("txt_TotalManual", 0);
      } else {
        handleChange("txt_TotalRemain", TotalReq - inputManual);
      }
    }
  };

  const handleStatus = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue, "selectedValue");
   if (selectedValue != "MR0108") {
      handleChange("Sl_HrCloseBy", null);
    }
    if (selectedValue == "MR0107") {
      if (formData1.txt_TotalRemain != 0) {
        Swal.fire({
          icon: "warning",
          title: "Cannot be closed",
          text: `${formData1.txt_TotalRemain} person still remaining in the request.`,
        });
      } else {
        handleChange("Radio_HrStatus", e.target.value);
      }
    } else {
      handleChange("Radio_HrStatus", e.target.value);
    }
  };

  const handleChangeHr_Add = (index, field, value) => {
    const newPersonSub = [...formData1.Hr_Add];
    newPersonSub[index][field] = value;
    setFormData1({ ...formData1, Hr_Add: newPersonSub });
  };

  const handleChangeHr_Sub = (index, field, value) => {
    const newPersonSub = [...formData1.Hr_Sub];
    newPersonSub[index][field] = value;
    setFormData1({ ...formData1, Hr_Sub: newPersonSub });
  };

  const CB_AttachFile = (e) => {
    if (e.target.checked == false) {
      setFormData1({ ...formData1, CB_HrFileAttach: e.target.checked });
      handleChange(
        "txt_TotalRemain",
        formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional
      );
    } else {
      Swal.fire({
        title: "Do you  want to Attach file?",
        text: "If you confirm, all the information you filled in the form will be cleared",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          setFormData1({
            ...formData1,
            CB_HrFileAttach: e.target.checked,
            Hr_FileAttach: "",
            // Hr_FileAttachServer: "",
            Hr_DataFileAttach: null,
            txt_TotalManual: 0,
            txt_TotalRemain:
              formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional,
            //เคลียค่าต่างๆใน form
            Hr_Add: Array.from(
              { length: formData1.txt_TotalAdditional },
              () => ({
                Emp_id: "",
                Emp_name: "",
                Emp_sername: "",
                Emp_JoinDate: null,
              })
            ),
            Hr_Sub: Array.from(
              { length: formData1.txt_TotalSubstitube },
              () => ({
                Emp_id: "",
                Emp_name: "",
                Emp_sername: "",
                Emp_JoinDate: null,
              })
            ),
          });
          const input = document.getElementById("fileInputHr");
          if (input) input.value = "";
        }
      });
    }
  };

  const CheckComplete = (e, index) => {
    const isChecked = e.target.checked;
    const newHrSub = [...formData1.Hr_Sub];
    console.log(newHrSub, "newHrSub");

    if (newHrSub[index]) {
      newHrSub[index].CB_Complete = isChecked;
      if (isChecked) {
        console.log(`Checkbox at index ${index} is checked.`);
        handleChange("txt_TotalRemain", formData1.txt_TotalRemain - 1);
      } else {
        console.log(`Checkbox at index ${index} is unchecked.`);
        newHrSub[index].Emp_id = "";
        newHrSub[index].Emp_name = "";
        newHrSub[index].Emp_sername = "";
        newHrSub[index].Emp_JoinDate = null;
        //  -----------------------------------------------
        // handleChangeHr_Sub(index, "Emp_id", "");
        // handleChangeHr_Sub(index, "Emp_name", "");
        // handleChangeHr_Sub(index, "Emp_sername", "");
        // handleChangeHr_Sub(index, "Emp_JoinDate", null);
        handleChange("txt_TotalRemain", formData1.txt_TotalRemain + 1);
      }
      setFormData1((prev) => ({ ...prev, Hr_Sub: newHrSub }));
    }
  };

  const CheckCompleteAdd = (e, index) => {
    const isChecked = e.target.checked;
    const newHr_Add = [...formData1.Hr_Add];
    console.log(newHr_Add, "newHr_Add");

    if (newHr_Add[index]) {
      newHr_Add[index].CB_Complete = isChecked;
      if (isChecked) {
        console.log(`Checkbox at index ${index} is checked.`);
        handleChange("txt_TotalRemain", formData1.txt_TotalRemain - 1);
      } else {
        console.log(`Checkbox at index ${index} is unchecked.`);
        // handleChangeHr_Add(index, "Emp_id", "");
        // handleChangeHr_Add(index, "Emp_name", "");
        // handleChangeHr_Add(index, "Emp_sername", "");
        // handleChangeHr_Add(index, "Emp_JoinDate", null);
        newHr_Add[index].Emp_id = "";
        newHr_Add[index].Emp_name = "";
        newHr_Add[index].Emp_sername = "";
        newHr_Add[index].Emp_JoinDate = null;
        handleChange("txt_TotalRemain", formData1.txt_TotalRemain + 1);
      }
      setFormData1((prev) => ({ ...prev, Hr_Add: newHr_Add }));
    }
  };

  const DownloadFileforUpload = async () => {
    console.log(formData1.Person_Sub[0].Dept, formData1.Person_ADD[0].Dept);
    if (
      formData1.Person_Sub[0].Dept == null &&
      formData1.Person_ADD[0].Dept == null
    ) {
      Swal.fire({
        icon: "warning",
        title: "Not Found Data!!!",
      });
      return;
    }
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    const headers = [
      "#",
      "Add/Substitube",
      "EmpID Old",
      "Emp Name Old",
      "Emp Dept. Old",
      "Emp Job Grade Old",
      "For Dept",
      "Request Job Grade",
      "IDCode New",
    ];

    worksheet.addRow(headers);
    if (formData1.Person_Sub[0].Dept != null) {
      formData1.Person_Sub?.forEach((item, index) => {
        worksheet.addRow([
          index + 1,
          "Substitube",
          item.ID_Code || "",
          item.Emp_Name || "",
          item.Cost_Center || "",
          item.Job_grade || "",
          item.Dept || "",
          (item.Req_Jobgrade || []).join(", "),
          "",
        ]);
      });
    }
    if (formData1.Person_ADD[0].Dept != null) {
      formData1.Person_ADD?.forEach((item, index) => {
        worksheet.addRow([
          index + 1 + (formData1.Person_Sub?.length || 0),
          "Add",
          "-",
          "-",
          "-",
          "-",
          item.Dept || "",
          (item.Req_Jobgrade || []).join(", "),
          "",
        ]);
      });
    }

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        // กำหนดสไตล์ให้กับหัวตาราง
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "F79646" }, // สีพื้นหลัง #f79646
          };
          cell.font = {
            bold: true,
            color: { argb: "FFFFFFFF" }, // สีข้อความสีขาว
          };
          cell.alignment = { horizontal: "center", vertical: "middle" }; // จัดข้อความให้อยู่ตรงกลาง
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          }; // เพิ่มเส้นขอบบางให้กับเซลล์
        });
      } else {
        const cell = row.getCell(2);
        const addOrSub = cell.value;

        if (addOrSub === "Substitube") {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "B8CCE4" },
          };
        } else if (addOrSub === "Add") {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "D8E4BC" },
          };
        }

        // จัดข้อความให้อยู่ตรงกลาง
        cell.alignment = { horizontal: "center", vertical: "middle" };

        // เพิ่มเส้นขอบให้กับเซลล์ในคอลัมน์ที่ 2
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        // กำหนดสีพื้นหลังให้กับคอลัมน์ที่ 3 ถึง 8
        for (let col = 3; col <= 8; col++) {
          const targetCell = row.getCell(col);
          targetCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FCD5B4" }, // สีพื้นหลัง rgb(252, 213, 180)
          };
          targetCell.alignment = { horizontal: "center", vertical: "middle" }; // จัดข้อความให้อยู่ตรงกลาง
          targetCell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          }; // เพิ่มเส้นขอบบางให้กับเซลล์
        }
      }
      worksheet.columns = headers.map((header, index) => {
        const maxLength = Math.max(
          header.length, // ความยาวของหัวตาราง
          ...worksheet
            .getColumn(index + 1)
            .values.filter((value) => value) // กรองค่า null หรือ undefined
            .map((value) => value.toString().length) // แปลงเป็น string และคำนวณความยาว
        );
        return { width: maxLength + 2 }; // เพิ่มระยะเผื่อ 2 หน่วย
      });
      // เพิ่มเส้นขอบให้กับทุกเซลล์ในแถว
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "FileForUploadManPower.xlsx";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const ReadFile = () => {
    showLoading("กำลังอ่านไฟล์...");
    const file = formData1.Hr_DataFileAttach;
    if (!file) {
      Swal.fire({
        title: "กรุณาเลือกไฟล์",
        icon: "warning",
      });
      hideLoading();
      return;
    }
    console.log(file, "fileeeeeeee");
    // handleChange('txt_FileNameReadData',file.name)
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: false,
      });

      const groupedData = [];
      let currentGroup = [];

      jsonData.forEach((row) => {
        const first = row[0]; // ค่าของคอลัมน์แรกในแถว

        // ถ้าเจอแถวที่เริ่มด้วยตัวเลข -> เริ่มกลุ่มใหม่
        if (!isNaN(first) && first !== null && first !== undefined) {
          if (currentGroup.length > 0) {
            groupedData.push(currentGroup); // เก็บกลุ่มเก่าไว้ก่อน
          }
          currentGroup = [row]; // เริ่มกลุ่มใหม่ด้วยแถวปัจจุบัน
        } else if (currentGroup.length > 0) {
          currentGroup.push(row); // ต่อท้ายกลุ่มล่าสุด
        }
      });

      if (currentGroup.length > 0) {
        groupedData.push(currentGroup);
      }
      console.log(groupedData, "currentGroup");
      let subdata = [];
      let adddata = [];

      if (groupedData.length > 0) {
        groupedData.map((item) => {
          console.log(item[0][1], "item[0][1]");
          if (item[0][1] == "Substitube") {
            console.log("Substitube", item);
            subdata.push(item);
          } else if (item[0][1] == "Add") {
            console.log("Additional", item);
            adddata.push(item);
          }
        });
      }
      console.log(subdata, "subdata");
      console.log(adddata, "adddata");
      if (subdata.length <= 0 || subdata.length <= 0) {
        Swal.fire({
          title: "ไฟล์ไม่ถูกต้อง",
          icon: "warning",
        });
        hideLoading();
        return;
      }
      if (subdata.length > 0) {
        for (let i = 0; i < subdata.length; i++) {
          let dataPerson = subdata[i][0];
          // const personIndex = i - 1;
          console.log(subdata[i], "EmpNew");
          console.log(formatDate(dataPerson[11]), "Empid new", dataPerson[11]);
          if (dataPerson[8] != "") {
            // if(dataPerson[9] != ''  || dataPerson[10]!= '') {

            // }
      
            handleChangeHr_Sub(i, "CB_Complete", true);
            handleChangeHr_Sub(i, "Emp_id", dataPerson[8]);
            await GetUserJoinExcel(dataPerson[8], i,'Sub');
            // handleChangeHr_Sub(i, "Emp_name", dataPerson[9]);
            // handleChangeHr_Sub(i, "Emp_sername", dataPerson[10]);
            // handleChangeHr_Sub(i, "Emp_JoinDate", formatDate(dataPerson[11]));
          }
        }
      }
      if (adddata.length > 0) {
        for (let i = 0; i < adddata.length; i++) {
          let dataPerson = adddata[i][0];
          // const personIndex = i - 1;
          console.log(adddata[i], "EmpNew");
          console.log(formatDate(dataPerson[11]), "Empid new");
          if (dataPerson[8] != "") {
            
            handleChangeHr_Add(i, "CB_Complete", true);
            handleChangeHr_Add(i, "Emp_id", dataPerson[8]);
            await GetUserJoinExcel(dataPerson[8], i,'Add');
            // handleChangeHr_Add(i, "Emp_name", dataPerson[9]);
            // handleChangeHr_Add(i, "Emp_sername", dataPerson[10]);
            // handleChangeHr_Add(i, "Emp_JoinDate", formatDate(dataPerson[11]));
          }
        }
      }
      CheckRemain();
      hideLoading();
    };

    reader.readAsArrayBuffer(file);
  };

  const GetUserJoinExcel = async (IdCode, index, Reason) => {
    console.log(IdCode, index, Reason,'GetUserJoinExcel')
    await axios
      .post("/api/RequestManPower/GetUserJoinHr", { IdCode: IdCode || "" })
      .then((res) => {
        console.log(res.data, "GetUserJoinHr");
        if (res.data.length > 0) {
          if ((Reason == "Sub")) {
            handleChangeHr_Sub(index, "Emp_name", res.data[0].Name);
            handleChangeHr_Sub(index, "Emp_sername", res.data[0].Sername);
            handleChangeHr_Sub(index, "Emp_JoinDate", res.data[0].JoinDate);
          } else if (Reason == "Add") {
            handleChangeHr_Add(index, "Emp_name", res.data[0].Name);
            handleChangeHr_Add(index, "Emp_sername", res.data[0].Sername);
            handleChangeHr_Add(index, "Emp_JoinDate", res.data[0].JoinDate);
          }
        }
      });
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString.split("/").length !== 3) return ""; // ตรวจสอบความถูกต้องของรูปแบบ

    const [part1, part2, year] = dateString.split("/"); // แยกส่วนของวันที่
    const fullYear =
      year.length === 2
        ? parseInt(year) > 50
          ? `19${year}`
          : `20${year}`
        : year;
    const isMMDDYYYY = parseInt(part1) > 12; // ถ้าค่า part1 มากกว่า 12 แสดงว่าเป็น DD/MM/YYYY
    const day = isMMDDYYYY ? part1 : part2; // ถ้าเป็น DD/MM/YYYY ให้ part1 เป็นวัน
    const month = isMMDDYYYY ? part2 : part1; // ถ้าเป็น MM/DD/YYYY ให้ part1 เป็นเดือน

    // เติม 0 ด้านหน้าให้ day และ month หากมีความยาวน้อยกว่า 2
    const formattedDay = day.padStart(2, "0");
    const formattedMonth = month.padStart(2, "0");
    console.log(formattedDay, formattedMonth, fullYear, "formattedDay");
    return `${formattedDay}/${formattedMonth}/${fullYear}`; // รวมเป็นรูปแบบ DD/MM/YYYY
  };

  const UploadFile = async (file) => {
    console.log(file, "UploadFile");
    if (!file) {
      console.log("เข้ามาแล้ว ไม่มีไฟล์");
      return;
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileData = reader.result;
        const byteArray = new Uint8Array(fileData);

        try {
          const response = await axios.post("/api/RequestManPower/UploadHr", {
            fileData: Array.from(byteArray),
            ReqNo: formData1.txt_ReqNo,
          });
          console.log("File uploaded successfully:", response.data);
        } catch (error) {
          console.error("Error uploading file:", error);
          alert(
            "Error uploading file: " +
              (error.response?.data?.message || error.message)
          );
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const DeleteFile = (Reason) => {
    if (Reason === "HrFileReadFile") {
      handleChange("Hr_FileAttach", "");
      handleChange("Hr_DataFileAttach", null);
      const input = document.getElementById(`fileInputHr`);
      if (input) input.value = "";
    } else if (Reason === "HrFileOther") {
      handleChange("Hr_NameFileOther", "");
      handleChange("Hr_DataFileOther", null);
      const input = document.getElementById(`fileInputHrOther`);
      if (input) input.value = "";
    }
  };

  const Bt_Reset = () => {
    setFormData1({
      ...formData1,
      Radio_HrStatus: "MR0106",
      Sl_HrCloseBy: null,
      txt_HrComment: "",
      txt_TotalManual: 0,
      txt_TotalRemain:
        formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional,
      CB_HrFileAttach: false,
      Hr_FileAttach: "",
      Hr_DataFileAttach: null,
      Hr_NameFileOther: "",
      Hr_DataFileOther: null,
      Hr_Add: Array.from({ length: formData1.Person_ADD.length }, () => ({
        CB_Complete: false,
        Emp_id: "",
        Emp_name: "",
        Emp_sername: "",
        Emp_JoinDate: "",
      })),
      Hr_Sub: Array.from({ length: formData1.Person_Sub.length }, () => ({
        CB_Complete: false,
        Emp_id: "",
        Emp_name: "",
        Emp_sername: "",
        Emp_JoinDate: "",
      })),
    });
  };

  return {
    handleChange,
    datauser,
    DateToday,
    ConditionClose,
    Save,
    handleFileChange,
    CB_AttachFile,
    ManualCompleted,
    handleStatus,
    handleChangeHr_Add,
    handleChangeHr_Sub,
    CheckComplete,
    CheckCompleteAdd,
    Submit,
    DownloadFileforUpload,
    ReadFile,
    handleFileOtherChange,
    DeleteFile,
    Bt_Reset,
    GetUserJoin,
  };
}

export { fn_HrStarffAction };
