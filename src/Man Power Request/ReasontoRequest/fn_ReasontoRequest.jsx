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
    // setFormData1({ ...formData1, CB_FileSubstitube: e.target.checked });
    setFormData1((prev) => ({
      ...prev,
      CB_FileSubstitube: e.target.checked,
      txt_TotalSubstitube: 1,
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
    }));

  };

  const CB_AttachFileAdd = (e) => {
    // setFormData1({ ...formData1, CB_FileSubstitube: e.target.checked });
    setFormData1((prev) => ({
      ...prev,
      CB_FileAdditional : e.target.checked,
      txt_TotalAdditional: 1,
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
        },
      ],
    }));

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
    CB_AttachFileAdd
  };
}

export { fn_ReasontoRequest };
