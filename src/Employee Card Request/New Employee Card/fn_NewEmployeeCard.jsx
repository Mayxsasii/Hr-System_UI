import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { useLocation } from "react-router-dom";

function fn_NewEmployeeCard() {
  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();
  const url = window.location.href;
  const Path = url.split("/").pop().split("?")[0];
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
    // txt_Userlogin: "",
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
    Rd_SwipeCard: "",
    Date_DayWork: [],
    // Date_DayWork2: [],
    Rd_RecriveByCard: "",
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
    Sl_cause: null,
    Sl_causeOther: "",
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
        formData1.Sl_cause != null &&
        formData1.txt_RecriveById != "" &&
        formData1.txt_RecriveByEmail != "" &&
        formData1.txt_RecriveByTel != "" &&
        formData1.Date_RecriveDate != null &&
        formData1.Sl_PaymentStatus != null
      ) {
        if (formData1.Sl_cause == "CD0208") {
          if (formData1.Sl_causeOther != "") {
            handleChange("Rd_HRStatus", "CD0107");
          } else {
            handleChange("Rd_HRStatus", "CD0104");
            return;
          }
        } else {
          handleChange("Rd_HRStatus", "CD0107");
        }
        // if (formData1.Sl_PaymentStatus == "CD0403") {
        //   if (formData1.txt_PaymentStatusOther != "") {
        //     handleChange("Rd_HRStatus", "CD0107");
        //   } else {
        //     handleChange("Rd_HRStatus", "CD0104");
        //     return;
        //   }
        // } else {
        //   handleChange("Rd_HRStatus", "CD0107");
        // }
      } else {
        handleChange("Rd_HRStatus", "CD0104");
        return;
      }
    }
  }, [
    formData1.Sl_cause,
    formData1.txt_RecriveById,
    formData1.txt_RecriveByEmail,
    formData1.txt_RecriveByTel,
    formData1.Date_RecriveDate,
    formData1.txt_PaymentStatusOther,
    formData1.Sl_PaymentStatus,
    formData1.Sl_causeOther,
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
    await axios
      .post("/api/EmployeeCard/GetDataEmpCard", {
        Req_No: ReqNo || "",
      })
      .then(async (res) => {
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
        handleChange("Rd_SwipeCard", res.data[0].SwipeCard);
        handleChange("Rd_RecriveByCard", res.data[0].RecriveCard);
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
        handleChange("Rd_HRStatus", res.data[0].HR_Rd_Status);
        handleChange("Sl_HrCondion", res.data[0].HR_Condition || null);
        handleChange("Sl_cause", res.data[0].HR_Reason || null);
        handleChange("Sl_causeOther", res.data[0].HR_Reason_other || "");
        handleChange("txt_ExpensesCause", res.data[0].HR_cost || "");
        handleChange("txt_HrComment", res.data[0].HR_Comment || "");
        handleChange("txt_RecriveById", res.data[0].HR_Receive_By || "");
        if (res.data[0].HR_Receive_By) {
          await GetDataPersonForHr(res.data[0].HR_Receive_By);
        }
        //
        handleChange("txt_RecriveByEmail", res.data[0].HR_Receive_Email || "");
        handleChange("txt_RecriveByTel", res.data[0].HR_Receive_Tel || "");
        if (res.data[0].HR_Receive_Date) {
          handleChange("Date_RecriveDate", res.data[0].HR_Receive_Date);
        }

        handleChange("Sl_PaymentStatus", res.data[0].HR_Payment || null);

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
        let data = [];
        data = res.data.map((item) => item.WorkDay);
        handleChange("Date_DayWork", data);
      });
  };

  const GetDataPerson = async (ID_Code) => {
    showLoading("");
    await axios
      .post("/api/EmployeeCard/GetDataPersonByIDCodeEmpCard", {
        Id_Code: ID_Code || "",
      })
      .then(async (res) => {
        if (res.data.length === 0) {
          // handleChange("txt_Userlogin", "");
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
            text: "User not found/ไม่พบข้อมูลพนักงาน",
          });
          hideLoading();
        } else {
          if (res.data[0].dept == "") {
            // handleChange("txt_Userlogin", "");
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
              text: "Please Contact HR Admin This Employee code cannot be approved/กรุณาติดต่อ HR Admin รหัสพนักงานนี้ไม่สามารถขออนุมัติได้",
             
            });
            return;
          }
          // handleChange("txt_Userlogin", res.data[0].User);
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
        if (res.data.length === 0) {
          handleChange("txt_RecriveById", "");
          handleChange("txt_RecriveByName", "");
          handleChange("txt_RecriveByJobGrade", "");
          handleChange("txt_RecriveByDepartment", "");
          handleChange("txt_RecriveByEmail", "");
          Swal.fire({
            icon: "warning",
            text: "User not found/ไม่พบข้อมูลพนักงาน",
          });
          hideLoading();
        } else {
          if (formData1.txt_ExpensesCause > 0) {
            handleChange("Sl_PaymentStatus", "CD0401");
          }
          handleChange("txt_RecriveByName", res.data[0].name_surname);
          handleChange("txt_RecriveByDepartment", res.data[0].dept);
          handleChange("txt_RecriveByJobGrade", res.data[0].jobgrade);
          handleChange("txt_RecriveByEmail", res.data[0].email);
        }
      });

    hideLoading();
  };

  const GetReason = async () => {
    await axios.post("/api/EmployeeCard/GetReason").then((res) => {
      setReason(res.data);
    });
  };

  const GetCondition = async () => {
    await axios.post("/api/EmployeeCard/GetConditionClose").then((res) => {
      setCondition(res.data);
    });
  };

  const GetPaymentStatus = async () => {
    await axios.post("/api/EmployeeCard/GetStatusPayment").then((res) => {
      setStatusPayment(res.data);
    });
  };

  const GetSv = async (Fac, Dept) => {
    await axios
      .post("/api/EmployeeCard/GetPersonForApprovalEmployeeCard", {
        factory: Fac || "",
        dept: Dept || "",
      })
      .then((res) => {
        setsupervisor(res.data);
      });
  };

  const handleStatus = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue != "CD0108") {
      handleChange("Sl_HrCondion", null);
    }
    if (selectedValue === "CD0107") {
      // ตรวจสอบข้อมูลหลัก
      if (
        formData1.Sl_cause == null ||
        formData1.txt_RecriveById === "" ||
        formData1.txt_RecriveByEmail === "" ||
        formData1.txt_RecriveByTel === "" ||
        !formData1.Date_RecriveDate ||
        formData1.Sl_PaymentStatus == null
      ) {
        Swal.fire({
          icon: "warning",
          title: "Cannot be closed",
          text: `Please input Data for close/กรุณากรอกข้อมูลเพื่อปิด`,
        });
        handleChange("Rd_HRStatus", "CD0104");
        return;
      }

      // ตรวจสอบกรณี Reason อื่นๆ
      if (formData1.Sl_cause === "CD0208" && formData1.Sl_causeOther === "") {
        Swal.fire({
          icon: "warning",
          title: "Cannot be closed",
          text: `Please input Data for close/กรุณากรอกข้อมูลเพื่อปิด`,
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
          text: `Please input Data for close/กรุณากรอกข้อมูลเพื่อปิด`,
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
        text: "Please Input Request By/กรุณากรอกรหัสพนักงาน",
      });
      return;
    }
    if (formData1.txt_Email == "") {
      Swal.fire({
        icon: "warning",
        text: "Please Input Email/กรุณากรอกอีเมล",
      });
      return;
    }
    if (formData1.txt_Tel == "") {
      Swal.fire({
        icon: "warning",
        text: "Please Input Tel/กรุณากรอกเบอร์",
      });
      return;
    }
    if (formData1.Sl_Reason == null) {
      Swal.fire({
        icon: "warning",
        text: "Please Select Reason/กรุณาเลือกเหตุผล",
      });
      return;
    }
    if (formData1.Sl_Reason == "CD0208") {
      if (formData1.txt_ReasonOther == "") {
        Swal.fire({
          icon: "warning",
          text: "Please Input Reason Other/กรุณากรอกเหตุผลอื่นๆ",
        });
        return;
      }
    }
    if (formData1.Rd_SwipeCard == "") {
      Swal.fire({
        icon: "warning",
        text: "Please Select Recording working time/กรุณาเลือกการบันทึกเวลาการทำงาน",
      });
      return;
    } else {
      if (formData1.Rd_SwipeCard == "N") {
        if (formData1.Date_DayWork == "" || formData1.Date_DayWork == []) {
          Swal.fire({
            icon: "warning",
            text: "กรุณาเลือกวันที่ไม่ได้บันทึกเวลาการทำงาน",
          });
          return;
        }
      }
    }
    if (formData1.Rd_RecriveByCard == "") {
      Swal.fire({
        icon: "warning",
        text: "Please Select Receive Card By/กรุณาเลือกการผู้บัตร",
      });
      return;
    }
    if (formData1.Sl_Supervisor == null) {
      Swal.fire({
        icon: "warning",
        text: "Please Select Supervisor Up/กรุณาเลือกหัวหน้างาน",
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
        GenNo = res.data[0].RUNNING;
      });

    showLoading("กำลังบันทึกข้อมูล...");
    await axios
      .post("/api/EmployeeCard/InsNewEmpcard", {
        req_no: GenNo,
        ReqBy_id: formData1.txt_ReqbyID,
        factory: formData1.txt_FactoryValue,
        req_dept: formData1.txt_Department,
        req_tel: formData1.txt_Tel,
        req_email: formData1.txt_Email,
        reason: formData1.Sl_Reason,
        reason_other: formData1.txt_ReasonOther,
        remark: formData1.txt_Remark,
        SwipeCard: formData1.Rd_SwipeCard,
        RecriveCard: formData1.Rd_RecriveByCard,
        sv_by: formData1.Sl_Supervisor,
      })
      .then((res) => {});

    for (let i = 0; i < formData1.Date_DayWork.length; i++) {
      await axios
        .post("/api/EmployeeCard/InsworkDay", {
          req_no: GenNo,
          reqby_id: formData1.txt_ReqbyID,
          work_day: formData1.Date_DayWork[i],
        })
        .then((res) => {
          //insert sucess
          console.log("InsworkDay", res.data);
        });
    }
    await DatamailSend(GenNo);
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
        text: "Please Select Reject Or Approve/กรุณาเลือก Anprove หรือ Reject",
      });
      hideLoading();
      return;
    }
    if (formData1.Rd_SupervisorApprove == "R") {
      if (formData1.txt_SupervisorComment == "") {
        Swal.fire({
          icon: "warning",
          text: "Please Input Comment/กรุณากรอกความคิดเห็น",
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

    if (formData1.Rd_SupervisorApprove == "A") {
      await DatamailSend(formData1.txt_ReqNo);
    }
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
      if (formData1.Rd_HRStatus != "CD0108") {
        if (formData1.Rd_HRStatus == "" || formData1.Rd_HRStatus == null) {
          Swal.fire({
            icon: "warning",
            text: "Please Select Status/กรุณาเลือกสถานะ",
          });
          return;
        }
        if (formData1.Rd_HRStatus == "CD0108") {
          if (formData1.Sl_HrCondion == null) {
            Swal.fire({
              icon: "warning",
              text: "Please Select Conditon For Close/กรุณาเลือกเงื่อนไขสำหรับปิด",
            });
            return;
          }
        }

        if (formData1.Sl_cause == null) {
          Swal.fire({
            icon: "warning",
            text: "Please Select Reason/กรุณาเลือกเหตุผล",
          });
          return;
        }

        if (formData1.Sl_cause == "CD0208") {
          if (formData1.Sl_causeOther == "") {
            Swal.fire({
              icon: "warning",
              text: "Please Input Reason Other/กรุณากรอกเหตุผลอื่น",
            });
            return;
          }
        }

        if (formData1.txt_RecriveById == "") {
          Swal.fire({
            icon: "warning",
            text: "Please Input Receive By/กรุณากรอกรหัสพนักงานผู้รับ",
          });
          return;
        }
        if (formData1.txt_RecriveByEmail == "") {
          Swal.fire({
            icon: "warning",
            text: "Please Input Email/กรุณากรอกอีเมล",
          });
          return;
        }
        if (formData1.txt_RecriveByTel == "") {
          Swal.fire({
            icon: "warning",
            text: "Please Input Tel/กรุณากรอกเบอร์โทรศัพท์",
          });
          return;
        }
        if (formData1.Date_RecriveDate == "") {
          Swal.fire({
            icon: "warning",
            text: "Please Input Receive Date/กรุณากรอกวันที่รับ",
          });
          return;
        }
        // if (formData1.Sl_PaymentStatus == null) {
        //   Swal.fire({
        //     icon: "warning",
        //     title: "Please Select Payment Status!",
        //   });
        //   return;
        // }
        // if (formData1.Sl_PaymentStatus == "CD0403") {
        //   if (formData1.txt_PaymentStatusOther == "") {
        //     Swal.fire({
        //       icon: "warning",
        //       title: "Please Input Payment Status Other!",
        //     });
        //     return;
        //   }
        // }
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
        reason: formData1.Sl_cause || "",
        reason_other: formData1.Sl_causeOther || "",
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
        if (formData1.txt_ReqStatusValue == "CD0103") {
          await DatamailSend(formData1.txt_ReqNo);
        }
      });
      return;
    } else {
      await DatamailSend(formData1.txt_ReqNo);
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
    if (status == "CD0101") {
      handleChange("txt_ReqbyID", "");
      // handleChange("txt_Userlogin", "");
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
      handleChange("Sl_cause", null);
      handleChange("Sl_causeOther", "");
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

  const DatamailSend = async (ReqNo) => {
    let status = formData1.txt_ReqStatusValue;
    let Usermail = [];
    let Dear = "";
    let Subject = "";
    if (status == "CD0101") {
      Subject = `Please Approve Letter Request : (${ReqNo})`;
      Dear = `Khun ${formData1.Sl_Supervisor}  (Supervisor up)`;
      await axios
        .post("/api/Common/GetEmailUser", {
          user: formData1.Sl_Supervisor,
          formenu: "EMP CARD",
        })
        .then((res) => {
          if (res.data.length > 0) {
            Usermail = res.data;
          }
        });
    } else if (status == "CD0102") {
      Subject = `Please Approve Letter Request : (${ReqNo})`;
      Dear = "HR Staff";
      await axios
        .post("/api/Common/GetEmailHrStaff", {
          Fac: formData1.txt_FactoryValue,
          formenu: "EMP CARD",
        })
        .then((res) => {
          Usermail = res.data;
        });
    } else if (status == "CD0103" || status == "CD0104") {
      Dear = `All Concern`;
      await axios
        .post("/api/Common/GetEmailUser", {
          user: formData1.Sl_Supervisor,
          formenu: "EMP CARD",
        })
        .then((res) => {
          if (res.data.length > 0) {
            Usermail = res.data;
          }
        });
      if (status == "CD0103") {
        Subject = `Letter Request : (${ReqNo}) On Process`;
      } else {
        if (formData1.Rd_HRStatus == "CD0104") {
          Subject = `Letter Request : (${ReqNo}) On Process`;
        } else if (formData1.Rd_HRStatus == "CD0107") {
          Subject = `Letter Request : (${ReqNo}) Close`;
        } else if (formData1.Rd_HRStatus == "CD0108") {
          Subject = `Letter Request : (${ReqNo}) Closed by condition`;
        }
      }
    }

    Usermail.forEach((user) => {
      let fomathtml = fomatmail(Dear, ReqNo);
      SendEmail(Subject, fomathtml, user.Email);
    });
  };

  const SendEmail = async (strSubject, fomathtml, Email) => {
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

  const fomatmail = (Dear, ReqNo) => {
    // let ReqNo = formData1.txt_ReqNo;
    let status = "";
    let comment = "";
    if (formData1.txt_ReqStatusValue === "CD0101") {
      status = "Wait Supervisor up Approve";
    } else if (formData1.txt_ReqStatusValue === "CD0102") {
      status = "Wait HR Staff Action";
      comment = formData1.txt_SupervisorComment;
    } else if (
      formData1.txt_ReqStatusValue === "CD0103" ||
      formData1.txt_ReqStatusValue === "CD0104"
    ) {
      status = "On Process";
      comment = formData1.txt_HrComment;
      if (formData1.Rd_HRStatus === "CD0104") {
        status = "On Process";
      } else if (formData1.Rd_HRStatus === "CD0107") {
        status = "Closed";
      } else if (formData1.Rd_HRStatus === "CD0108") {
        status = "Closed by HR condition";
      }
    }

    const formattedRemark = formData1.txt_Remark.replace(/(.{60})/g, "$1<br>");
    const formattedComment = (comment || "").replace(/(.{60})/g, "$1<br>");
    let strEmailFormat = "";
    if (formData1.txt_ReqStatusValue === "CD0101") {
      strEmailFormat = `
        <!DOCTYPE html>
        <html lang="en">
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #dddddd; background-color: #ffffff;">
        <!-- Header -->
        <tr>
        <td align="center" bgcolor="#578FCA" style="padding: 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
                                HR Online System Notification
        </td>
        </tr>
        <!-- Content -->
        <tr>
        <td style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.5;">
        <p>Dear ${Dear} ,</p>
        <p>
                                  This Request creates as follow ${formData1.txt_ReqbyName}
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
        <td style="font-size: 14px; color: #333333; text-align: left;">HR Online >> Employee Card</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">RequestNo.:</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${ReqNo}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Factory :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_Factory}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Department :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_Department}</td>
        </tr>

        
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqbyName}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqDate}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqbyName}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${formData1.txt_ReqDate}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Remark :</td>
        <td style="font-size: 14px; color: #333333; text-align: left; ">
            ${formattedRemark}
        </td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Status :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${status}</td>
        </tr>
        </table>
        <p>
                                    กรุณาตรวจสอบข้อมูลผ่านระบบของคุณ และดำเนินการต่อให้เรียบร้อย
        </p>
        <!-- Button -->
        <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0;">
        <tr>
        <td align="center" bgcolor="#578FCA" style="padding: 12px 25px; border-radius: 5px;">
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
      strEmailFormat = ` <!DOCTYPE html>
        <html lang="en">
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #dddddd; background-color: #ffffff;">
        <!-- Header -->
        <tr>
        <td align="center" bgcolor="#578FCA" style="padding: 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
                                HR Online System Notification
        </td>
        </tr>
        <!-- Content -->
        <tr>
        <td style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.5;">
        <p>Dear ${Dear} ,</p>
        <p>
                                  This Request creates as follow ${
                                    formData1.txt_ReqbyName
                                  }
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
        <td style="font-size: 14px; color: #333333; text-align: left;">HR Online >> Employee Card</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">RequestNo.:</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${ReqNo}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Factory :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_Factory
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Department :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_Department
        }</td>
        </tr>

        
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_ReqbyName
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_ReqDate
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_ReqbyName
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formData1.txt_ReqDate
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Remark :</td>
        <td style="font-size: 14px; color: #333333; text-align: left; ">
            ${formattedRemark}
        </td>
        </tr>

        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Last Action By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${User}</td>
        </tr>

        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Last Action Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${DateToday}</td>
        </tr>

        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Last Action Comment :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formattedComment || ""
        }</td>
        </tr>

        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Status :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${status}</td>
        </tr>

        </table>
        <p>
                                    กรุณาตรวจสอบข้อมูลผ่านระบบของคุณ และดำเนินการต่อให้เรียบร้อย
        </p>
        <!-- Button -->
        <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0;">
        <tr>
        <td align="center" bgcolor="#578FCA" style="padding: 12px 25px; border-radius: 5px;">
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
