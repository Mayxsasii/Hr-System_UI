import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { useLocation } from "react-router-dom";

function fn_ManPowerMasterList() {
  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ReqNo = queryParams.get("ReqNo");
  const Email = localStorage.getItem("Email");
  const userlogin = localStorage.getItem("username");

  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const [Factory, setFactory] = useState([]);
  const [Education, setEducation] = useState([]);
  const [Course, setCourse] = useState([]);
  const [Field, setField] = useState([]);
  const [English, setEnglish] = useState([]);
  const [formData1, setFormData1] = useState({
    //Step1
    SL_Factory: null,
    txt_ReqStatus: "Create",
    ID_Status: "MR0101",
    StatusType: "C",
    txt_ReqDate: DateToday,
    txt_ReqNo: "",
    txt_ReqBy: "",
    SL_Department: null,
    txt_Email: Email,
    txt_TelNo: "",
    SL_Position: null,
    Date_Target: null,
    CB_EmpRequirment: [],
    SL_EmployeeType: null,
    txt_EmpType_Other: "",
    txt_EmpReq_Other: "",
    txt_Remark: "",
    //Step2
    txt_FileNameReadData: "",
    DataFileReadData: null,
    // ------------------------
    CB_Substitube: "",
    txt_TotalSubstitube: 0,
    CB_FileSubstitube: "",
    FileName_Sub: "",
    // FileNameServer_Sub: "",
    DataFileSub: null,
    //--Step2.sub
    Person_Sub: [
      {
        CopyNo: "",
        ID_Code: "",
        Emp_Name: "",
        Cost_Center: "",
        Job_grade: "",
        Dept: null,
        Req_Jobgrade: null,
        Education: null,
        EducationOther: null,
        Course: null,
        CourseOther: null,
        Field: null,
        FieldOther: null,
        Special: "",
        Experience: "",
        StepLanguage: null,
        StepLanguage_other: "",
        Filefeature: "",
        // FileServerfeature: "",
        DataFilefeature: null,
      },
    ],
    //---Step2.add
    CB_Additional: "",
    txt_TargetCapacity1: "",
    txt_TargetCapacity2: "",
    txt_TotalAdditional: 0,
    CB_FileAdditional: "",
    FileName_Add: "",
    FileNameServer_Add: "",
    DataFileADD: null,
    Person_ADD: [
      {
        CopyNo: "",
        Dept: null,
        Req_Jobgrade: null,
        Education: null,
        EducationOther: "",
        Course: null,
        CourseOther: "",
        Field: null,
        FieldOther: "",
        Special: "",
        Experience: "",
        StepLanguage: null,
        StepLanguage_other: "",
        Filefeature: "",
        // FileServerfeature: "",
        DataFilefeature: null,
      },
    ],
    //step3
    SL_DepartmentManager: null,
    CB_DepartmentApprove: "",
    Date_DepartmentManager: "",
    txt_CommentDepartmentmanager: "",

    SL_FMGM: null,
    CB_FMGMApprove: "",
    Date_FMGM: "",
    txt_CommentFMGM: "",

    SL_Chief: null,
    CB_ChiefApprove: "",
    Date_Chief: "",
    txt_CommentChief: "",

    SL_President: null,
    CB_PresidentApprove: "",
    Date_President: "",
    txt_CommentPresident: "",

    SL_HRManager: null,
    CB_HRManagerApprove: "",
    Date_HRManager: "",
    txt_CommentHRManager: "",
    //step4
    Radio_HrStatus: "MR0106",
    Sl_HrCloseBy: null,
    Date_HrAction: "",
    txt_HrStaffBy: "",
    txt_HrComment: "",
    txt_TotalManual: 0,
    txt_TotalRemain: 0,
    CB_HrFileAttach: false,
    Hr_FileAttach: "",
    Hr_DataFileAttach: null,
    Hr_NameFileOther: "",
    Hr_DataFileOther: null,
    Hr_Add: [
      {
        CB_Complete: false,
        Emp_id: "",
        Emp_name: "",
        Emp_sername: "",
        Emp_JoinDate: "",
      },
    ],
    Hr_Sub: [
      {
        CB_Complete: false,
        Emp_id: "",
        Emp_name: "",
        Emp_sername: "",
        Emp_JoinDate: "",
      },
    ],
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    GetFactory();
    GetEducation();
    GetCourse();
    GetField;
    GetField();
    GetEnglish();

    if (ReqNo != null) {
      // queryParams.delete("ReqNo");
      // const newUrl = `${location.pathname}?${queryParams.toString()}`;
      // window.history.replaceState(
      //   null,
      //   "",
      //   newUrl.endsWith("?") ? newUrl.slice(0, -1) : newUrl
      // );
      showLoading("Loading...");
      await GetdataEdit();
      await GetFileDetail();
      await GetFile();
      hideLoading();
    }
  };

  const GetEducation = async () => {
    await axios.post("/api/RequestManPower/GetEducation", {}).then((res) => {
      setEducation(res.data);
    });
  };

  const GetCourse = async () => {
    await axios.post("/api/RequestManPower/GetCourse", {}).then((res) => {
      setCourse(res.data);
    });
  };

  const GetField = async () => {
    await axios.post("/api/RequestManPower/GetField", {}).then((res) => {
      setField(res.data);
    });
  };

  const GetEnglish = async () => {
    await axios.post("/api/RequestManPower/GetEnglish", {}).then((res) => {
      setEnglish(res.data);
    });
  };

  const GetdataEdit = async () => {
    await axios
      .post("/api/RequestManPower/GetDataEdit", {
        ReqNo: ReqNo,
      })
      .then(async (res) => {
        console.log(res.data, "GetDataEdit");
        handleChange("txt_ReqNo", res.data[0].Req_No);
        handleChange("SL_Factory", res.data[0].Fac_code || null);
        handleChange("txt_ReqStatus", res.data[0].Status_Desc);
        handleChange("ID_Status", res.data[0].Status_code);
        if (res.data[0].Status_Type == "C" || res.data[0].Status_Type == "R") {
          console.log("vvvvvvv", res.data[0].Cb_Sub);
          //   DisableChange("SL_Factory", true);
          //   DisableChange("SL_Department", true);
          // DisableChange("SL_Position", true);

          if (res.data[0].Cb_Sub == "Y") {
            // DisableChange("ButtonSUB_ADD", false);
            // DisableChange("CB_FileSubstitube", false);
          }
          if (res.data[0].Cb_Add == "Y") {
            // DisableChange("ButtonADD_ADD", false);
            // DisableChange("CB_FileAdditional", false);
            // DisableChange("txt_TargetCapacity1", false);
            // DisableChange("txt_TargetCapacity2", false);
          }
        }
        handleChange("StatusType", res.data[0].Status_Type);
        handleChange("txt_ReqDate", res.data[0].Req_date);
        handleChange("txt_ReqBy", res.data[0].Req_By);
        handleChange("SL_Department", res.data[0].Dept || null);
        handleChange("txt_Email", res.data[0].Email);
        handleChange("txt_TelNo", res.data[0].Tel);
        handleChange("SL_Position", res.data[0].Position || null);
        handleChange("Date_Target", res.data[0].Target_date);
        handleChange("txt_Remark", res.data[0].Remark);
        handleChange(
          "CB_Substitube",
          res.data[0].Cb_Sub === "Y" ? true : false
        );
        handleChange("txt_TotalSubstitube", res.data[0].Sub_Total);
        handleChange(
          "CB_FileSubstitube",
          res.data[0].Cb_SubFile === "Y" ? true : false
        );
        handleChange("FileName_Sub", res.data[0].Sub_FileName);
        // handleChange("FileNameServer_Sub", res.data[0].Sub_FileNameServer);
        handleChange(
          "CB_Additional",
          res.data[0].Cb_Add === "Y" ? true : false
        );
        handleChange("txt_TargetCapacity1", res.data[0].Add_Target1);
        handleChange("txt_TargetCapacity2", res.data[0].Add_Target2);
        handleChange("txt_TotalAdditional", res.data[0].Add_Total);
        // handleChange("Hr_Add", Array.from({ length:  res.data[0].Add_Total }, () => ({
        //   Emp_id: "",
        //   Emp_name: "",
        //   Emp_sername: "",
        //   Emp_JoinDate: null,
        // })));
        handleChange(
          "CB_FileAdditional",
          res.data[0].Cb_AddFile === "Y" ? true : false
        );
        handleChange("FileName_Add", res.data[0].Add_FileName);
        // handleChange("FileNameServer_Add", res.data[0].Add_FileNameServer);

        handleChange("Date_DepartmentManager", res.data[0].Dept_date);
        handleChange("Date_FMGM", res.data[0].FMGM_Date);
        handleChange("Date_HRManager", res.data[0].FMGM_Date);
        handleChange("Date_Chief", res.data[0].COO_Date);
        handleChange("Date_President", res.data[0].CEO_Date);

        handleChange("SL_DepartmentManager", res.data[0].Dept_by || null);
        handleChange("CB_DepartmentApprove", res.data[0].Dept_Radio);
        handleChange("txt_CommentDepartmentmanager", res.data[0].Dept_Comment);

        handleChange("SL_FMGM", res.data[0].FMGM_By || null);
        handleChange("CB_FMGMApprove", res.data[0].FMGM_Radio);
        handleChange("txt_CommentFMGM", res.data[0].FMGM_Comment);

        handleChange("SL_Chief", res.data[0].COO_By || null);
        handleChange("CB_ChiefApprove", res.data[0].COO_Radio);
        handleChange("txt_CommentChief", res.data[0].COO_Comment);

        handleChange("SL_President", res.data[0].CEO_By || null);
        handleChange("CB_PresidentApprove", res.data[0].CEO_Radio);
        handleChange("txt_CommentPresident", res.data[0].CEO_Comment);

        handleChange("SL_HRManager", res.data[0].Hr_By || null);
        handleChange("CB_HRManagerApprove", res.data[0].Hr_Radio);
        handleChange("txt_CommentHRManager", res.data[0].Hr_Comment);
        //step4
        handleChange("Radio_HrStatus", res.data[0].HrStaff_Status);
        handleChange("Sl_HrCloseBy", res.data[0].HrStaff_Condition);
        // console.log(res.data[0].HrStaff_Condition, "Sl_HrCloseBy");
        handleChange("Date_HrAction", res.data[0].HR_lastDate);
        handleChange("txt_HrStaffBy", res.data[0].Hr_lastBy);
        handleChange("txt_HrComment", res.data[0].HrStaff_Comment);
        handleChange("txt_TotalManual", res.data[0].HrStaff_Complete);
        handleChange(
          "CB_HrFileAttach",
          res.data[0].HrStaff_CBFile == "Y" ? true : false
        );
        // handleChange("Hr_FileAttach", res.data[0].HrStaff_Filename);
        // handleChange("Hr_FileAttachServer", res.data[0].HrStaff_FileNameServer);
      });
    await axios
      .post("/api/RequestManPower/GetDataDetailStep1", {
        ReqNo: ReqNo,
      })
      .then((res) => {
        console.log(res.data, "GetDataDetailStep1");
        if (res.data.length > 0) {
          const empRequirements = [];
          for (let i = 0; i < res.data.length; i++) {
            empRequirements.push(res.data[i].CB_EmpRequirment);
          }

          handleChange("CB_EmpRequirment", empRequirements);
          for (let i = 0; i < empRequirements.length; i++) {
            if (empRequirements[i] == "MR0202") {
              handleChange(
                "SL_EmployeeType",
                res.data[i].SL_EmployeeType || null
              );
              handleChange("txt_EmpType_Other", res.data[i].txt_other);
            }
            if (empRequirements[i] == "MR0290") {
              handleChange("txt_EmpReq_Other", res.data[i].txt_other);
            }
          }
        }
      });
    await axios
      .post("/api/RequestManPower/GetDataPerson", {
        ReqNo: ReqNo,
      })
      .then((res) => {
        console.log(res.data, "mmmmmm1");
        if (res.data.length > 0) {
          const DataPerson_Sub = [];
          const DataPerson_ADD = [];
          const DataPersonJoinSub = [];
          const DataPersonJoinAdd = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].Req_flg == "SUBS") {
              DataPerson_Sub.push({
                CopyNo: "",
                ID_Code: res.data[i].Emp_id,
                Emp_Name: res.data[i].Emp_name + " " + res.data[i].Emp_sername,
                Cost_Center: res.data[i].Emp_Dept,
                Job_grade: res.data[i].Emp_Jobgrade,
                Dept: res.data[i].ForDept,
                Special: res.data[i].Spacial,
                Experience: res.data[i].experience,
                StepLanguage: res.data[i].lang_skill || null,
                StepLanguage_other: res.data[i].lang_other,
                // Filefeature: res.data[i].FileName,
              });
              DataPersonJoinSub.push({
                CB_Complete: res.data[i].Flg_Complte === "Y" ? true : false,
                Emp_id: res.data[i].Hr_EmpId,
                Emp_name: res.data[i].Hr_EmpName,
                Emp_sername: res.data[i].Hr_EmpSername,
                Emp_JoinDate: res.data[i].Hr_JoinDate || null,
              });
            } else if (res.data[i].Req_flg == "ADD") {
              DataPerson_ADD.push({
                CopyNo: "",
                Special: res.data[i].Spacial,
                Dept: res.data[i].ForDept,
                Experience: res.data[i].experience,
                StepLanguage: res.data[i].lang_skill || null,
                StepLanguage_other: res.data[i].lang_other,
                // Filefeature: res.data[i].FileName,
              });
              DataPersonJoinAdd.push({
                CB_Complete: res.data[i].Flg_Complte === "Y" ? true : false,
                Emp_id: res.data[i].Hr_EmpId,
                Emp_name: res.data[i].Hr_EmpName,
                Emp_sername: res.data[i].Hr_EmpSername,
                Emp_JoinDate: res.data[i].Hr_JoinDate,
              });
            }
            // DataPersonJoinHr.push({
          }
          if (DataPerson_Sub.length > 0) {
            setFormData1((prev) => ({
              ...prev,
              Person_Sub: DataPerson_Sub,
            }));
          }
          if (DataPerson_ADD.length > 0) {
            setFormData1((prev) => ({
              ...prev,
              Person_ADD: DataPerson_ADD,
            }));
          }
          if (DataPersonJoinSub.length > 0) {
            setFormData1((prev) => ({
              ...prev,
              Hr_Sub: DataPersonJoinSub,
            }));
          }
          if (DataPersonJoinAdd.length > 0) {
            setFormData1((prev) => ({
              ...prev,
              Hr_Add: DataPersonJoinAdd,
            }));
          }
        }
      });
    await axios
      .post("/api/RequestManPower/GetDataPersonDetail", {
        ReqNo: ReqNo,
      })
      .then((res) => {
        console.log(res.data, "GetDataPersonDetail");
        let Data_Sub = [];
        let Data_Add = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Rec_Id.includes("S")) {
            // if (res.data[i].Category == "EDUCATION") {
            const rec_id = parseInt(res.data[i].Rec_Id.replace(/\D/g, ""), 10); // ดึงเฉพาะตัวเลขและแปลงเป็นตัวเลข

            Data_Sub.push({
              Rec_Id: rec_id,
              Category: res.data[i].Category,
              Sl_value: res.data[i].Sl_value || null,
              txt_other: res.data[i].txt_Other,
            });
            // }
          } else if (
            res.data[i].Rec_Id.includes("A") &&
            res.data[i].Rec_Id != "ALL"
          ) {
            const rec_id = parseInt(res.data[i].Rec_Id.replace(/\D/g, ""), 10); // ดึงเฉพาะตัวเลขและแปลงเป็นตัวเลข

            Data_Add.push({
              Rec_Id: rec_id,
              Category: res.data[i].Category,
              Sl_value: res.data[i].Sl_value || null,
              txt_other: res.data[i].txt_Other,
            });
          }
        }

        for (let i = 0; i < Data_Sub.length; i++) {
          const recIdIndex = Data_Sub[i].Rec_Id - 1;
          if (Data_Sub[i].Category === "EDUCATION") {
            setFormData1((prev) => {
              const updatedPersonSub = [...prev.Person_Sub];

              if (!updatedPersonSub[recIdIndex]) {
                updatedPersonSub[recIdIndex] = {};
              }

              if (!Array.isArray(updatedPersonSub[recIdIndex].Education)) {
                updatedPersonSub[recIdIndex].Education = [];
              }

              updatedPersonSub[recIdIndex].Education.push(Data_Sub[i].Sl_value);

              if (Data_Sub[i].Sl_value === "MR0490") {
                console.log(Data_Sub[i].txt_other, "Data_SubMR0490");
                updatedPersonSub[recIdIndex].EducationOther =
                  Data_Sub[i].txt_other || "";
              }

              return {
                ...prev,
                Person_Sub: updatedPersonSub,
              };
            });
          }
          if (Data_Sub[i].Category === "JOB GRADE") {
            setFormData1((prev) => {
              const updatedPersonSub = [...prev.Person_Sub];
              if (!updatedPersonSub[recIdIndex]) {
                updatedPersonSub[recIdIndex] = {};
              }
              if (!Array.isArray(updatedPersonSub[recIdIndex].Req_Jobgrade)) {
                updatedPersonSub[recIdIndex].Req_Jobgrade = [];
              }

              updatedPersonSub[recIdIndex].Req_Jobgrade.push(
                Data_Sub[i].Sl_value
              );
              console.log(updatedPersonSub, "updatedPersonSub");
              return {
                ...prev,
                Person_Sub: updatedPersonSub,
              };
            });
          }
          if (Data_Sub[i].Category === "COURSE") {
            setFormData1((prev) => {
              const updatedPersonSub = [...prev.Person_Sub];
              if (!updatedPersonSub[recIdIndex]) {
                updatedPersonSub[recIdIndex] = {};
              }

              if (!Array.isArray(updatedPersonSub[recIdIndex].Course)) {
                updatedPersonSub[recIdIndex].Course = [];
              }

              updatedPersonSub[recIdIndex].Course.push(Data_Sub[i].Sl_value);
              if (Data_Sub[i].Sl_value === "MR0507") {
                console.log(Data_Sub[i].txt_other, "Data_SubMR0507");
                updatedPersonSub[recIdIndex].CourseOther =
                  Data_Sub[i].txt_other || "";
              }

              return {
                ...prev,
                Person_Sub: updatedPersonSub,
              };
            });
          }
          if (Data_Sub[i].Category === "FIELD") {
            setFormData1((prev) => {
              const updatedPersonSub = [...prev.Person_Sub];
              if (!updatedPersonSub[recIdIndex]) {
                updatedPersonSub[recIdIndex] = {};
              }
              if (!Array.isArray(updatedPersonSub[recIdIndex].Field)) {
                updatedPersonSub[recIdIndex].Field = [];
              }

              updatedPersonSub[recIdIndex].Field.push(Data_Sub[i].Sl_value);
              if (Data_Sub[i].Sl_value === "MR0699") {
                console.log(Data_Sub[i].txt_other, "Data_SubMR0699");
                updatedPersonSub[recIdIndex].FieldOther =
                  Data_Sub[i].txt_other || "";
              }
              return {
                ...prev,
                Person_Sub: updatedPersonSub,
              };
            });
          }
        }
        for (let i = 0; i < Data_Add.length; i++) {
          const recIdIndex = Data_Add[i].Rec_Id - 1;
          if (Data_Add[i].Category === "EDUCATION") {
            setFormData1((prev) => {
              const updatedPersonSub = [...prev.Person_ADD];
              if (!updatedPersonSub[recIdIndex]) {
                updatedPersonSub[recIdIndex] = {};
              }
              if (!Array.isArray(updatedPersonSub[recIdIndex].Education)) {
                updatedPersonSub[recIdIndex].Education = [];
              }
              updatedPersonSub[recIdIndex].Education.push(Data_Add[i].Sl_value);
              if (Data_Add[i].Sl_value === "MR0490") {
                updatedPersonSub[recIdIndex].EducationOther =
                  Data_Add[i].txt_other || "";
              }
              return {
                ...prev,
                Person_ADD: updatedPersonSub,
              };
            });
          }
          if (Data_Add[i].Category === "JOB GRADE") {
            setFormData1((prev) => {
              const updatedPersonSub = [...prev.Person_ADD];
              if (!updatedPersonSub[recIdIndex]) {
                updatedPersonSub[recIdIndex] = {};
              }
              if (!Array.isArray(updatedPersonSub[recIdIndex].Req_Jobgrade)) {
                updatedPersonSub[recIdIndex].Req_Jobgrade = [];
              }
              updatedPersonSub[recIdIndex].Req_Jobgrade.push(
                Data_Add[i].Sl_value
              );
              return {
                ...prev,
                Person_ADD: updatedPersonSub,
              };
            });
          }
          if (Data_Add[i].Category === "COURSE") {
            setFormData1((prev) => {
              const updatedPersonSub = [...prev.Person_ADD];
              if (!updatedPersonSub[recIdIndex]) {
                updatedPersonSub[recIdIndex] = {};
              }
              if (!Array.isArray(updatedPersonSub[recIdIndex].Course)) {
                updatedPersonSub[recIdIndex].Course = [];
              }
              updatedPersonSub[recIdIndex].Course.push(Data_Add[i].Sl_value);
              if (Data_Add[i].Sl_value === "MR0507") {
                updatedPersonSub[recIdIndex].CourseOther =
                  Data_Add[i].txt_other || "";
              }
              return {
                ...prev,
                Person_ADD: updatedPersonSub,
              };
            });
          }
          if (Data_Add[i].Category === "FIELD") {
            setFormData1((prev) => {
              const updatedPersonSub = [...prev.Person_ADD];
              if (!updatedPersonSub[recIdIndex]) {
                updatedPersonSub[recIdIndex] = {};
              }
              if (!Array.isArray(updatedPersonSub[recIdIndex].Field)) {
                updatedPersonSub[recIdIndex].Field = [];
              }
              updatedPersonSub[recIdIndex].Field.push(Data_Add[i].Sl_value);
              if (Data_Add[i].Sl_value === "MR0699") {
                updatedPersonSub[recIdIndex].FieldOther =
                  Data_Add[i].txt_other || "";
              }
              return {
                ...prev,
                Person_ADD: updatedPersonSub,
              };
            });
          }
        }
      });
  };

  const GetFile = async () => {
    const processFile = (fileName, fileData) => {
      if (!fileName || !fileData) return null;

      let mimeType = "";
      if (fileName.endsWith(".pdf")) {
        mimeType = "application/pdf";
      } else if (fileName.endsWith(".xls")) {
        mimeType = "application/vnd.ms-excel";
      } else if (fileName.endsWith(".xlsx")) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      } else {
        console.error("Unsupported file type");
        return null;
      }

      const blob = new Blob([new Uint8Array(fileData.data)], {
        type: mimeType,
      });
      return new File([blob], fileName, { type: mimeType });
    };

    try {
      const response = await axios.post("/api/Common/GetFile", {
        ReqNo: ReqNo,
      });
      console.log(response.data, "GetFile");

      const resData = response.data[0];
      if (!resData) {
        console.error("No data found");
        return;
      }

      const fileAdd = processFile(resData.AddName, resData.AddName_File);
      const fileSub = processFile(resData.SubName, resData.SubName_File);
      const fileHr = processFile(resData.HrAcName, resData.HrAcName_File);
      console.log(fileAdd, fileSub, fileHr, "fileAdd,fileSub,fileHr");
      if (fileAdd) {
        handleChange("FileName_Add", fileAdd.name);
        handleChange("DataFileADD", fileAdd);
      }
      if (fileSub) {
        handleChange("FileName_Sub", fileSub.name);
        handleChange("DataFileSub", fileSub);
      }
      if (fileHr) {
        handleChange("Hr_NameFileOther", fileHr.name);
        handleChange("Hr_DataFileOther", fileHr);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const GetFileDetail = async () => {
    const processFile = (fileName, fileData) => {
      if (!fileName || !fileData || !fileData.data) {
        console.error("Invalid file data or file name:", {
          fileName,
          fileData,
        });
        return null;
      }

      let mimeType = "";
      if (fileName.endsWith(".pdf")) {
        mimeType = "application/pdf";
      } else if (fileName.endsWith(".xls")) {
        mimeType = "application/vnd.ms-excel";
      } else if (fileName.endsWith(".xlsx")) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      } else {
        console.error("Unsupported file type:", fileName);
        return null;
      }

      try {
        const blob = new Blob([new Uint8Array(fileData.data)], {
          type: mimeType,
        });
        return new File([blob], fileName, { type: mimeType });
      } catch (error) {
        console.error("Error creating file object:", error);
        return null;
      }
    };

    try {
      const response = await axios.post("/api/Common/GetFileDetail", {
        ReqNo: ReqNo,
      });
      console.log(response.data, "GetFileDetail0");

      const resData = response.data;
      console.log(resData, "GetFileDetail1");

      if (!resData || resData.length === 0) {
        console.error("No data found");
        return;
      }

      for (let i = 0; i < resData.length; i++) {
        const fileName = resData[i].FileName || "";
        const fileData = resData[i].File || null;
        const recID = resData[i].RecID || "";

        if (fileName == "") {
          console.log(`Invalid file data at index ${i}:`, resData[i]);
          continue;
        }

        const fileDetail = processFile(fileName, fileData);
        if (!fileDetail) {
          console.log(`Failed to process file at index ${i}:`, fileName, recID);
          continue;
        }

        // console.log(fileDetail, "fileDetailxxx",recID);

        const ADDSUB = recID.charAt(0);
        const index = parseInt(recID.slice(-2), 10) - 1;

        // console.log("subbbbAdddd", recID, ADDSUB, index);

        if (ADDSUB === "S") {
          setFormData1((prev) => {
            const updatedPersonSub = [...(prev.Person_Sub || [])];
            if (!updatedPersonSub[index]) {
              updatedPersonSub[index] = {};
            }
            updatedPersonSub[index] = {
              ...updatedPersonSub[index],
              DataFilefeature: fileDetail,
              Filefeature: fileName,
            };

            return {
              ...prev,
              Person_Sub: updatedPersonSub,
            };
          });
        }
        if (ADDSUB === "A") {
          setFormData1((prev) => {
            const updatedPersonADD = [...(prev.Person_ADD || [])];
            if (!updatedPersonADD[index]) {
              updatedPersonADD[index] = {};
            }
            updatedPersonADD[index] = {
              ...updatedPersonADD[index],
              DataFilefeature: fileDetail,
              Filefeature: fileName,
            };

            return {
              ...prev,
              Person_Sub: updatedPersonADD,
            };
          });
        }
        //
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

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

  const DownLoadFile = (File, FileName) => {
    if (File && FileName) {
      console.log(File, "Downloaddd");
      let mimeType = "";
      if (FileName.endsWith(".pdf")) {
        mimeType = "application/pdf";
      } else if (FileName.endsWith(".xls")) {
        mimeType = "application/vnd.ms-excel";
      } else if (FileName.endsWith(".xlsx")) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      } else {
        console.error("Unsupported file type");
        return;
      }

      const blob = new Blob([File], { type: mimeType });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = FileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } else {
      console.error("No file data or file name available");
    }
  };

  return {
    formData1,
    Factory,
    Education,
    Course,
    Field,
    English,
    DownLoadFile,
  };
}

export { fn_ManPowerMasterList };
