import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { fn_Header } from "../../Header/fn_Header";
import Swal from "sweetalert2";
import moment from "moment";
function fn_ForApprove(formData1, setFormData1) {
  console.log(formData1, "fn_ForApprove");
  const { datauser } = fn_Header();
  const { showLoading, hideLoading } = useLoading();
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
  }, []);
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
          await UploadFile(formData1.DataFileSub);
        } else {
          for (let i = 0; i < Person_Sub.length; i++) {
            await UploadFile(formData1.Person_Sub[i].DataFilefeature);
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
                Emp_dept: Person_Sub[i].Dept || "",
                Emp_Jobgrade: Person_Sub[i].Job_grade || "",
                For_Dept: Person_Sub[i].for_Dept || "",
                Special: Person_Sub[i].Special || "",
                Expereince: Person_Sub[i].Experience || "",
                Lang_skill: Person_Sub[i].StepLanguage || "",
                Lang_other: Person_Sub[i].StepLanguage_other || "",
                Filename: Person_Sub[i].Filefeature || "",
                FilenameServer: FileNameServer || "",
                Create_by: datauser.LOGIN,
              })
              .then((res) => {
                console.log(res.data, "InsPersonSUB");
              });

            if (
              formData1.Person_Sub[i].Education != null &&
              formData1.Person_Sub[i].Education.length > 0
            ) {
              for (
                let j = 0;
                j < formData1.Person_Sub[i].Education.length;
                j++
              ) {
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
                let j = 0; j < formData1.Person_Sub[i].Req_Jobgrade.length;j++
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
          }
        }
      }

      if (CB_Additional) {
        if (CB_FileAdditional) {
          await UploadFile(formData1.DataFileADD);
        } 
        else {
          for (let i = 0; i < Person_ADD.length; i++) {
            await UploadFile(formData1.Person_ADD[i].DataFilefeature);
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
                For_Dept: "",
                Special: Person_ADD[i].Special,
                Expereince: Person_ADD[i].Experience,
                Lang_skill: Person_ADD[i].StepLanguage,
                Lang_other: Person_ADD[i].StepLanguage_other,
                Filename: Person_ADD[i].Filefeature,
                FilenameServer: FileNameServer,
                Create_by: datauser.LOGIN,
              })
              .then((res) => {
                console.log(res.data, "InsPersonADD");
              });
            if (
              formData1.Person_ADD[i].Education != null &&
              formData1.Person_ADD[i].Education.length > 0
            ) {
              for (
                let j = 0;
                j < formData1.Person_ADD[i].Education.length;
                j++
              ) {
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
          }
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
        })
        .then((res) => {
          console.log(res.data, "SaveDraft999");
        });
      Swal.fire({
        icon: "success",
        title: "Save Success",
      }).then(() => {
        //window.location.href = "/HrSystem/ManPowerRequest";
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
      console.error(error, "SaveDraft888");
      hideLoading();
    }

    hideLoading();
  };

  const GetEmail = async (UserLogin) => {
    await axios
    .post("/api/Common/GetEmail", {
      // strSubject:  `Please Apprpve : (${ReqNo}) `,
    })
    .then((res) => {
      // console.log(res.data, "EmailSend");
    });
  }
  const UploadFile = async (file) => {
    // const file = formData1.DataFileSub
    console.log(file, "UploadFile");
    if (!file) {
      console.log("เข้ามาแล้ว  ไม่มีไฟล์");
      return;
    } else {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post("/api/Common/UploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        alert(
          "Error uploading file: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  const SendApprove = async () => {
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
          await UploadFile(formData1.DataFileSub);
        } else {
          for (let i = 0; i < Person_Sub.length; i++) {
            await UploadFile(formData1.Person_Sub[i].DataFilefeature);
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
                Emp_dept: Person_Sub[i].Dept || "",
                Emp_Jobgrade: Person_Sub[i].Job_grade || "",
                For_Dept: Person_Sub[i].for_Dept || "",
                Special: Person_Sub[i].Special || "",
                Expereince: Person_Sub[i].Experience || "",
                Lang_skill: Person_Sub[i].StepLanguage || "",
                Lang_other: Person_Sub[i].StepLanguage_other || "",
                Filename: Person_Sub[i].Filefeature || "",
                FilenameServer: FileNameServer || "",
                Create_by: datauser.LOGIN,
              })
              .then((res) => {
                console.log(res.data, "InsPersonSUB");
              });

            if (
              formData1.Person_Sub[i].Education != null &&
              formData1.Person_Sub[i].Education.length > 0
            ) {
              for (
                let j = 0;
                j < formData1.Person_Sub[i].Education.length;
                j++
              ) {
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
          }
        }
      }

      if (CB_Additional) {
        if (CB_FileAdditional) {
          await UploadFile(formData1.DataFileADD);
        } else {
          for (let i = 0; i < Person_ADD.length; i++) {
            await UploadFile(formData1.Person_ADD[i].DataFilefeature);
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
                For_Dept: "",
                Special: Person_ADD[i].Special,
                Expereince: Person_ADD[i].Experience,
                Lang_skill: Person_ADD[i].StepLanguage,
                Lang_other: Person_ADD[i].StepLanguage_other,
                Filename: Person_ADD[i].Filefeature,
                FilenameServer: FileNameServer,
                Create_by: datauser.LOGIN,
              })
              .then((res) => {
                console.log(res.data, "InsPersonADD");
              });
            if (
              formData1.Person_ADD[i].Education != null &&
              formData1.Person_ADD[i].Education.length > 0
            ) {
              for (
                let j = 0;
                j < formData1.Person_ADD[i].Education.length;
                j++
              ) {
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
          }
        }
      }

      const TargetDate = moment(Date_Target, "DD/MM/YYYY").format("YYYY-MM-DD");
      console.log(TargetDate, "TargetDate");
      await axios
        .post("/api/RequestManPower/SaveDraft", {
          ReqNo: txt_ReqNo,
          Email: txt_Email || "",
          Status: "MR0102",
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
        })
        .then((res) => {
          console.log(res.data, "SaveDraft999");
        });
      Swal.fire({
        icon: "success",
        title: "Save Success",
      }).then(() => {
        //window.location.href = "/HrSystem/ManPowerRequest";
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
      console.error(error, "SaveDraft888");
      hideLoading();
    }

    hideLoading();
  };

  const SendEmail = async () => {
    let ReqNo= formData1.txt_ReqNo;
    await axios
      .post("/api/Common/EmailSend", {
        strSubject:  `Please Apprpve : (${ReqNo}) `,
        UserApprove:'test1',
        Req_By:formData1.txt_ReqBy,
        FixSystem:'HR Online >> Man Power',
        Req_No:formData1.txt_ReqNo,
        Fac_Desc:'TEST FACTORY',
        Dept:formData1.SL_Department,
        Position:formData1.SL_Position,
        Target_Date:formData1.SL_Position,
        Req_Date:formData1.txt_ReqDate,
        Send_Date:'Date today',
        Remark:formData1.txt_Remark,
        Req_Status:'สเต็ป 1',
      })
      .then((res) => {
        console.log(res.data, "EmailSend");
      });
  };

  return {
    DepartmentManager,
    FMGM,
    HrManager,
    handleChange,
    DateToday,
    SaveDraft,
    SendApprove,
  };
}

export { fn_ForApprove };
