import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Select,
  List,
  Divider,
  message,
} from "antd";
import {
  SearchOutlined,
  SaveOutlined,
  RollbackOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useLoading } from "../../loading/fn_loading";

const { Title } = Typography;
const { Option } = Select;

const RoleManager = () => {
  const { showLoading, hideLoading } = useLoading();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [topic, setTopic] = useState([]);
  const [factory, setFactory] = useState([]);
  const [department, setDepartment] = useState([]);
  const [level, setLevel] = useState([]);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const [employeeId, setEmployeeId] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const By = localStorage.getItem("username");

  useEffect(() => {
    GetTopic();
    GetFactory();
  }, []);

  const GetTopic = async () => {
    const res = await axios.post("/api/Master/GetTopicTransaction", {});
    setTopic(res.data);
  };

  const GetFactory = async () => {
    const res = await axios.post("/api/Master/GetAllFac", {});
    setFactory(res.data);
  };

  const GetDept = async (fac) => {
    setSelectedFactory(fac);
    setSelectedDept(null);
    const res = await axios.post("/api/Master/GetDeptFac", { Fac: fac });
    setDepartment(res.data);
  };

  const GetLevel = async (topic) => {
    setSelectedLevel(null);
    setSelectedTopic(topic);
    const res = await axios.post("/api/Master/GetLevelPerson", {
      Topic: topic,
    });
    setLevel(res.data);
  };

  const GetDataPerson = async (id) => {
    showLoading();
    const res = await axios.post("/api/Master/GetDataPerson", { Id_Code: id });
    if (res.data.length > 0) {
      const person = res.data[0];
      setUserLogin(person.Userlogin);
      setFullname(person.Name);
      setEmail(person.Email);
    } else {
      Swal.fire({ icon: "error", title: "Not Found User" });
      setEmployeeId("");
      setUserLogin("");
      setFullname("");
      setEmail("");
    }
    hideLoading();
  };

  const InsRole = async (Role) => {
    console.log("Role", Role);
    const res = await axios.post("/api/Master/InsRollOracle", {
      Role: Role,
      Userlogin: userLogin,
      By: By,
    });
    console.log(res.data, "InsRollOracle");
  };

  const InsDataPerson = async () => {
    const res = await axios.post("/api/Master/InsPersonMaster", {
      Userlogin: userLogin,
      By: By,
      Fac: selectedFactory,
      Topic: selectedTopic,
      Dept: selectedLevel == "HR STAFF" ? "ALL" : selectedDept,
      Level: selectedLevel,
      Email: email,
      Idcode: employeeId,
    });
    console.log(res.data, "InsPersonMaster");
  };

  const handleSearch = async () => {
    try {
      showLoading("กำลังค้นหา...");
      const res = await axios.post("/api/Master/GetAssignedRoles", {
        Search: searchText,
      });
      setSearchResults(res.data || []);
      hideLoading();
    } catch (err) {
      message.error("เกิดข้อผิดพลาดในการค้นหา");
      hideLoading();
    }
  };

  const handleSubmit = async () => {
    try {
      showLoading("กำลัง Submit");
      if (selectedTopic === "MASTER") {
        if (employeeId == "") {
          Swal.fire({ icon: "error", title: "กรุณากรอกรหัสพนักงาน" });
          hideLoading();
          return;
        } else {
          await InsRole("242");
        }
      } else {
        let Role = "";
        if (
          !selectedTopic ||
          !selectedFactory ||
          !selectedDept ||
          !selectedLevel ||
          employeeId.trim() === ""
        ) {
          Swal.fire({ icon: "error", title: "กรุณากรอกข้อมูลให้ครบถ้วน" });
          return;
        }

        if (selectedTopic === "MAN POWER") {
          if (selectedLevel === "ISSUE") {
            Role = "241";
          } else if (
            ["DEPT", "FMGM", "COO", "CEO", "HR MGR"].includes(selectedLevel)
          ) {
            Role = "243";
          } else {
            Role = "244";
          }
        } else if (selectedTopic === "LETTER") {
          if (selectedLevel === "SV") {
            Role = "245";
          } else if (selectedLevel === "HR STAFF") {
            Role = "246";
          }
        } else if (selectedTopic === "EMP CARD") {
          if (selectedLevel === "SV") {
            Role = "247";
          } else if (selectedLevel === "HR STAFF") {
            Role = "248";
          }
        }
        await InsDataPerson();
        await InsRole(Role);
      }
      await InsRole("159");
      handleClear();
      hideLoading();
      Swal.fire({ icon: "success", title: "Submit Success" });
    } catch (error) {
      Swal.fire({ icon: "error", title: error.message || "เกิดข้อผิดพลาด" });
      hideLoading();
    }
  };

  const handleClear = () => {
    setSelectedTopic(null);
    setSelectedFactory(null);
    setSelectedDept(null);
    setSelectedLevel(null);
    setEmployeeId("");
    setUserLogin("");
    setFullname("");
    setEmail("");
    setSearchResults([]);
    setSearchText("");
  };

  return (
    <Row justify="center" style={{ marginTop: 30 }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          bordered
          hoverable
          style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            🎛 จัดการสิทธิ์ผู้ใช้งาน (Manage Person Master)
          </Title>

          <Row gutter={8} style={{ marginBottom: 20 }}>
            <Col flex="auto">
              <Input
                placeholder=" Search (Transaction Topic / Factory / Department / Level)"
                prefix={"🔍"}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              />
            </Col>
          </Row>

          {searchResults.length > 0 && (
            <>
              <Divider orientation="left">📋 รายการที่ตรงกับคำค้นหา</Divider>
              <List
                bordered
                dataSource={searchResults}
                locale={{ emptyText: "ไม่พบรายการที่ตรงกับคำค้นหา" }}
                renderItem={(item) => (
                  <List.Item>
                    <UserOutlined style={{ marginRight: 8 }} />
                    <b>{item.employeeId}</b> - {item.role} [{item.system} /{" "}
                    {item.department}]{item.note ? ` – ${item.note}` : ""}
                  </List.Item>
                )}
                style={{ marginBottom: 24 }}
              />
            </>
          )}

          {/* -- เลือกข้อมูลผู้ใช้งานใหม่ -- */}
          <Row gutter={16}>
            <Col span={12}>
              <label>Transaction Topic</label>
              <Select
                value={selectedTopic}
                placeholder="-- Transaction Topic --"
                options={topic}
                style={{ width: "100%" }}
                onChange={GetLevel}
              />
            </Col>
            <Col span={12}>
              <label>Factory</label>
              <Select
                value={selectedFactory}
                disabled={selectedTopic === "MASTER"}
                placeholder="-- Factory --"
                options={factory}
                style={{ width: "100%" }}
                onChange={GetDept}
              />
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <label>Department</label>
              <Select
                value={selectedDept}
                disabled={selectedTopic === "MASTER"}
                placeholder="-- Department --"
                options={department}
                style={{ width: "100%" }}
                onChange={setSelectedDept}
              />
            </Col>
            <Col span={12}>
              <label>Level</label>
              <Select
                disabled={selectedTopic === "MASTER"}
                value={selectedLevel}
                placeholder="-- Level --"
                options={level}
                style={{ width: "100%" }}
                onChange={setSelectedLevel}
              />
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={5}>
              <label>Employee ID</label>
              <Input
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                onBlur={(e) => GetDataPerson(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.target.blur();
                    GetDataPerson(employeeId);
                  }
                }}
              />
            </Col>
            <Col span={8}>
              <label>User Login</label>
              <Input value={userLogin} disabled />
            </Col>
            <Col span={11}>
              <label>Name-Surname</label>
              <Input value={fullname} disabled />
            </Col>
          </Row>

          <Row style={{ marginTop: 16 }}>
            <Col span={24}>
              <label>Email</label>
              <Input value={email} disabled />
            </Col>
          </Row>

          <Row justify="space-between" style={{ marginTop: 24 }}>
            <Col>
              <Button onClick={handleClear} icon={<RollbackOutlined />}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={handleSubmit}
                icon={<SaveOutlined />}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default RoleManager;
