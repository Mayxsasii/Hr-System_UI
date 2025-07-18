import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { useNavigate } from "react-router-dom";
import ImgViewFile from "../../assets/search.png";
import ImgApprove from "../../assets/approved.png";
import ImgReceive from "../../assets/confirmation.png";
import ImgView from "../../assets/search-list.png";
import { Tag, Tooltip } from "antd";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
function fn_SearchRefferenceLetter() {
  const navigate = useNavigate();
  const url = window.location.href;
  const today = new Date();
  const DateToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`; //DD/MM/YYYYY

  const DateToday2 = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`; //YYYY-MM-DD
  const Path = url.split("/").pop();
  const userlogin = localStorage.getItem("username");
  const ROLL = localStorage.getItem("ROLL");
  const { showLoading, hideLoading } = useLoading();

  const [Factory, setFactory] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Status, setStatus] = useState([]);
  // select
  const [SL_Factory, setSL_Factory] = useState(null);
  const [SL_Department, setSL_Department] = useState(null);
  const [SL_Status, setSL_Status] = useState(null);
  const [SL_Letter, setSL_Letter] = useState(null);

  const [txt_ReqNoFrom, settxt_ReqNoFrom] = useState("");
  const [txt_ReqNoTo, settxt_ReqNoTo] = useState("");
  const [txt_ReqBy, settxt_ReqBy] = useState("");
  const [DateFrom, setDateFrom] = useState(null);
  const [DateTo, setDateTo] = useState(null);

  const [TitlePage, setTitlePage] = useState("");

  const [dataSearch, setDataSearch] = useState([]);
  const [LetterType, setLetterType] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [Condition, setCondition] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [DataModal, setDataModal] = useState({
    ReqNo: "",
    //Hr
    Rd_Status: "LT0107",
    Sl_ConditonClose: null,
    txt_HrBy: userlogin || "",
    txt_HrActionDate: DateToday,
    Date_HrConfirm: DateToday2,
    txt_HrComment: "",
    //Receive
    allData: [],
    txt_ReceiveById: "",
    txt_ReceiveName: "",
    txt_UserLogin: "",
    txt_ReceiveJobGrade: "",
    txt_ReceiveDept: "",
    txt_ReceiveTel: "",
    txt_ReceiveEmail: "",
    Date_RecriveDate: DateToday2,
  });

  useEffect(() => {
    GetFactory();
    GetStatus();
    if (Path == "ApproveReferenceLetter") {
      GetDepartment();
    }
    GetLetter();
    Title();
    GetConditionClose();
  }, []);

  const handleChange = (field, value) => {
    setDataModal((prev) => ({ ...prev, [field]: value }));
  };

  const Title = async () => {
    if (Path == "ApproveReferenceLetter") {
      setTitlePage("Approve Reference Letter");
    } else if (Path == "HrActionReferenceLetter") {
      setTitlePage("Reference Letter Request (HR Staff Action)");
    } else if (Path == "ReferenceLetterMasterList") {
      setTitlePage("Reference Letter Master List");
    } else if (Path == "ReferenceLetterReceive") {
      setTitlePage("Reference Letter Receive");
    }
  };

  const GetLetter = async () => {
    await axios
      .post("/api/RefferenceLetter/GetLetterTypeSearch", {
        User_login: userlogin || "",
      })
      .then((res) => {
        setLetterType(res.data);
      });
  };

  const GetFactory = async () => {
    await axios
      .post("/api/RefferenceLetter/GetFactoryLetter", {
        User_login: userlogin || "",
        Roll: ROLL || "",
      })
      .then((res) => {
        setFactory(res.data);
        if (Path == "HrActionReferenceLetter") {
          setSL_Factory(res.data[0].value);
          GetDeptFac(res.data[0].value);
        }
      });
  };

  const GetStatus = async () => {
    await axios
      .post("/api/RefferenceLetter/GetStatusSearch", {
        type:
          Path == "ApproveReferenceLetter"
            ? ["A"]
            : Path == "HrActionReferenceLetter"
            ? ["H"]
            : Path == "ReferenceLetterMasterList"
            ? ["C", "R", "H", "A", "D", "F"]
            : Path == "ReferenceLetterReceive"
            ? ["R"]
            : [],
      })
      .then((res) => {
        setStatus(res.data);
      });
  };

  const GetDepartment = async () => {
    await axios
      .post("/api/RefferenceLetter/GetDepartmentApprove", {
        User_login: userlogin || "",
      })
      .then((res) => {
        setDepartment(res.data);
      });
  };

  const GetDeptFac = async (value) => {
    await axios
      .post("/api/RefferenceLetter/GetDeptallFac", {
        Fac: value || "",
      })
      .then((res) => {
        setDepartment(res.data);
      });
  };

  const handleFactory = async (value) => {
    setSL_Factory(value);
    if (Path != "ApproveReferenceLetter") {
      await GetDeptFac(value);
    }
  };

  const handleEdit = (ReqNo) => {
    navigate(`/HrSystem/NewReferenceLetter?ReqNo=${ReqNo}`);
  };

  const handleViewMasterList = (ReqNo) => {
    navigate(`/HrSystem/ViewReferenceLetterList?ReqNo=${ReqNo}`);
  };

  const bt_Search = async () => {
    try {
      setDataSearch([]);
      setSelectedRowKeys([]);
      showLoading("กำลังค้นหา...");
      if (Path == "ApproveReferenceLetter") {
        await axios
          .post("/api/RefferenceLetter/SearchLetter", {
            dept:
              SL_Department != null && SL_Department.length > 0
                ? `array[${SL_Department.map((dept) => `'${dept}'`).join(",")}]`
                : null,
            Fac: SL_Factory ? `'${SL_Factory}'` : null,
            reqfrom: txt_ReqNoFrom ? `'${txt_ReqNoFrom}'` : null,
            reqto: txt_ReqNoTo ? `'${txt_ReqNoTo}'` : null,
            datefrom: txt_ReqNoTo ? `'${DateFrom}'` : null,
            dateto: DateTo ? `'${DateTo}'` : null,
            reqby: txt_ReqBy ? `'${txt_ReqBy}'` : null,
            approveby: userlogin ? `'${userlogin}'` : null,
            type:
              SL_Letter != null && SL_Letter.length > 0
                ? `array[${SL_Letter.map((Letter) => `'${Letter}'`).join(",")}]`
                : null,
            status: ["LT0102"],
          })
          .then((res) => {
            console.log(res.data, "SearchLetter");
            if (res.data.length > 0) {
              setDataSearch(res.data);
            } else {
              Swal.fire({
                icon: "warning",
                title: "Not Found Data/ไม่พบข้อมูล",
              });
            }
          });
      } else if (Path == "ReferenceLetterReceive") {
        if (
          SL_Factory == null &&
          SL_Department == null &&
          txt_ReqBy == "" &&
          txt_ReqNoFrom == "" &&
          txt_ReqNoTo == "" &&
          SL_Letter == null &&
          DateTo == null &&
          DateFrom == null &&
          SL_Status == null
        ) {
          Swal.fire({
            icon: "warning",
            text: "Please fill in the information/กรุณากรอกข้อมูลเพื่อค้นหา",
          });
          hideLoading();
          return;
        }

        await axios
          .post("/api/RefferenceLetter/SearchLetter", {
            dept:
              SL_Department != null && SL_Department.length > 0
                ? `array[${SL_Department.map((dept) => `'${dept}'`).join(",")}]`
                : null,
            Fac: SL_Factory ? `'${SL_Factory}'` : null,
            reqfrom: txt_ReqNoFrom ? `'${txt_ReqNoFrom}'` : null,
            reqto: txt_ReqNoTo ? `'${txt_ReqNoTo}'` : null,
            datefrom: DateFrom ? `'${DateFrom}'` : null,
            dateto: DateTo ? `'${DateTo}'` : null,
            reqby: txt_ReqBy ? `'${txt_ReqBy}'` : null,
            approveby: null,
            type:
              SL_Letter != null && SL_Letter.length > 0
                ? `array[${SL_Letter.map((Letter) => `'${Letter}'`).join(",")}]`
                : null,
            status: ["LT0105"],
          })
          .then((res) => {
            if (res.data.length > 0) {
              console.log(res.data, "SearchLetter");
              setDataSearch(res.data);
            } else {
              Swal.fire({
                icon: "warning",
                title: "Not Found Data/ไม่พบข้อมูล",
              });
            }
          });
      } else {
        if (
          SL_Factory == null &&
          SL_Department == null &&
          txt_ReqBy == "" &&
          txt_ReqNoFrom == "" &&
          txt_ReqNoTo == "" &&
          SL_Letter == null &&
          DateTo == null &&
          DateFrom == null &&
          SL_Status == null
        ) {
          Swal.fire({
            icon: "warning",
            text: "Please fill in the information/กรุณากรอกข้อมูลเพื่อค้นหา",
          });
          hideLoading();
          return;
        }

        await axios
          .post("/api/RefferenceLetter/SearchLetter", {
            dept:
              SL_Department != null && SL_Department.length > 0
                ? `array[${SL_Department.map((dept) => `'${dept}'`).join(",")}]`
                : null,
            Fac: SL_Factory ? `'${SL_Factory}'` : null,
            reqfrom: txt_ReqNoFrom ? `'${txt_ReqNoFrom}'` : null,
            reqto: txt_ReqNoTo ? `'${txt_ReqNoTo}'` : null,
            datefrom: DateFrom ? `'${DateFrom}'` : null,
            dateto: DateTo ? `'${DateTo}'` : null,
            reqby: txt_ReqBy ? `'${txt_ReqBy}'` : null,
            approveby: null,
            type:
              SL_Letter != null && SL_Letter.length > 0
                ? `array[${SL_Letter.map((Letter) => `'${Letter}'`).join(",")}]`
                : null,
            status:
              Path == "HrActionReferenceLetter"
                ? Array.isArray(SL_Status) && SL_Status.length > 0
                  ? SL_Status
                  : ["LT0103", "LT0104"]
                : Path == "ReferenceLetterMasterList"
                ? Array.isArray(SL_Status) && SL_Status.length > 0
                  ? SL_Status
                  : [
                      "LT0101",
                      "LT0102",
                      "LT0103",
                      "LT0104",
                      "LT0105",
                      "LT0107",
                      "LT0109",
                      "LT0190",
                      "LT0108",
                    ]
                : [],
          })
          .then((res) => {
            if (res.data.length > 0) {
              setDataSearch(res.data);
            } else {
              Swal.fire({
                icon: "warning",
                title: "Not Found Data/ไม่พบข้อมูล",
              });
            }
          });
      }
      hideLoading();
    } catch (error) {
      Swal.fire({ icon: "warning", text: error });
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

  const bt_Reset = () => {
    setSL_Status(null);
    settxt_ReqNoFrom("");
    settxt_ReqNoTo("");
    setDateFrom(null);
    setDateTo(null);
    setDataSearch([]);
    setSL_Letter(null);
    settxt_ReqBy("");
    setSL_Department(null);
    if (Path != "HrActionReferenceLetter") {
      setSL_Factory(null);
    }
  };

  const handleOpenModal = () => {
    console.log(selectedRowKeys, "selectedRowKeys");
    if (selectedRowKeys.length <= 0) {
      Swal.fire({
        icon: "warning",
        text: "Please Select For Close/กรุณาเลือกข้อมูลที่ต้องการปิด",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleOpenModalReceive = (record) => {
    console.log(record, "handleOpenModalReceive");
    handleChange("allData", record);
    handleChange("Rd_Status", record.Hr_Status);
    handleChange("Sl_ConditonClose", record.Hr_Condition);
    handleChange("txt_HrBy", record.Hr_By);
    handleChange("txt_HrActionDate", record.Hr_Date);
    handleChange("Date_HrConfirm", record.Hr_Confirm);
    handleChange("txt_HrComment", record.Hr_Comment);
    handleChange("ReqNo", record.ReqNo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setDataModal({
      ReqNo: "",
      //Hr
      Rd_Status: "LT0107",
      Sl_ConditonClose: null,
      txt_HrBy: userlogin || "",
      txt_HrActionDate: DateToday,
      Date_HrConfirm: DateToday2,
      txt_HrComment: "",
      //Receive
      txt_ReceiveById: "",
      txt_ReceiveName: "",
      txt_UserLogin: "",
      txt_ReceiveJobGrade: "",
      txt_ReceiveDept: "",
      txt_ReceiveTel: "",
      txt_ReceiveEmail: "",
      Date_RecriveDate: DateToday2,
    });
    setSelectedRowKeys([]);
    setIsModalOpen(false);
  };

  const GetDataPerson = async (ID_Code) => {
    showLoading("");
    await axios
      .post("/api/RefferenceLetter/GetDataPersonByIDCode", {
        Id_Code: ID_Code || "",
      })
      .then((res) => {
        console.log(res.data, "GetDataPerson");
        if (res.data.length === 0) {
          handleChange("txt_ReceiveById", "");
          handleChange("txt_ReceiveName", "");
          handleChange("txt_ReceiveJobGrade", "");
          handleChange("txt_ReceiveDept", "");
          handleChange("txt_ReceiveEmail", "");
          handleChange("txt_UserLogin", "");
          Swal.fire({
            icon: "warning",
            text: "User not found/ไม่พบข้อมูลพนักงาน",
          });
        } else {
          handleChange("txt_ReceiveName", res.data[0].name_surname);
          handleChange("txt_ReceiveJobGrade", res.data[0].dept);
          handleChange("txt_ReceiveDept", res.data[0].jobgrade);
          handleChange("txt_ReceiveEmail", res.data[0].email);
          handleChange("txt_UserLogin", res.data[0].User);
        }
      });
    hideLoading();
  };

  const Bt_SubmitHr = async () => {
    try {
      if (DataModal.Rd_Status == "LT0108") {
        if (DataModal.Sl_ConditonClose == null) {
          Swal.fire({
            icon: "warning",
            text: "Please Select Condition For Close/โปรดเลือกเงื่อนไขในการปิด",
          });
          return;
        }
      }
      if (DataModal.Date_HrConfirm == null) {
        Swal.fire({
          icon: "warning",
          text: "Please Select HR confirm action date/โปรดเลือกวันที่ยืนยันการดำเนินการ",
        });
        return;
      }
      let status = "";
      if (DataModal.Rd_Status == "LT0108") {
        status = "LT0108";
      } else {
        status = "LT0105";
      }

      showLoading("กำลังบันทึก...");
      for (let i = 0; i < selectedRowKeys.length; i++) {
        let ReqNo = selectedRowKeys[i].ReqNo;
        console.log(selectedRowKeys, "ReqNo");
        await axios
          .post("/api/RefferenceLetter/UpdateHrStaff", {
            status: status,
            rd_status: DataModal.Rd_Status,
            sl_condition: DataModal.Sl_ConditonClose || "",
            hr_by: userlogin,
            date_confirm: `'${DataModal.Date_HrConfirm}'`,
            hr_comment: DataModal.txt_HrComment,
            ReqNo: ReqNo,
          })
          .then((res) => {
            console.log("UpdateHrStaff", res.data);
          });
        if (DataModal.Rd_Status == "LT0108") {
          await GetDatamailSend(selectedRowKeys[i]);
        }
      }

      hideLoading();
      Swal.fire({
        icon: "success",
        title: "Submit Success",
      }).then(() => {
        handleCloseModal();
        bt_Search();
      });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: error,
      });
      hideLoading();
    }
  };

  const Bt_SubmitReceive = async () => {
    try {
      if (DataModal.txt_ReceiveById == "") {
        Swal.fire({
          icon: "warning",
          text: "Please Input Receive By ID/กรุณากรอกรหัสพนักงาน",
        });
        return;
      }
      if (DataModal.txt_ReceiveTel == "") {
        Swal.fire({
          icon: "warning",
          text: "Please Input Receive Tel/กรุณากรอกเบอร์โทรศัพท์",
        });
        return;
      }
      if (DataModal.txt_ReceiveEmail == "") {
        Swal.fire({
          icon: "warning",
          text: "Please Input Receive Email/กรุณากรอกอีเมล",
        });
        return;
      }
      if (DataModal.Date_RecriveDate == null) {
        Swal.fire({
          icon: "warning",
          text: "Please Select Receive Date/โปรดเลือกวันที่รับเอกสาร",
        });
        return;
      }

      await axios
        .post("/api/RefferenceLetter/UpdateRecieve", {
          receive_by: DataModal.txt_UserLogin,
          receive_byID: DataModal.txt_ReceiveById,
          receive_tel: DataModal.txt_ReceiveTel,
          receive_email: DataModal.txt_ReceiveEmail,
          receive_date: `'${DataModal.Date_RecriveDate}'`,
          ReqNo: DataModal.ReqNo,
        })
        .then((res) => {
          console.log("UpdateRecieve", res.data);
        });
      hideLoading();
      Swal.fire({
        icon: "success",
        title: "Submit Success",
      }).then(async () => {
        handleCloseModal();
        await GetDatamailSend(DataModal.allData);
        bt_Search();
      });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: error,
      });
      hideLoading();
    }
  };

  const Bt_ResetHr = () => {
    setDataModal({
      Rd_Status: "LT0107",
      Sl_ConditonClose: null,
      Date_HrConfirm: DateToday2,
      txt_HrComment: "",
    });
  };

  const exportToExcel = async () => {
    if (dataSearch.length <= 0) {
      Swal.fire({
        icon: "warning",
        text: "No Data Export/ไม่มีข้อมูล Export!",
      });
      return;
    }
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("EmployeeCard");
    sheet.properties.defaultRowHeight = 20;

    // ตัดคอลัมน์แรกออก
    const columnMappings = columns.slice(1).map((col, idx) => ({
      header: col.title,
      key: col.dataIndex || `col${idx}`,
      style: { alignment: { horizontal: "center" } },
    }));

    sheet.columns = columnMappings;

    // กรณีไม่มีข้อมูล
    const data = dataSearch.length > 0 ? dataSearch : [{}];

    // เพิ่มข้อมูลลง sheet
    data.forEach((row, idx) => {
      const rowData = {};
      columnMappings.forEach((col) => {
        rowData[col.key] = row[col.key] ?? "";
      });
      sheet.addRow(rowData);
    });

    // Style header: ตัวหนา พื้นหลังสีฟ้า + เส้นตาราง
    const firstRow = sheet.getRow(1);
    firstRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4F9EDB" }, // สีฟ้า
      };
      cell.font = {
        name: "Roboto",
        size: 11,
        bold: true,
        color: { argb: "FFFFFF" }, // ตัวอักษรขาว
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // ใส่เส้นตารางให้ทุก cell
    sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // ปรับความกว้างอัตโนมัติ
    sheet.columns.forEach((column) => {
      let maxWidth = column.header ? String(column.header).length : 10;
      sheet.eachRow((row, rowNumber) => {
        const cellValue = String(row.getCell(column.key).value || "");
        maxWidth = Math.max(maxWidth, cellValue.length);
      });
      column.width = maxWidth + 2;
    });

    // สร้างไฟล์
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "Employee Card Request.xlsx");
  };

  const GetDatamailSend = async (Data) => {
    let strSubject = "";
    let Usermail = [];
    let Dear = "All Concern";
    let ReqNo = Data.ReqNo || "";
    // let Data;
    let Userlogin = "";
    let Sv_By = Data.Sv_By || "";
    if (Path === "ReferenceLetterReceive") {
      Userlogin = DataModal.txt_UserLogin;
      strSubject = `Letter Request : (${ReqNo}) Closed`;
    } else {
      Userlogin = userlogin;
      strSubject = `Letter Request : (${ReqNo}) Closed By Condition`;
      // return;
    }
    await axios
      .post("/api/Common/GetEmailUser", {
        user: Sv_By || "",
        formenu: "LETTER",
      })
      .then((res) => {
        console.log("GetEmailSend", res.data);
        if (res.data.length > 0) {
          Usermail = res.data;
        }
      });

    const fomathtml = await fomatmail(Dear, Data, Userlogin);
    console.log(fomathtml, "nnnnnnnnnn");
    Usermail.forEach((user) => {
      console.log(user.User, "GetEmailSend", user.Email);

      SendEmail(user.Email, strSubject, fomathtml);
    });
  };

  const SendEmail = async (Email, strSubject, fomathtml) => {
    console.log(Email, "SendEmail", strSubject, fomathtml);
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

  const fomatmail = async (Dear, Data, User) => {
    console.log(Data, "fomatmail");
    let TargetDate = Data.Target_Date;
    const formattedRemark = Data.ReqRemark.replace(/(.{60})/g, "$1<br>");
    const formattedComment = (DataModal.txt_HrComment || "").replace(
      /(.{60})/g,
      "$1<br>"
    );
    const name = Data.ReqBy.split(":")[1]?.trim() || "";
    let status = "";
    if (Path == "ReferenceLetterReceive") {
      status = "Closed";
    } else {
      status = "Closed By Condition";
    }
    let strEmailFormat = `
      <!DOCTYPE html>
        <html lang="en">
        
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #dddddd; background-color: #ffffff;">
        <!-- Header -->
        <tr>
        <td align="center" bgcolor="#5F99AE" style="padding: 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
                                HR Online System Notification
        </td>
        </tr>
        <!-- Content -->
        <tr>
        <td style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.5;">
        <p>Dear ${Dear} ,</p>
        <p>
                                  This Request creates as follow ${name}
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
        <td style="font-size: 14px; color: #333333; text-align: left;">HR Online >> Reference Letter</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">RequestNo.:</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          Data.ReqNo
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Factory :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          Data.Factory
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Department :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          Data.Dept
        }</td>
        </tr>

        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Target Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${TargetDate}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${name}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Request Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          Data.ReqDate
        }</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send By :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${name}</td>
        </tr>
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Send Date :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          Data.ReqDate
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
         ${
           Path != "ReferenceLetterReceive"
             ? `
        <tr>
        <td style="font-size: 14px; color: #555555; text-align: right; font-weight: bold;">Last Action Comment :</td>
        <td style="font-size: 14px; color: #333333; text-align: left;">${
          formattedComment || ""
        }</td>
        </tr>
        `
             : ""
         }
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
        <td align="center" bgcolor="#5F99AE" style="padding: 12px 25px; border-radius: 5px;">
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
        </html>
      `;
    return strEmailFormat;
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys.map((row) => row.ReqNo),
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRows); // เก็บทั้ง object array
    },
  };

  const columns = [
    {
      key: "actions",
      width: "90px",
      //minWidth: "6px",
      render: (_, record) => (
        <div>
          <Tooltip title="Approve">
            <img
              src={ImgApprove}
              onClick={() => handleEdit(record.ReqNo)}
              alt="Approve"
              style={{
                width: 28,
                height: 28,
                cursor: "pointer",
                display: Path == "ApproveReferenceLetter" ? "" : "none",
              }}
            />
          </Tooltip>
          <Tooltip title="Receive">
            <img
              src={ImgReceive}
              onClick={() => handleOpenModalReceive(record)}
              alt="Approve"
              style={{
                width: 28,
                height: 28,
                cursor: "pointer",
                display: Path == "ReferenceLetterReceive" ? "" : "none",
              }}
            />
          </Tooltip>
          <Tooltip title="View">
            <img
              src={ImgView}
              alt="View"
              onClick={() =>
                Path == "ReferenceLetterMasterList"
                  ? handleViewMasterList(record.ReqNo)
                  : handleEdit(record.ReqNo)
              }
              style={{
                width: 28,
                height: 28,
                marginLeft: 5,
                cursor: "pointer",
                display: Path == "ApproveReferenceLetter" ? "none" : "",
              }}
            />
          </Tooltip>
        </div>
      ),
    },

    {
      title: "Factory",
      width: "20px",
      dataIndex: "Factory",
      key: "Factory",
    },
    {
      title: "Dept.",
      width: "20px",
      dataIndex: "Dept",
      key: "Department",
    },
    {
      title: "Req No.",
      width: "190px",
      dataIndex: "ReqNo",
      key: "ReqNo",
    },
    {
      title: "Letter Type",
      width: "300px",
      dataIndex: "LetterType",
      key: "Letter Type",
      align: "left",
      className: "scrollable-columnLetter",
      render: (text, record, index) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Request By",
      dataIndex: "ReqBy",
      width: "100px",
      key: "Request By",
      align: "left",
      className: "scrollable-columnLetter",
      render: (text, record, index) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Tel",
      dataIndex: "Tel",
      width: "50px",
      key: "Request By",
      align: "center",
      // className: "scrollable-columnLetter",
      render: (text, record, index) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Request Date",
      dataIndex: "ReqDate",
      width: "100px",
      key: "Request Date",
      align: "center",
      render: (text, record, index) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "100px",
      align: "left",
      render: (text, record, index) => {
        if (
          record.Status_value == "LT0102" ||
          record.Status_value == "LT0103"
        ) {
          return <Tag color="warning">{text}</Tag>;
        } else if (
          record.Status_value == "LT0104" ||
          record.Status_value == "LT0105"
        ) {
          return <Tag color="processing">{text}</Tag>;
        } else if (record.Status_value == "LT0107") {
          return <Tag color="success">{text}</Tag>;
        } else if (
          record.Status_value == "LT0109" ||
          record.Status_value == "LT0190" ||
          record.Status_value == "LT0108"
        ) {
          return <Tag color="red">{text}</Tag>;
        } else {
          return <Tag>{text}</Tag>;
        }
      },
    },
    {
      title: "Last Action By",
      dataIndex: "LastBy",
      key: "Last Action By",
      width: "100px",
    },

    {
      title: "Last Action Date",
      dataIndex: "LastDate",
      key: "Last Action Date",
      width: "100px",
    },
  ];

  return {
    columns,
    Factory,
    Department,
    SL_Factory,
    SL_Department,
    setSL_Department,
    handleFactory,
    DateFrom,
    DateTo,
    txt_ReqNoFrom,
    txt_ReqNoTo,
    setDateFrom,
    setDateTo,
    settxt_ReqNoFrom,
    settxt_ReqNoTo,
    bt_Search,
    dataSearch,
    SL_Status,
    setSL_Status,
    Status,
    settxt_ReqBy,
    txt_ReqBy,
    Path,
    TitlePage,
    bt_Reset,
    LetterType,
    setSL_Letter,
    SL_Letter,
    rowSelection,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    Condition,
    userlogin,
    DateToday,
    DataModal,
    handleChange,
    Bt_SubmitHr,
    Bt_ResetHr,
    GetDataPerson,
    Bt_SubmitReceive,
    ROLL,
    exportToExcel,
  };
}

export { fn_SearchRefferenceLetter };
