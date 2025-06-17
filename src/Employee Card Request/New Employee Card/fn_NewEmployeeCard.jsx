import React, { useState, useEffect } from "react";
import { theme } from "antd";

import Swal from "sweetalert2";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { useLocation, useNavigate } from "react-router-dom";
import status from "daisyui/components/status";

function fn_NewEmployeeCard() {
  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();
  const url = window.location.href;
  const Path = url.split("/").pop().split("?")[0];
  console.log(Path, "Pathhhhh");
  const queryParams = new URLSearchParams(location.search);
  const ReqNo = queryParams.get("ReqNo");
  const today = new Date();

  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`; //DD/MM/YYYY
  const DateToday2 = `${today.getFullYear()}-${String(
    today.getMonth() + 1 //YYYY-MM-DD
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const User = localStorage.getItem("username");
  const ID_Code = localStorage.getItem("id_code");
  const [Reason, setReason] = useState([]);
  const [Condition, setCondition] = useState([]);
  const [StatusPayment, setStatusPayment] = useState([]);
  const [supervisor, setsupervisor] = useState([]);
  const [formData1, setFormData1] = useState({
    //Step1
    txt_ReqNo: "",
    txt_ReqDate: DateToday,
    txt_ReqStatusValue: "CD0101",
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
    txt_Tel: "",
    Sl_Reason: null,
    txt_ReasonOther: "",
    txt_expenses: "",
    Date_DayWork: [],
    Date_DayWork2: [],
    txt_Remark: "",

    //step2.2
    Sl_Supervisor: null,
    Rd_SupervisorApprove: "",
    Date_SupervisorActionDate: DateToday,
    txt_SupervisorComment: "",
    //step3
    Rd_HRStatus: "CD0104",
    Sl_HrCondion: null,
    txt_HrStaff: User,
    txt_HrActionDate: DateToday,
    txt_cause: null,
    txt_CauseOther: "",
    txt_ExpensesCause: "",
    txt_HrComment: "",
    txt_RecriveById: "",
    txt_RecriveByName: "",
    txt_RecriveByJobGrade: "",
    txt_RecriveByDepartment: "",
    txt_RecriveByEmail: "",
    txt_RecriveByTel: "",
    Date_RecriveDate: DateToday2,
    Sl_PaymentStatus: null,
    txt_PaymentStatusOther: "",
  });

  useEffect(() => {
    GetReason();
    GetCondition();
    GetPaymentStatus();
    FetchData();
  }, []);

  useEffect(() => {
    if (Path != "MasterListEmployeeCard") {
      if (
        formData1.txt_cause != null &&
        formData1.txt_RecriveById != "" &&
        formData1.txt_RecriveByEmail != "" &&
        formData1.txt_RecriveByTel != "" &&
        formData1.Date_RecriveDate != null &&
        formData1.Sl_PaymentStatus != null
      ) {
        if (formData1.txt_cause == "CD0208") {
          if (formData1.txt_CauseOther != "") {
            handleChange("Rd_HRStatus", "CD0107");
          } else {
            handleChange("Rd_HRStatus", "CD0104");
            return;
          }
        } else {
          handleChange("Rd_HRStatus", "CD0107");
        }
        if (formData1.Sl_PaymentStatus == "CD0403") {
          if (formData1.txt_PaymentStatusOther != "") {
            handleChange("Rd_HRStatus", "CD0107");
          } else {
            handleChange("Rd_HRStatus", "CD0104");
            return;
          }
        } else {
          handleChange("Rd_HRStatus", "CD0107");
        }
      } else {
        handleChange("Rd_HRStatus", "CD0104");
        return;
      }
    }
  }, [
    formData1.txt_cause,
    formData1.txt_RecriveById,
    formData1.txt_RecriveByEmail,
    formData1.txt_RecriveByTel,
    formData1.Date_RecriveDate,
    formData1.txt_PaymentStatusOther,
    formData1.Sl_PaymentStatus,
    formData1.txt_CauseOther,
  ]);

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

  const GetdataEdit = async () => {
    console.log(ReqNo, "GetDataEmpCard");
    await axios
      .post("/api/EmployeeCard/GetDataEmpCard", {
        Req_No: ReqNo || "",
      })
      .then(async (res) => {
        console.log(res.data[0], "GetDataEmpCard");
        let status = res.data[0].ReqStatusId;
        handleChange("txt_ReqNo", res.data[0].ReqNo);
        handleChange("txt_ReqDate", res.data[0].ReqDate);
        handleChange("txt_ReqStatusValue", res.data[0].ReqStatusId);
        handleChange("txt_ReqStatusDesc", res.data[0].ReqStatusDesc);
        handleChange("txt_ReqbyID", res.data[0].ReqBy_id);
        await GetDataPerson(res.data[0].ReqBy_id);
        handleChange("txt_Tel", res.data[0].tel);

        handleChange("txt_ReasonOther", res.data[0].reason_other);
        // handleChange("Date_WorkingForm", res.data[0].work_timestart);
        // handleChange("Date_WorkingTo", res.data[0].work_timeend);
        handleChange("txt_expenses", res.data[0].expenses);
        // await GetDayWork(res.data[0].work_timestart, res.data[0].work_timeend);
        handleChange("txt_Remark", res.data[0].remark);
        handleChange("Sl_Reason", res.data[0].reason || null);
        //Approve
        handleChange("Sl_Supervisor", res.data[0].Sl_sv || null);
        if (status != "CD0102") {
          handleChange("Date_SupervisorActionDate", res.data[0].Ap_date);
          handleChange("Rd_SupervisorApprove", res.data[0].Ap_Radio);
          handleChange("txt_SupervisorComment", res.data[0].Ap_Comment);
        }
        //----Hr
        handleChange("Rd_HRStatus", res.data[0].HR_Rd_Status || null);
        handleChange("Sl_HrCondion", res.data[0].HR_Condition || null);
        handleChange("txt_cause", res.data[0].HR_Reason || null);
        handleChange("txt_CauseOther", res.data[0].HR_Reason_other);
        handleChange("txt_ExpensesCause", res.data[0].HR_cost);
        handleChange("txt_HrComment", res.data[0].HR_Comment);
        handleChange("txt_RecriveById", res.data[0].HR_Receive_By);
        if (res.data[0].HR_Receive_By) {
          await GetDataPersonForHr(res.data[0].HR_Receive_By);
        }
        //
        handleChange("txt_RecriveByEmail", res.data[0].HR_Receive_Email);
        handleChange("txt_RecriveByTel", res.data[0].HR_Receive_Tel);
        if (res.data[0].HR_Receive_Date) {
          handleChange("Date_RecriveDate", res.data[0].HR_Receive_Date);
        }

        handleChange("Sl_PaymentStatus", res.data[0].HR_Payment || null);
        handleChange("txt_PaymentStatusOther", res.data[0].HR_Payment_other);
        console.log(Path, "HR_last_By");
        if (Path == "MasterListEmployeeCard") {
          handleChange("txt_HrStaff", res.data[0].HR_last_By);
          handleChange("txt_HrActionDate", res.data[0].HR_last_Date);
        }
      });
    await axios
      .post("/api/EmployeeCard/GetDataWorkDay", {
        Req_No: ReqNo || "",
      })
      .then(async (res) => {
        console.log(res.data, "GetDataWorkDay");
        let data = "";
        if (res.data.length > 0) {
          data = res.data.map((item) => item.WorkDay).join(" , ");
        }

        handleChange("Date_DayWork2", data);
      });
  };

  const GetDataPerson = async (ID_Code) => {
    showLoading("");
    await axios
      .post("/api/EmployeeCard/GetDataPersonByIDCodeEmpCard", {
        Id_Code: ID_Code || "",
      })
      .then(async (res) => {
        console.log(res.data, "GetDataPerson");

        if (res.data.length === 0) {
          handleChange("txt_Userlogin", "");
          handleChange("txt_ReqbyID", "");
          handleChange("txt_ReqbyName", "");
          handleChange("txt_Factory", "");
          handleChange("txt_FactoryValue", "");
          handleChange("txt_Department", "");
          handleChange("txt_EmpType", "");
          handleChange("txt_JoinDate", "");
          handleChange("txt_JobGrade", "");
          handleChange("txt_Email", "");
          Swal.fire({
            icon: "warning",
            title: "User not found!",
          });
          hideLoading();
        } else {
          if (res.data[0].dept == "") {
          handleChange("txt_Userlogin", "");
          // handleChange("txt_ReqbyID", "");
          handleChange("txt_ReqbyName", "");
          handleChange("txt_Factory", "");
          handleChange("txt_FactoryValue", "");
          handleChange("txt_Department", "");
          handleChange("txt_EmpType", "");
          handleChange("txt_JoinDate", "");
          handleChange("txt_JobGrade", "");
          handleChange("txt_Email", "");
            Swal.fire({
              icon: "warning",
              text: "This Employee code cannot be approved",
              title: "Please Contact HR Admin!",
            });
            return ;
          }
          handleChange("txt_Userlogin", res.data[0].User);
          handleChange("txt_ReqbyName", res.data[0].name_surname);
          handleChange("txt_Factory", res.data[0].factory);
          handleChange("txt_FactoryValue", res.data[0].factory_code);
          handleChange("txt_Department", res.data[0].dept);
          handleChange("txt_EmpType", res.data[0].emptype);
          handleChange("txt_JoinDate", res.data[0].joindate);
          handleChange("txt_JobGrade", res.data[0].jobgrade);
          handleChange("txt_Email", res.data[0].email);
        }
        await GetSv(res.data[0].factory_code, res.data[0].dept);
      });

    hideLoading();
  };

  const GetDataPersonForHr = async (ID_Code) => {
    showLoading("");
    await axios
      .post("/api/EmployeeCard/GetDataPersonByIDCodeEmpCard", {
        Id_Code: ID_Code || "",
      })
      .then(async (res) => {
        console.log(res.data, "GetDataPerson");
        if (res.data.length === 0) {
          handleChange("txt_RecriveById", "");
          handleChange("txt_RecriveByName", "");
          handleChange("txt_RecriveByJobGrade", "");
          handleChange("txt_RecriveByDepartment", "");
          handleChange("txt_RecriveByEmail", "");
          Swal.fire({
            icon: "warning",
            title: "User not found!",
          });
          hideLoading();
        } else {
          handleChange("txt_RecriveByName", res.data[0].name_surname);
          handleChange("txt_RecriveByDepartment", res.data[0].dept);
          handleChange("txt_RecriveByJobGrade", res.data[0].jobgrade);
          handleChange("txt_RecriveByEmail", res.data[0].email);
        }
      });

    hideLoading();
  };

  const GetReason = async () => {
    await axios
      .post("/api/EmployeeCard/GetReason")
      .then((res) => {
        console.log(res.data, "GetReason");
        setReason(res.data);
      })
      .catch((error) => {
        console.error("Error fetching reasons:", error);
      });
  };

  const GetCondition = async () => {
    await axios
      .post("/api/EmployeeCard/GetConditionClose")
      .then((res) => {
        console.log(res.data, "GetConditionClose");
        setCondition(res.data);
      })
      .catch((error) => {
        console.error("Error fetching reasons:", error);
      });
  };

  const GetPaymentStatus = async () => {
    await axios
      .post("/api/EmployeeCard/GetStatusPayment")
      .then((res) => {
        console.log(res.data, "GetStatusPayment");
        setStatusPayment(res.data);
      })
      .catch((error) => {
        console.error("Error fetching reasons:", error);
      });
  };

  const GetSv = async (Fac, Dept) => {
    await axios
      .post("/api/EmployeeCard/GetPersonForApprovalEmployeeCard", {
        factory: Fac || "",
        dept: Dept || "",
      })
      .then((res) => {
        console.log(res.data, "GetPersonForApprovalEmployeeCard");
        setsupervisor(res.data);
      })
      .catch((error) => {
        console.error("Error fetching reasons:", error);
      });
  };

  const handleStatus = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue, "selectedValue");
    if (selectedValue != "CD0108") {
      handleChange("Sl_HrCondion", null);
    }
    if (selectedValue === "CD0107") {
      // ตรวจสอบข้อมูลหลัก
      if (
        formData1.txt_cause == null ||
        formData1.txt_RecriveById === "" ||
        formData1.txt_RecriveByEmail === "" ||
        formData1.txt_RecriveByTel === "" ||
        !formData1.Date_RecriveDate ||
        formData1.Sl_PaymentStatus == null
      ) {
        Swal.fire({
          icon: "warning",
          title: "Cannot be closed",
          text: `Please input Data for close`,
        });
        handleChange("Rd_HRStatus", "CD0104");
        return;
      }

      // ตรวจสอบกรณี Reason อื่นๆ
      if (formData1.txt_cause === "CD0208" && formData1.txt_CauseOther === "") {
        Swal.fire({
          icon: "warning",
          title: "Cannot be closed",
          text: `Please input Data for close`,
        });
        handleChange("Rd_HRStatus", "CD0104");
        return;
      }

      // ตรวจสอบกรณี PaymentStatus อื่นๆ
      if (
        formData1.Sl_PaymentStatus === "CD0403" &&
        formData1.txt_PaymentStatusOther === ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "Cannot be closed",
          text: `Please input Data for close`,
        });
        handleChange("Rd_HRStatus", "CD0104");
        return;
      }

      // ทุกเงื่อนไขผ่าน
      handleChange("Rd_HRStatus", selectedValue);
    } else {
      handleChange("Rd_HRStatus", selectedValue);
    }
  };

  const Bt_SendApprove = async () => {
    if (!formData1.txt_ReqbyID) {
      Swal.fire({
        icon: "warning",
        title: "Please Input Request By!",
      });
      return;
    }
    if (formData1.txt_Email == "") {
      Swal.fire({
        icon: "warning",
        title: "Please Input Email!",
      });
      return;
    }
    if (formData1.txt_Tel == "") {
      Swal.fire({
        icon: "warning",
        title: "Please Input Tel",
      });
      return;
    }
    if (formData1.Sl_Reason == null) {
      Swal.fire({
        icon: "warning",
        title: "Please Select Reason!",
      });
      return;
    }
    if (formData1.Sl_Reason == "CD0208") {
      if (formData1.txt_ReasonOther == "") {
        Swal.fire({
          icon: "warning",
          title: "Please Input Reason Other!",
        });
        return;
      }
    }
    if (formData1.Date_DayWork == "") {
      Swal.fire({
        icon: "warning",
        title: "Please Select Record Working Time!",
      });
      return;
    }
    if (formData1.Sl_Supervisor == null) {
      Swal.fire({
        icon: "warning",
        title: "Please Select Supervisor Up!",
      });
      return;
    }
    let GenNo = "";
    await axios
      .post("/api/EmployeeCard/GenRunNoEmpcard", {
        Fac_code: formData1.txt_FactoryValue || "",
        Fac_Desc: formData1.txt_Factory || "",
      })
      .then((res) => {
        console.log(res.data, "GenRunNoEmpcard");
        console.log(res.data, "GenRunNo");
        GenNo = res.data[0].RUNNING;
      });

    showLoading("กำลังบันทึกข้อมูล...");

    await axios
      .post("/api/EmployeeCard/InsNewEmpcard", {
        req_no: GenNo,
        req_by: formData1.txt_Userlogin,
        ReqBy_id: formData1.txt_ReqbyID,
        factory: formData1.txt_FactoryValue,
        req_dept: formData1.txt_Department,
        req_tel: formData1.txt_Tel,
        req_email: formData1.txt_Email,
        reason: formData1.Sl_Reason,
        reason_other: formData1.txt_ReasonOther,
        remark: formData1.txt_Remark,
        sv_by: formData1.Sl_Supervisor,
      })
      .then((res) => {
        console.log(res.data, "InsNewEmpcard");
      });

    for (let i = 0; i < formData1.Date_DayWork.length; i++) {
      console.log(formData1.Date_DayWork[i], "insert");
      await axios
        .post("/api/EmployeeCard/InsworkDay", {
          req_no: GenNo,
          reqby_id: formData1.txt_ReqbyID,
          work_day: formData1.Date_DayWork[i],
        })
        .then((res) => {
          console.log(res.data, "InsworkDay");
        });
    }
    hideLoading();
    Swal.fire({
      icon: "success",
      title: "Submit Success",
    }).then(async () => {
      window.location.href = "/HrSystem/Home";
    });
  };

  const Bt_Submit = async () => {
    showLoading("กำลังบันทึกข้อมูล...");
    if (formData1.Rd_SupervisorApprove == "") {
      Swal.fire({
        icon: "warning",
        text: "Please Select Reject Or Approve!",
      });
      hideLoading();
      return;
    }
    if (formData1.Rd_SupervisorApprove == "R") {
      if (formData1.txt_SupervisorComment == "") {
        Swal.fire({
          icon: "warning",
          text: "Please Input Comment!",
        });
        hideLoading();
        return;
      }
    }

    await axios
      .post("/api/EmployeeCard/UpdateApproveSv", {
        ReqNo: formData1.txt_ReqNo,
        RdApprove: formData1.Rd_SupervisorApprove,
        Comment: formData1.txt_SupervisorComment,
        Status: formData1.Rd_SupervisorApprove == "A" ? "CD0103" : "CD0109",
        UpdateBy: ID_Code || "",
      })
      .then((res) => {
        console.log(res.data, "UpdateApproveSv");
      });
    hideLoading();
    Swal.fire({
      icon: "success",
      title: "Submit Success",
    }).then(async () => {
      window.location.href = "/HrSystem/ApproveEmployeeCard";
    });
  };

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
  };

  const Bt_SubmitForHr = async (save) => {
    if (save == "Submit") {
      if (formData1.Rd_HRStatus == "CD0107") {
        if (formData1.Rd_HRStatus == "") {
          Swal.fire({
            icon: "warning",
            title: "Please Select Status!",
          });
          return;
        }
        if (formData1.Rd_HRStatus == "CD0108") {
          if (formData1.Sl_HrCondion == null) {
            Swal.fire({
              icon: "warning",
              title: "Please Select Conditon For Close!",
            });
            return;
          }
        }

        if (formData1.txt_cause == null) {
          Swal.fire({
            icon: "warning",
            title: "Please Select Reason!",
          });
          return;
        }

        if (formData1.txt_cause == "CD0208") {
          if (formData1.txt_CauseOther == "") {
            Swal.fire({
              icon: "warning",
              title: "Please Input Reason Other!",
            });
            return;
          }
        }
        if (formData1.txt_RecriveById == "") {
          Swal.fire({
            icon: "warning",
            title: "Please Input Recrive By!",
          });
          return;
        }
        if (formData1.txt_RecriveByEmail == "") {
          Swal.fire({
            icon: "warning",
            title: "Please Input Email!",
          });
          return;
        }
        if (formData1.txt_RecriveByTel == "") {
          Swal.fire({
            icon: "warning",
            title: "Please Input Tel!",
          });
          return;
        }
        if (formData1.Date_RecriveDate == "") {
          Swal.fire({
            icon: "warning",
            title: "Please Input Recrive Date!",
          });
          return;
        }
        if (formData1.Sl_PaymentStatus == null) {
          Swal.fire({
            icon: "warning",
            title: "Please Select Payment Status!",
          });
          return;
        }
        if (formData1.Sl_PaymentStatus == "CD0403") {
          if (formData1.txt_PaymentStatusOther == "") {
            Swal.fire({
              icon: "warning",
              title: "Please Input Payment Status Other!",
            });
            return;
          }
        }
      }
    }
    let StatusNew = "";
    if (save == "SaveDraft") {
      StatusNew = "CD0104";
    } else {
      if (formData1.Rd_HRStatus == "CD0107") {
        StatusNew = "CD0107";
      } else if (formData1.Rd_HRStatus == "CD0108") {
        StatusNew = "CD0108";
      }
    }

    showLoading("กำลังบันทึกข้อมูล...");
    await axios
      .post("/api/EmployeeCard/UpdateHrStaff", {
        ReqNo: formData1.txt_ReqNo || "",
        Statusold: formData1.txt_ReqStatusValue || "",
        StatusNew: StatusNew || "",
        HrBy: ID_Code || "",
        Rd_Status: formData1.Rd_HRStatus || "",
        condition: formData1.Sl_HrCondion || "",
        reason: formData1.txt_cause || "",
        reason_other: formData1.txt_CauseOther || "",
        cost: formData1.txt_ExpensesCause || 0,
        comment: formData1.txt_HrComment || "",
        receive_by: formData1.txt_RecriveById || "",
        tel: formData1.txt_RecriveByTel || "",
        email: formData1.txt_RecriveByEmail || "",
        receive_date: formData1.Date_RecriveDate
          ? `'${formData1.Date_RecriveDate}'`
          : null,
        payment: formData1.Sl_PaymentStatus || "",
        payment_other: formData1.txt_PaymentStatusOther || "",
      })
      .then((res) => {});
    // if(formData1.Rd_HRStatus == "CD0108") {
    //   status = "CD0104";
    // }
    hideLoading();
    if (save == "SaveDraft") {
      Swal.fire({
        icon: "success",
        title: "Save Success",
      }).then(async () => {
        // window.location.href = "/HrSystem/HrActionEmployeeCard";
      });
      return;
    } else {
      Swal.fire({
        icon: "success",
        title: "Submit Success",
      }).then(async () => {
        window.location.href = "/HrSystem/HrActionEmployeeCard";
      });
    }
  };

  const Bt_Reset = async () => {
    let status = formData1.txt_ReqStatusValue;
    console.log(status, "Bt_Reset");
    if (status == "CD0101") {
      handleChange("txt_ReqbyID", "");
      handleChange("txt_Userlogin", "");
      handleChange("txt_ReqbyName", "");
      handleChange("txt_Factory", "");
      handleChange("txt_FactoryValue", "");
      handleChange("txt_Department", "");
      handleChange("txt_EmpType", "");
      handleChange("txt_JoinDate", "");
      handleChange("txt_JobGrade", "");
      handleChange("txt_Email", "");
      handleChange("txt_Tel", "");
      handleChange("Sl_Reason", null);
      handleChange("txt_ReasonOther", "");
      handleChange("txt_expenses", "");
      handleChange("Date_DayWork2", []);
      handleChange("Date_DayWork", []);
      handleChange("txt_Remark", "");

      //step2.2
      handleChange("Sl_Supervisor", null);
    }
    if (status == "CD0102") {
      handleChange("Rd_SupervisorApprove", "");
      handleChange("txt_SupervisorComment", "");
    }
    if (status == "CD0103" || status == "CD0104") {
      handleChange("Rd_HRStatus", "CD0104");
      handleChange("Sl_HrCondion", null);
      handleChange("txt_cause", null);
      handleChange("txt_CauseOther", "");
      handleChange("txt_ExpensesCause", "");
      handleChange("txt_HrComment", "");
      handleChange("txt_RecriveById", "");
      handleChange("txt_RecriveByName", "");
      handleChange("txt_RecriveByJobGrade", "");
      handleChange("txt_RecriveByDepartment", "");
      handleChange("txt_RecriveByEmail", "");
      handleChange("txt_RecriveByTel", "");
      handleChange("Date_RecriveDate", DateToday2);
      handleChange("Sl_PaymentStatus", null);
      handleChange("txt_PaymentStatusOther", "");
    }
  };

  return {
    formData1,
    handleChange,
    GetDataPerson,
    Reason,
    supervisor,
    Bt_SendApprove,
    Bt_Submit,
    GetDataPersonForHr,
    Condition,
    StatusPayment,
    Bt_SubmitForHr,
    handleStatus,
    Bt_Reset,
  };
}

export { fn_NewEmployeeCard };
