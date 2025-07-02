import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { useNavigate } from "react-router-dom";
import ImgViewFile from "../../assets/search.png";
import ImgApprove from "../../assets/approved.png";
import { Tag } from "antd";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

function fn_SearchEmpcard() {
  const navigate = useNavigate();
  const url = window.location.href;
  const Path = url.split("/").pop();
  const userlogin = localStorage.getItem("username");
  const ROLL = localStorage.getItem("ROLL");
  const { showLoading, hideLoading } = useLoading();

  const [Factory, setFactory] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Status, setStatus] = useState([]);
  const [Reason, setReason] = useState([]);
  // select
  const [SL_Factory, setSL_Factory] = useState(null);
  const [SL_Department, setSL_Department] = useState(null);
  const [SL_Status, setSL_Status] = useState(null);
  const [SL_Reason, setSL_Reason] = useState(null);

  const [txt_ReqNoFrom, settxt_ReqNoFrom] = useState("");
  const [txt_ReqNoTo, settxt_ReqNoTo] = useState("");
  const [txt_ReqBy, settxt_ReqBy] = useState("");
  const [DateFrom, setDateFrom] = useState(null);
  const [DateTo, setDateTo] = useState(null);

  const [TitlePage, setTitlePage] = useState("");

  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    GetFactory();
    Title();
    GetStatus();
    GetReason();
    if (Path == "ApproveEmployeeCard") {
      GetDepartment();
    }
    // // GetLetter();
  }, []);

  const Title = async () => {
    if (Path == "ApproveEmployeeCard") {
      setTitlePage("Approve Employee Card");
    } else if (Path == "HrActionEmployeeCard") {
      setTitlePage("Employee Card Request (HR Staff Action)");
    } else if (Path == "EmployeeCardMasterList") {
      setTitlePage("Employee Card Master List");
    }
  };

  //   const GetLetter = async () => {
  //     await axios
  //       .post("/api/RefferenceLetter/GetLetterTypeSearch", {
  //         User_login: userlogin || "",
  //       })
  //       .then((res) => {

  //         setLetterType(res.data);
  //       });
  //   };

  const GetFactory = async () => {
    await axios
      .post("/api/RefferenceLetter/GetFactoryLetter", {
        User_login: userlogin || "",
        Roll: ROLL || "",
      })
      .then((res) => {
        setFactory(res.data);
        if (Path == "HrActionEmployeeCard") {
          setSL_Factory(res.data[0].value);
          GetDeptFac(res.data[0].value);
        }
      });
  };

  const GetStatus = async () => {
    await axios
      .post("/api/EmployeeCard/GetStatusEmpcardSearch", {
        Status:
          Path == "ApproveEmployeeCard"
            ? ["A"]
            : Path == "HrActionEmployeeCard"
            ? ["H"]
            : Path == "EmployeeCardMasterList"
            ? ["C", "R", "H", "A", "D", "F"]
            : [],
      })
      .then((res) => {
        if (Path == "ApproveEmployeeCard") {
          setSL_Status(res.data[0].value);
        }
        setStatus(res.data);
      });
  };

  const GetDepartment = async () => {
    await axios
      .post("/api/EmployeeCard/GetDeptApproveCard", {
        User_login: userlogin || "",
      })
      .then((res) => {
        setDepartment(res.data);
      });
  };

  const GetReason = async () => {
    await axios.post("/api/EmployeeCard/GetReason", {}).then((res) => {
      setReason(res.data);
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
    if (Path != "ApproveEmployeeCard") {
      await GetDeptFac(value);
    }
  };

  const handleEdit = (record) => {
    navigate(`/HrSystem/NewEmployeeCard?ReqNo=${record.ReqNo}`);
  };

  const handleViewMasterList = (record) => {
    navigate(`/HrSystem/MasterListEmployeeCard?ReqNo=${record.ReqNo}`);
  };

  const bt_Search = async () => {
    try {
      showLoading("");

      if (Path != "ApproveEmployeeCard") {
        if (
          SL_Factory == null &&
          SL_Department == null &&
          SL_Reason == null &&
          SL_Status == null &&
          txt_ReqNoFrom == "" &&
          txt_ReqNoTo == "" &&
          txt_ReqBy == "" &&
          DateFrom == null &&
          DateTo == null
        ) {
          Swal.fire({
            icon: "warning",
            title: "Please fill in the information",
          });
          hideLoading();
          return;
        } else {
          await axios
            .post("/api/EmployeeCard/GetSearchRequestEmployeeCard", {
              factory: SL_Factory ? `'${SL_Factory}'` : null,
              req_no_from: txt_ReqNoFrom ? `'${txt_ReqNoFrom}'` : null,
              req_no_to: txt_ReqNoTo ? `'${txt_ReqNoTo}'` : null,
              req_date_from: DateFrom ? `'${DateFrom}'` : null,
              req_date_to: DateTo ? `'${DateTo}'` : null,
              req_by: txt_ReqBy ? `'${txt_ReqBy}'` : null,
              approveby: null,
              reason:
                SL_Reason != null && SL_Reason.length > 0
                  ? `array[${SL_Reason.map((reason) => `'${reason}'`).join(
                      ","
                    )}]`
                  : null,
              dept:
                SL_Department != null && SL_Department.length > 0
                  ? `array[${SL_Department.map((dept) => `'${dept}'`).join(
                      ","
                    )}]`
                  : null,
              status:
                Path == "HrActionEmployeeCard"
                  ? (Array.isArray(SL_Status) && SL_Status.length > 0) ||
                    SL_Status != null
                    ? [SL_Status]
                    : ["CD0103", "CD0104"]
                  : Path == "EmployeeCardMasterList"
                  ? (Array.isArray(SL_Status) && SL_Status.length > 0) ||
                    SL_Status != null
                    ? [SL_Status]
                    : [
                        "CD0101",
                        "CD0102",
                        "CD0103",
                        "CD0104",
                        "CD0107",
                        "CD0108",
                        "CD0109",
                        "CD0190",
                      ]
                  : [],
            })
            .then((res) => {
              if (res.data.length === 0) {
                Swal.fire({ icon: "warning", title: "Not Found Data!" });
                setDataSearch([]);
              } else {
                setDataSearch(res.data);
              }
            });
        }
        hideLoading();
      } else {
        await axios
          .post("/api/EmployeeCard/GetSearchRequestEmployeeCard", {
            factory: SL_Factory ? `'${SL_Factory}'` : null,
            req_no_from: txt_ReqNoFrom ? `'${txt_ReqNoFrom}'` : null,
            req_no_to: txt_ReqNoTo ? `'${txt_ReqNoTo}'` : null,
            req_date_from: DateFrom ? `'${DateFrom}'` : null,
            req_date_to: DateTo ? `'${DateTo}'` : null,
            req_by: txt_ReqBy ? `'${txt_ReqBy}'` : null,
            reason:
              SL_Reason != null && SL_Reason.length > 0
                ? `array[${SL_Reason.map((reason) => `'${reason}'`).join(",")}]`
                : null,
            dept:
              SL_Department != null && SL_Department.length > 0
                ? `array[${SL_Department.map((dept) => `'${dept}'`).join(",")}]`
                : null,
            status: ["CD0102"],
            approveby: userlogin ? `'${userlogin}'` : null,
          })
          .then((res) => {
            if (res.data.length === 0) {
              Swal.fire({ icon: "warning", title: "Not Found Data!" });
              setDataSearch([]);
            } else {
              setDataSearch(res.data);
            }
          });
        hideLoading();
      }
    } catch (error) {
      Swal.fire({ icon: "warning", title: error });
      hideLoading();
    }
  };

  const bt_Reset = () => {
    settxt_ReqNoFrom("");
    settxt_ReqNoTo("");
    setDateFrom(null);
    setDateTo(null);
    setDataSearch([]);
    setSL_Reason(null);
    settxt_ReqBy("");
    setSL_Department(null);
    if (Path != "HrActionEmployeeCard") {
      setSL_Factory(null);
    }
    if (Path != "ApproveEmployeeCard") {
      setSL_Status(null);
    }
  };

  const columns = [
    {
      key: "actions",
      width: "30px",
      align: "center",
      render: (_, record) => (
        <div>
          <img
            src={ImgApprove}
            onClick={() => handleEdit(record)}
            alt="Approve"
            style={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
              display:
                Path == "ApproveEmployeeCard" || Path == "HrActionEmployeeCard"
                  ? ""
                  : "none",
            }}
          />
          <img
            src={ImgViewFile}
            onClick={() => handleViewMasterList(record)}
            alt="View"
            style={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
              display: Path == "EmployeeCardMasterList" ? "" : "none",
            }}
          />
        </div>
      ),
    },

    {
      title: "Factory",
      width: "20px",
      align: "center",
      dataIndex: "Fac",
      key: "Factory",
    },
    {
      title: "Dept.",
      width: "20px",
      align: "center",
      dataIndex: "Dept",
      key: "Dept",
    },
    {
      title: "Req No.",
      width: "130px",
      align: "center",
      dataIndex: "ReqNo",
      key: "ReqNo",
    },
    {
      title: "สาเหตุ/Reason",
      width: "300px",
      dataIndex: "Reason",
      key: "Reason",
      className: "scrollable-columnLetter",
      render: (text, record, index) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "ผู้ขอ/Request By",
      dataIndex: "RequestBy",
      width: "230px",
      key: "Request By",
      className: "scrollable-columnLetter",
      render: (text, record, index) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Request Date",
      dataIndex: "ReqDate",
      key: "Request Date",
      width: "80px",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "ReqStatus",
      key: "Status",
      width: "100px",
      render: (text, record, index) => {
        if (record.status == "CD0102" || record.status == "CD0103") {
          return <Tag color="warning">{text}</Tag>;
        } else if (record.status == "CD0104") {
          return <Tag color="processing">{text}</Tag>;
        } else if (record.status == "CD0107" || record.status == "CD0108") {
          return <Tag color="success">{text}</Tag>;
        } else if (record.status == "CD0109" || record.status == "CD0190") {
          return <Tag color="red">{text}</Tag>;
        } else return <Tag color="default">{text}</Tag>;
      },
    },

    {
      title: "Last Action By",
      dataIndex: "LastActionBy",
      key: "Last Action By",
      width: "100px",
      className: "scrollable-columnLetter",
    },
    {
      title: "Last Action Date",
      dataIndex: "LastActionDate",
      key: "Last Action Date",
      width: "100px",
      align: "center",
    },
  ];

  const exportToExcel = async () => {
    if (dataSearch.length <= 0) {
       Swal.fire({
            icon: "warning",
            title: "No Data Export !",
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

  return {
    Factory,
    SL_Factory,
    handleFactory,
    Path,
    Department,
    SL_Department,
    setSL_Department,
    TitlePage,
    Status,
    setSL_Status,
    SL_Status,
    Reason,
    setSL_Reason,
    SL_Reason,
    txt_ReqNoFrom,
    settxt_ReqNoFrom,
    txt_ReqNoTo,
    settxt_ReqNoTo,
    DateFrom,
    setDateFrom,
    DateTo,
    setDateTo,
    txt_ReqBy,
    settxt_ReqBy,
    bt_Reset,
    bt_Search,
    columns,
    dataSearch,
    exportToExcel,
    ROLL
  };
}

export { fn_SearchEmpcard };
