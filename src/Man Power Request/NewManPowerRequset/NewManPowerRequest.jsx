import React from "react";
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
import moment from "moment";
import { fn_NewManPowerRequset } from "./fn_NewManPowerRequset";

const Step1 = ({ formData1, setFormData1,Disable,setDisable }) => {
  const {
    Factory,
    Department,
    Position,
    datauser,
    DateToday,
    handleEmpRequirment,
    EmployeeType,
    GetPosition,
    handleChange,
    GetRunningNo,
  } = fn_NewManPowerRequset(formData1, setFormData1);

  return (
    <div>
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        New Man Power Request{" "}
        {formData1.txt_ReqNo ? (
          <>
            {">>"} {formData1.txt_ReqNo}
          </>
        ) : (
          ""
        )}
      </p>
      <table style={{ marginTop: "10px", marginLeft: "10px" }}>
        <tr>
          <td style={{ textAlign: "right" }}>Factory :</td>
          <td>
            <Select
              disabled={Disable.SL_Factory}
              showSearch
              value={formData1.SL_Factory}
              style={{
                width: "200px",
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
              onChange={(value) => {
                handleChange("SL_Factory", value);
                GetPosition(value);
              }}
            />
          </td>
          <td style={{ textAlign: "right" }}>Request Status :</td>
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              value={formData1.txt_ReqStatus}
              disabled
            />
          </td>
          <td style={{ textAlign: "right" }}>Request Date :</td>
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              value={formData1.txt_ReqDate}
              disabled
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Request No. :</td>
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              value={formData1.txt_ReqNo}
              disabled
            />
          </td>
          <td style={{ textAlign: "right" }}>Request By :</td>
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              disabled
              value={formData1.txt_ReqBy || datauser.LOGIN}
            />
          </td>
          <td style={{ textAlign: "right" }}>Department:</td>
          <td>
            <Select
            disabled={Disable.SL_Department}
              showSearch
              value={formData1.SL_Department}
              style={{
                width: "200px",
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
              onChange={(value) => handleChange("SL_Department", value)}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Email :</td>
          <td colSpan={3}>
            <Input
              value={formData1.txt_Email}
              // disabled={formData1.ID_Status != "MR0101" ? true : false}
              disabled={Disable.txt_Email}
              style={{ marginLeft: "5px", width: "600px" }}
              onChange={(e) => handleChange("txt_Email", e.target.value)}
            />
          </td>
          <td style={{ textAlign: "right" }}>Tel :</td>
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              value={formData1.txt_TelNo}
              // disabled={formData1.ID_Status != "MR0101" ? true : false}
              disabled={Disable.txt_TelNo}
              onChange={(e) => handleChange("txt_TelNo", e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Position Requirement :</td>
          <td>
            <Select
              // disabled={formData1.txt_ReqNo != "" ? true : false}
              disabled={Disable.SL_Position}
              showSearch
              value={formData1.SL_Position}
              style={{
                width: "200px",
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
              onChange={(value) => {
                handleChange("SL_Position", value);
              }}
            />
          </td>
          <td style={{ textAlign: "right" }}>Target Date :</td>
          <td>
            <DatePicker
            //  disabled={formData1.ID_Status != "MR0101" ? true : false}
            disabled={Disable.Date_Target}
            style={{ marginLeft: "5px", width: "200px" }}
              value={
                formData1.Date_Target
                  ? moment(formData1.Date_Target, "DD/MM/YYYY")
                  : null
              }
              onChange={(date, dateString) =>
                handleChange("Date_Target", dateString)
              }
              format="DD/MM/YYYY"
            />
          </td>
          <td style={{ textAlign: "right" }}>Total Request :</td>
          <td>
            <Input
              value={
                formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional
              }
              style={{ marginLeft: "5px", width: "60px" }}
              disabled
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Employee Requirment :</td>
          <td colSpan={5}>
            <Checkbox.Group
            //  disabled={formData1.ID_Status != "MR0101" ? true : false}
            disabled={Disable.CB_EmpRequirment}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              value={formData1.CB_EmpRequirment}
              onChange={(value) => {
                handleChange("CB_EmpRequirment", value);
                handleEmpRequirment(value);
              }}
            >
              <Checkbox value="MR0201">Internal</Checkbox>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox value="MR0202">External</Checkbox>
                <p
                  style={{
                    marginLeft: "30px",
                    marginRight: "10px",
                    marginTop: "0px",
                    marginBottom: "0px",
                    display: formData1.CB_EmpRequirment.includes("MR0202")
                      ? "block"
                      : "none",
                  }}
                >
                  Employee Type :
                </p>

                <Select
                  showSearch
                  disabled={Disable.SL_EmployeeType}
                  // disabled={formData1.ID_Status != "MR0101" ? true : false}
                  value={formData1.SL_EmployeeType}
                  style={{
                    width: "200px",
                    marginLeft: "5px",
                    marginRight: "5px",
                    display: formData1.CB_EmpRequirment.includes("MR0202")
                      ? "block"
                      : "none",
                  }}
                  placeholder="Select Empployee Type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={EmployeeType}
                  onChange={(value) => {
                    handleChange("SL_EmployeeType", value);
                    if (value == "MR0390") {
                      handleChange("txt_EmpType_Other", "");
                    }
                  }}
                />
                <Input
                //  disabled={formData1.ID_Status != "MR0101" ? true : false}
                disabled={Disable.txt_EmpType_Other}
                  style={{
                    width: "450px",
                    display:
                      formData1.CB_EmpRequirment.includes("MR0202") &&
                      formData1.SL_EmployeeType &&
                      formData1.SL_EmployeeType == "MR0390"
                        ? ""
                        : "none",
                  }}
                  value={formData1.txt_EmpType_Other}
                  onChange={(e) =>
                    handleChange("txt_EmpType_Other", e.target.value)
                  }
                />
              </div>
              <div style={{ marginTop: "2px" }}>
                <Checkbox value="MR0290">Other</Checkbox>
                <Input
                 disabled={Disable.txt_EmpReq_Other}
                //  disabled={formData1.ID_Status != "MR0101" ? true : false}
                  style={{
                    width: "815px",
                    display: formData1.CB_EmpRequirment.includes("MR0290")
                      ? ""
                      : "none",
                  }}
                  value={formData1.txt_EmpReq_Other}
                  onChange={(e) =>
                    handleChange("txt_EmpReq_Other", e.target.value)
                  }
                />
              </div>
            </Checkbox.Group>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Remark :</td>
          <td colSpan={5}>
            <TextArea
            disabled={Disable.txt_Remark}
            //  disabled={formData1.ID_Status != "MR0101" ? true : false}
              value={formData1.txt_Remark}
              onChange={(e) => handleChange("txt_Remark", e.target.value)}
              style={{ width: "1000px", height: "50px" }}
              maxLength={2000}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={6} align="center">
            {" "}
            <Button
              type="primary"
              style={{ display: formData1.txt_ReqNo != "" ? "none" : "" }}
              onClick={() => {
                GetRunningNo();
              }}
            >
              Gen Request No.
            </Button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Step1;
