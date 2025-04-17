import React from "react";
import { Checkbox, Input, Button, Select, DatePicker, Table } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ImgExcel from "../../assets/excel.png";
import { fn_SearchManPowerRequst } from "./fn_SearchManPowerRequst.jsx";
const { Option } = Select;

const SearchManPower = () => {
  const {
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
    bt_Search,
    dataSearch,
    SL_Status,
    setSL_Status,
    Status,
    settxt_ReqBy,
    txt_ReqBy,
    Path
  } = fn_SearchManPowerRequst();

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

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          backgroundColor: "#FFB433",
          padding: "10px 0",
        }}
      >
        <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
          <SearchOutlined style={{ marginRight: "8px" }} />
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
                <Select
                  showSearch
                  value={SL_Factory}
                  style={{
                    display: "block",
                    marginTop: "5px",
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
              <td style={{ textAlign: "right", padding: "4px" }}>
                Department :
              </td>
              <td style={{ padding: "4px" }}>
                <Select
                  showSearch
                  mode="multiple"
                  maxTagCount={"responsive"}
                  value={SL_Department}
                  style={{
                    display: "block",
                    marginTop: "5px",
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
              {/* {console.log('Selected factory:', SL_Department)} */}
              <td style={{ textAlign: "right", padding: "4px" }}>Position :</td>
              <td style={{ padding: "4px" }}>
                <Select
                  showSearch
                  mode="multiple"
                  maxTagCount={"responsive"}
                  value={SL_Position}
                  style={{
                    //
                    display: "block",
                    marginTop: "5px",
                  }}
                  placeholder="Select Position"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Position}
                  onChange={handlePosition}
                />
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>Job grade:</td>
              <td style={{ padding: "4px" }}>
                <Select
                  showSearch
                  mode="multiple"
                  maxTagCount={"responsive"}
                  value={SL_JobGrade}
                  style={{
                    display: "block",
                    marginTop: "5px",
                  }}
                  placeholder="Select Department"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={JobGrade}
                  onChange={setSL_JobGrade}
                />
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "right", padding: "4px" }}>Req No.:</td>
              <td style={{ padding: "4px" }}>
                <Input
                  value={txt_ReqNoFrom}
                  style={{ width: "100%" }}
                  onChange={(e) => settxt_ReqNoFrom(e.target.value)}
                />
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>To:</td>
              <td style={{ padding: "4px" }}>
                <Input
                  value={txt_ReqNoTo}
                  style={{ width: "100%" }}
                  onChange={(e) => settxt_ReqNoTo(e.target.value)}
                />
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>
                Request Date:
              </td>
              <td style={{ padding: "4px" }}>
                {/* <DatePicker value={DateFrom} style={{ width: "100%" }}   onChange={setDateFrom}/> */}
                <Input
                  type="date"
                  style={{ width: "100%" }}
                  value={DateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>To:</td>
              <td style={{ padding: "4px" }}>
                {/* <DatePicker value={DateTo} style={{ width: "100%" }}  onChange={setDateTo}/> */}
                <Input
                  type="date"
                  style={{ width: "100%" }}
                  value={DateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "right", padding: "4px" }}>
                Request by:
              </td>
              <td style={{ padding: "4px" }}>
                <Input
                  value={txt_ReqBy}
                  onChange={(e) => settxt_ReqBy(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={Path == "ManPowerRequest" ? true : false} 
                />
              </td>
              <td style={{ textAlign: "right", padding: "4px" }}>
                Request Status:
              </td>
              <td style={{ padding: "4px" }}>
              <Select
                  showSearch
                  mode="multiple"
                  maxTagCount={"responsive"}
                  value={SL_Status}
                  style={{
                    display: "block",
                    marginTop: "5px",
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
              <td colSpan={4}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{ marginRight: "10px", marginLeft: "30px" }}
                  onClick={() => bt_Search()}
                >
                  Search
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ marginRight: "10px", backgroundColor: "#399918" }}
                  onClick={() => bt_New()}
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button>
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
          scroll={{ x: "max-content" }}
          className="tableSerachAnalysis"
        />
      </div>
    </div>
  );
};

export default SearchManPower;
