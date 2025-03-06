import React from "react";
import {
  Checkbox,
  Input,
  Button,
  Select,
  Upload,
  Radio,
  DatePicker,
  Table,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import ImgExcel from '../../assets/excel.png';
const { Option } = Select;

const SearchManPower = (Page) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  return (
    <div
      style={{
        padding: "0 20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "15px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          borderRadius: "15px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          backgroundColor: "#FFB433",
          padding: "10px 0",
        }}
      >
        <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
          Man Power Request
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
          borderRadius: "15px",
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ textAlign: "right", padding: "4px" }}>Factory :</td>
              <td style={{ padding: "4px" }}>
                <Select style={{ width: "100%" }}>
                  <Option value="factory1">Factory 1</Option>
                  <Option value="factory2">Factory 2</Option>
                </Select>
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>
                Department :
              </td>
              <td style={{ padding: "4px" }}>
                <Select style={{ width: "100%" }}>
                  <Option value="department1">Department 1</Option>
                  <Option value="department2">Department 2</Option>
                </Select>
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>Position :</td>
              <td style={{ padding: "4px" }}>
                <Select style={{ width: "100%" }}>
                  <Option value="position1">Position 1</Option>
                  <Option value="position2">Position 2</Option>
                </Select>
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>Job grade:</td>
              <td style={{ padding: "4px" }}>
                <Select style={{ width: "100%" }}>
                  <Option value="grade1">Grade 1</Option>
                  <Option value="grade2">Grade 2</Option>
                </Select>
              </td>
            </tr>

            <tr>
            <td style={{ textAlign: "right", padding: "4px" }}>Req No.:</td>
              <td style={{ padding: "4px" }}>
                <Input style={{ width: "100%" }} />
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>To:</td>
              <td style={{ padding: "4px" }}>
                <Input style={{ width: "100%" }} />
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>
                Request Date:
              </td>
              <td style={{ padding: "4px" }}>
                <DatePicker style={{ width: "100%" }} />
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>To:</td>
              <td style={{ padding: "4px" }}>
                <DatePicker style={{ width: "100%" }} />
              </td>

            </tr>
            <tr>
              <td style={{ textAlign: "right", padding: "4px" }}>
                Request by:
              </td>
              <td style={{ padding: "4px" }}>
                <Select style={{ width: "100%" }}>
                  <Option value="requester1">Requester 1</Option>
                  <Option value="requester2">Requester 2</Option>
                </Select>
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>
                Request Status:
              </td>
              <td style={{ padding: "4px" }}>
                <Select style={{ width: "100%" }}>
                  <Option value="status1">Status 1</Option>
                  <Option value="status2">Status 2</Option>
                </Select>
              </td>
              <td colSpan={4}>
              <Button type="primary" icon={<SearchOutlined />} style={{ marginRight: '10px', marginLeft: '30px' }}>
                  Search
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ marginRight: "10px", backgroundColor: "#399918" }}
                  onClick={() =>
                    (window.location.href = "/HrSystem/NewManPowerRequest")
                  }
                >
                  New
                </Button>
                <Button type="primary" danger icon={<ReloadOutlined />}>
                  Reset
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "20px",
          borderRadius: "15px",
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
         <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
         <Button>
            <img src={ImgExcel} alt="Export" style={{ width: '16px' }} />
            Export
          </Button>
  </div>
         
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default SearchManPower;
