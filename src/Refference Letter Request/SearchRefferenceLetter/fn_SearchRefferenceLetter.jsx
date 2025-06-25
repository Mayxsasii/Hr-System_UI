import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../loading/fn_loading";
import { useNavigate } from "react-router-dom";
import ImgViewFile from "../../assets/search.png";
import ImgApprove from "../../assets/approved.png";
import { Tag } from "antd";
import Swal from "sweetalert2";

function fn_SearchRefferenceLetter() {
  const navigate = useNavigate();
  const url = window.location.href;
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

  useEffect(() => {
    GetFactory();
    GetStatus();
    if (Path == "ApproveRefferenceLetter") {
      GetDepartment();
    }
    GetLetter();
    Title();
  }, []);

  const Title = async () => {
    if (Path == "ApproveRefferenceLetter") {
      setTitlePage("Approve Refference Letter");
    } else if (Path == "HrActionRefferenceLetter") {
      setTitlePage("Refference Letter Request (HR Staff Action)");
    } else if (Path == "RefferenceLetterMasterList") {
      setTitlePage("Refference Letter Master List");
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
        if (Path == "HrActionRefferenceLetter") {
          setSL_Factory(res.data[0].value);
          GetDeptFac(res.data[0].value);
        }
      });
  };

  const GetStatus = async () => {
    await axios
      .post("/api/RefferenceLetter/GetStatusSearch", {
        type:
          Path == "ApproveRefferenceLetter"
            ? ["A"]
            : Path == "HrActionRefferenceLetter"
            ? ["H"]
            : Path == "RefferenceLetterMasterList"
            ? ["C", "R", "H", "A", "D", "F"]
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
    if (Path != "ApproveRefferenceLetter") {
      await GetDeptFac(value);
    }
  };

  const handleEdit = (record) => {
    navigate(`/HrSystem/NewRefferenceLetter?ReqNo=${record.ReqNo}`);
  };

  const handleViewMasterList = (record) => {
    navigate(`/HrSystem/ViewRefferenceLetterList?ReqNo=${record.ReqNo}`);
  };

  const bt_Search = async () => {
    try {
      setDataSearch([]);
      showLoading("กำลังค้นหา...");
      if (Path == "ApproveRefferenceLetter") {
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
            setDataSearch(res.data);
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
            title: "Please fill in the information",
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
              Path == "HrActionRefferenceLetter"
                ? Array.isArray(SL_Status) && SL_Status.length > 0
                  ? SL_Status
                  : ["LT0103", "LT0104"]
                : Path == "RefferenceLetterMasterList"
                ? Array.isArray(SL_Status) && SL_Status.length > 0
                  ? SL_Status
                  : [
                      "LT0101",
                      "LT0102",
                      "LT0103",
                      "LT0104",
                      "LT0107",
                      "LT0109",
                      "LT0190",
                      "LT0108",
                    ]
                : [],
          })
          .then((res) => {
            setDataSearch(res.data);
          });
      }
      hideLoading();
    } catch (error) {
      Swal.fire({ icon: "warning", title: error });
      hideLoading();
    }
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
    if (Path != "HrActionRefferenceLetter") {
      setSL_Factory(null);
    }
  };

  const columns = [
    {
      key: "actions",
      width: "60px",
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
                Path == "ApproveRefferenceLetter" ||
                Path == "HrActionRefferenceLetter"
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
              display: Path == "RefferenceLetterMasterList" ? "" : "none",
            }}
          />
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
      width: "130px",
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
      width: "200px",
      key: "Request By",
      align: "center",
      className: "scrollable-columnLetter",
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
        } else if (record.Status_value == "LT0104") {
          return <Tag color="processing">{text}</Tag>;
        } else if (
          record.Status_value == "LT0107" ||
          record.Status_value == "LT0108"
        ) {
          return <Tag color="success">{text}</Tag>;
        } else if (
          record.Status_value == "LT0109" ||
          record.Status_value == "LT0190"
        ) {
          return <Tag color="red">{text}</Tag>;
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
  };
}

export { fn_SearchRefferenceLetter };
