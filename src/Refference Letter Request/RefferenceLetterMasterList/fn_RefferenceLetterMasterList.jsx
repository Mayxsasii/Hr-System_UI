import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { useLocation } from "react-router-dom";

function fn_RefferenceLetterMasterList() {
  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ReqNo = queryParams.get("ReqNo");
  const [Supervisor, setSupervisor] = useState([]);
  const [Condition, setCondition] = useState([]);
  const [options, setoptions] = useState([]);
  const [formData1, setFormData1] = useState({
    //Step1
    txt_ReqNo: "",
    txt_ReqDate: "",
    txt_ReqStatusValue: "LT0101",
    txt_ReqStatusDesc: "Create",
    txt_ReqbyID: "",
    txt_Userlogin: "",
    txt_ReqbyName: "",
    txt_Factory: "",
    txt_FactoryValue: "",
    txt_Department: "",
    txt_EmpType: "",
    txt_JoinDate: "",
    txt_JobGrade: "",
    txt_Email: "",
    Date_Target: null,
    txt_Tel: "",
    //step2.1
    CB_letterType: [],
    txt_LetterThai: "0",
    txt_LetterEng: "0",
    txt_WorkCerThai: "0",
    txt_WorkCerEng: "0",
    Date_Resignation: null,
    txt_LetterOther: "",
    txt_Remark: "",
    //step2.2
    Sl_Supervisor: null,
    Rd_SupervisorApprove: "",
    Date_SupervisorActionDate: "",
    txt_SupervisorComment: "",
    //step3
    Rd_HRStatus: "",
    Sl_HrCondion: null,
    txt_HrStaff: "",
    txt_HrActionDate: "",
    Date_HrConfirmAcDate: "",
    txt_HrComment: "",
    txt_RecriveById: "",
    txt_RecriveByName: "",
    txt_RecriveByJobGrade: "",
    txt_RecriveByDepartment: "",
    txt_RecriveByEmail: "",
    txt_RecriveByTel: "",
    Date_RecriveDate: "",
  });

  useEffect(() => {
    FetchData();
    GetConditionClose();
    GetSupervisor();
    GetOptionLetter();
  }, []);

  const FetchData = async () => {
    if (ReqNo != null && ReqNo != "") {
      // queryParams.delete("ReqNo");
      // const newUrl = `${location.pathname}?${queryParams.toString()}`;
      // window.history.replaceState(
      //   null,
      //   "",
      //   newUrl.endsWith("?") ? newUrl.slice(0, -1) : newUrl
      // );
      showLoading("Loading...");
      await GetdataEdit();
      hideLoading();
    }
  };
  const GetConditionClose = async () => {
    await axios
      .post("/api/RefferenceLetter/GetConditionClose", {})
      .then(async (res) => {
        setCondition(res.data);
      });
  };

  const GetOptionLetter = async () => {
    await axios
      .post("/api/RefferenceLetter/GetOptionLetter", {})
      .then((res) => {
        console.log(res.data, "GetOptionLetter");
        setoptions(res.data);
      });
  };

  const GetSupervisor = async () => {
    await axios
      .post("/api/RefferenceLetter/GetSupervisorUp", {
        Fac: formData1.txt_FactoryValue,
        Dept: formData1.txt_Department,
      })
      .then((res) => {
        setSupervisor(res.data);
      });
  };
  const fomatdate = (date) => {
    console.log(date, "datedate");
    let formattedDate;
    if (date) {
      const [day, month, year] = date.split("/");
      formattedDate = `${year}-${month}-${day}`;
    }
    return formattedDate;
  };

  const GetdataEdit = async () => {
    handleChange("txt_ReqNo", ReqNo);
    await axios
      .post("/api/RefferenceLetter/GetDataHeaderLetter", {
        ReqNo: ReqNo,
      })
      .then(async (res) => {
        let data = res.data[0];
        console.log(data, "mmmmxxx");
        //step1
        handleChange("txt_ReqDate", data.ReqDate);
        handleChange("txt_ReqStatusDesc", data.Status_desc);
        handleChange("txt_ReqStatusValue", data.Status_value);
        await GetDataPerson(data.Reqby_id);
        handleChange("txt_ReqbyID", data.Reqby_id);
        handleChange("txt_FactoryValue", data.Fac_value);
        handleChange("txt_Factory", data.Fac_desc);
        handleChange("txt_Department", data.Dept);
        handleChange("txt_Email", data.Email);
        handleChange("Date_Target", fomatdate(data.Target_Date));
        handleChange("txt_Tel", data.Tel);
        //step2
        handleChange("txt_Remark", data.Remark);
        handleChange("Sl_Supervisor", data.Sv_by);
        handleChange("Rd_SupervisorApprove", data.Sv_flg);
        console.log("dataaaaaa");
        if (data.Status_value == "LT0102" || data.Status_value == "LT0101") {
          handleChange("Date_SupervisorActionDate", "");
        } else {
          handleChange("Date_SupervisorActionDate", data.Sv_date);
        }
        handleChange("txt_SupervisorComment", data.Sv_Comment);
        //step3
        handleChange("Rd_HRStatus", data.Hr_Status);
        handleChange("Sl_HrCondion", data.Hr_Condition);
        console.log("data.Hr_ConfirmAcDate", data.Hr_ConfirmAcDate);
        if (data.Hr_ConfirmAcDate != null) {
          handleChange(
            "Date_HrConfirmAcDate",
            fomatdate(data.Hr_ConfirmAcDate)
          );
        } else {
          handleChange("Date_HrConfirmAcDate", fomatdate(""));
        }

        handleChange("txt_HrComment", data.Hr_comment);
        handleChange("txt_RecriveById", data.Hr_ResiveBy || "");
        await GetPersonHr(data.Hr_ResiveBy);
        // handleChange("Sl_HrCondion", data.Hr_Condition);
        handleChange("txt_RecriveByEmail", data.Hr_ResiveEmail || "");
        handleChange("txt_RecriveByTel", data.Hr_ResiveTel || "");

        if (data.Hr_ResiveDate != null) {
          handleChange("Date_RecriveDate", fomatdate(data.Hr_ResiveDate));
        } else {
          handleChange("Date_RecriveDate", fomatdate(""));
        }
        handleChange("txt_HrStaff", data.Hr_lastby || "");
        if (data.Hr_lastdate != null) {
          handleChange("txt_HrActionDate", data.Hr_lastdate);
        } else {
          handleChange("txt_HrActionDate", "");
        }
      });
    await axios
      .post("/api/RefferenceLetter/GetLetterType", {
        ReqNo: ReqNo,
      })
      .then(async (res) => {
        console.log(res.data, "GetLetterType");
        let data = [];
        for (let i = 0; i < res.data.length; i++) {
          data.push(res.data[i].LetterType);
          if (res.data[i].LetterType == "LT0203") {
            const [day, month, year] = res.data[i].LetterDetail.split("/");
            const formattedDate = `${year}-${month}-${day}`;
            handleChange("Date_Resignation", formattedDate);
          }
          if (res.data[i].LetterType == "LT0205") {
            handleChange("txt_LetterOther", res.data[i].LetterDetail);
          }
          if (res.data[i].LetterType == "LT0201") {
            if (res.data[i].Thai) {
              handleChange("txt_LetterThai", res.data[i].Thai);
            }
            if (res.data[i].Eng) {
              handleChange("txt_LetterEng", res.data[i].Eng);
            }
          }
          if (res.data[i].LetterType == "LT0202") {
            if (res.data[i].Thai) {
              handleChange("txt_WorkCerThai", res.data[i].Thai);
            }
            if (res.data[i].Eng) {
              handleChange("txt_WorkCerEng", res.data[i].Eng);
            }
          }
        }
        handleChange("CB_letterType", data);
      });
  };

  const GetDataPerson = async (ID_Code) => {
    await axios
      .post("/api/RefferenceLetter/GetDataPersonByIDCode", {
        Id_Code: ID_Code || "",
      })
      .then((res) => {
        console.log(res.data, "GetDataPerson");
        if (res.data.length > 0) {
          handleChange("txt_Userlogin", res.data[0].User);
          handleChange("txt_ReqbyName", res.data[0].name_surname);
          handleChange("txt_EmpType", res.data[0].emptype);
          handleChange("txt_JoinDate", res.data[0].joindate);
          handleChange("txt_JobGrade", res.data[0].jobgrade);
        }
      });
  };

  const GetPersonHr = async (ID_Code) => {
    await axios
      .post("/api/RefferenceLetter/GetDataPersonByIDCode", {
        Id_Code: ID_Code || "",
      })
      .then((res) => {
        console.log(res.data, "GetDataPerson");
        if (res.data.length > 0) {
          handleChange("txt_RecriveByName", res.data[0].name_surname);
          handleChange("txt_RecriveByDepartment", res.data[0].dept);
          handleChange("txt_RecriveByJobGrade", res.data[0].jobgrade);
        }
      });
  };

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData1,
    Supervisor,
    Condition,
    options,
  };
}

export { fn_RefferenceLetterMasterList };
