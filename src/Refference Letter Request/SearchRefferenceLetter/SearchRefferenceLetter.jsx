 import React from "react";
import { Checkbox, Input, Button, Select, DatePicker, Table } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ImgExcel from "../../assets/excel.png";
import { fn_SearchRefferenceLetter } from "./fn_SearchRefferenceLetter.jsx";

const SearchManPower = () => {
  const {
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
    SL_Letter
  } = fn_SearchRefferenceLetter();

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
          color: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          backgroundColor: "#8E7DBE",
          padding: "10px 0",
        }}
      >
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
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <table style={{ width: "100%" }} className="SearchLetter">
          <tbody>
            <tr>
              <td style={{ textAlign: "right" }}>โรงงาน/Factory :</td>
              <td style={{ width: "220px" }}>
                <Select
                  showSearch
                  disabled={Path=='HrActionRefferenceLetter'}
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
              <td style={{ textAlign: "right" }}>แผนก/Department :</td>
              <td style={{ width: "250px" }}>
                <Select
                  showSearch
                  mode="multiple"
                  maxTagCount={"responsive"}
                  value={SL_Department}
                  style={{
                    width: "100%",
                    // display: "block",
                    // marginTop: "5px",
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

              <td style={{ textAlign: "right" }}>เลขที่/Req No. :</td>
              <td style={{}}>
                <Input
                  value={txt_ReqNoFrom}
                  style={{ width: "100%" }}
                  onChange={(e) => settxt_ReqNoFrom(e.target.value)}
                />
              </td>
              <td style={{ textAlign: "right" }}>To :</td>
              <td style={{}}>
                <Input
                  value={txt_ReqNoTo}
                  style={{ width: "100%" }}
                  onChange={(e) => settxt_ReqNoTo(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "right" }}>Request by ID :</td>
              <td style={{}}>
                <Input
                  value={txt_ReqBy}
                  onChange={(e) => settxt_ReqBy(e.target.value)}
                  style={{ width: "100%" }}
                />
              </td>
              <td style={{ textAlign: "right" }}>ประเภท/Letter Type :</td>
              <td>
                <Select
                  showSearch
                  mode="multiple"
                  maxTagCount={"responsive"}
                  value={SL_Letter}
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
                  options={LetterType}
                  onChange={setSL_Letter}
                />
              </td>
              <td style={{ textAlign: "right" }}>วันที่ขอ/Request Date :</td>
              <td style={{}}>
                {/* <DatePicker value={DateFrom} style={{ width: "100%" }}   onChange={setDateFrom}/> */}
                <Input
                  type="date"
                  style={{ width: "100%" }}
                  value={DateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </td>
              <td style={{ textAlign: "right" }}>To :</td>
              <td style={{}}>
     
                <Input
                  type="date"
                  style={{ width: "100%" }}
                  value={DateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </td>
            </tr>
            <tr>
            <td style={{ textAlign: "right" }}>สถานะ/Request Status :</td>
              <td style={{}}>
               
              <Select
                  showSearch
                  mode="multiple"
                  maxTagCount={"responsive"}
                  value={SL_Status}
                  style={{
                    width: "100%",
                    // display: "block",
                    // marginTop: "5px",
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
              {/* align={{alignItems:Path=='ApproveRefferenceLetter'?'':'center'}} */}
              <td colSpan={6}  >
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{ marginRight: "10px",marginLeft:'15px'}}
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
          // scroll={{ x: "max-content" }}
          className="tb_letter"
        />
      </div>
    </div>
  );
};

export default SearchManPower;
