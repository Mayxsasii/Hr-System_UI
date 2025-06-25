import React, { useState } from "react";
import {
  Input,
  Button,
  Table,
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
} from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import "../SafetyShoes.css";

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const factories = ["Factory A", "Factory B", "Factory C"];
const departments = ["HR", "Production", "QA", "Warehouse"];
const statuses = ["Pending", "Approved", "Rejected"];

const requests = [
  {
    id: 1,
    factory: 'Factory A',
    department: 'HR',
    reqNo: 'REQ001',
    reqDate: '2024-06-01',
    reqBy: 'John Doe',
    reason: 'New staff',
    status: 'Pending',
  },
  {
    id: 2,
    factory: 'Factory B',
    department: 'Production',
    reqNo: 'REQ002',
    reqDate: '2024-06-02',
    reqBy: 'Jane Smith',
    reason: 'Replacement',
    status: 'Approved',
  },
  {
    id: 3,
    factory: 'Factory C',
    department: 'QA',
    reqNo: 'REQ003',
    reqDate: '2024-06-03',
    reqBy: 'Alice Brown',
    reason: 'Lost',
    status: 'Rejected',
  },
];

const statusColors = {
  Pending: "#fde68a",
  Approved: "#bbf7d0",
  Rejected: "#fecaca",
};

const columns = [
  { title: "Request No.", dataIndex: "reqNo", key: "reqNo", width: 100 },
  { title: "Factory", dataIndex: "factory", key: "factory", width: 120 },
  { title: "Dept.", dataIndex: "department", key: "department", width: 120 },
  { title: "Request Date", dataIndex: "reqDate", key: "reqDate", width: 120 },
  { title: "Request By", dataIndex: "reqBy", key: "reqBy", width: 120 },
  { title: "Rason", dataIndex: "reason", key: "reason", width: 150 },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (status) => (
      <span
        style={{
          background: statusColors[status],
          color: "#334155",
          borderRadius: 16,
          padding: "4px 12px",
          fontWeight: 500,
          fontSize: 13,
        }}
      >
        {status}
      </span>
    ),
  },
];

const SearchSafetyShoesRequest = () => {
  const [factory, setFactory] = useState();
  const [department, setDepartment] = useState();
  const [reqNoFrom, setReqNoFrom] = useState("");
  const [reqNoTo, setReqNoTo] = useState("");
  const [reqDate, setReqDate] = useState([]);
  const [reqBy, setReqBy] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState();
  const [results, setResults] = useState(requests);

  const handleSearch = () => {
    let filtered = requests;
    if (factory) filtered = filtered.filter((r) => r.factory === factory);
    if (department) filtered = filtered.filter((r) => r.department === department);
    if (reqNoFrom) filtered = filtered.filter((r) => r.reqNo >= reqNoFrom);
    if (reqNoTo) filtered = filtered.filter((r) => r.reqNo <= reqNoTo);
    if (reqDate.length === 2) {
      const [from, to] = reqDate;
      filtered = filtered.filter(
        (r) =>
          (!from || r.reqDate >= from.format("YYYY-MM-DD")) &&
          (!to || r.reqDate <= to.format("YYYY-MM-DD"))
      );
    }
    if (reqBy) filtered = filtered.filter((r) => r.reqBy.toLowerCase().includes(reqBy.toLowerCase()));
    if (reason) filtered = filtered.filter((r) => r.reason.toLowerCase().includes(reason.toLowerCase()));
    if (status) filtered = filtered.filter((r) => r.status === status);

    setResults(filtered);
  };

  const handleReset = () => {
    setFactory();
    setDepartment();
    setReqNoFrom("");
    setReqNoTo("");
    setReqDate([]);
    setReqBy("");
    setReason("");
    setStatus();
    setResults(requests);
  };
//🥾
  return (
    <div className="containerSaftyShoes">
      <Title level={3} className="titleSaftyShoes">
       🔍 Safety Shoes Request
      </Title> 

      <div className="filter-card-SaftyShoes">
        <Row gutter={16} style={{ marginBottom: 12 }}>
          <Col span={4}>
            <label>Factory</label>
            <Select
              allowClear
              placeholder="เลือกโรงงาน"
              size="large"
              value={factory}
              onChange={setFactory}
              style={{ width: "100%" }}
            >
              {factories.map((f) => (
                <Option key={f} value={f}>{f}</Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <label>Department</label>
            <Select
              allowClear
              placeholder="เลือกแผนก"
              size="large"
              value={department}
              onChange={setDepartment}
              style={{ width: "100%" }}
            >
              {departments.map((d) => (
                <Option key={d} value={d}>{d}</Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <label>Req No.</label>
            <Input
              placeholder="REQ001"
              size="large"
              value={reqNoFrom}
              onChange={(e) => setReqNoFrom(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <label>เลขที่คำขอถึง</label>
            <Input
              placeholder="REQ999"
              size="large"
              value={reqNoTo}
              onChange={(e) => setReqNoTo(e.target.value)}
            />
          </Col>
          <Col span={8}>
            <label>Request Date (From - To)</label>
            <RangePicker
              format="YYYY-MM-DD"
              size="large"
              value={reqDate}
              onChange={setReqDate}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={4}>
            <label>Request By</label>
            <Input
              placeholder="ชื่อผู้ขอ"
              size="large"
              value={reqBy}
              onChange={(e) => setReqBy(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <label>Reason</label>
            <Input
              placeholder="เหตุผล"
              size="large"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <label>Request Status</label>
            <Select
              allowClear
              placeholder="เลือกสถานะ"
              size="large"
              value={status}
              onChange={setStatus}
              style={{ width: "100%" }}
            >
              {statuses.map((s) => (
                <Option key={s} value={s}>{s}</Option>
              ))}
            </Select>
          </Col>
          <Col span={10} className="button-group-SaftyShoes">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="large"
              className="search-button-SaftyShoes"
              onClick={handleSearch}
            >
              ค้นหา
            </Button>
            <Button
              onClick={handleReset}
              icon={<ReloadOutlined />}
              size="large"
              className="reset-button-SaftyShoes"
            >
              ล้างค่า
            </Button>
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={results.map((item) => ({ ...item, key: item.id }))}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
        bordered={false}
        className="TbSaftyShoes"
        rowClassName={() => "custom-row"}
      />
    </div>
  );
};

export default SearchSafetyShoesRequest;
