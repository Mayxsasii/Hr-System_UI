import React from "react";
import { Input, Button, Select, Radio } from "antd";
const { TextArea } = Input;
import { fn_HrActionRefferenceLetter } from "./fn_HrActionRefferenceLetter";
const Step3 = ({
  formData1,
  setFormData1,
  Disable,
  setDisable,
  setCurrent,
}) => {
  const {
    Condition,
    datauser,
    handleStatus,
    handleChange,
    GetDataPerson,
    Save,
    Reset,
  } = fn_HrActionRefferenceLetter(formData1, setFormData1);
  return (
    <div>
      {" "}
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        HR Staff Action
      </p>
      <table style={{ width: "100%" }}>
        <tr>
          <td align="right" style={{ width: "150px" }}>
            <label>Status :</label>
          </td>
          <td style={{ width: "360px" }}>
            <Radio.Group
              style={{ marginLeft: "5px" }}
              name="radiogroup"
              // defaultValue={"Approve"}
              value={formData1.Rd_HRStatus}
              onChange={(e) => {
                // handleChange("Radio_HrStatus", e.target.value);
                handleStatus(e);
              }}
              options={[
                {
                  value: "LT0104",
                  label: "On Process",
                },
                {
                  value: "LT0107",
                  label: "Close",
                },
                {
                  value: "LT0108",
                  label: "Close by condition",
                },
              ]}
            />
          </td>
          <td>
            {" "}
            <Select
              showSearch
              style={{
                width: "300px",
                display: formData1.Rd_HRStatus == "LT0108" ? "" : "none",
              }}
              placeholder="Please Select Condition"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={Condition}
              onChange={(value) => {
                handleChange("Sl_HrCondion", value);
              }}
            />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label>HR Staff :</label>
          </td>
          <td>
            {" "}
            <Input
              style={{ width: "300px" }}
              disabled
              value={formData1.txt_HrStaff || datauser.LOGIN}
            />
          </td>
          <td>
            <label>Action Date :</label>
            <Input
              disabled
              style={{
                width: "275px",
                marginLeft: "5px",
              }}
              value={formData1.txt_HrActionDate}
            />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label>HR confim action date :</label>
          </td>
          <td colSpan={2}>
            <Input
              type="date"
              style={{
                width: "300px",
              }}
              min={new Date().toISOString().split("T")[0]} // กำหนดวันที่ขั้นต่ำเป็น
              value={formData1.Date_HrConfirmAcDate}
              onChange={(e) =>
                handleChange("Date_HrConfirmAcDate", e.target.value)
              }
            />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label>Comment :</label>
          </td>
          <td colSpan={2}>
            <TextArea
              value={formData1.txt_HrComment}
              onChange={(e) => handleChange("txt_HrComment", e.target.value)}
              maxLength={2000}
            />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label>Receive By :</label>
          </td>
          <td colSpan={2}>
            <Input
              value={formData1.txt_RecriveById}
              onChange={(e) => handleChange("txt_RecriveById", e.target.value)}
              onBlur={(e) => GetDataPerson(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                  GetDataPerson(formData1.txt_RecriveById);
                }
              }}
              style={{ width: "100px" }}
            />{" "}
            <Input
              style={{ width: "400px" }}
              value={formData1.txt_RecriveByName}
              disabled
            />
            <label style={{ marginLeft: "40px", marginRight: "5px" }}>
              Job Grade :
            </label>
            <Input
              style={{ width: "70px" }}
              value={formData1.txt_RecriveByJobGrade}
              disabled
            />
            <label style={{ marginLeft: "50px", marginRight: "5px" }}>
              Department :
            </label>
            <Input
              style={{ width: "70px" }}
              value={formData1.txt_RecriveByDepartment}
              disabled
            />
          </td>
        </tr>
        <tr>
          <td align="right">
            <labe>Email :</labe>
          </td>
          <td colSpan={2}>
            <Input
              style={{ width: "505px" }}
              value={formData1.txt_RecriveByEmail}
              onChange={(e) =>
                handleChange("txt_RecriveByEmail", e.target.value)
              }
            />{" "}
            <label style={{ marginLeft: "80px", marginRight: "5px" }}>
              Tel :
            </label>
            <Input
              style={{ width: "120px" }}
              value={formData1.txt_RecriveByTel}
              onChange={(e) => handleChange("txt_RecriveByTel", e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label>Recrive Date :</label>
          </td>
          <td colSpan={2}>
            <Input
              type="date"
              style={{
                width: "300px",
              }}
              onChange={(e) => handleChange("Date_RecriveDate", e.target.value)}
              value={formData1.Date_RecriveDate}
              min={new Date().toISOString().split("T")[0]} // กำหนดวันที่ขั้นต่ำเป็น
            />
          </td>
        </tr>
      </table>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button variant="solid" color="orange" onClick={() => Save("SaveDarft")}>
          Save Draft
        </Button>{" "}
      
        <Button variant="solid" color="cyan" onClick={() => Save("Submit")}>
          Submit
        </Button>{" "}
      
          <Button variant="solid" color="danger" onClick={() => Reset()}>
          Reset
        </Button>{" "}
      </div>
    </div>
  );
};
export default Step3;
