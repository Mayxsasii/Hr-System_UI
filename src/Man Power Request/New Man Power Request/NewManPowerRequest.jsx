import React, { useState } from "react";
import {
  Button,
  Input,
  message,
  Steps,
  theme,
  Checkbox,
  Select,
  DatePicker,
} from "antd";
const { TextArea } = Input;
import { fn_NewManPowerRequset } from "./fn_NewManPowerRequset";

const Step1 = () => {
  const {
    Factory,
    Department,
    Position,
    setFactory,
    setDepartment,
    setPosition,
    setSL_Department,
    setSL_Factory,
    setSL_Position,
    datauser,
    handleFactory,
    GetDepartment,
    SL_Department,
    SL_Factory,
    SL_Position,
    DateToday,
    settxt_TelNo,
    txt_TelNo,
    Date_Target,
    setDate_Target,
    setEmployeeType,
    EmployeeType,
    SL_Employee,
    setSL_Employee,
    CB_EmpRequirment,
    setCB_EmpRequirment,
    handleEmpRequirment,
    settxt_EmpReq_Other,
    settxt_EmpType,
    txt_EmpType,
    txt_EmpReq_Other,
    txt_Remark,
    settxt_Remark,
  } = fn_NewManPowerRequset();

  return (
    <div>
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        New Man Power Request
      </p>
      <table style={{ marginTop: "10px", marginLeft: "10px" }}>
        <tr>
          <td style={{ textAlign: "right" }}>Factory :</td>
          <td>
            <Select
              showSearch
              value={SL_Factory}
              style={{
                width: "200px",
                // display: "block",
                marginLeft: "5px",
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
          <td style={{ textAlign: "right" }}>Request Status :</td>
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              value={"Create"}
              disabled
            />
          </td>
          <td style={{ textAlign: "right" }}>Request Date :</td>
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              value={DateToday}
              disabled
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Request No. :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "200px" }} />
          </td>
          <td style={{ textAlign: "right" }}>Request By :</td>
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              value={datauser.LOGIN}
            />
          </td>
          <td style={{ textAlign: "right" }}>Department:</td>
          <td>
            <Select
              showSearch
              value={SL_Department}
              style={{
                width: "200px",
                // display: "block",
                marginLeft: "5px",
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
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Email :</td>
          <td colSpan={3}>
            <Input
              value={datauser.EMAIL}
              style={{ marginLeft: "5px", width: "600px" }}
            />
          </td>
          <td style={{ textAlign: "right" }}>Tel :</td>
          {console.log(txt_TelNo, "tellll")}
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              value={txt_TelNo}
              onChange={(e) => settxt_TelNo(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Position Requirement :</td>
          <td>
            <Select
              showSearch
              value={SL_Position}
              style={{
                width: "200px",
                // display: "block",
                marginLeft: "5px",
              }}
              placeholder="Select Position Requirement"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={Position}
              onChange={setSL_Position}
            />
          </td>
          <td style={{ textAlign: "right" }}>Target Date :</td>
          <td>
            <DatePicker
              style={{ marginLeft: "5px", width: "200px" }}
              value={Date_Target}
              onChange={setDate_Target}
            />
          </td>
          <td style={{ textAlign: "right" }}>Total Request :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "60px" }} disabled />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Employee Requirment :</td>
          <td colSpan={5}>
            {" "}
            <Checkbox.Group
              style={{
                display: "flex",
                flexDirection: "column", // จัดเรียงในแนวตั้ง
                width: "100%",
              }}
              value={CB_EmpRequirment}
              onChange={handleEmpRequirment}
            >
              <Checkbox value="Internal">Internal</Checkbox>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox value="External">External</Checkbox>
                <p style={{ marginLeft: "30px", marginRight: "10px" }}>
                  Employee Type :
                </p>

                <Select
                  showSearch
                  value={SL_Employee}
                  style={{
                    width: "200px",
                    // display: "block",
                    marginLeft: "5px",
                  }}
                  placeholder="Select Empployee Type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={EmployeeType}
                  onChange={setSL_Employee}
                />
                <Input style={{ width: "450px" }} value={txt_EmpType} onChange={(e) => settxt_EmpType(e.target.value)}></Input>
              </div>

              <div>
                <Checkbox value="Other">Other</Checkbox>{" "}
                <Input style={{ width: "800px" }} value={txt_EmpReq_Other} onChange={(e) => settxt_EmpReq_Other(e.target.value)}></Input>
              </div>
            </Checkbox.Group>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Remark :</td>
          <td colSpan={5}>
            <TextArea
            value={txt_Remark}
            onChange={(e) => settxt_Remark(e.target.value)}
              style={{ width: "1000px", height: "100px" }}
              maxLength={2000}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};
export default Step1;
