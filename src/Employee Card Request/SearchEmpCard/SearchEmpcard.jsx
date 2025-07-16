import React from "react";
import { Form, Input, Button, Table, Select } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import "../EmpCard.css"; // เชื่อมโยงไฟล์ CSS
import ImgExcel from "../../assets/excel.png";
import { fn_SearchEmpcard } from "./fn_SearchEmpcard";

const SearchEmpCard = () => {
  const {
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
    ROLL,
  } = fn_SearchEmpcard();

  return (
    <div
      style={{
        padding: "0 20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "15px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div className="divTitleSearch">
        <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
          🔍 {TitlePage}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
          borderRadius: "15px",
          backgroundColor: "#FFFFFF",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <table style={{ width: "100%" }} className="SearchEmpcard">
          <tbody>
            <tr>
              <td style={{ textAlign: "right", width: "100px" }}>Factory :</td>
              <td style={{ width: "200px" }}>
                <Select
                  showSearch
                  disabled={Path == "HrActionEmployeeCard"}
                  value={SL_Factory}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Select Factory"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Factory}
                  onChange={handleFactory}
                />
              </td>
              <td style={{ textAlign: "right", width: "100px" }}>
                Department :
              </td>
              <td style={{ width: "200px" }}>
                <Select
                  mode="multiple"
                  showSearch
                  value={SL_Department}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Select Department"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Department}
                  onChange={setSL_Department}
                />
              </td>
              <td style={{ textAlign: "right", width: "100px" }}>Reason :</td>
              <td style={{ width: "200px" }}>
                <Select
                  showSearch
                  mode="multiple"
                  maxTagCount={"responsive"}
                  value={SL_Reason}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Select Status"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Reason}
                  onChange={setSL_Reason}
                />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}>Req No. :</td>
              <td>
                <Input
                  value={txt_ReqNoFrom}
                  style={{ width: "100%" }}
                  onChange={(e) => settxt_ReqNoFrom(e.target.value)}
                />
              </td>
              <td style={{ textAlign: "right" }}>To :</td>
              <td>
                <Input
                  value={txt_ReqNoTo}
                  style={{ width: "100%" }}
                  onChange={(e) => settxt_ReqNoTo(e.target.value)}
                />
              </td>
              <td style={{ textAlign: "right" }}>Status :</td>
              <td>
                <Select
                  showSearch
                  disabled={Path == "ApproveEmployeeCard"}
                  maxTagCount={"responsive"}
                  value={SL_Status}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Select Status"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Status}
                  onChange={setSL_Status}
                />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}>Request Date :</td>
              <td>
                <Input
                  value={DateFrom}
                  type="date"
                  style={{ width: "100%" }}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </td>
              <td style={{ textAlign: "right" }}>To :</td>
              <td>
                <Input
                  value={DateTo}
                  type="date"
                  style={{ width: "100%" }}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </td>
              <td style={{ textAlign: "right" }}>Request By Emp ID :</td>
              <td>
                <Input
                  value={txt_ReqBy}
                  style={{ width: "100%" }}
                  onChange={(e) => settxt_ReqBy(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td
                colSpan={6}
                style={{ textAlign: "center", paddingTop: "10px" }}
              >
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{ marginRight: "10px" }}
                  onClick={() => bt_Search()}
                >
                  Search
                </Button>
                <Button
                  type="primary"
                  danger
                  icon={<ReloadOutlined />}
                  onClick={() => bt_Reset()}
                >
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
          backgroundColor: "#FFFFFF",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "Flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button
            onClick={exportToExcel}
            style={{
              display: "flex",
              alignItems: "center",
              display: String(ROLL).split(",").includes("'248'")
                ? "Flex"
                : "none",
              gap: 6,
              background: "#4F9EDB",
              border: "none",
              fontWeight: 500,
            }}
            type="primary"
          >
            <img src={ImgExcel} alt="Export" style={{ width: "16px" }} />
            Export
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataSearch}
          bordered
          pagination={{ pageSize: 5 }}
          size="middle"
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default SearchEmpCard;
