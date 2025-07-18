import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useLoading } from "../../loading/fn_loading";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space, FloatButton, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import ImgViewFile from "../../assets/search.png";
import ImgEdit from "../../assets/edit.png";
import ImgApprove from "../../assets/approved.png";
import ImgDelete from "../../assets/trash.png";
import { fn_Header } from "../../Header/fn_Header";
import Swal from "sweetalert2";

function fn_SearchManPowerRequst() {
  const navigate = useNavigate();
  const url = window.location.href;
  const Path = url.split("/").pop();
  const userlogin = localStorage.getItem("username");
  const { showLoading, hideLoading } = useLoading();
  const { datauser } = fn_Header();

  const [Factory, setFactory] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Position, setPosition] = useState([]);
  const [JobGrade, setJobGrade] = useState([]);
  const [Status, setStatus] = useState([]);
  // select
  const [SL_Factory, setSL_Factory] = useState(null);
  const [SL_Department, setSL_Department] = useState(null);
  const [SL_Position, setSL_Position] = useState(null);
  const [SL_JobGrade, setSL_JobGrade] = useState(null);
  const [SL_Status, setSL_Status] = useState(null);

  //txt
  const [txt_ReqNoFrom, settxt_ReqNoFrom] = useState("");
  const [txt_ReqNoTo, settxt_ReqNoTo] = useState("");
  const [txt_ReqBy, settxt_ReqBy] = useState("");
  const [DateFrom, setDateFrom] = useState("");
  const [DateTo, setDateTo] = useState("");
  const [isHR, setIsHR] = useState(false);
  const [TitlePage, setTitlePage] = useState(userlogin);

  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    GetDepartment();
    CheckHR();
    GetFactory();
    GetStatus();
    Title();
    if (Path == "ManPowerRequest") {
      settxt_ReqBy(userlogin);
    }
  }, []);

  const Title = async () => {
    if (Path == "ManPowerRequest") {
      setTitlePage("Man Power Request");
    } else if (Path == "ApproveManPower") {
      setTitlePage("Approve Man Power");
    } else if (Path == "HrActionManPowerRequest") {
      setTitlePage("Man Power Request (HR Staff Action)");
    } else if (Path == "ManPowerMasterList") {
      setTitlePage("Man Power Master List");
    }
  };

  const GetDepartmentFac = async (Fac) => {
    await axios
      .post("/api/RequestManPower/GetDepartmentMasterList", {
        Fac: Fac || "",
      })
      .then((res) => {
        console.log(res.data, "GetDepartmentMasterList");
        // setFactory(res.data);
        setDepartment(res.data);
      });
  };

  const GetFactory = async () => {
    console.log(userlogin, "userlogin");
    if (Path == "ManPowerRequest") {
      await axios
        .post("/api/RequestManPower/GetFactoryIssue", {
          User_login: userlogin || "",
        })
        .then((res) => {
          console.log(res.data, "GetFactoryIssue");
          setFactory(res.data);
        });
    } else {
      await axios
        .post("/api/RequestManPower/GetFactory", {
          User_login: userlogin || "",
        })
        .then(async (res) => {
          console.log(res.data, "GetFactory");
          setFactory(res.data);
          if ((await CheckHR()).length > 0 && Path == "ManPowerMasterList") {
            setSL_Factory(res.data[0].value);
            GetDepartmentFac(res.data[0].value);
            GetDepartmentFac(res.data[0].value);
            GetPosition(res.data[0].value);
          }
          if (Path == "HrActionManPowerRequest") {
            setSL_Factory(res.data[0].value);
            GetDepartmentFac(res.data[0].value);
            GetPosition(res.data[0].value);
          }
        });
    }
  };

  const GetStatus = async () => {
    await axios
      .post("/api/RequestManPower/GetStatusSearch", {
        type:
          Path == "ManPowerRequest"
            ? ["C", "R"]
            : Path == "ApproveManPower"
            ? ["A"]
            : Path == "HrActionManPowerRequest"
            ? ["H"]
            : Path == "ManPowerMasterList"
            ? ["C", "R", "H", "A", "D", "F"]
            : [],
      })
      .then((res) => {
        console.log(res.data, "GetStatus");
        setStatus(res.data);
      });
  };

  const GetDepartment = async () => {
    if (Path == "ManPowerRequest") {
      await axios
        .post("/api/RequestManPower/GetDepartmentIssue", {
          User_login: userlogin || "",
        })
        .then((res) => {
          console.log(res.data, "GetDepartmentIssue");
          setDepartment(res.data);
        });
    } else {
      await axios
        .post("/api/RequestManPower/GetDepartment", {
          User_login: userlogin || "",
        })
        .then(async (res) => {
          console.log(res.data, "GetFactGetDepartmentory");
          setDepartment(res.data);
          let dataHR = await CheckHR();
          console.log("mmmmmm", dataHR.length);
          if ((await CheckHR()).length <= 0 && Path == "ManPowerMasterList") {
            setSL_Department([res.data[0].value]);
          }
        });
    }
  };

  const GetPosition = async (Fac) => {
    await axios
      .post("/api/RequestManPower/GetPosition", {
        DDLFactory: Fac || "",
      })
      .then((res) => {
        console.log(res.data, "GetPosition");
        setPosition(res.data);
      });
  };

  const CheckHR = async () => {
    let data = [];
    await axios
      .post("/api/RequestManPower/CheckHR", {
        User_login: userlogin || "",
      })
      .then((res) => {
        console.log(res.data, "CheckHR");
        data = res.data;
        if (res.data.length > 0) {
          setIsHR(true);
        }
        // setJobGrade(res.data);
      });
    return data;
  };

  const GetJobGrade = async (position) => {
    await axios
      .post("/api/RequestManPower/GetJobGrade", {
        DDLFactory: SL_Factory || "",
        DDLPosition:
          `${position.map((position) => `'${position}'`).join(",")}` || "",
      })
      .then((res) => {
        console.log(res.data, "GetJobGrade");
        setJobGrade(res.data);
      });
  };

  const handleFactory = async (value) => {
    setSL_Factory(value);
    GetPosition(value);
    // const dataHR =await CheckHR()
    if (Path == "ManPowerMasterList" && (await CheckHR()).length > 0) {
      GetDepartmentFac(value);
    }
  };

  const handlePosition = (value) => {
    setSL_Position(value);
    GetJobGrade(value);
    console.log("Selected factory:", value);
  };

  const handleEdit = (record) => {
    console.log("Edit record:", record.ReqNo);

    navigate(`/HrSystem/NewManPowerRequest?ReqNo=${record.ReqNo}`);
  };

  const handleViewMasterList = (record) => {
    console.log("Edit record:", record.ReqNo);
    navigate(
      `/HrSystem/ManPowerMasterList/ManPowerRequest?ReqNo=${record.ReqNo}`
    );
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete Req No. ${record.ReqNo}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .post("/api/RequestManPower/Update_DeleteStatus", {
            User: userlogin || "",
            ReqNo: record.ReqNo || "",
          })
          .then((res) => {
            console.log(res.data, "GetJobGrade");
            setJobGrade(res.data);
          });
        Swal.fire({
          title: "Deleted success!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            bt_Search();
          }
        });
      }
    });
  };

  const bt_New = async () => {
    showLoading("");
    window.location.href = "/HrSystem/NewManPowerRequest";
  };

  const bt_Search = async () => {
    try {
      setDataSearch([]);
      console.log("Searchhhh", SL_Department);
      if (Path == "ApproveManPower") {
        const factoryValues = Factory.map((item) => item.value);
        console.log(factoryValues, "factoryValues");
        console.log(
          SL_Factory != null ? "ValueFac" : factoryValues,
          "SL_Factory"
        );
        await axios
          .post("/api/RequestManPower/SearchManPowerApprove", {
            UserApprove: userlogin || "",
            Department:
              SL_Department != null && SL_Department.length > 0
                ? `array[${SL_Department.map((dept) => `'${dept}'`).join(",")}]`
                : null,
            Factory: SL_Factory != null ? [SL_Factory] : factoryValues,
            JobGrade:
              SL_JobGrade != null && SL_JobGrade.length > 0
                ? `array[${SL_JobGrade.map((dept) => `'${dept}'`).join(",")}]`
                : null,
            Position:
              SL_Position != null && SL_Position.length > 0
                ? `array[${SL_Position.map((dept) => `'${dept}'`).join(",")}]`
                : null,
            ReqNoFrom: txt_ReqNoFrom || "",
            ReqNoTo: txt_ReqNoTo || "",
            DateFrom: DateFrom || "",
            DateTo: DateTo || "",
            ReqBy: txt_ReqBy || "",
            Status:
              Path == "ManPowerRequest"
                ? Array.isArray(SL_Status) && SL_Status.length > 0
                  ? SL_Status
                  : ["MR0101", "MR0129", "MR0139", "MR0149"]
                : Path == "ApproveManPower"
                ? Array.isArray(SL_Status) && SL_Status.length > 0
                  ? SL_Status
                  : ["MR0102", "MR0103", "MR0104", "MR0109", "MR0110"]
                : Path == "HrActionManPowerRequest"
                ? Array.isArray(SL_Status) && SL_Status.length > 0
                  ? SL_Status
                  : ["MR0105", "MR0106"]
                : Path == "ManPowerMasterList"
                ? Array.isArray(SL_Status) && SL_Status.length > 0
                  ? SL_Status
                  : [
                      "MR0101",
                      "MR0102",
                      "MR0103",
                      "MR0104",
                      "MR0105",
                      "MR0129",
                      "MR0139",
                      "MR0149",
                      "MR0106",
                      "MR0107",
                      "MR0190",
                      "MR0108",
                    ]
                : [],
          })
          .then((res) => {
            if (res.data.length == 0) {
              Swal.fire({ icon: "warning", title: "Not Found Data!" });
            } else {
              console.log(res.data, "SearchManPower");
              setDataSearch(res.data);
            }
          });
      } else {
        if (
          DateFrom == "" &&
          DateTo == "" &&
          SL_Department == null &&
          SL_Factory == null &&
          SL_JobGrade == null &&
          SL_Position == null &&
          txt_ReqNoFrom == "" &&
          txt_ReqNoTo == "" &&
          SL_Status == null
        ) {
          Swal.fire({
            icon: "warning",
            title: "Please fill in the information",
          });
        } else {
          showLoading("กำลังค้นหาข้อมูล...");

          await axios
            .post("/api/RequestManPower/SearchManPower", {
              Department:
                SL_Department != null && SL_Department.length > 0
                  ? `array[${SL_Department.map((dept) => `'${dept}'`).join(
                      ","
                    )}]`
                  : null,
              Factory: SL_Factory || null,
              JobGrade:
                SL_JobGrade != null && SL_JobGrade.length > 0
                  ? `array[${SL_JobGrade.map((dept) => `'${dept}'`).join(",")}]`
                  : null,
              Position:
                SL_Position != null && SL_Position.length > 0
                  ? `array[${SL_Position.map((dept) => `'${dept}'`).join(",")}]`
                  : null,
              ReqNoFrom: txt_ReqNoFrom || "",
              ReqNoTo: txt_ReqNoTo || "",
              DateFrom: DateFrom || "",
              DateTo: DateTo || "",
              ReqBy: txt_ReqBy || "",
              Status:
                Path == "ManPowerRequest"
                  ? Array.isArray(SL_Status) && SL_Status.length > 0
                    ? SL_Status
                    : ["MR0101", "MR0129", "MR0139", "MR0149"]
                  : Path == "ApproveManPower"
                  ? Array.isArray(SL_Status) && SL_Status.length > 0
                    ? SL_Status
                    : ["MR0102", "MR0103", "MR0103"]
                  : Path == "HrActionManPowerRequest"
                  ? Array.isArray(SL_Status) && SL_Status.length > 0
                    ? SL_Status
                    : ["MR0105", "MR0106"]
                  : Path == "ManPowerMasterList"
                  ? Array.isArray(SL_Status) && SL_Status.length > 0
                    ? SL_Status
                    : [
                        "MR0101",
                        "MR0102",
                        "MR0103",
                        "MR0104",
                        "MR0105",
                        "MR0129",
                        "MR0139",
                        "MR0149",
                        "MR0106",
                        "MR0107",
                        "MR0190",
                        "MR0108",
                      ]
                  : [],
            })
            .then((res) => {
              if (res.data.length == 0) {
                Swal.fire({ icon: "warning", title: "Not Found Data!" });
              } else {
                console.log(res.data, "SearchManPower");
                setDataSearch(res.data);
              }
            });
        }
      }
      hideLoading();
    } catch (error) {
      Swal.fire({ icon: "warning", title: error });
      hideLoading();
    }
  };

  const bt_Reset = async () => {
    setSL_Position(null);
    setSL_JobGrade(null);
    setSL_Status(null);
    settxt_ReqNoFrom("");
    settxt_ReqNoTo("");
    setDateFrom("");
    setDateTo("");
    if (Path != "ManPowerRequest") {
      settxt_ReqBy("");
    }
    if (Path == "ManPowerMasterList") {
      if ((await CheckHR()).length <= 0) {
        setSL_Factory(null);
      } else {
        setSL_Department(null);
      }
    }
    if (Path == "HrActionManPowerRequest") {
      setSL_Department(null);
    }
    if (Path != "HrActionManPowerRequest" && Path != "ManPowerMasterList") {
      setSL_Factory(null);
      setSL_Department(null);
    }

    setDataSearch([]);
  };

  const columns = [
    {
      key: "actions",
      width: "91px",
      render: (_, record) => (
        <div>
          {console.log(record, "record")}
          <img
            src={ImgApprove}
            onClick={() => handleEdit(record)}
            alt="Approve"
            style={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
              display:
                Path == "ApproveManPower" || Path == "HrActionManPowerRequest"
                  ? ""
                  : "none",
            }}
          />
          <img
            src={ImgEdit}
            onClick={() => handleEdit(record)}
            alt="Edit"
            style={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
              display: Path == "ManPowerRequest" ? "" : "none",
            }}
          />
          <img
            src={ImgDelete}
            onClick={() => handleDelete(record)}
            alt="Delete"
            style={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
              display:
                Path == "ManPowerRequest" && record.Status == "Create"
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
              display: Path == "ManPowerMasterList" ? "" : "none",
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
      dataIndex: "Department",
      key: "Department",
    },
    {
      title: "Req No.",
      width: "160px",
      dataIndex: "ReqNo",
      key: "ReqNo",
    },
    {
      title: "Position",
      width: "160px",
      dataIndex: "Position",
      key: "Position",
    },
    {
      title: "Job  Grade",
      dataIndex: "Job_Grade",
      width: "20px",
      key: "Job_Grade",
      render: (text, record, index) => {
        return <div className="scrollable-column">{text}</div>;
      },
      align: "center",
      width: 150,
    },
    {
      title: "Request By",
      dataIndex: "CreateBy",
      key: "CreateBy",
    },
    {
      title: "Request Date",
      dataIndex: "CreateDate",
      key: "CreateDate",
    },
    {
      title: "Status",
      width: "180px",
      dataIndex: "Status",
      key: "Status",
      align: "center",
      render: (text, record, index) => {
        if (
          record.Status_value == "MR0101" ||
          record.Status_value == "MR0106"
        ) {
          return <Tag color="processing">{text}</Tag>;
        } else if (
          record.Status_value == "MR0102" ||
          record.Status_value == "MR0103" ||
          record.Status_value == "MR0104" ||
          record.Status_value == "MR0105"
        ) {
          return <Tag color="warning">{text}</Tag>;
        } else if (
          record.Status_value == "MR0129" ||
          record.Status_value == "MR0139" ||
          record.Status_value == "MR0149" ||
          record.Status_value == "MR0190"
        ) {
          return <Tag color="error">{text}</Tag>;
        } else if (
          record.Status_value == "MR0107" ||
          record.Status_value == "MR0108" ||
          record.Status_value == "LT0108"
        ) {
          return <Tag color="success">{text}</Tag>;
        }
      },
    },
    {
      title: "Last Action By",
      dataIndex: "LastBy",
      key: "LastBy",
    },
    {
      title: "Last Action Date",
      dataIndex: "Lastdate",
      key: "Lastdate",
    },
  ];

  return {
    columns,
    Factory,
    bt_New,
    Department,
    Position,
    JobGrade,
    SL_Factory,
    SL_Department,
    SL_Position,
    SL_JobGrade,
    setSL_Factory,
    setSL_Department,
    setSL_Position,
    setSL_JobGrade,
    GetPosition,
    GetJobGrade,
    handleFactory,
    handlePosition,
    datauser,
    DateFrom,
    DateTo,
    txt_ReqNoFrom,
    txt_ReqNoTo,
    setDateFrom,
    setDateTo,
    settxt_ReqNoFrom,
    settxt_ReqNoTo,
    GetFactory,
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
    isHR,
  };
}

export { fn_SearchManPowerRequst };
