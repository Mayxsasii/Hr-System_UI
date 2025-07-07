import React from "react";
import { Input, Button, DatePicker, Card, Row, Col } from "antd";
import "../RefferenceLetter.css";
import { fn_NewRefferenceLetter } from "../NewRefferenceLetter/fn_NewRefferenceLetter";
const Step1 = ({
  formData1,
  setFormData1,
  Disable,
  setDisable,
  setCurrent,
}) => {
  const { GetDataPerson } = fn_NewRefferenceLetter(
    formData1,
    setFormData1,
    Disable,
    setDisable,
    setCurrent
  );

  const handleChange = (field, value) => {
    setFormData1({ ...formData1, [field]: value });
  };

  return (
    <div>
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        New Reference Letter Request
        {formData1.txt_ReqNo ? (
          <>
            {" >>"} {formData1.txt_ReqNo}
          </>
        ) : (
          ""
        )}
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
              disabled
              onChange={(e) => handleChange("txt_ReqNo", e.target.value)}
            />
          </td>
          <td align="right">
            <label>Request Date:</label>
          </td>
          <td>
            <Input
              value={formData1.txt_ReqDate }
              disabled
              // value={formData1.txt_ReqNo}
              // onChange={(e) => handleChange("txt_ReqDate", e.target.value)}
            />
          </td>
          <td align="right">
            <label>Request Status:</label>
          </td>
          <td colSpan={3}>
            <Input
              value={formData1.txt_ReqStatusDesc}
              // style={{ width: "300px" }}
              disabled
              onChange={(e) =>
                handleChange("txt_ReqStatusDesc", e.target.value)
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
              value={formData1.txt_ReqbyID}
              disabled={formData1.txt_ReqStatusValue!='LT0101'}
              placeholder="กรุณากรอก ID Code"
              onChange={(e) => handleChange("txt_ReqbyID", e.target.value)}
              onBlur={(e) => GetDataPerson(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                  GetDataPerson(formData1.txt_ReqbyID);
                }
              }}
            />
          </td>
          <td colSpan={2}>
            <Input
              value={formData1.txt_ReqbyName}
              // onChange={(e) => handleChange("txt_ReqbyName", e.target.value)}
              // disabled={Disable}
              disabled
            />
          </td>
          <td align="right">
            <label>Factory :</label>
          </td>
          <td>
            <Input
              value={formData1.txt_Factory}
              style={{ width: "80px" }}
              // onChange={(e) => handleChange("txt_Factory", e.target.value)}
              disabled
            />
          </td>
          <td align="right">
            <label>Department:</label>
          </td>
          <td>
            <Input
              value={formData1.txt_Department}
              style={{ width: "80px" }}
              disabled
              // onChange={(e) => handleChange("txt_Dept", e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label>Employee type :</label>
          </td>
          <td colSpan={3}>
            {" "}
            <Input
              value={formData1.txt_EmpType}
              // onChange={(e) => handleChange("txt_ReqNo", e.target.value)}
              // disabled={Disable}
              disabled
            />
          </td>
          <td align="right">
            <label>Join Date :</label>
          </td>
          <td>
            <Input
              value={formData1.txt_JoinDate}
              // onChange={(e) => handleChange("txt_ReqNo", e.target.value)}
              // disabled={Disable}
              disabled
            />
          </td>
          <td align="right">
            <label>Job Grade :</label>
          </td>
          <td>
            <Input
              value={formData1.txt_JobGrade}
              style={{ width: "80px" }}
              // onChange={(e) =>
              //   handleChange("txt_ReqStatusValue", e.target.value)
              // }
              disabled
            />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label>Email :</label>
          </td>
          <td colSpan={3}>
            <Input
            disabled={formData1.txt_ReqStatusValue!='LT0101'}
              value={formData1.txt_Email}
              onChange={(e) => handleChange("txt_Email", e.target.value)}
            />
          </td>
          <td align="right" style={{ width: "170px" }}>
            <label>วันที่ต้องการ/Target Date :</label>
          </td>
          <td>
            <Input
            disabled={formData1.txt_ReqStatusValue!='LT0101'}
              type="date"
              style={{ width: "100%" }}
              value={formData1.Date_Target || ""}
              onChange={(e) => handleChange("Date_Target", e.target.value)}
              placeholder="กรุณาเลือกวันที่"
              min={new Date().toISOString().split("T")[0]} // กำหนดวันที่ขั้นต่ำเป็นวันนี้
            />
          </td>
          <td align="right">
            <label>เบอร์ติดต่อ/Tel :</label>
          </td>
          <td>
            <Input
            disabled={formData1.txt_ReqStatusValue!='LT0101'}
              // placeholder="เบอร์ภายใน/Tel :"
              value={formData1.txt_Tel}
              // style={{ width: "80px" }}
              onChange={(e) => handleChange("txt_Tel", e.target.value)}
            />
          </td>
        </tr>
      </table>
      {/* <div
        style={{
          textAlign: "center",
          display: formData1.txt_ReqNo == "" ? "" : "none",
        }}
      >
        <Button type="primary" onClick={() => GenReqNo()}>
          Gen Request No.
        </Button>
      </div> */}

      {/* </div> */}
    </div>
  );
};

export default Step1;
