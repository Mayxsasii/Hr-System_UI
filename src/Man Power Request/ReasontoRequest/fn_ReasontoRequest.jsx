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
    handlePersonSubChange(0, "Dept", formData1.SL_Department);
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
        handlePersonSubChange(index, "Emp_Name", res.data[0].EMP_NAME);
        handlePersonSubChange(index, "Job_grade", res.data[0].JOB_GRADE);
        handlePersonSubChange(index, "Req_Jobgrade", res.data[0].JOB_GRADE);
        GetDeptByCC(res.data[0].Cost_Center, index);
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

  const CheckReasontorequestSub = () => {
    if (formData1.CB_Substitube == false) {
      console.log("กงนี้");
      handleChange("txt_TotalSubstitube", 1);
    } else {
      Swal.fire({
        title: "Do you not want to Substitute?",
        text: "If you confirm, all the information you have entered in the Substitute form will be lost.",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      handleChange("txt_TotalSubstitube", 0);
    }
  };

  const CheckReasontorequestADD = () => {

    if (formData1.CB_Additional == false) {
      console.log("กงนี้");
      handleChange("txt_TotalAdditional", 1);
    } else {
      Swal.fire({
        title: "Do you not want to Additional?",
        text: "If you confirm, all the information you have entered in the Additional form will be lost.",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      handleChange("txt_TotalAdditional", 0);
    }
  };

  const handleCopySub = (PersonNoCopy, index) => {
    if (PersonNoCopy > formData1.txt_TotalSubstitube || PersonNoCopy == 0) {
      Swal.fire({
        title: "Data not found",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
    } else {
      handlePersonSubChange(index, "CopyNo", "");
      const newPersonSub = [...formData1.Person_Sub];
      newPersonSub[index] = { ...newPersonSub[PersonNoCopy - 1] };
      setFormData1({ ...formData1, Person_Sub: newPersonSub });
    }
  };

  const handleCopyADD = (PersonNoCopy, index) => {
    if (PersonNoCopy > formData1.txt_TotalAdditional || PersonNoCopy == 0) {
      Swal.fire({
        title: "Data not found",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
    } else if (index == 0) {
      if (PersonNoCopy > formData1.txt_TotalSubstitube || PersonNoCopy == 0) {
        Swal.fire({
          title: "Data not found",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
      } else {
        handlePersonAddChange(index, "CopyNo", "");
        const newPersonADD = [...formData1.Person_ADD];
        const PersonSub = [...formData1.Person_Sub];
        newPersonADD[index] = { ...PersonSub[PersonNoCopy - 1] };
        setFormData1({ ...formData1, Person_ADD: newPersonADD });
      }
    } else {
      handlePersonAddChange(index, "CopyNo", "");
      const newPersonADD = [...formData1.Person_Sub];
      newPersonADD[index] = { ...newPersonADD[PersonNoCopy - 1] };
      setFormData1({ ...formData1, Person_ADD: newPersonADD });
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
    CheckReasontorequestADD
  };
}

export { fn_ReasontoRequest };
