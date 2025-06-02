import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { fn_Header } from "../../Header/fn_Header";
// import { fn_NewManPowerRequset } from "../NewManPowerRequset/fn_NewManPowerRequset";
import Swal from "sweetalert2";
import moment from "moment";

function fn_ForApprove(
  formData1,
  setFormData1,
  Disable,
  setDisable,
  setCurrent
) {
  console.log(formData1, "fn_ForApprove");
  const { datauser } = fn_Header();
  const userlogin = localStorage.getItem("username");
  const { showLoading, hideLoading } = useLoading();
  const [Factory, setFactory] = useState([]);
  const [DepartmentManager, setDepartmentManager] = useState([]);
  const [FMGM, setFMGM] = useState([]);
  const [HrManager, setHrManager] = useState([]);
  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  useEffect(() => {
    GetDepartmentManager();
    GetFMDM();
    GetHrManager();
    GetFactory();
    // SendEmail();
  }, []);

  const GetFactory = async () => {
    await axios
      .post("/api/RequestManPower/GetFactory", { User_login: userlogin || "" })
      .then((res) => {
        console.log(res.data, "GetFactory");
        setFactory(res.data);
      });
  };

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };

  const GetDepartmentManager = async () => {
    await axios
      .post("/api/RequestManPower/GetDepartmentManager", {
        Fac_code: formData1.SL_Factory,
        Sl_Department: formData1.SL_Department,
      })
      .then((res) => {
        console.log(res.data, "GetDepartmentManager");
        if (res.data.length > 0) {
          setDepartmentManager(res.data);
        }
      });
  };

  const GetFMDM = async () => {
    await axios
      .post("/api/RequestManPower/GetFMDM", {
        Fac_code: formData1.SL_Factory,
        Sl_Department: formData1.SL_Department,
      })
      .then((res) => {
        console.log(res.data, "GetFMGM");
        if (res.data.length > 0) {
          setFMGM(res.data);
        }
      });
  };

  const GetHrManager = async () => {
    await axios
      .post("/api/RequestManPower/GetHrManager", {
        Fac_code: formData1.SL_Factory,
        Sl_Department: formData1.SL_Department,
      })
      .then((res) => {
        console.log(res.data, "GetHrManager");
        if (res.data.length > 0) {
          setHrManager(res.data);
        }
      });
  };

  const SaveDraft = async () => {
    showLoading("กำลัง Save...");
    try {
      let FileNameServer = "";
      const {
        Person_Sub,
        Person_ADD,
        txt_ReqNo,
        Date_Target,
        txt_Email,
        txt_TelNo,
        txt_TotalSubstitube,
        txt_TotalAdditional,
        txt_Remark,
        CB_Substitube,
        CB_FileSubstitube,
        FileName_Sub,
        FileNameServer_Sub,
        CB_Additional,
        txt_TargetCapacity1,
        txt_TargetCapacity2,
        CB_FileAdditional,
        FileName_Add,
        FileNameServer_Add,
        SL_DepartmentManager,
        SL_FMGM,
        SL_HRManager,
        SL_Position
      } = formData1;

      console.log("กำลัง SaveDraft");
      await axios
        .post("/api/RequestManPower/DelDataPersonDetail", {
          ReqNo: txt_ReqNo,
        })
        .then((res) => {
          console.log(res.data, "DelDataPersonDetail");
        });

      for (let i = 0; i < formData1.CB_EmpRequirment.length; i++) {
        const requirement = formData1.CB_EmpRequirment[i];
        let data = {
          ReqNo: txt_ReqNo,
          EmpType: "",
          txt_Other: "",
          Create_by: datauser.LOGIN,
          Emp_Req: formData1.CB_EmpRequirment[i],
        };

        if (requirement === "MR0202") {
          data.EmpType = formData1.SL_EmployeeType;
          data.txt_Other = formData1.txt_EmpType_Other;
        } else if (requirement === "MR0290") {
          data.txt_Other = formData1.txt_EmpReq_Other;
        }

        await axios
          .post("/api/RequestManPower/InsGenNoRequest2", data)
          .then((res) => {
            console.log(res.data, "InsGenNoRequest2");
          });
      }
      if (CB_Substitube) {
        if (CB_FileSubstitube) {
          await UploadFileSub(formData1.DataFileSub);
        }

        for (let i = 0; i < Person_Sub.length; i++) {
          //
          const Rec_id = `S${String(i + 1).padStart(2, "0")}`;
          const Emp_Name = Person_Sub[i].Emp_Name || "";
          await axios
            .post("/api/RequestManPower/InsPerson", {
              ReqNo: txt_ReqNo,
              RecId: Rec_id,
              Req_flg: "SUBS",
              Emp_id: Person_Sub[i].ID_Code || "",
              Emp_name: Emp_Name.split(" ")[0].trim(),
              Emp_Surname: Emp_Name.split(" ").slice(1).join(" ").trim(),
              Emp_dept: Person_Sub[i].Cost_Center || "",
              Emp_Jobgrade: Person_Sub[i].Job_grade || "",
              For_Dept: Person_Sub[i].Dept || "",
              Special: Person_Sub[i].Special || "",
              Expereince: Person_Sub[i].Experience || "",
              Lang_skill: Person_Sub[i].StepLanguage || "",
              Lang_other: Person_Sub[i].StepLanguage_other || "",
              Filename: Person_Sub[i].Filefeature || "",
              // FilenameServer: Person_Sub[i].FileServerfeature || "",
              Create_by: datauser.LOGIN,
            })
            .then((res) => {
              console.log(res.data, "InsPersonSUB");
            });

          if (
            formData1.Person_Sub[i].Education != null &&
            formData1.Person_Sub[i].Education.length > 0
          ) {
            for (let j = 0; j < formData1.Person_Sub[i].Education.length; j++) {
              console.log("Rec_id,", Rec_id);
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "EDUCATION",
                  Sl_value: formData1.Person_Sub[i].Education[j] || "",
                  txt_Other:
                    formData1.Person_Sub[i].Education[j] == "MR0490"
                      ? formData1.Person_Sub[i].EducationOther
                      : "",
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBEducation");
                });
            }
          }
          if (
            formData1.Person_Sub[i].Course != null &&
            formData1.Person_Sub[i].Course.length > 0
          ) {
            for (let j = 0; j < formData1.Person_Sub[i].Course.length; j++) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "COURSE",
                  Sl_value: formData1.Person_Sub[i].Course[j] || "",
                  txt_Other:
                    formData1.Person_Sub[i].Course[j] == "MR0507"
                      ? formData1.Person_Sub[i].CourseOther
                      : "", //formData1.Person_Sub[i].CourseOther,
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBCourse");
                });
            }
          }
          if (
            formData1.Person_Sub[i].Field != null &&
            formData1.Person_Sub[i].Field.length > 0
          ) {
            for (let j = 0; j < formData1.Person_Sub[i].Field.length; j++) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "FIELD",
                  Sl_value: formData1.Person_Sub[i].Field[j] || "",
                  txt_Other:
                    formData1.Person_Sub[i].Field[j] == "MR0699"
                      ? formData1.Person_Sub[i].FieldOther
                      : "",
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBFiled");
                });
            }
          }
          if (
            formData1.Person_Sub[i].Req_Jobgrade != null &&
            formData1.Person_Sub[i].Req_Jobgrade.length > 0
          ) {
            for (
              let j = 0;
              j < formData1.Person_Sub[i].Req_Jobgrade.length;
              j++
            ) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "JOB GRADE",
                  Sl_value: formData1.Person_Sub[i].Req_Jobgrade[j] || "",
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBJobGrade");
                });
            }
          }
          await UploadFileDedailPerson(
            formData1.Person_Sub[i].DataFilefeature,
            Rec_id
          );
        }
      }

      if (CB_Additional) {
        if (CB_FileAdditional) {
          await UploadFileADD(formData1.DataFileADD);
        }
        for (let i = 0; i < Person_ADD.length; i++) {
          const Rec_id = `A${String(i + 1).padStart(2, "0")}`;
          await axios
            .post("/api/RequestManPower/InsPerson", {
              ReqNo: txt_ReqNo,
              RecId: Rec_id,
              Req_flg: "ADD",
              Emp_id: "",
              Emp_name: "",
              Emp_Surname: "",
              Emp_dept: "",
              Emp_Jobgrade: "",
              For_Dept: Person_ADD[i].Dept || "",
              Special: Person_ADD[i].Special,
              Expereince: Person_ADD[i].Experience,
              Lang_skill: Person_ADD[i].StepLanguage || "",
              Lang_other: Person_ADD[i].StepLanguage_other,
              Filename: Person_ADD[i].Filefeature || "",
              // FilenameServer: Person_ADD[i].FileServerfeature||'',
              Create_by: datauser.LOGIN,
            })
            .then((res) => {
              console.log(res.data, "InsPersonADD");
            });
          if (
            formData1.Person_ADD[i].Education != null &&
            formData1.Person_ADD[i].Education.length > 0
          ) {
            for (let j = 0; j < formData1.Person_ADD[i].Education.length; j++) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "EDUCATION",
                  Sl_value: formData1.Person_ADD[i].Education[j],
                  txt_Other:
                    formData1.Person_ADD[i].Education[j] == "MR0490"
                      ? formData1.Person_ADD[i].EducationOther
                      : "", //formData1.Person_ADD[i].EducationOther,
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBEducation");
                });
            }
          }
          if (
            formData1.Person_ADD[i].Course != null &&
            formData1.Person_ADD[i].Course.length > 0
          ) {
            for (let j = 0; j < formData1.Person_ADD[i].Course.length; j++) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "COURSE",
                  Sl_value: formData1.Person_ADD[i].Course[j],
                  txt_Other:
                    formData1.Person_ADD[i].Course[j] == "MR0507"
                      ? formData1.Person_ADD[i].CourseOther
                      : "", //formData1.Person_ADD[i].CourseOther,
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBCourse");
                });
            }
          }
          if (
            formData1.Person_ADD[i].Field != null &&
            formData1.Person_ADD[i].Field.length > 0
          ) {
            for (let j = 0; j < formData1.Person_ADD[i].Field.length; j++) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "FIELD",
                  Sl_value: formData1.Person_ADD[i].Field[j],
                  txt_Other:
                    formData1.Person_ADD[i].Field[j] == "MR0699"
                      ? formData1.Person_ADD[i].FieldOther
                      : "", //formData1.Person_ADD[i].FieldOther,
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBFiled");
                });
            }
          }

          if (
            formData1.Person_ADD[i].Req_Jobgrade != null &&
            formData1.Person_ADD[i].Req_Jobgrade.length > 0
          ) {
            for (
              let j = 0;
              j < formData1.Person_ADD[i].Req_Jobgrade.length;
              j++
            ) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "JOB GRADE",
                  Sl_value: formData1.Person_ADD[i].Req_Jobgrade[j] || "",
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBJobGrade");
                });
            }
          }
          await UploadFileDedailPerson(
            formData1.Person_ADD[i].DataFilefeature,
            Rec_id
          );
        }
      }

      const TargetDate = moment(Date_Target, "DD/MM/YYYY").format("YYYY-MM-DD");
      console.log(TargetDate, "TargetDate");
      await axios
        .post("/api/RequestManPower/SaveDraft", {
          ReqNo: txt_ReqNo,
          Email: txt_Email || "",
          Status: "MR0101",
          Tel: txt_TelNo || "",
          DateTarget: TargetDate || "",
          TotalReq: Number(txt_TotalSubstitube + txt_TotalAdditional),
          Remark: txt_Remark || "",
          Cb_Sub: CB_Substitube ? "Y" : "N" || "",
          Total_Sub: Number(txt_TotalSubstitube),
          CB_SubAttach: CB_FileSubstitube ? "Y" : "N" || "",
          Sub_Filename: FileName_Sub || "",
          Sub_FilenameServer: FileNameServer_Sub || "",
          Cb_Add: CB_Additional ? "Y" : "N",
          Add_Target1: txt_TargetCapacity1 || "",
          Add_Target2: txt_TargetCapacity2 || "",
          Total_Add: Number(txt_TotalAdditional),
          CB_AddAttach: CB_FileAdditional ? "Y" : "N" || "",
          Add_Filename: FileName_Add || "",
          Add_FilenameServer: FileNameServer_Add || "",
          DeptBy: SL_DepartmentManager || "",
          FMGMBy: SL_FMGM || "",
          HRMBy: SL_HRManager || "",
          UpdateBy: datauser.LOGIN || "",
          Position: SL_Position || "",
        })
        .then((res) => {
          console.log(res.data, "SaveDraft999");
        });
      Swal.fire({
        icon: "success",
        title: "Save Success",
      }).then(() => {});
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
      console.error(error, "SaveDraft888");
      hideLoading();
    }

    hideLoading();
  };

  const UploadFileDedailPerson = async (file, RecID) => {
    if (!file) {
      return;
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileData = reader.result;
        const byteArray = new Uint8Array(fileData);

        try {
          const response = await axios.post("/api/Common/UploadFileDetail", {
            fileData: Array.from(byteArray),
            ReqNo: formData1.txt_ReqNo,
            RecID: RecID,
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

  const UploadFileSub = async (file) => {
    console.log("formData1.txt_ReqNo", formData1.txt_ReqNo);
    if (!file) {
      return;
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileData = reader.result;
        const byteArray = new Uint8Array(fileData);

        try {
          const response = await axios.post("/api/Common/UploadSub", {
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

  const UploadFileADD = async (file) => {
    if (!file) {
      return;
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileData = reader.result;
        const byteArray = new Uint8Array(fileData);

        try {
          const response = await axios.post("/api/Common/UploadAdd", {
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

  const NextStatus = async () => {
    let status = formData1.ID_Status;
    let StatusType = formData1.StatusType;
    let statusNext = "MR0101";
    if (status === "MR0101") {
      statusNext = "MR0102";
    } else if (status === "MR0102") {
      if (formData1.CB_DepartmentApprove == "A") {
        statusNext = "MR0103";
      } else {
        statusNext = "MR0129";
      }
    } else if (status === "MR0103") {
      if (formData1.CB_FMGMApprove == "A") {
        statusNext = "MR0104";
      } else {
        statusNext = "MR0139";
      }
    } else if (status === "MR0104") {
      if (formData1.CB_HRManagerApprove == "A") {
        statusNext = "MR0105";
      } else {
        statusNext = "MR0149";
      }
    }
    if (StatusType == "R") {
      statusNext = "MR0102";
    }
    return statusNext;
  };

  const SendApprove = async () => {
    showLoading("กำลัง Save...");
    if (!formData1.CB_Substitube && !formData1.CB_Additional) {
      Swal.fire({
        // title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        text: "Please Select Reason to request",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          setCurrent(1);
        }
      });
      hideLoading();
      return;
    } else if (formData1.txt_TotalSubstitube > 0) {
      const isIncomplete = formData1.Person_Sub.some((person) => {
        if (
          person.ID_Code === "" ||
          person.Emp_Name === "" ||
          person.Cost_Center === "" ||
          person.Job_grade === "" ||
          person.Dept === "" ||
          person.Dept === null ||
          person.Req_Jobgrade === null ||
          (Array.isArray(person.Req_Jobgrade) &&
            person.Req_Jobgrade.length === 0) ||
          person.Education === null ||
          (Array.isArray(person.Education) && person.Education.length === 0) ||
          person.Course === null ||
          (Array.isArray(person.Course) && person.Course.length === 0) ||
          person.Field === null ||
          (Array.isArray(person.Field) && person.Field.length === 0) ||
          person.Special === "" ||
          person.Experience === "" ||
          person.StepLanguage === null
        ) {
          console.log(person, "kkkkk");
          return true;
        } else {
          return false;
        }
      });
      console.log(isIncomplete, "isIncomplete1");
      if (isIncomplete) {
        console.log("isIncomplete0");
        Swal.fire({
          text: "Please input complete all fields (Substitube)",
          icon: "warning",
        }).then((result) => {
          if (result.isConfirmed) {
            setCurrent(1);
          }
        });
        hideLoading();
        return;
      }
    } else {
      if (formData1.CB_FileSubstitube) {
        if (formData1.FileName_Sub === "") {
          Swal.fire({ icon: "error", text: "Please Attach file (Substitube)" });
          setCurrent(1);
          hideLoading();
          return;
        }
      }
    }

    if (formData1.CB_Additional) {
      if (formData1.txt_TargetCapacity1 == "") {
        Swal.fire({
          text: "Please input Target",
          icon: "warning",
        }).then((result) => {
          if (result.isConfirmed) {
            setCurrent(1);
          }
        });
        hideLoading();
        return;
      }
      if (formData1.txt_TotalAdditional > 0) {
        console.log(formData1.Person_ADD, "mmmmay");
        const isIncomplete = formData1.Person_ADD.some((person) => {
          console.log(person, "person0");
          if (
            person.Education === null ||
            (Array.isArray(person.Education) &&
              person.Education.length === 0) ||
            person.Course === null ||
            (Array.isArray(person.Course) && person.Course.length === 0) ||
            person.Field === null ||
            (Array.isArray(person.Field) && person.Field.length === 0) ||
            person.Special === "" ||
            person.Experience === "" ||
            person.StepLanguage === null
          ) {
            console.log(person, "kkkkk");
            return true;
          } else {
            return false;
          }
        });

        if (isIncomplete) {
          Swal.fire({
            text: "Please input complete all fields (Additional)",
            icon: "warning",
          }).then((result) => {
            if (result.isConfirmed) {
              setCurrent(1);
            }
          });
          hideLoading();
          return;
        }
      } else {
        if (formData1.CB_FileAdditional) {
          if (formData1.FileName_Add === "") {
            Swal.fire({
              icon: "error",
              text: "Please Attach file (Additional)",
            });
            setCurrent(1);
            hideLoading();
            return;
          }
        }
      }
    }

    if (
      formData1.SL_DepartmentManager === null ||
      formData1.SL_FMGM === null ||
      formData1.SL_HRManager === null
    ) {
      if (formData1.SL_DepartmentManager === null) {
        Swal.fire({ icon: "error", text: "Please Select Department Manager" });
      } else if (formData1.SL_FMGM === null) {
        Swal.fire({ icon: "error", text: "Please Select FM/GM" });
      } else if (formData1.SL_HRManager === null) {
        Swal.fire({ icon: "error", text: "Please Select HR Manager" });
      }
      hideLoading();
      return;
    }

    try {
      const {
        Person_Sub,
        Person_ADD,
        txt_ReqNo,
        Date_Target,
        txt_Email,
        txt_TelNo,
        txt_TotalSubstitube,
        txt_TotalAdditional,
        txt_Remark,
        CB_Substitube,
        CB_FileSubstitube,
        FileName_Sub,
        FileNameServer_Sub,
        CB_Additional,
        txt_TargetCapacity1,
        txt_TargetCapacity2,
        CB_FileAdditional,
        FileName_Add,
        FileNameServer_Add,
        SL_DepartmentManager,
        SL_FMGM,
        SL_HRManager,
        SL_Position
      } = formData1;

      console.log("กำลัง SendApprove");
      await axios
        .post("/api/RequestManPower/DelDataPersonDetail", {
          ReqNo: txt_ReqNo,
        })
        .then((res) => {
          console.log(res.data, "DelDataPersonDetail");
        });

      for (let i = 0; i < formData1.CB_EmpRequirment.length; i++) {
        const requirement = formData1.CB_EmpRequirment[i];
        let data = {
          ReqNo: txt_ReqNo,
          EmpType: "",
          txt_Other: "",
          Create_by: datauser.LOGIN,
          Emp_Req: formData1.CB_EmpRequirment[i],
        };

        if (requirement === "MR0202") {
          data.EmpType = formData1.SL_EmployeeType;
          data.txt_Other = formData1.txt_EmpType_Other;
        } else if (requirement === "MR0290") {
          data.txt_Other = formData1.txt_EmpReq_Other;
        }

        await axios
          .post("/api/RequestManPower/InsGenNoRequest2", data)
          .then((res) => {
            console.log(res.data, "InsGenNoRequest2");
          });
      }
      if (CB_Substitube) {
        if (CB_FileSubstitube) {
          await UploadFileSub(formData1.DataFileSub);
        }

        for (let i = 0; i < Person_Sub.length; i++) {
          //
          const Rec_id = `S${String(i + 1).padStart(2, "0")}`;
          const Emp_Name = Person_Sub[i].Emp_Name || "";
          await axios
            .post("/api/RequestManPower/InsPerson", {
              ReqNo: txt_ReqNo,
              RecId: Rec_id,
              Req_flg: "SUBS",
              Emp_id: Person_Sub[i].ID_Code || "",
              Emp_name: Emp_Name.split(" ")[0].trim(),
              Emp_Surname: Emp_Name.split(" ").slice(1).join(" ").trim(),
              Emp_dept: Person_Sub[i].Cost_Center || "",
              Emp_Jobgrade: Person_Sub[i].Job_grade || "",
              For_Dept: Person_Sub[i].Dept || "",
              Special: Person_Sub[i].Special || "",
              Expereince: Person_Sub[i].Experience || "",
              Lang_skill: Person_Sub[i].StepLanguage || "",
              Lang_other: Person_Sub[i].StepLanguage_other || "",
              Filename: Person_Sub[i].Filefeature || "",
              // FilenameServer: Person_Sub[i].FileServerfeature || "",
              Create_by: datauser.LOGIN,
            })
            .then((res) => {
              console.log(res.data, "InsPersonSUB");
            });

          if (
            formData1.Person_Sub[i].Education != null &&
            formData1.Person_Sub[i].Education.length > 0
          ) {
            for (let j = 0; j < formData1.Person_Sub[i].Education.length; j++) {
              console.log("Rec_id,", Rec_id);
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "EDUCATION",
                  Sl_value: formData1.Person_Sub[i].Education[j] || "",
                  txt_Other:
                    formData1.Person_Sub[i].Education[j] == "MR0490"
                      ? formData1.Person_Sub[i].EducationOther
                      : "",
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBEducation");
                });
            }
          }
          if (
            formData1.Person_Sub[i].Course != null &&
            formData1.Person_Sub[i].Course.length > 0
          ) {
            for (let j = 0; j < formData1.Person_Sub[i].Course.length; j++) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "COURSE",
                  Sl_value: formData1.Person_Sub[i].Course[j] || "",
                  txt_Other:
                    formData1.Person_Sub[i].Course[j] == "MR0507"
                      ? formData1.Person_Sub[i].CourseOther
                      : "", //formData1.Person_Sub[i].CourseOther,
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBCourse");
                });
            }
          }
          if (
            formData1.Person_Sub[i].Field != null &&
            formData1.Person_Sub[i].Field.length > 0
          ) {
            for (let j = 0; j < formData1.Person_Sub[i].Field.length; j++) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "FIELD",
                  Sl_value: formData1.Person_Sub[i].Field[j] || "",
                  txt_Other:
                    formData1.Person_Sub[i].Field[j] == "MR0699"
                      ? formData1.Person_Sub[i].FieldOther
                      : "",
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBFiled");
                });
            }
          }
          if (
            formData1.Person_Sub[i].Req_Jobgrade != null &&
            formData1.Person_Sub[i].Req_Jobgrade.length > 0
          ) {
            for (
              let j = 0;
              j < formData1.Person_Sub[i].Req_Jobgrade.length;
              j++
            ) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "JOB GRADE",
                  Sl_value: formData1.Person_Sub[i].Req_Jobgrade[j] || "",
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBJobGrade");
                });
            }
          }
          await UploadFileDedailPerson(
            formData1.Person_Sub[i].DataFilefeature,
            Rec_id
          );
        }
      }

      if (CB_Additional) {
        if (CB_FileAdditional) {
          await UploadFileADD(formData1.DataFileADD);
        }

        for (let i = 0; i < Person_ADD.length; i++) {
          //
          const Rec_id = `A${String(i + 1).padStart(2, "0")}`;
          await axios
            .post("/api/RequestManPower/InsPerson", {
              ReqNo: txt_ReqNo,
              RecId: Rec_id,
              Req_flg: "ADD",
              Emp_id: "",
              Emp_name: "",
              Emp_Surname: "",
              Emp_dept: "",
              Emp_Jobgrade: "",
              For_Dept: Person_ADD[i].Dept || "",
              Special: Person_ADD[i].Special,
              Expereince: Person_ADD[i].Experience,
              Lang_skill: Person_ADD[i].StepLanguage || "",
              Lang_other: Person_ADD[i].StepLanguage_other,
              Filename: Person_ADD[i].Filefeature || "",
              FilenameServer: Person_ADD[i].FileServerfeature || "",
              Create_by: datauser.LOGIN,
            })
            .then((res) => {
              console.log(res.data, "InsPersonADD");
            });
          if (
            formData1.Person_ADD[i].Education != null &&
            formData1.Person_ADD[i].Education.length > 0
          ) {
            for (let j = 0; j < formData1.Person_ADD[i].Education.length; j++) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "EDUCATION",
                  Sl_value: formData1.Person_ADD[i].Education[j],
                  txt_Other:
                    formData1.Person_ADD[i].Education[j] == "MR0490"
                      ? formData1.Person_ADD[i].EducationOther
                      : "", //formData1.Person_ADD[i].EducationOther,
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBEducation");
                });
            }
          }
          if (
            formData1.Person_ADD[i].Course != null &&
            formData1.Person_ADD[i].Course.length > 0
          ) {
            for (let j = 0; j < formData1.Person_ADD[i].Course.length; j++) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "COURSE",
                  Sl_value: formData1.Person_ADD[i].Course[j],
                  txt_Other:
                    formData1.Person_ADD[i].Course[j] == "MR0507"
                      ? formData1.Person_ADD[i].CourseOther
                      : "", //formData1.Person_ADD[i].CourseOther,
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBCourse");
                });
            }
          }
          if (
            formData1.Person_ADD[i].Field != null &&
            formData1.Person_ADD[i].Field.length > 0
          ) {
            for (let j = 0; j < formData1.Person_ADD[i].Field.length; j++) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "FIELD",
                  Sl_value: formData1.Person_ADD[i].Field[j],
                  txt_Other:
                    formData1.Person_ADD[i].Field[j] == "MR0699"
                      ? formData1.Person_ADD[i].FieldOther
                      : "", //formData1.Person_ADD[i].FieldOther,
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBFiled");
                });
            }
          }
          if (
            formData1.Person_ADD[i].Req_Jobgrade != null &&
            formData1.Person_ADD[i].Req_Jobgrade.length > 0
          ) {
            for (
              let j = 0;
              j < formData1.Person_ADD[i].Req_Jobgrade.length;
              j++
            ) {
              await axios
                .post("/api/RequestManPower/InsPersonDetail", {
                  ReqNo: txt_ReqNo,
                  Recid: Rec_id,
                  category: "JOB GRADE",
                  Sl_value: formData1.Person_ADD[i].Req_Jobgrade[j] || "",
                  Create_by: datauser.LOGIN,
                })
                .then((res) => {
                  console.log(res.data, "InsPersonSUBJobGrade");
                });
            }
          }
          await UploadFileDedailPerson(
            formData1.Person_ADD[i].DataFilefeature,
            Rec_id
          );
        }
      }

      const TargetDate = moment(Date_Target, "DD/MM/YYYY").format("YYYY-MM-DD");
      console.log(TargetDate, "TargetDate");
      let statusNext = await NextStatus();
      console.log(statusNext, "statusNext");
      await axios
        .post("/api/RequestManPower/SaveDraft", {
          ReqNo: txt_ReqNo,
          Email: txt_Email || "",
          Status: statusNext,
          Tel: txt_TelNo || "",
          DateTarget: TargetDate || "",
          TotalReq: Number(txt_TotalSubstitube + txt_TotalAdditional),
          Remark: txt_Remark || "",
          Cb_Sub: CB_Substitube ? "Y" : "N" || "",
          Total_Sub: Number(txt_TotalSubstitube),
          CB_SubAttach: CB_FileSubstitube ? "Y" : "N" || "",
          Sub_Filename: FileName_Sub || "",
          Sub_FilenameServer: FileNameServer_Sub || "",
          Cb_Add: CB_Additional ? "Y" : "N",
          Add_Target1: txt_TargetCapacity1 || "",
          Add_Target2: txt_TargetCapacity2 || "",
          Total_Add: Number(txt_TotalAdditional),
          CB_AddAttach: CB_FileAdditional ? "Y" : "N" || "",
          Add_Filename: FileName_Add || "",
          Add_FilenameServer: FileNameServer_Add || "",
          DeptBy: SL_DepartmentManager || "",
          FMGMBy: SL_FMGM || "",
          HRMBy: SL_HRManager || "",
          UpdateBy: datauser.LOGIN || "",
          Position: SL_Position || "",
        })
        .then((res) => {
          console.log(res.data, "SaveDraft999");
        });
      if (formData1.StatusType == "R") {
        await axios
          .post("/api/RequestManPower/UpdateReject", {
            ReqNo: formData1.txt_ReqNo,
            statusNext: statusNext,
            UpdateBy: datauser.LOGIN,
          })
          .then((res) => {
            console.log(res.data, "UpdateReject");
          });
      }
      Swal.fire({
        icon: "success",
        title: "Save Success",
      }).then(async() => {
        await GetmailSend();
        if (formData1.StatusType == "R" || formData1.StatusType == "C") {
          window.location.href = "/HrSystem/ManPowerRequest";
        } else {
          Swal.fire({
            icon: "success",
            title: "Save Success",
          }).then(() => {

            window.location.href = "/HrSystem/ApproveManPower";
          });
        }
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
      console.error(error, "SaveDraft888");
      hideLoading();
    }

    hideLoading();
  };

  const Bt_Submit = async () => {
    let status = formData1.ID_Status;
    let statusNext = await NextStatus();
    if (status === "MR0102") {
      if (!formData1.CB_DepartmentApprove) {
        Swal.fire({
          text: "Please Select Approve or Reject",
          icon: "warning",
          showCancelButton: true,
        });
        return;
      }
      console.log(
        formData1.CB_DepartmentApprove,
        formData1.txt_CommentDepartmentmanager,
        "formData1.CB_DepartmentApprove"
      );
      if (formData1.CB_DepartmentApprove == "R") {
        if (
          formData1.txt_CommentDepartmentmanager == "" ||
          formData1.txt_CommentDepartmentmanager == null
        ) {
          Swal.fire({
            text: "Please Input Comment ",
            icon: "warning",
          });
          return;
        }
      }
    }
    if (status === "MR0103") {
      if (!formData1.CB_FMGMApprove) {
        Swal.fire({
          text: "Please Select Approve or Reject",
          icon: "warning",
          showCancelButton: true,
        });
        return;
      }
      if (formData1.CB_FMGMApprove == "R") {
        if (
          formData1.txt_CommentFMGM == "" ||
          formData1.txt_CommentFMGM == null
        ) {
          Swal.fire({
            text: "Please Input Comment ",
            icon: "warning",
          });
          return;
        }
      }
    }
    if (status === "MR0104") {
      if (!formData1.CB_HRManagerApprove) {
        Swal.fire({
          text: "Please Select Approve or Reject",
          icon: "warning",
          showCancelButton: true,
        });
        return;
      }
      if (formData1.CB_HRManagerApprove == "R") {
        if (
          formData1.txt_CommentHRManager == "" ||
          formData1.txt_CommentHRManager == null
        ) {
          Swal.fire({
            text: "Please Input Comment ",
            icon: "warning",
          });
          return;
        }
      }
    }

    try {
      showLoading("กำลัง Submit...");
      await axios
        .post("/api/RequestManPower/UpdateApprove", {
          DeptFlg: formData1.CB_DepartmentApprove || "",
          DeptComment: formData1.txt_CommentDepartmentmanager || "",
          FMGMFlg: formData1.CB_FMGMApprove || "",
          FMGMComment: formData1.txt_CommentFMGM || "",
          HrFlg: formData1.CB_HRManagerApprove || "",
          HrComment: formData1.txt_CommentHRManager || "",
          status: formData1.ID_Status,
          ReqNo: formData1.txt_ReqNo,
          statusNext: statusNext,
          UpdateBy: datauser.LOGIN,
        })
        .then((res) => {
          console.log(res.data, "UpdateApprove");
        });
      Swal.fire({
        icon: "success",
        title: "Submit Success",
      }).then(async() => {
        await GetmailSend();
        if (formData1.StatusType == "R" || formData1.StatusType == "C") {
          window.location.href = "/HrSystem/ManPowerRequest";
        } else {
          window.location.href = "/HrSystem/ApproveManPower";
          // SendEmail();
        }
      });
      hideLoading();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
      console.error(error, "SaveDraft888");
      hideLoading();
    }
  };

  const GetmailSend = async () => {
    let status = formData1.ID_Status;
    let Usermail = [];

    if (status === "MR0104") {
      if (formData1.CB_HRManagerApprove === "A") {
        await axios
          .post("/api/Common/GetEmailHrStaff", {
            Fac: formData1.SL_Factory,
            formenu:'MAN POWER'
          })
          .then((res) => {
            console.log(res.data, "GetEmailHrStaff");
            if (res.data.length > 0) {
          
              res.data.forEach((user) => {
                SendEmail(user.User, user.Email); // ส่งอีเมลไปยังแต่ละคน
              });
            }
          });
      } else {
        Usermail = [
          formData1.txt_ReqBy,
          formData1.SL_DepartmentManager,
          formData1.SL_FMGM,
        ];
        await axios
          .post("/api/Common/GetEmailUser", {
            user: Usermail,
             formenu:'MAN POWER'
          })
          .then((res) => {
            if (res.data.length > 0) {
              res.data.forEach((user) => {
                console.log(user.User, "GetEmailSend", user.Email);
                SendEmail(user.User, user.Email);
              });
            }
          });
      }
    } else {
      if (
        status === "MR0101" ||
        status === "MR0129" ||
        status === "MR0139" ||
        status === "MR0149"
      ) {
        Usermail = [formData1.SL_DepartmentManager];
      } else if (status === "MR0102") {
        if (formData1.CB_DepartmentApprove === "A") {
          Usermail = [formData1.SL_FMGM];
        } else {
          Usermail = [formData1.txt_ReqBy];
        }
      } else if (status === "MR0103") {
        if (formData1.CB_FMGMApprove === "A") {
          Usermail = [formData1.SL_HRManager];
        } else {
          Usermail = [formData1.txt_ReqBy, formData1.SL_DepartmentManager];
        }
      } else if (status === "MR0105" || status === "MR0106") {
        Usermail = [formData1.txt_ReqBy];
      }
      await axios
        .post("/api/Common/GetEmailUser", {
          user: Usermail,
          formenu:'MAN POWER'
        })
        .then((res) => {
          if (res.data.length > 0) {
            res.data.forEach((user) => {
              console.log(user.User, "GetEmailSend", user.Email);
              SendEmail(user.User, user.Email);
            });
          }
        });
    }
  };

  const SendEmail = async (Dear, Email) => {
    const fomathtml = fomatmail(Dear);
    let ReqNo = formData1.txt_ReqNo;
    let status = formData1.ID_Status;
    let strSubject = "";
    if (
      status === "MR0101" ||
      status === "MR0129" ||
      status === "MR0139" ||
      status === "MR0149"
    ) {
      console.log("เข้า3331");
      strSubject = `Please Approve : (${ReqNo})`;
    } else {
      console.log("เข้า3332");
      if (
        formData1.CB_DepartmentApprove == "R" ||
        formData1.CB_FMGMApprove == "R" ||
        formData1.CB_HRManagerApprove == "R"
      ) {
        strSubject = `Please Revise Man Power request : (${ReqNo})`;
      }
      else{
        console.log("เข้า3333");
        strSubject = `Please Approve : (${ReqNo})`;
      }
    }
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
    let status = formData1.ID_Status;
    let statusDesc = "";
    let ActionComment = "";
    if (
      status === "MR0101" ||
      status === "MR0129" ||
      status === "MR0139" ||
      status === "MR0149"
    ) {
      statusDesc = "Wait Dept. Manager Approve";
    } else if (status === "MR0102") {
      ActionComment = formData1.txt_CommentDepartmentmanager;
      if (formData1.CB_DepartmentApprove == "A") {
        statusDesc = "Wait FM/GM Approve";
      } else {
        statusDesc = "Reject by Dept. Manager";
      }
    } else if (status === "MR0103") {
      ActionComment = formData1.txt_CommentFMGM;
      if (formData1.CB_DepartmentApprove == "A") {
        statusDesc = "Wait HR Manager Approve";
      } else {
        statusDesc = "Reject by FM/GM";
      }
    } else if (status === "MR0104") {
      ActionComment = formData1.txt_CommentFMGM;
      if (formData1.CB_DepartmentApprove == "A") {
        statusDesc = "Wait HR Staff Action";
      } else {
        statusDesc = "Reject by Dept. Manager";
      }
    } else if (status === "MR0105") {
      ActionComment = formData1.txt_HrComment;
      statusDesc = "On Process";
    } else if (status === "MR0106") {
      ActionComment = formData1.txt_HrComment;
      if (formData1.Radio_HrStatus == "MR0107") {
        statusDesc = "Closed";
      } else if (formData1.Radio_HrStatus == "MR0108") {
        statusDesc = "Closed by HR condition";
      }
    }
    return {
      Status: statusDesc,
      Comment: ActionComment,
    };
  };

  const fomatmail = (Dear) => {
    const Datamail = DataSendmail();
    console.log(Datamail, "Datamail");
    let status = formData1.ID_Status;
    const factory = Factory.find((f) => f.value === formData1.SL_Factory);
    const formattedRemark = formData1.txt_Remark.replace(/(.{60})/g, "$1<br>");
    let strEmailFormat = "";
    let Position = `${formData1.SL_Position} ${
      formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional
    } PERSON`;
    if (status === "MR0101") {
      strEmailFormat = `
        <!DOCTYPE html>
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
                                  This Request creates as follow ${formData1.txt_ReqBy}
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
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqNo}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Factory :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${factory.label}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Department :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.SL_Department}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Position :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${Position}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Target Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.Date_Target}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqBy}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqDate}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${userlogin}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${DateToday}</td>
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
    } else {
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
                                  This Request creates as follow ${formData1.txt_ReqBy}
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
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqNo}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Factory :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${factory.label}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Department :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.SL_Department}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Position :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${Position}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Target Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.Date_Target}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqBy}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqDate}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${userlogin}</td>
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
    }
    return strEmailFormat;
  };

  const bt_Reset = async () => {
    if( ["MR0101", "MR0129","MR0139","MR0149"].includes(formData1.ID_Status)){
      handleChange("SL_DepartmentManager", null);
      handleChange("SL_FMGM",null);
      handleChange("SL_HRManager", null);
    }
    if(formData1.ID_Status=='MR0102'){
      handleChange("txt_CommentDepartmentmanager",'');
      handleChange("CB_DepartmentApprove", '');
    }
    if(formData1.ID_Status=='MR0103'){
      handleChange("txt_CommentFMGM",'');
      handleChange("CB_FMGMApprove", '');
    }
    if(formData1.ID_Status=='MR0104'){
      handleChange("txt_CommentHRManager",'');
      handleChange("CB_HRManagerApprove", '');
    }
}

  return {
    DepartmentManager,
    FMGM,
    HrManager,
    handleChange,
    DateToday,
    SaveDraft,
    SendApprove,
    Bt_Submit,
    GetmailSend,
    bt_Reset
  };
}

export { fn_ForApprove };
