import React from "react";
import { Input, Button, DatePicker, Card, Row, Col } from "antd";
import "../RefferenceLetter.css";
const Step1 = ({
  formData1,
  setFormData1,
  Disable,
  setDisable,
  setCurrent,
}) => {
  const handleChange = (field, value) => {
    setFormData1({ ...formData1, [field]: value });
  };

  return (
    <div>
      {/* <label
        style={
          {
            // textAlign: "center",
            // marginBottom: "30px",
            // fontSize: "24px",
            // fontWeight: "bold",
            // color: "#1890ff",
          }
        }
      >
        New Refference Letter Request
      </label> */}
        <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
         New Refference Letter Request
        {/* {formData1.txt_ReqNo ? (
          <>
            {">>"} {formData1.txt_ReqNo}
          </>
        ) : (
          ""
        )} */}
      </p>
      {/* <div style={{ display: "flex", alignItems: "center", gap: "10px" }}> */}
      <table className="reference-table">
        <tr>
          <td align="right">
            {" "}
            <label>Request No.:</label>
          </td>
          <td>
            {" "}
            <Input
              value={formData1.txt_ReqNo}
              onChange={(e) => handleChange("txt_ReqNo", e.target.value)}
            />
          </td>
          <td align="right">
            <label>Request Date:</label>
          </td>
          <td>
          <Input
              value={formData1.txt_ReqNo}
              onChange={(e) => handleChange("txt_ReqNo", e.target.value)}
            />
           
          </td>
          <td align="right">
            <label>Request Status:</label>
          </td>
          <td colSpan={3}>
            <Input
              value={formData1.txt_ReqStatusValue}
              onChange={(e) =>
                handleChange("txt_ReqStatusValue", e.target.value)
              }
            />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label>ผู้ขอ/Requested By:</label>
          </td>
          <td>
            <Input
              value={formData1.txt_Reqby}
              onChange={(e) => handleChange("txt_Reqby", e.target.value)}
            />
          </td>
          <td colSpan={2}>
            <Input
              value={formData1.txt_ReqbyName}
              onChange={(e) => handleChange("txt_ReqbyName", e.target.value)}
              disabled={Disable}
            />
          </td>
          <td align="right">
            <label>Factory :</label>
          </td>
            <td>
            <Input
              value={formData1.txt_Factory}
              style={{ width: "80px" }}
              onChange={(e) => handleChange("txt_Factory", e.target.value)}
            />
            </td>
            <td align="right">
            <label >Department:</label>
            </td>
            <td>
            <Input
              value={formData1.txt_Dept}
              style={{ width: "80px" }}
              onChange={(e) => handleChange("txt_Dept", e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td align="right"> 
           
            <label>Employee type :</label>
          </td>
          <td>
            {" "}
            <Input
              value={formData1.txt_ReqNo}
              onChange={(e) => handleChange("txt_ReqNo", e.target.value)}
              disabled={Disable}
            />
          </td>
          <td align="right">
            <label>Join Date :</label>
          </td>
          <td>
          <Input
              value={formData1.txt_ReqNo}
              onChange={(e) => handleChange("txt_ReqNo", e.target.value)}
              disabled={Disable}
            />
          </td>
          <td align="right">
            <label>Job Grade :</label>
          </td>
          <td>
            <Input
              value={formData1.txt_ReqStatusValue}
              style={{ width: "80px" }}
              onChange={(e) =>
                handleChange("txt_ReqStatusValue", e.target.value)
              }
            />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label>Email :</label>
          </td>
          <td colSpan={3}>
            <Input
              value={formData1.txt_Reqby}
              onChange={(e) => handleChange("txt_Reqby", e.target.value)}
            />
          </td>
          <td align="right">
            <label>วันที่ต้องการ/Target Date :</label>
          </td>
          <td>
          <DatePicker
              style={{ width: "100%" }}
              value={formData1.txt_ReqDate}
              onChange={(date, dateString) =>
                handleChange("txt_ReqDate", dateString)
              }
            />
          </td>
          <td align="right">
            <label>เบอร์ภายใน/Tel :</label>
          </td>
          <td>
          <Input
              placeholder="Requested By"
              value={formData1.txt_Reqby}
              style={{ width: "80px" }}
              onChange={(e) => handleChange("txt_Reqby", e.target.value)}
              disabled={Disable}
            />
          </td>

        </tr>
      </table>

      {/* </div> */}
    </div>
  );
};

export default Step1;
