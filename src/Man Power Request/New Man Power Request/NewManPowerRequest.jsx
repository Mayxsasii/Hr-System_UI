import React, { useState } from "react";
import { Button, Input, message, Steps, theme, Checkbox, Select,DatePicker } from "antd";
const { TextArea } = Input;

const Step1 = () => (
  <div>
    <p
      style={{ fontSize: "18px", margin: "0 10px 10px 0", fontWeight: "bold" }}
    >
      New Man Power Request
    </p>
    <table style={{ marginTop: "10px", marginLeft: "10px" }}>
      <tr>
        <td style={{ textAlign: "right" }}>Factory :</td>
        <td>
          <Input style={{ marginLeft: "5px", width: "200px" }} />
        </td>
        <td style={{ textAlign: "right" }}>Request Status :</td>
        <td>
          <Input style={{ marginLeft: "5px", width: "200px" }} />
        </td>
        <td style={{ textAlign: "right" }}>Request Date :</td>
        <td>
          <Input style={{ marginLeft: "5px", width: "200px" }} />
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }}>Request No. :</td>
        <td>
          <Input style={{ marginLeft: "5px", width: "200px" }} />
        </td>
        <td style={{ textAlign: "right" }}>Request By :</td>
        <td>
          <Input style={{ marginLeft: "5px", width: "200px" }} />
        </td>
        <td style={{ textAlign: "right" }}>Department:</td>
        <td>
          <Input style={{ marginLeft: "5px", width: "200px" }} />
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }}>Email :</td>
        <td colSpan={3}>
          <Input style={{ marginLeft: "5px", width: "510px" }} />
        </td>
        <td style={{ textAlign: "right" }}>Tel :</td>
        <td>
          <Input style={{ marginLeft: "5px", width: "200px" }} />
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }}>Position Requirement :</td>
        <td>
          <Select style={{ marginLeft: "5px", width: "200px" }} />
        </td>
        <td style={{ textAlign: "right" }}>Target Date :</td>
        <td>
          <DatePicker style={{ marginLeft: "5px", width: "200px" }} />
        </td>
        <td style={{ textAlign: "right" }}>Total Request :</td>
        <td>
          <Input style={{ marginLeft: "5px", width: "60px" }} />
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
          >
            <Checkbox value="A">Internal</Checkbox>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox value="B">External</Checkbox>
              <p style={{ marginLeft: "30px", marginRight: "10px" }}>
                Employee Type :
              </p>
              <Select style={{ width: "200px" }}></Select>
              <Input style={{ width: "450px" }}></Input>
            </div>

            <div>
              <Checkbox value="C">Other</Checkbox>{" "}
              <Input style={{ width: "800px" }}></Input>
            </div>
          </Checkbox.Group>
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }}>Remark :</td>
        <td colSpan={5}>
          <TextArea
            style={{ width: "1000px", height: "100px" }}
            maxLength={2000}
          />
        </td>
      </tr>
    </table>
  </div>
);

export default Step1;
