import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { fn_Header } from "../../Header/fn_Header";
import Swal from "sweetalert2";
import moment from "moment";

function fn_HrStarffAction(
  formData1,
  setFormData1,
  Disable,
  setDisable,
  setCurrent
) {
  console.log(formData1, "fn_HrStarffAction");
  const { datauser } = fn_Header();
  console.log(datauser, "datauser");
  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  const { showLoading, hideLoading } = useLoading();
  const [ConditionClose, setConditionClose] = useState([]);

  useEffect(() => {
    GetCondition();
  }, []);

  useEffect(() => {
    if (formData1.txt_TotalRemain == 0) {
      handleChange("Radio_HrStatus", "MR0107");
    } else {
      handleChange("Radio_HrStatus", "MR0106");
    }
  }, [formData1.txt_TotalRemain]);

  const GetCondition = async () => {
    let ReqNo = formData1.txt_ReqNo;
    await axios
      .post("/api/RequestManPower/GetConditionForClose", {})
      .then((res) => {
        console.log(res.data, "GetConditionForClose");
        // setConditionClose(res.data);/
        setConditionClose(res.data);
      });
  };

  const Save = async (save) => {
    console.log(save,'checksave')
    showLoading("กำลังบันทึกข้อมูล...");
    await axios
      .post("/api/RequestManPower/SaveDarftHr", {
        ReqNo: formData1.txt_ReqNo,
        UpdateBy: datauser.LOGIN,
        Radio_Status: formData1.Radio_HrStatus || "",
        Req_Status:save==''? formData1.Sl_HrCloseBy:'MR0106',
        Sl_Condition: formData1.Sl_HrCloseBy || "",
        txt_Comment: formData1.txt_HrComment || "",
        Cb_AttFile: formData1.CB_HrFileAttach ? "Y" : "N",
        txt_TotalComplete:
          formData1.txt_TotalManual > 0 ? formData1.txt_TotalManual : null,
        FileName: formData1.Hr_FileAttach || "",
        FileNameServer: formData1.Hr_FileAttachServer || "",
      })
      .then((res) => {
        console.log(res.data, "SaveDarftHr");
      });
    // if (formData1.CB_HrFileAttach) {}
    console.log(formData1.CB_HrFileAttach, "mayyy11111");
    if (formData1.CB_HrFileAttach == false) {
      for (let i = 0; i < formData1.Hr_Add.length; i++) {
        const Rec_id = `A${String(i + 1).padStart(2, "0")}`;
        if (formData1.Hr_Add[i].CB_Complete == true) {
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
              console.log(res.data, "SaveDarftHr");
            });
        }
      }
      for (let i = 0; i < formData1.Hr_Sub.length; i++) {
        const Rec_id = `S${String(i + 1).padStart(2, "0")}`;
        if (formData1.Hr_Sub[i].CB_Complete == true) {
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
              console.log(res.data, "SaveDarftHr");
            });
        }
      }
    }
    hideLoading();
  };

  const Submit = async () => {
    if (
      formData1.Radio_HrStatus == "MR0107" ||
      formData1.Radio_HrStatus == "MR0108"
    ) {
      if (
        formData1.Radio_HrStatus == "MR0108" &&
        formData1.Sl_HrCloseBy == null
      ) {
        Swal.fire({
          icon: "warning",
          title: "Cannot be submit",
          text: `Please Select Condition`,
        });
        return;
      } else {
        console.log(formData1.CB_HrFileAttach, "mayyy111ccc11");
        if (formData1.CB_HrFileAttach == true) {
          Save('');
        } else {
          let isValid = true;
          formData1.Hr_Sub.some((person) => {
            console.log(person, "person0");
            if (person.Emp_name === "") {
              Swal.fire({
                icon: "warning",
                title: "Cannot be submit",
                text: `Please Input Name`,
              });
              isValid = false; // ตั้งค่าเป็น false หากพบข้อผิดพลาด
              return true; // หยุดการตรวจสอบเพิ่มเติม
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

          if (isValid) {
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
            Save('');
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

  const getDateToday = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มจาก 0
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("file999", e);
    let DateToday = getDateToday();
    let FileNameServer = "";
    let ReqNo = formData1.txt_ReqNo;
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
    FileNameServer = `${ReqNo}-SUBS-${DateToday}.${file.name.substring(
      file.name.lastIndexOf(".") + 1
    )}`;
    console.log("FileNameServer", FileNameServer);
    if (file) {
      const renamedFile = new File([file], FileNameServer, { type: file.type });
      console.log("renamedFile", renamedFile);
      handleChange("Hr_FileAttach", file.name);
      handleChange("Hr_FileAttachServer", renamedFile.name);
      handleChange("Hr_DataFileAttach", renamedFile.name);
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
            Hr_FileAttachServer: "",
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
        handleChangeHr_Sub(index, "Emp_id", "");
        handleChangeHr_Sub(index, "Emp_name", "");
        handleChangeHr_Sub(index, "Emp_sername", "");
        handleChangeHr_Sub(index, "Emp_JoinDate", null);
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
        handleChangeHr_Add(index, "Emp_id", "");
        handleChangeHr_Add(index, "Emp_name", "");
        handleChangeHr_Add(index, "Emp_sername", "");
        handleChangeHr_Add(index, "Emp_JoinDate", null);
        handleChange("txt_TotalRemain", formData1.txt_TotalRemain + 1);
      }
      setFormData1((prev) => ({ ...prev, Hr_Add: newHr_Add }));
    }
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
  };
}

export { fn_HrStarffAction };
