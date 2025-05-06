import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { fn_Header } from "../../Header/fn_Header";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
function fn_ReasontoRequest(formData1, setFormData1, Disable, setDisable) {
  const { showLoading, hideLoading } = useLoading();
  // console.log(formData1, "fn_ReasontoRequest");
  const { datauser } = fn_Header();
  const [ForDept, setForDept] = useState([]);
  const [ForReqJobGrade, setForReqJobGrade] = useState([]);
  const [Education, setEducation] = useState([]);
  const [Course, setCourse] = useState([]);
  const [Field, setField] = useState([]);
  const [English, setEnglish] = useState([]);
  const [FileFormat, setFileFormat] = useState("");
  useEffect(() => {
    GetForDept();
    GetEducation();
    GetCourse();
    GetField();
    GetEnglish();
    GetRequestJobGrade();
    if (formData1.SL_Factory == "9000") {
      setFileFormat("http://10.17.100.183:4007/download/FileManPowerHR_HQ.xlsx");
    } else if (formData1.SL_Factory == "2000") {
      setFileFormat("http://10.17.100.183:4007/download/FileManPowerHR_A1.xlsx");
    } else if (formData1.SL_Factory == "1000") {
      setFileFormat("http://10.17.100.183:4007/download/FileManPowerHR_N1.xlsx");
    } else if (formData1.SL_Factory == "2200") {
      setFileFormat("http://10.17.100.183:4007/download/FileManPowerHR_P1.xlsx");
    } else if (formData1.SL_Factory == "2300") {
      setFileFormat("http://10.17.100.183:4007/download/FileManPowerHR_K1.xlsx");
    } else if (formData1.SL_Factory == "9400") {
      setFileFormat("http://10.17.100.183:4007/download/FileManPowerHR_BKK.xlsx");
    }
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
        if (res.data.length == 0) {
          Swal.fire({
            title: "Not Found User",
            // text: "No data available for the given criteria.",
            icon: "warning",
            confirmButtonText: "ตกลง",
          });
        } else {
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
    console.log(index, field, value, "handlePersonSubChange");
    console.log(formData1, "handlePersonSubChange");
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
      DisableChange("ButtonSUB_ADD", false);
      DisableChange("CB_FileSubstitube", false);
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
          DisableChange("ButtonSUB_ADD", true);
          DisableChange("CB_FileSubstitube", true);
          setFormData1({ ...formData1, CB_Substitube: e.target.checked });
          handleChange("txt_TotalSubstitube", 0);
          //
          setFormData1({
            ...formData1,
            CB_Substitube: e.target.checked,
            txt_TotalSubstitube: 0,
            CB_FileSubstitube: "",
            FileName_Sub: "",
            FileNameServer_Sub: "",
            DataFileSub: null,
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
      DisableChange("ButtonADD_ADD", false);
      DisableChange("CB_FileAdditional", false);
      DisableChange("txt_TargetCapacity1", false);
      DisableChange("txt_TargetCapacity2", false);
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
          DisableChange("ButtonADD_ADD", true);
          DisableChange("CB_FileAdditional", true);
          DisableChange("txt_TargetCapacity1", true);
          DisableChange("txt_TargetCapacity2", true);
          setFormData1({
            ...formData1,
            CB_Additional: e.target.checked,
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
                Education: null,
                Course: null,
                Field: null,
                Special: "",
                Experience: "",
                StepLanguage: null,
                StepLanguage_other: "",
                Filefeature: "",
                // FileServerfeature: "",
                DataFilefeature: null,
              },
            ],
          });
        }
      });
    }
  };

  const handleCopySub = (PersonNoCopy, index) => {
    if (PersonNoCopy >= formData1.txt_TotalSubstitube || PersonNoCopy == 0) {
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
    console.log("PersonNoCopy", PersonNoCopy, index);
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
          Dept: sourcePerson.Dept,
          Req_Jobgrade: sourcePerson.Req_Jobgrade,
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
      if (PersonNoCopy >= formData1.txt_TotalAdditional || PersonNoCopy == 0) {
        handlePersonAddChange(index, "CopyNo", "");
        Swal.fire({
          title: "Data not found",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
      } else {
        handlePersonAddChange(index, "CopyNo", "");
        const newPersonADD = [...formData1.Person_ADD];
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
    if (e.target.checked) {
      //true
      console.log(e.target.checked, "Check");
      setDisable((prev) => ({
        ...prev,
        ButtonSUB_ADD: true,
      }));
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
            // FileServerfeature: "",
            DataFilefeature: null,
          },
        ],
      }));
    } else {
      handleChange("CB_FileSubstitube", e.target.checked);
      handleChange("txt_TotalSubstitube", 1);
      handleChange("FileName_Sub", "");
      handleChange("FileNameServer_Sub", "");
      handleChange("DataFileSub", null);
      setDisable((prev) => ({
        ...prev,
        ButtonSUB_ADD: false,
      }));
      const input = document.getElementById("fileInputSUB");
      if (input) input.value = "";
    }
  };

  const CB_AttachFileAdd = (e) => {
    // setFormData1({ ...formData1, CB_FileSubstitube: e.target.checked });
    if (e.target.checked) {
      //true
      setDisable((prev) => ({
        ...prev,
        ButtonADD_ADD: true,
      }));
      setFormData1((prev) => ({
        ...prev,
        CB_FileAdditional: e.target.checked,
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
            // FileServerfeature: "",
            DataFilefeature: null,
          },
        ],
      }));
    } else {
      setDisable((prev) => ({
        ...prev,
        ButtonADD_ADD: false,
      }));
      handleChange("CB_FileAdditional", e.target.checked);
      handleChange("txt_TotalAdditional", 1);
      handleChange("FileName_Add", "");
      handleChange("FileNameServer_Add", "");
      handleChange("DataFileADD", null);
      const input = document.getElementById("fileInputADD");
      if (input) input.value = "";
    }
  };

  const handleFileChange = (Reason, e) => {
    const file = e.target.files[0];
    console.log("file999", e, Reason);
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
    if (Reason == "SUB") {
      if (file) {
        handleChange("FileName_Sub", file.name);
        handleChange("DataFileSub", file);
      }
    } else if (Reason == "ADD") {
      if (file) {
        handleChange("FileName_Add", file.name);
        handleChange("DataFileADD", file);
      }
    }
  };

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    console.log(file, "fileeeee");
    if (!file) {
      return;
    }
    const allowedExtensions = ["xls", "xlsx"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      Swal.fire({
        title: "รองรับเฉพาะไฟล์ .xls, .xlsx เท่านั้น",
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
      handleChange("txt_FileNameReadData", file.name);
      handleChange("DataFileReadData", file);
    }
  };

  const ReadFile = () => {
    showLoading("กำลังอ่านไฟล์...");
    const file = formData1.DataFileReadData;
    if (!file) {
      Swal.fire({
        title: "กรุณาเลือกไฟล์",
        icon: "warning",
      });
      hideLoading();
      return;
    }
    // handleChange('txt_FileNameReadData',file.name)
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const groupedData = [];
      let currentGroup = [];

      jsonData.forEach((row) => {
        const first = row[0];

        // ถ้าเจอแถวที่เริ่มด้วยตัวเลข -> เริ่มกลุ่มใหม่
        if (typeof first === "number") {
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
      let subdata = [];
      let adddata = [];

      if (groupedData.length > 0) {
        groupedData.map((item, index) => {
          if (item[0][1] == "Substitube") {
            console.log("Substitube", item);
            subdata.push(item);
          } else if (item[0][1] == "ADD") {
            console.log("Additional", item);
            adddata.push(item);
          }
        });
      }
      if (subdata.length <= 0 || subdata.length <= 0) {
        Swal.fire({
          title: "ไฟล์ไม่ถูกต้อง",
          icon: "warning",
        });
        hideLoading();
        return;
      }
      if (subdata.length > 1) {
        handleChange("CB_Substitube", true);
        handleChange("txt_TotalSubstitube", subdata.length - 1);
        DisableChange("ButtonSUB_ADD", false);
        DisableChange("CB_FileSubstitube", false);
        const updatedPersonSub = Array.from(
          { length: subdata.length - 1 },
          () => ({
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
          })
        );
        for (let i = 1; i < subdata.length; i++) {
          const personIndex = i - 1;
          for (let j = 0; j < subdata[i].length; j++) {
            const key = subdata[i][j][2];
            const value = subdata[i][j][3];
            const valueother = subdata[i][j][4];

            switch (key) {
              case "Employee ID":
                let Name = "";
                let Jobgrade = "";
                let CC = "";
                let CostCenter = "";

                try {
                  const res1 = await axios.post(
                    "/api/RequestManPower/GetDataPersonByIDCode",
                    {
                      Id_Code: String(value) || "",
                    }
                  );
                  if (res1.data.length > 0) {
                    Name = res1.data[0].EMP_NAME;
                    Jobgrade = res1.data[0].JOB_GRADE;
                    CC = res1.data[0].Cost_Center;
                  }

                  const res2 = await axios.post(
                    "/api/RequestManPower/GetDeptByCC",
                    {
                      Cost_Center: CC || "",
                    }
                  );
                  if (res2.data.length > 0) {
                    CostCenter = res2.data[0].Dept;
                  }
                } catch (error) {
                  console.error("Error fetching data:", error);
                }

                updatedPersonSub[personIndex] = {
                  ...updatedPersonSub[personIndex],
                  ID_Code: String(value),
                  Emp_Name: Name,
                  Cost_Center: CostCenter,
                  Job_grade: Jobgrade,
                };
                break;

              case "For Dept.":
                updatedPersonSub[personIndex] = {
                  ...updatedPersonSub[personIndex],
                  Dept: value,
                };
                break;

              case "คุณสมบัติพิเศษ":
                updatedPersonSub[personIndex] = {
                  ...updatedPersonSub[personIndex],
                  Special: value,
                };
                break;

              case "ประสบการณ์":
                updatedPersonSub[personIndex] = {
                  ...updatedPersonSub[personIndex],
                  Experience: value,
                };
                break;

              case "English Language or other":
                updatedPersonSub[personIndex] = {
                  ...updatedPersonSub[personIndex],
                  StepLanguage: value,
                };
                break;

              case "COURSE":
                if (value) {
                  const matchCOURSE = value.match(/\(([^)]+)\)/);
                  const extractedValueCOURSE = matchCOURSE
                    ? matchCOURSE[1]
                    : "";
                  const currentCourses = Array.isArray(
                    updatedPersonSub[personIndex].Course
                  )
                    ? updatedPersonSub[personIndex].Course
                    : [];

                  // ตรวจสอบว่าค่าที่จะเพิ่มซ้ำหรือไม่
                  if (!currentCourses.includes(extractedValueCOURSE)) {
                    updatedPersonSub[personIndex] = {
                      ...updatedPersonSub[personIndex],
                      Course: [...currentCourses, extractedValueCOURSE],
                      CourseOther:
                        value === "อื่นๆ (MR0507)" ? valueother : null,
                    };
                  } else {
                    console.log(
                      `Course "${extractedValueCOURSE}" already exists.`
                    );
                  }
                }
                break;
              case "EDUCATION":
                console.log(value, "EDUCATION");
                if (value) {
                  const matchEduaction = value.match(/\(([^)]+)\)/);
                  const extractedValueEduaction = matchEduaction
                    ? matchEduaction[1]
                    : "";
                  const currentEduaction = Array.isArray(
                    updatedPersonSub[personIndex].Education
                  )
                    ? updatedPersonSub[personIndex].Education
                    : [];

                  // ตรวจสอบว่าค่าที่จะเพิ่มซ้ำหรือไม่
                  if (!currentEduaction.includes(extractedValueEduaction)) {
                    updatedPersonSub[personIndex] = {
                      ...updatedPersonSub[personIndex],
                      Education: [...currentEduaction, extractedValueEduaction],
                      EducationOther:
                        value ===
                        "ระดับการศึกษาอื่นๆ ระบุ / Others, please identify  (MR0490)"
                          ? valueother
                          : null,
                    };
                  } else {
                    console.log(
                      `Education "${extractedValueEduaction}" already exists.`
                    );
                  }
                }
                break;

              case "FIELD":
                console.log(value, "FIELD");
                if (value) {
                  const matchFIELD = value.match(/\(([^)]+)\)/);
                  const extractedValueFIELD = matchFIELD ? matchFIELD[1] : "";
                  const currentFIELD = Array.isArray(
                    updatedPersonSub[personIndex].Field
                  )
                    ? updatedPersonSub[personIndex].Field
                    : [];

                  // ตรวจสอบว่าค่าที่จะเพิ่มซ้ำหรือไม่
                  if (!currentFIELD.includes(extractedValueFIELD)) {
                    updatedPersonSub[personIndex] = {
                      ...updatedPersonSub[personIndex],
                      Field: [...currentFIELD, extractedValueFIELD],
                      FieldOther:
                        value === "Any field (MR0699)" ? valueother : null,
                    };
                  } else {
                    console.log(
                      `Field "${extractedValueFIELD}" already exists.`
                    );
                  }
                }
                break;

              case "JOB GRADE":
                console.log(value, "JOB GRADE");
                if (value) {
                  const extractedValueJG = value ? value : "";
                  const currentJG = Array.isArray(
                    updatedPersonSub[personIndex].Req_Jobgrade
                  )
                    ? updatedPersonSub[personIndex].Req_Jobgrade
                    : [];

                  // ตรวจสอบว่าค่าที่จะเพิ่มซ้ำหรือไม่
                  if (!currentJG.includes(extractedValueJG)) {
                    updatedPersonSub[personIndex] = {
                      ...updatedPersonSub[personIndex],
                      Req_Jobgrade: [...currentJG, extractedValueJG],
                    };
                  } else {
                    console.log(
                      `Job Grade "${extractedValueJG}" already exists.`
                    );
                  }
                }
                break;

              default:
                // console.log('')
                break;
            }
          }
        }
        handleChange("Person_Sub", updatedPersonSub);
      }
      if (adddata.length > 1) {
        handleChange("CB_Additional", true);
        handleChange("txt_TotalAdditional", adddata.length - 1);
        DisableChange("ButtonADD_ADD", false);
        DisableChange("CB_FileAdditional", false);
        const updatedPersonAdd = Array.from(
          { length: adddata.length - 1 },
          () => ({
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
          })
        );
        for (let i = 1; i < adddata.length; i++) {
          const personIndex = i - 1;
          for (let j = 0; j < adddata[i].length; j++) {
            const key = adddata[i][j][2];
            const value = adddata[i][j][3];
            const valueother = adddata[i][j][4];
            switch (key) {
              case "For Dept.":
                updatedPersonAdd[personIndex] = {
                  ...updatedPersonAdd[personIndex],
                  Dept: value,
                };
                break;

              case "คุณสมบัติพิเศษ":
                updatedPersonAdd[personIndex] = {
                  ...updatedPersonAdd[personIndex],
                  Special: value,
                };
                break;

              case "ประสบการณ์":
                updatedPersonAdd[personIndex] = {
                  ...updatedPersonAdd[personIndex],
                  Experience: value,
                };
                break;

              case "English Language or other":
                updatedPersonAdd[personIndex] = {
                  ...updatedPersonAdd[personIndex],
                  StepLanguage: value,
                };
                break;
              case "COURSE":
                if (value) {
                  const matchCOURSE = value.match(/\(([^)]+)\)/);
                  const extractedValueCOURSE = matchCOURSE
                    ? matchCOURSE[1]
                    : "";
                  const currentCourses = Array.isArray(
                    updatedPersonAdd[personIndex].Course
                  )
                    ? updatedPersonAdd[personIndex].Course
                    : [];

                  // ตรวจสอบว่าค่าที่จะเพิ่มซ้ำหรือไม่
                  if (!currentCourses.includes(extractedValueCOURSE)) {
                    updatedPersonAdd[personIndex] = {
                      ...updatedPersonAdd[personIndex],
                      Course: [...currentCourses, extractedValueCOURSE],
                      CourseOther:
                        value === "อื่นๆ (MR0507)" ? valueother : null,
                    };
                  } else {
                    console.log(
                      `Course "${extractedValueCOURSE}" already exists.`
                    );
                  }
                }
                break;

              case "EDUCATION":
                console.log(value, "EDUCATION");
                if (value) {
                  const matchEduaction = value.match(/\(([^)]+)\)/);
                  const extractedValueEduaction = matchEduaction
                    ? matchEduaction[1]
                    : "";
                  const currentEduaction = Array.isArray(
                    updatedPersonAdd[personIndex].Education
                  )
                    ? updatedPersonAdd[personIndex].Education
                    : [];

                  // ตรวจสอบว่าค่าที่จะเพิ่มซ้ำหรือไม่
                  if (!currentEduaction.includes(extractedValueEduaction)) {
                    updatedPersonAdd[personIndex] = {
                      ...updatedPersonAdd[personIndex],
                      Education: [...currentEduaction, extractedValueEduaction],
                      EducationOther:
                        value ===
                        "ระดับการศึกษาอื่นๆ ระบุ / Others, please identify  (MR0490)"
                          ? valueother
                          : null,
                    };
                  } else {
                    console.log(
                      `Education "${extractedValueEduaction}" already exists.`
                    );
                  }
                }
                break;

              case "FIELD":
                console.log(value, "FIELD");
                if (value) {
                  const matchFIELD = value.match(/\(([^)]+)\)/);
                  const extractedValueFIELD = matchFIELD ? matchFIELD[1] : "";
                  const currentFIELD = Array.isArray(
                    updatedPersonAdd[personIndex].Field
                  )
                    ? updatedPersonAdd[personIndex].Field
                    : [];

                  // ตรวจสอบว่าค่าที่จะเพิ่มซ้ำหรือไม่
                  if (!currentFIELD.includes(extractedValueFIELD)) {
                    updatedPersonAdd[personIndex] = {
                      ...updatedPersonAdd[personIndex],
                      Field: [...currentFIELD, extractedValueFIELD],
                      FieldOther:
                        value === "Any field (MR0699)" ? valueother : null,
                    };
                  } else {
                    console.log(
                      `Field "${extractedValueFIELD}" already exists.`
                    );
                  }
                }
                break;

              case "JOB GRADE":
                console.log(value, "JOB GRADE");
                if (value) {
                  const extractedValueJG = value ? value : "";
                  const currentJG = Array.isArray(
                    updatedPersonAdd[personIndex].Req_Jobgrade
                  )
                    ? updatedPersonAdd[personIndex].Req_Jobgrade
                    : [];

                  // ตรวจสอบว่าค่าที่จะเพิ่มซ้ำหรือไม่
                  if (!currentJG.includes(extractedValueJG)) {
                    updatedPersonAdd[personIndex] = {
                      ...updatedPersonAdd[personIndex],
                      Req_Jobgrade: [...currentJG, extractedValueJG],
                    };
                  } else {
                    console.log(
                      `Job Grade "${extractedValueJG}" already exists.`
                    );
                  }
                }
                break;

              default:
                // console.log('')
                break;
            }
          }
        }
        handleChange("Person_ADD", updatedPersonAdd);
      }
      hideLoading();
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFilefeatureChange = (Reason, index, e) => {
    console.log("filefeature", e, Reason);
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

    if (Reason == "SUB") {
      if (file) {
        handlePersonSubChange(index, "Filefeature", file.name);
        handlePersonSubChange(index, "DataFilefeature", file);
      }
    } else if (Reason == "ADD") {
      if (file) {
        handlePersonAddChange(index, "Filefeature", file.name);
        handlePersonAddChange(index, "DataFilefeature", file);
      }
    }
  };

  const DeleteFile = (Reason, index) => {
    if (Reason === "SUBFeature") {
      handlePersonSubChange(index, "Filefeature", "");
      // handlePersonSubChange(index, "FileServerfeature", "");
      handlePersonSubChange(index, "DataFilefeature", null);
      // ล้างค่าใน input file
      const input = document.getElementById(`fileInputSUBFeature-${index}`);
      if (input) input.value = "";
    } else if (Reason === "ADDFeature") {
      handlePersonAddChange(index, "Filefeature", "");
      // handlePersonAddChange(index, "FileServerfeature", "");
      handlePersonAddChange(index, "DataFilefeature", null);

      // ล้างค่าใน input file
      const input = document.getElementById(`fileInputADDFeature-${index}`);
      if (input) input.value = "";
    } else if (Reason === "SUB") {
      handleChange("FileName_Sub", "");
      // handleChange("FileNameServer_Sub", "");
      handleChange("DataFileSub", null);

      // ล้างค่าใน input file
      const input = document.getElementById("fileInputSUB");
      if (input) input.value = "";
    } else if (Reason === "ADD") {
      handleChange("FileName_Add", "");
      // handleChange("FileNameServer_Add", "");
      handleChange("DataFileADD", null);
      // ล้างค่าใน input file
      const input = document.getElementById("fileInputADD");
      if (input) input.value = "";
    }else if (Reason === "ReadFile") {
      handleChange("txt_FileNameReadData", "");
      handleChange("DataFileReadData", null);
      // ล้างค่าใน input file
      const input = document.getElementById("fileReadData");
      if (input) input.value = "";
    }
  };

  const DisableChange = (field, value) => {
    setDisable((prev) => ({ ...prev, [field]: value }));
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
    // CB_AttachFileSub,
    // CB_AttachFileAdd,
    handleFileChange,
    handleFilefeatureChange,
    DeleteFile,
    DisableChange,
    DownLoadFile,
    handleFileRead,
    ReadFile,
    FileFormat
  };
}

export { fn_ReasontoRequest };
