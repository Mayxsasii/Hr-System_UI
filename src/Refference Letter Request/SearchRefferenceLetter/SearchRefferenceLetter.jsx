import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Input,
  Button,
  Select,
  DatePicker,
  Table,
  Modal,
  Radio,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
const { TextArea } = Input;
import ImgExcel from "../../assets/excel.png";
import ImgClose from "../../assets/approved (1).png";
import ImgView from "../../assets/search-list.png";
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
    ROLL,exportToExcel
    
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
                  disabled={Path == "HrActionReferenceLetter"}
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
              {/* align={{alignItems:Path=='ApproveReferenceLetter'?'':'center'}} */}
              <td colSpan={6}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{ marginRight: "10px", marginLeft: "15px" }}
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
            display: Path != "ApproveReferenceLetter" ? "flex" : "none",
            // border: "1px solid red",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <div style={{ width: "50%" }}>
            <Button
              style={{
                display: Path == "HrActionReferenceLetter" ? "flex" : "none",
                alignItems: "center",
                gap: 6,
                background: "rgb(188, 226, 187)",
                border: "1px solid rgb(186, 202, 192)",
                fontWeight: 500,
                color: "#333",
              }}
              onClick={handleOpenModal}
            >
              <img
                src={ImgClose}
                alt="Close"
                style={{ width: 24, marginRight: 2 }}
              />
              For Close
            </Button>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
            onClick={exportToExcel}
              type="primary"
              style={{
                display: "flex",
                alignItems: "center",
                display: String(ROLL).split(",").includes("'246'")
              ? "Flex"
              : "none",
                gap: 6,
                background: "#4F9EDB",
                border: "none",
                fontWeight: 500,
              }}
            >
              <img
                src={ImgExcel}
                alt="Export"
                style={{ width: 20, marginRight: 4 }}
              />
              Export
            </Button>
          </div>
        </div>
        <Table
          rowSelection={
            Path === "HrActionReferenceLetter"
              ? { type: "checkbox", ...rowSelection }
              : undefined
          }
          columns={columns}
          dataSource={dataSearch}
          bordered
          pagination={{ pageSize: 5 }}
          size="middle"
          // scroll={{ x: "max-content" }}
          className="tb_letter"
          rowKey="ReqNo"
        />
        <Modal
          width={800}
          open={isModalOpen}
          onCancel={handleCloseModal}
          onOk={handleCloseModal}
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>
                {Path === "ReferenceLetterReceive"
                  ? "Reference Letter Receive"
                  : "Hr Staff Action For Close"}
              </span>
              {/* <img
                src={ImgView}
                alt="View"
                // onClick={() => handleEdit(ReqNo)}
                style={{
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                  display: Path == "HrActionReferenceLetter" ? "none" : "",
                }}
              /> */}
            </div>
          }
          footer={null}
          maskClosable={false}
        >
          <div style={{ padding: 5 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <label
                style={{ width: 100, textAlign: "right", marginRight: 12 }}
              >
                Status :
              </label>
              <Radio.Group
                name="radiogroup"
                value={DataModal.Rd_Status}
                disabled={Path != "HrActionReferenceLetter"}
                onChange={(e) => {
                  handleChange("Rd_Status", e.target.value);
                  if (e.target.value == "LT0107") {
                    handleChange("Sl_ConditonClose", null);
                  }
                }}
                options={[
                  { value: "LT0107", label: "Close" },
                  { value: "LT0108", label: "Close by condition" },
                ]}
              />
              <Select
                showSearch
                disabled={
                  DataModal.Rd_Status != "LT0108" ||
                  Path != "HrActionReferenceLetter"
                }
                style={{
                  width: 360,
                  marginLeft: 0,
                }}
                placeholder="Please Select Condition"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={DataModal.Sl_ConditonClose}
                options={Condition}
                onChange={(value) => {
                  handleChange("Sl_ConditonClose", value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <label
                style={{ width: 100, textAlign: "right", marginRight: 12 }}
              >
                HR Staff :
              </label>
              <Input
                style={{ width: 220, marginRight: 16 }}
                disabled
                value={DataModal.txt_HrBy}
              />
              <label
                style={{ width: 100, textAlign: "right", marginRight: 12 }}
              >
                Action Date :
              </label>
              <Input
                disabled
                style={{ width: 230 }}
                value={DataModal.txt_HrActionDate}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <label
                style={{ width: 100, textAlign: "right", marginRight: 12 }}
              >
                HR confirm action date :
              </label>
              <Input
                type="date"
                style={{ width: 220 }}
                disabled={Path!= "HrActionReferenceLetter"}
                min={new Date().toISOString().split("T")[0]}
                value={DataModal.Date_HrConfirm}
                onChange={(e) => handleChange("Date_HrConfirm", e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <label
                style={{
                  width: 100,
                  textAlign: "right",
                  marginRight: 12,
                  marginTop: 4,
                }}
              >
                Comment :
              </label>
              <TextArea
                style={{ width: 580 }}
                maxLength={2000}
                rows={3}
                disabled={Path != "HrActionReferenceLetter"}
                value={DataModal.txt_HrComment}
                onChange={(e) => handleChange("txt_HrComment", e.target.value)}
              />
            </div>
            <div
              style={{
                display: Path == "HrActionReferenceLetter" ? "none" : "",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: 16,
                }}
              >
                <label
                  style={{
                    width: 100,
                    textAlign: "right",
                    marginRight: 12,
                    marginTop: 4,
                  }}
                >
                  Receive By ID :
                </label>
                <Input
                  value={DataModal.txt_ReceiveById}
                  onChange={(e) =>
                    handleChange("txt_ReceiveById", e.target.value)
                  }
                  onBlur={(e) => GetDataPerson(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.target.blur();
                      GetDataPerson(DataModal.txt_ReceiveById);
                    }
                  }}
                  style={{ width: "100px" }}
                />{" "}
                <Input
                  style={{ width: "400px", marginLeft: "10px" }}
                  value={DataModal.txt_ReceiveName}
                  disabled
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <label
                  style={{
                    width: 100,
                    textAlign: "right",
                    marginRight: 12,
                    marginTop: 4,
                  }}
                >
                  Job Grade :
                </label>
                <Input
                  style={{ width: "100px" }}
                  value={DataModal.txt_ReceiveJobGrade}
                  disabled
                />
                <label style={{ marginLeft: "10px" }}>Department :</label>
                <Input
                  style={{ width: "100px", marginLeft: "10px" }}
                  value={DataModal.txt_ReceiveDept}
                  disabled
                />
                <label style={{ marginLeft: "10px" }}>Tel :</label>
                <Input
                  style={{ width: "120px", marginLeft: "10px" }}
                  value={DataModal.txt_ReceiveTel}
                  onChange={(e) =>
                    handleChange("txt_ReceiveTel", e.target.value)
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: 16,
                }}
              >
                <label
                  style={{
                    width: 100,
                    textAlign: "right",
                    marginRight: 12,
                    marginTop: 4,
                  }}
                >
                  E-mail :
                </label>
                <Input
                  style={{ width: "300px" }}
                  value={DataModal.txt_ReceiveEmail}
                  onChange={(e) =>
                    handleChange("txt_ReceiveEmail", e.target.value)
                  }
                />
                <label
                  style={{
                    width: 90,
                    textAlign: "right",
                    marginRight: 10,
                    marginTop: 4,
                  }}
                >
                  Receive Date :
                </label>
                <Input
                  type="date"
                  style={{
                    width: "180px",
                  }}
                  value={DataModal.Date_RecriveDate}
                  onChange={(e) =>
                    handleChange("Date_RecriveDate", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]} // กำหนดวันที่ขั้นต่ำเป็น
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <Button
                type="primary"
                onClick={
                  Path == "ReferenceLetterReceive"
                    ? Bt_SubmitReceive
                    : Bt_SubmitHr
                }
              >
                Submit
              </Button>
              <Button onClick={Bt_ResetHr}> Reset</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SearchManPower;
