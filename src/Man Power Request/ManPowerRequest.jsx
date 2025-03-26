import React, { useState, useEffect } from "react";
import { Button, message, Steps, theme } from "antd";
import Step1 from "./NewManPowerRequset/NewManPowerRequest";
import Step2 from "./ReasontoRequest/ReasontoRequest";
import Step3 from "./ForApprove/ForApprove";
import Step4 from "./HRStaffAction/HRStaffAction";
import { fn_Header } from "../Header/fn_Header";
import Swal from "sweetalert2";
import axios from "axios";
import { useLoading } from "../loading/fn_loading";
import { useLocation } from "react-router-dom";
import { fn_ManPower } from "./fn_ManPower";
// const steps = [
//   {
//     title: "New Man Power Request",
//     content: (props) => <Step1 {...props} />,
//   },
//   {
//     title: "Reason to request",
//     content: (props) => <Step2 {...props} />,
//   },
//   {
//     title: "For Approve",
//     content: (props) => <Step3 {...props} />,
//   },
//   {
//     title: "HR Staff Action",
//     content: (props) => <Step4 {...props} />,
//   },
// ];

const App = () => {
  const {
    current,
    onChange,
    items,
    steps,
    formData1,
    setFormData1,
    prev,
    next,
    contentStyle,
  } = fn_ManPower();
  //   const { showLoading, hideLoading } = useLoading();
  //   const location = useLocation();
  //   const queryParams = new URLSearchParams(location.search);
  //   const ReqNo = queryParams.get("ReqNo"); // รับค่า ReqNo จาก query string

  //   const { datauser } = fn_Header();
  //   const Email = localStorage.getItem("Email");

  //   const { token } = theme.useToken();
  //   const today = new Date();
  //   const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
  //     today.getMonth() + 1
  //   ).padStart(2, "0")}/${today.getFullYear()}`;
  //   const [current, setCurrent] = useState(0);
  //   const [formData1, setFormData1] = useState({
  //     //Step1
  //     SL_Factory: null,
  //     txt_ReqStatus: "Create",
  //     ID_Status: "MR0101",
  //     StatusCode: "",
  //     txt_ReqDate: DateToday,
  //     txt_ReqNo: "",
  //     txt_ReqBy: "",
  //     SL_Department: null,
  //     txt_Email: Email,
  //     txt_TelNo: "",
  //     SL_Position: null,
  //     Date_Target: null,
  //     CB_EmpRequirment: [],
  //     // txt_ReqTotal: 0,
  //     SL_EmployeeType: null,
  //     txt_EmpType_Other: "",
  //     txt_EmpReq_Other: "",
  //     txt_Remark: "",
  //     //Step2
  //     CB_Substitube: "",
  //     txt_TotalSubstitube: 0,
  //     CB_FileSubstitube: "",
  //     FileName_Sub: "",
  //     FileNameServer_Sub: "",
  //     //--Step2.sub
  //     Person_Sub: [
  //       {
  //         CopyNo: "",
  //         ID_Code: "",
  //         Emp_Name: "",
  //         Cost_Center: "",
  //         Job_grade: "",
  //         Dept: null,
  //         for_Dept: "",
  //         Req_Jobgrade: null,
  //         Education: null,
  //         EducationOther: null,
  //         Course: null,
  //         CourseOther: null,
  //         Field: null,
  //         FieldOther: null,
  //         Special: "",
  //         Experience: "",
  //         StepLanguage: null,
  //         StepLanguage_other: "",
  //         Filefeature: "",
  //       },
  //     ],
  //     //---Step2.add
  //     CB_Additional: "",
  //     txt_TargetCapacity1: "",
  //     txt_TargetCapacity2: "",
  //     txt_TotalAdditional: 0,
  //     CB_FileAdditional: "",
  //     FileName_Add: "",
  //     FileNameServer_Add: "",
  //     Person_ADD: [
  //       {
  //         CopyNo: "",
  //         Education: null,
  //         EducationOther: "",
  //         Course: null,
  //         CourseOther: "",
  //         Field: null,
  //         FieldOther: "",
  //         Special: "",
  //         Experience: "",
  //         StepLanguage: null,
  //         StepLanguage_other: "",
  //         Filefeature: "",
  //       },
  //     ],
  //     //step3
  //     SL_DepartmentManager: null,
  //     CB_DepartmentApprove: "Approve",
  //     Date_DepartmentManager: "",
  //     txt_CommentDepartmentmanager: "",
  //     SL_FMGM: null,
  //     CB_FMGMApprove: "Approve",
  //     Date_FMGM: "",
  //     txt_CommentFMGM: "",
  //     SL_HRManager: null,
  //     CB_HRManagerApprove: "Approve",
  //     Date_HRManager: "",
  //     txt_CommentHRManager: "",
  //     //step4
  //   });
  //   useEffect(() => {
  //     FetchData();
  //     // handleChange("txt_ReqBy", datauser.LOGIN);
  //   }, []);

  //   const FetchData = async () => {
  //     if (ReqNo != null) {
  //       showLoading("Loading...");
  //       await GetdataEdit();
  //       hideLoading();
  //     }
  //   };
  //   const GetdataEdit = async () => {
  //     await axios
  //       .post("/api/RequestManPower/GetDataEdit", {
  //         ReqNo: ReqNo,
  //       })
  //       .then((res) => {
  //         handleChange("txt_ReqNo", res.data[0].Req_No);
  //         handleChange("SL_Factory", res.data[0].Fac_code || null);
  //         handleChange("txt_ReqStatus", res.data[0].Status_Desc);
  //         handleChange("ID_Status", res.data[0].Status_code);
  //         handleChange("StatusCode", res.data[0].Status_code);
  //         handleChange("txt_ReqBy", res.data[0].Dept_by);
  //         handleChange("SL_Department", res.data[0].Dept || null);
  //         handleChange("txt_Email", res.data[0].Email);
  //         handleChange("txt_TelNo", res.data[0].Tel);
  //         handleChange("SL_Position", res.data[0].Position || null);
  //         handleChange("Date_Target", res.data[0].Target_date);
  //         handleChange("txt_Remark", res.data[0].Remark);

  //         handleChange("CB_Substitube", res.data[0].Cb_Sub);
  //         handleChange("txt_TotalSubstitube", res.data[0].Sub_Total);
  //         handleChange(
  //           "CB_FileSubstitube",
  //           res.data[0].Cb_SubFile === "Y" ? true : false
  //         );
  //         handleChange("FileName_Sub", res.data[0].Sub_FileName);
  //         handleChange("FileNameServer_Sub", res.data[0].Sub_FileNameServer);

  //         handleChange(
  //           "CB_Additional",
  //           res.data[0].Cb_Add === "Y" ? true : false
  //         );
  //         handleChange("txt_TargetCapacity1", res.data[0].Add_Target1);
  //         handleChange("txt_TargetCapacity2", res.data[0].Add_Target2);
  //         handleChange("txt_TotalAdditional", res.data[0].Add_Total);
  //         handleChange("CB_FileAdditional", res.data[0].Add_FileNameServer);
  //         handleChange("FileName_Add", res.data[0].Sub_FileNameServer);
  //         handleChange("FileNameServer_Add", res.data[0].Sub_FileNameServer);

  //         handleChange("SL_DepartmentManager", res.data[0].Dept_by || null);
  //         handleChange("CB_DepartmentApprove", res.data[0].Dept_Radio);
  //         handleChange("Date_DepartmentManager", res.data[0].Dept_date);
  //         handleChange("txt_CommentDepartmentmanager", res.data[0].Dept_Comment);

  //         handleChange("SL_FMGM", res.data[0].FMGM_By || null);
  //         handleChange("CB_FMGMApprove", res.data[0].FMGM_Radio);
  //         handleChange("Date_FMGM", res.data[0].FMGM_Date);
  //         handleChange("txt_CommentFMGM", res.data[0].FMGM_Comment);

  //         handleChange("SL_HRManager", res.data[0].Hr_By || null);
  //         handleChange("CB_HRManagerApprove", res.data[0].Hr_Radio);
  //         handleChange("Date_HRManager", res.data[0].Hr_Date);
  //         handleChange("txt_CommentHRManager", res.data[0].Hr_Comment);
  //         // handleChange("SL_Department", res.data[0].Dept);
  //         // handleChange(CB_EmpRequirment)
  //       });
  //     await axios
  //       .post("/api/RequestManPower/GetDataDetailStep1", {
  //         ReqNo: ReqNo,
  //       })
  //       .then((res) => {
  //         if (res.data.length > 0) {
  //           const empRequirements = [];
  //           for (let i = 0; i < res.data.length; i++) {
  //             empRequirements.push(res.data[i].CB_EmpRequirment);
  //           }

  //           handleChange("CB_EmpRequirment", empRequirements);
  //           for (let i = 0; i < empRequirements.length; i++) {
  //             if (empRequirements[i] == "MR0202") {
  //               handleChange(
  //                 "SL_EmployeeType",
  //                 res.data[i].SL_EmployeeType || null
  //               );
  //               handleChange("txt_EmpType_Other", res.data[i].txt_other);
  //             }
  //             if (empRequirements[i] == "MR0290") {
  //               handleChange("txt_EmpReq_Other", res.data[i].txt_other);
  //             }
  //           }
  //         }
  //       });
  //     await axios
  //       .post("/api/RequestManPower/GetDataPerson", {
  //         ReqNo: ReqNo,
  //       })
  //       .then((res) => {
  //         if (res.data.length > 0) {
  //           const DataPerson_Sub = [];
  //           const DataPerson_ADD = [];
  //           for (let i = 0; i < res.data.length; i++) {
  //             if (res.data[i].Req_flg == "SUBS") {
  //               DataPerson_Sub.push({
  //                 CopyNo: "",
  //                 ID_Code: res.data[i].Emp_id,
  //                 Emp_Name: res.data[i].Emp_name + " " + res.data[i].Emp_sername,
  //                 Cost_Center: res.data[i].Emp_Dept,
  //                 Job_grade: res.data[i].Emp_Jobgrade,
  //                 Dept: res.data[i].Emp_Dept,
  //                 for_Dept: res.data[i].ForDept,
  //                 Special: res.data[i].Spacial,
  //                 Experience: res.data[i].experience,
  //                 StepLanguage: res.data[i].lang_skill,
  //                 StepLanguage_other: res.data[i].lang_other,
  //                 Filefeature: res.data[i].FileName,
  //               });
  //             } else if (res.data[i].Req_flg == "ADD") {
  //               DataPerson_ADD.push({
  //                 CopyNo: "",
  //                 Special: res.data[i].Spacial,
  //                 Experience: res.data[i].experience,
  //                 StepLanguage: res.data[i].lang_skill,
  //                 StepLanguage_other: res.data[i].lang_other,
  //                 Filefeature: res.data[i].FileName,
  //               });
  //             }
  //           }
  //           if (DataPerson_Sub.length > 0) {
  //             setFormData1((prev) => ({
  //               ...prev,
  //               Person_Sub: DataPerson_Sub,
  //             }));
  //           }
  //           if (DataPerson_ADD.length > 0) {
  //             setFormData1((prev) => ({
  //               ...prev,
  //               Person_ADD: DataPerson_ADD,
  //             }));
  //           }
  //         }
  //       });
  //     await axios
  //       .post("/api/RequestManPower/GetDataPersonDetail", {
  //         ReqNo: ReqNo,
  //       })
  //       .then((res) => {
  //         let Data_Sub = [];
  //         let Data_Add = [];
  //         for (let i = 0; i < res.data.length; i++) {
  //           if (res.data[i].Rec_Id.includes("S")) {
  //             // if (res.data[i].Category == "EDUCATION") {
  //             const rec_id = parseInt(res.data[i].Rec_Id.replace(/\D/g, ""), 10); // ดึงเฉพาะตัวเลขและแปลงเป็นตัวเลข

  //             Data_Sub.push({
  //               Rec_Id: rec_id,
  //               Category: res.data[i].Category,
  //               Sl_value: res.data[i].Sl_value || null,
  //               txt_other: res.data[i].txt_Other,
  //             });
  //             // }
  //           } else if (
  //             res.data[i].Rec_Id.includes("A") &&
  //             res.data[i].Rec_Id != "ALL"
  //           ) {
  //             const rec_id = parseInt(res.data[i].Rec_Id.replace(/\D/g, ""), 10); // ดึงเฉพาะตัวเลขและแปลงเป็นตัวเลข

  //             Data_Add.push({
  //               Rec_Id: rec_id,
  //               Category: res.data[i].Category,
  //               Sl_value: res.data[i].Sl_value || null,
  //               txt_other: res.data[i].txt_Other,
  //             });
  //           }
  //         }

  //         for (let i = 0; i < Data_Sub.length; i++) {
  //           const recIdIndex = Data_Sub[i].Rec_Id - 1;
  //           if (Data_Sub[i].Category === "EDUCATION") {
  //             setFormData1((prev) => {
  //               const updatedPersonSub = [...prev.Person_Sub];

  //               if (!updatedPersonSub[recIdIndex]) {
  //                 updatedPersonSub[recIdIndex] = {};
  //               }

  //               if (!Array.isArray(updatedPersonSub[recIdIndex].Education)) {
  //                 updatedPersonSub[recIdIndex].Education = [];
  //               }

  //               updatedPersonSub[recIdIndex].Education.push(Data_Sub[i].Sl_value);

  //               if (Data_Sub[i].Sl_value === "MR0490") {
  //                 console.log( Data_Sub[i].txt_other,'Data_SubMR0490')
  //                 updatedPersonSub[recIdIndex].EducationOther = Data_Sub[i].txt_other || "";
  //               }

  //               return {
  //                 ...prev,
  //                 Person_Sub: updatedPersonSub,
  //               };
  //             });
  //           }
  //           if (Data_Sub[i].Category === "JOB GRADE") {
  //             setFormData1((prev) => {
  //               const updatedPersonSub = [...prev.Person_Sub];
  //               if (!updatedPersonSub[recIdIndex]) {
  //                 updatedPersonSub[recIdIndex] = {};
  //               }
  //               if (!Array.isArray(updatedPersonSub[recIdIndex].Req_Jobgrade)) {
  //                 updatedPersonSub[recIdIndex].Req_Jobgrade = [];
  //               }

  //               updatedPersonSub[recIdIndex].Req_Jobgrade.push(
  //                 Data_Sub[i].Sl_value
  //               );
  //               console.log(updatedPersonSub,'updatedPersonSub')
  //               return {
  //                 ...prev,
  //                 Person_Sub: updatedPersonSub,
  //               };
  //             });
  //           }
  //           if (Data_Sub[i].Category === "COURSE") {
  //             setFormData1((prev) => {
  //               const updatedPersonSub = [...prev.Person_Sub];
  //               if (!updatedPersonSub[recIdIndex]) {
  //                 updatedPersonSub[recIdIndex] = {};
  //               }

  //               if (!Array.isArray(updatedPersonSub[recIdIndex].Course)) {
  //                 updatedPersonSub[recIdIndex].Course = [];
  //               }

  //               updatedPersonSub[recIdIndex].Course.push(Data_Sub[i].Sl_value);
  //               if (Data_Sub[i].Sl_value === "MR0507") {
  //                 console.log( Data_Sub[i].txt_other,'Data_SubMR0507')
  //                 updatedPersonSub[recIdIndex].CourseOther = Data_Sub[i].txt_other || "";
  //               }

  //               return {
  //                 ...prev,
  //                 Person_Sub: updatedPersonSub,
  //               };
  //             });
  //           }
  //           if (Data_Sub[i].Category === "FIELD") {
  //             setFormData1((prev) => {
  //               const updatedPersonSub = [...prev.Person_Sub];
  //               if (!updatedPersonSub[recIdIndex]) {
  //                 updatedPersonSub[recIdIndex] = {};
  //               }
  //               if (!Array.isArray(updatedPersonSub[recIdIndex].Field)) {
  //                 updatedPersonSub[recIdIndex].Field = [];
  //               }

  //               updatedPersonSub[recIdIndex].Field.push(Data_Sub[i].Sl_value);
  //               if (Data_Sub[i].Sl_value === "MR0699") {
  //                 console.log( Data_Sub[i].txt_other,'Data_SubMR0699')
  //                 updatedPersonSub[recIdIndex].FieldOther = Data_Sub[i].txt_other || "";
  //               }
  //               return {
  //                 ...prev,
  //                 Person_Sub: updatedPersonSub,
  //               };
  //             });
  //           }
  //         }
  //         for (let i = 0; i < Data_Add.length; i++) {
  //           const recIdIndex = Data_Add[i].Rec_Id - 1;
  //           if (Data_Add[i].Category === "EDUCATION") {
  //             setFormData1((prev) => {
  //               const updatedPersonSub = [...prev.Person_ADD];
  //               if (!updatedPersonSub[recIdIndex]) {
  //                 updatedPersonSub[recIdIndex] = {};
  //               }
  //               if (!Array.isArray(updatedPersonSub[recIdIndex].Education)) {
  //                 updatedPersonSub[recIdIndex].Education = [];
  //               }
  //               updatedPersonSub[recIdIndex].Education.push(Data_Add[i].Sl_value);
  //               if (Data_Add[i].Sl_value === "MR0490") {
  //                 updatedPersonSub[recIdIndex].EducationOther = Data_Add[i].txt_other || "";
  //               }
  //               return {
  //                 ...prev,
  //                 Person_ADD: updatedPersonSub,
  //               };
  //             });
  //           }
  //           if (Data_Add[i].Category === "JOB GRADE") {
  //             setFormData1((prev) => {
  //               const updatedPersonSub = [...prev.Person_ADD];
  //               if (!updatedPersonSub[recIdIndex]) {
  //                 updatedPersonSub[recIdIndex] = {};
  //               }
  //               if (!Array.isArray(updatedPersonSub[recIdIndex].Req_Jobgrade)) {
  //                 updatedPersonSub[recIdIndex].Req_Jobgrade = [];
  //               }
  //               updatedPersonSub[recIdIndex].Req_Jobgrade.push(
  //                 Data_Add[i].Sl_value
  //               );
  //               return {
  //                 ...prev,
  //                 Person_ADD: updatedPersonSub,
  //               };
  //             });
  //           }
  //           if (Data_Add[i].Category === "COURSE") {
  //             setFormData1((prev) => {
  //               const updatedPersonSub = [...prev.Person_ADD];
  //               if (!updatedPersonSub[recIdIndex]) {
  //                 updatedPersonSub[recIdIndex] = {};
  //               }
  //               if (!Array.isArray(updatedPersonSub[recIdIndex].Course)) {
  //                 updatedPersonSub[recIdIndex].Course = [];
  //               }
  //               updatedPersonSub[recIdIndex].Course.push(Data_Add[i].Sl_value);
  //               if (Data_Add[i].Sl_value === "MR0507") {
  //                 updatedPersonSub[recIdIndex].CourseOther = Data_Add[i].txt_other || "";
  //               }
  //               return {
  //                 ...prev,
  //                 Person_ADD: updatedPersonSub,
  //               };
  //             });
  //           }
  //           if (Data_Add[i].Category === "FIELD") {
  //             setFormData1((prev) => {
  //               const updatedPersonSub = [...prev.Person_ADD];
  //               if (!updatedPersonSub[recIdIndex]) {
  //                 updatedPersonSub[recIdIndex] = {};
  //               }
  //               if (!Array.isArray(updatedPersonSub[recIdIndex].Field)) {
  //                 updatedPersonSub[recIdIndex].Field = [];
  //               }
  //               updatedPersonSub[recIdIndex].Field.push(Data_Add[i].Sl_value);
  //               if (Data_Add[i].Sl_value === "MR0699") {
  //                 updatedPersonSub[recIdIndex].FieldOther = Data_Add[i].txt_other || "";
  //               }
  //               return {
  //                 ...prev,
  //                 Person_ADD: updatedPersonSub,
  //               };
  //             });
  //           }
  //         }
  //       });
  //   };
  // console.log(formData1,'nnnnnn')
  //   const validateStep1 = () => {
  //     if (formData1.txt_ReqNo == "") {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Please Generate Req No.",
  //       });
  //       return false;
  //     }
  //     return true;
  //   };

  //   const next = () => {
  //     if (current === 0 && !validateStep1()) {
  //       return;
  //     }
  //     setCurrent(current + 1);
  //   };

  //   const prev = () => {
  //     setCurrent(current - 1);
  //   };

  //   const onChange = (current) => {
  //     if (current > 0 && !validateStep1()) {
  //       return;
  //     }
  //     setCurrent(current);
  //   };

  //   const items = steps.map((item) => ({
  //     key: item.title,
  //     title: item.title,
  //   }));

  //   const contentStyle = {
  //     padding: "10px",
  //     backgroundColor: token.colorFillAlter,
  //     borderRadius: token.borderRadiusLG,
  //     border: `1px dashed ${token.colorBorder}`,
  //     marginTop: 30,
  //     marginRight: 10,
  //   };

  //   const handleChange = (field, value) => {
  //     setFormData1((prev) => ({ ...prev, [field]: value }));
  //   };

  return (
    <>
      <div style={{ marginBottom: "20px", marginRight: "10px" }}>
        <Steps current={current} items={items} onChange={onChange} />
      </div>
      <div style={contentStyle}>
        {steps[current].content({ formData1, setFormData1 })}
      </div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default App;
