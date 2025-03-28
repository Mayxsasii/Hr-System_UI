import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { fn_Header } from "../../Header/fn_Header";
import Swal from "sweetalert2";

function fn_ReasontoRequest(formData1, setFormData1) {
  console.log(formData1, "fn_ReasontoRequest");
  const { datauser } = fn_Header();
  const [ForDept, setForDept] = useState([]);
  const [ForReqJobGrade, setForReqJobGrade] = useState([]);
  const [Education, setEducation] = useState([]);
  const [Course, setCourse] = useState([]);
  const [Field, setField] = useState([]);
  const [English, setEnglish] = useState([]);

  

  useEffect(() => {
    GetForDept();
    GetEducation();
    GetCourse();
    GetField();
    GetEnglish();
    GetRequestJobGrade();
    // handlePersonSubChange(0, "Dept", formData1.SL_Department);
    // handlePersonSubChange(0, "Req_Jobgrade", formData1.SL_Department);
    // formData1.Person_Sub.forEach((_, index) => {
    //   handlePersonSubChange(index, "Dept", formData1.SL_Department);
    // });
  }, []);

  const GetForDept = async () => {
    await axios
      .post("/api/RequestManPower/GetForDept", {
        Factory: formData1.SL_Factory || "",
      })
      .then((res) => {
        setForDept(res.data);
      });
  };

  const GetDataPersonByIDCode = async (Idcode, index) => {
    await axios
      .post("/api/RequestManPower/GetDataPersonByIDCode", {
        Id_Code: Idcode || "",
      })
      .then((res) => {
        if(res.data.length == 0){
          Swal.fire({
            title: "Not Found User",
            // text: "No data available for the given criteria.",
            icon: "warning",
            confirmButtonText: "ตกลง",
          });
        }
        else{
          handlePersonSubChange(index, "Emp_Name", res.data[0].EMP_NAME);
          handlePersonSubChange(index, "Job_grade", res.data[0].JOB_GRADE);
          handlePersonSubChange(index, "Req_Jobgrade", [res.data[0].JOB_GRADE]);
          GetDeptByCC(res.data[0].Cost_Center, index);
        }
      
      });
  };

  const GetDeptByCC = async (cc, index) => {
    await axios
      .post("/api/RequestManPower/GetDeptByCC", {
        Cost_Center: cc || "",
      })
      .then((res) => {
        if (res.data.length > 0) {
          handlePersonSubChange(index, "Cost_Center", res.data[0].Dept);
        }
      });
  };

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };
  const handlePersonSubChange = (index, field, value) => {
    const newPersonSub = [...formData1.Person_Sub];
    newPersonSub[index][field] = value;
    setFormData1({ ...formData1, Person_Sub: newPersonSub });
  };

  const handlePersonAddChange = (index, field, value) => {
    const newPersonSub = [...formData1.Person_ADD];
    newPersonSub[index][field] = value;
    setFormData1({ ...formData1, Person_ADD: newPersonSub });
  };

  const GetRequestJobGrade = async () => {
    await axios
      .post("/api/RequestManPower/GetRequestJobGrade", {
        DDLPosition: formData1.SL_Position || "",
        DDLFacrtory: formData1.SL_Factory || "",
      })
      .then((res) => {
        setForReqJobGrade(res.data);
      });
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

  const handleAddPersonSub = () => {
    setFormData1((prev) => ({
      ...prev,
      Person_Sub: [
        ...prev.Person_Sub,
        {
          CopyNo: "",
          ID_Code: "",
          Emp_Name: "",
          Cost_Center: "",
          Job_grade: "",
          Dept: null,
          Req_Jobgrade: null,
          Education: null,
          Course: null,
          Field: null,
          Special: "",
          Experience: "",
          StepLanguage: null,
          StepLanguage_other: "",
          Filefeature: "",
        },
      ],
    }));
  };

  const handleAddPersonAdd = () => {
    setFormData1((prev) => ({
      ...prev,
      Person_ADD: [
        ...prev.Person_ADD,
        {
          CopyNo: "",
          Education: null,
          Course: null,
          Field: null,
          Special: "",
          Experience: "",
          StepLanguage: null,
          StepLanguage_other: "",
          Filefeature: "",
        },
      ],
    }));
  };

  const CheckReasontorequestSub = (e) => {
    if (formData1.CB_Substitube == false) {
      setFormData1({ ...formData1, CB_Substitube: e.target.checked });
      handleChange("txt_TotalSubstitube", 1);
    } else {
      Swal.fire({
        title: "Do you not want to Substitube?",
        text: "If you confirm, all the information you have entered in the Substitube form will be lost.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          setFormData1({ ...formData1, CB_Substitube: e.target.checked });
          handleChange("txt_TotalSubstitube", 0);
          //
          setFormData1({
            ...formData1,
            CB_Substitube: e.target.checked,
            txt_TotalSubstitube: 0,
            CB_FileSubstitube: "",
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
              },
            ],
          });
        }
      });
    }
  };

  const CheckReasontorequestADD = (e) => {
    if (formData1.CB_Additional == false) {
      console.log("กงนี้");
      setFormData1({ ...formData1, CB_Additional: e.target.checked });
      handleChange("txt_TotalAdditional", 1);
    } else {
      Swal.fire({
        title: "Do you not want to Additional?",
        text: "If you confirm, all the information you have entered in the Additional form will be lost.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          setFormData1({
            ...formData1,
            CB_Additional: e.target.checked,
            txt_TargetCapacity1: "",
            txt_TargetCapacity2: "",
            txt_TotalAdditional: 0,
            CB_FileAdditional: "",
            Person_ADD: [
              {
                CopyNo: "",
                Education: null,
                Course: null,
                Field: null,
                Special: "",
                Experience: "",
                StepLanguage: null,
                StepLanguage_other: "",
                Filefeature: "",
              },
            ],
          });
        }
      });
    }
  };

  const handleCopySub = (PersonNoCopy, index) => {
    if (PersonNoCopy > formData1.txt_TotalSubstitube || PersonNoCopy == 0) {
      handlePersonSubChange(index, "CopyNo", "");
      Swal.fire({
        title: "Data not found",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
    } else {
      handlePersonSubChange(index, "CopyNo", "");
      const newPersonSub = [...formData1.Person_Sub];
      const sourcePerson = { ...newPersonSub[PersonNoCopy - 1] };
      newPersonSub[index] = {
        ...newPersonSub[index],
        Education: sourcePerson.Education,
        EducationOther: sourcePerson.EducationOther,
        Course: sourcePerson.Course,
        CourseOther: sourcePerson.CourseOther,
        Field: sourcePerson.Field,
        FieldOther: sourcePerson.FieldOther,
        Special: sourcePerson.Special,
        Experience: sourcePerson.Experience,
        StepLanguage: sourcePerson.StepLanguage,
        StepLanguage_other: sourcePerson.StepLanguage_other,
        Filefeature: sourcePerson.Filefeature,
      };
      setFormData1({ ...formData1, Person_Sub: newPersonSub });
    }
  };

  const handleCopyADD = (PersonNoCopy, index) => {
    if (index == 0) {
      if (PersonNoCopy > formData1.txt_TotalSubstitube || PersonNoCopy == 0) {
        handlePersonAddChange(index, "CopyNo", "");
        Swal.fire({
          title: "Data not found",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
      } else {
        handlePersonAddChange(index, "CopyNo", "");
        const newPersonADD = [...formData1.Person_ADD];
        const PersonSub = [...formData1.Person_Sub];
        const sourcePerson = { ...PersonSub[PersonNoCopy - 1] };
        newPersonADD[index] = {
          ...newPersonADD[index],
          Education: sourcePerson.Education,
          EducationOther: sourcePerson.EducationOther,
          Course: sourcePerson.Course,
          CourseOther: sourcePerson.CourseOther,
          Field: sourcePerson.Field,
          FieldOther: sourcePerson.FieldOther,
          Special: sourcePerson.Special,
          Experience: sourcePerson.Experience,
          StepLanguage: sourcePerson.StepLanguage,
          StepLanguage_other: sourcePerson.StepLanguage_other,
          Filefeature: sourcePerson.Filefeature,
        };
        setFormData1({ ...formData1, Person_ADD: newPersonADD });
      }
    } else {
      if (PersonNoCopy > formData1.txt_TotalAdditional || PersonNoCopy == 0) {
        handlePersonAddChange(index, "CopyNo", "");
        Swal.fire({
          title: "Data not found",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
      } else {
        handlePersonAddChange(index, "CopyNo", "");
        const newPersonADD = [...formData1.Person_Sub];
        newPersonADD[index] = { ...newPersonADD[PersonNoCopy - 1] };
        setFormData1({ ...formData1, Person_ADD: newPersonADD });
      }
    }
  };

  const handleDeletePerson = (Reason, index) => {
    if (Reason == "Substitube") {
      setFormData1((prevFormData) => ({
        ...prevFormData,
        Person_Sub: prevFormData.Person_Sub.filter((_, i) => i !== index),
        txt_TotalSubstitube: prevFormData.txt_TotalSubstitube - 1,
      }));
    } else if (Reason == "Additional") {
      setFormData1((prevFormData) => ({
        ...prevFormData,
        Person_ADD: prevFormData.Person_ADD.filter((_, i) => i !== index),
        txt_TotalAdditional: prevFormData.txt_TotalAdditional - 1,
      }));
    }
  };

  const CB_AttachFileSub = (e) => {
 
  if(e.target.checked){ //true
    console.log( e.target.checked,'Check')
    setFormData1((prev) => ({
      ...prev,
      CB_FileSubstitube: e.target.checked,
      txt_TotalSubstitube: 0,
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
          FileServerfeature: "",
          DataFilefeature: null,
        },
      ],
    }));
  }
  else{
    handleChange("CB_FileSubstitube", e.target.checked);
    handleChange("txt_TotalSubstitube", 1);
    handleChange("FileName_Sub", '');
    handleChange("FileNameServer_Sub", '');
    handleChange("DataFileSub", null);
    const input = document.getElementById("fileInputSUB");
    if (input) input.value = "";
  }
  };

  const CB_AttachFileAdd = (e) => {
    // setFormData1({ ...formData1, CB_FileSubstitube: e.target.checked });
    if(e.target.checked){ //true
    setFormData1((prev) => ({
      ...prev,
      CB_FileAdditional : e.target.checked,
      txt_TotalAdditional: 0,
      Person_ADD: [
        {
          CopyNo: "",
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
          FileServerfeature: "",
          DataFilefeature: null,
        },
      ],
    }));
  }else{
    handleChange("CB_FileAdditional", e.target.checked);
    handleChange("txt_TotalAdditional", 1);
    handleChange("FileName_Add", '');
    handleChange("FileNameServer_Add", '');
    handleChange("DataFileADD", null);
    const input = document.getElementById("fileInputADD");
    if (input) input.value = "";
  }

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


  const handleFileChange = (Reason,e) => {
    const file = e.target.files[0];
    console.log("file999" ,e,Reason);
    let DateToday = getDateToday();
    let FileNameServer = "";
    let ReqNo = formData1.txt_ReqNo;
    if(!file){
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
    if(Reason == "SUB"){
      FileNameServer = `${ReqNo}-SUBS-${DateToday}.${file.name.substring(file.name.lastIndexOf(".")+1)}`;
      console.log("FileNameServer", FileNameServer);
      if (file) {
        const renamedFile = new File([file], FileNameServer, { type: file.type });
        console.log("renamedFile", renamedFile);
        handleChange("FileName_Sub", file.name);
        handleChange("DataFileSub", renamedFile);
        handleChange("FileNameServer_Sub", renamedFile.name);
      } 
    }
    else if(Reason == "ADD"){
      console.log('ADD_FILE01',file.name);
      FileNameServer = `${ReqNo}-ADD-${DateToday}.${file.name.substring(
        file.name.lastIndexOf(".") + 1
      )}`;
      console.log("FileNameServer", FileNameServer);
      if (file) {
        const renamedFile = new File([file], FileNameServer, { type: file.type });
        console.log("renamedFile", renamedFile);
        handleChange("FileName_Add", file.name);
        handleChange("DataFileADD", renamedFile);
        handleChange("FileNameServer_Add",renamedFile.name);
      } 
    }
  };

  const handleFilefeatureChange = (Reason,index,e) => {
    console.log("filefeature" ,e,Reason);
    const file = e.target.files[0];
    let DateToday = getDateToday();
    let FileNameServer = "";
    let ReqNo = formData1.txt_ReqNo;
    const Rec_id = `S${String(index + 1).padStart(2, "0")}`;
    if(!file){
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

    if(Reason == "SUB"){
      FileNameServer = `${ReqNo}-${Rec_id}-SUBS-${DateToday}.${file.name.substring(file.name.lastIndexOf(".")+1)}`;
      console.log("FileNameServer", FileNameServer);
      if (file) {
        const renamedFile = new File([file], FileNameServer, { type: file.type });
        handlePersonSubChange(index, "Filefeature", file.name);
        handlePersonSubChange(index, "FileServerfeature", renamedFile.name);
        handlePersonSubChange(index, "DataFilefeature", renamedFile);
      } 
    }
    else if(Reason == "ADD"){
      FileNameServer = `${ReqNo}-${Rec_id}-ADD-${DateToday}.${file.name.substring(file.name.lastIndexOf(".")+1)}`;
      console.log("FileNameServer", FileNameServer);
      if (file) {
        const renamedFile = new File([file], FileNameServer, { type: file.type });
        handlePersonAddChange(index, "Filefeature", file.name);
        handlePersonAddChange(index, "FileServerfeature", renamedFile.name);
        handlePersonAddChange(index, "DataFilefeature", renamedFile);
      } 
    }
  };

  const DeleteFile = (Reason, index) => {
    if (Reason === "SUBFeature") {
      handlePersonSubChange(index, "Filefeature", "");
      handlePersonSubChange(index, "FileServerfeature", "");
      handlePersonSubChange(index, "DataFilefeature", null);
      // ล้างค่าใน input file
      const input = document.getElementById(`fileInputSUBFeature-${index}`);
      if (input) input.value = "";
    } else if (Reason === "ADDFeature") {
      handlePersonAddChange(index, "Filefeature", "");
      handlePersonAddChange(index, "FileServerfeature", "");
      handlePersonAddChange(index, "DataFilefeature", null);
  
      // ล้างค่าใน input file
      const input = document.getElementById(`fileInputADDFeature-${index}`);
      if (input) input.value = "";
    } else if (Reason === "SUB") {
      handleChange("FileName_Sub", "");
      handleChange("FileNameServer_Sub", "");
      handleChange("DataFileSub", null);
  
      // ล้างค่าใน input file
      const input = document.getElementById("fileInputSUB");
      if (input) input.value = "";
    } else if (Reason === "ADD") {
      handleChange("FileName_Add", "");
      handleChange("FileNameServer_Add", "");
      handleChange("DataFileADD", null);
      // ล้างค่าใน input file
      const input = document.getElementById("fileInputADD");
      if (input) input.value = "";
    }
  };
  


  return {
    handleChange,
    handlePersonSubChange,
    ForDept,
    GetDataPersonByIDCode,
    ForReqJobGrade,
    Education,
    Course,
    Field,
    English,
    handleAddPersonSub,
    CheckReasontorequestSub,
    handleCopySub,
    handlePersonAddChange,
    handleAddPersonAdd,
    handleCopyADD,
    CheckReasontorequestADD,
    handleDeletePerson,
    CB_AttachFileSub,
    CB_AttachFileAdd,
    handleFileChange,
    handleFilefeatureChange,
    DeleteFile,
  };
}

export { fn_ReasontoRequest };
