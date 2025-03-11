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
import { fn_NewManPowerRequset } from "./fn_NewManPowerRequset";

const Step1 = ({ formData1, setFormData1 }) => {
  const {
    Factory,
    Department,
    Position,
    datauser,
    DateToday,
    handleEmpRequirment,
    EmployeeType,
    GetPosition
  } = fn_NewManPowerRequset();

  const handleChange = (field, value) => {
    setFormData1((prev) => ({ ...prev, [field]: value }));
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
        New Man Power Request
      </p>
      <table style={{ marginTop: "10px", marginLeft: "10px" }}>
        <tr>
          <td style={{ textAlign: "right" }}>Factory :</td>
          <td>
            <Select
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
              onChange={(value) => { handleChange('SL_Factory', value); GetPosition(value); }}
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
              onChange={(value) => handleChange('SL_Department', value)}
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
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              value={formData1.txt_TelNo}
              onChange={(e) => handleChange('txt_TelNo', e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Position Requirement :</td>
          <td>
            <Select
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
              onChange={(value) => { handleChange('SL_Position', value);}}
            />
          </td>
          <td style={{ textAlign: "right" }}>Target Date :</td>
          <td>
            <DatePicker
              style={{ marginLeft: "5px", width: "200px" }}
              value={formData1.Date_Target}
              onChange={(date) => handleChange('Date_Target', date)}
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
            <Checkbox.Group
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              value={formData1.CB_EmpRequirment}
              onChange={(value) => { handleChange('CB_EmpRequirment', value); handleEmpRequirment(value); }}
            >
              <Checkbox value="Internal">Internal</Checkbox>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox value="External">External</Checkbox>
                <p style={{ marginLeft: "30px", marginRight: "10px" }}>
                  Employee Type :
                </p>
                <Select
                  showSearch
                  value={formData1.SL_Employee}
                  style={{
                    width: "200px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                  placeholder="Select Empployee Type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={EmployeeType}
                  onChange={(value) => handleChange('SL_Employee', value)}
                />
                <Input
                  style={{ width: "450px" }}
                  value={formData1.txt_EmpType}
                  onChange={(e) => handleChange('txt_EmpType', e.target.value)}
                />
              </div>
              <div>
                <Checkbox value="Other">Other</Checkbox>
                <Input
                  style={{ width: "815px" }}
                  value={formData1.txt_EmpReq_Other}
                  onChange={(e) => handleChange('txt_EmpReq_Other', e.target.value)}
                />
              </div>
            </Checkbox.Group>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Remark :</td>
          <td colSpan={5}>
            <TextArea
              value={formData1.txt_Remark}
              onChange={(e) => handleChange('txt_Remark', e.target.value)}
              style={{ width: "1000px", height: "100px" }}
              maxLength={2000}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={6} align="center"> <Button type="primary" >
           Gen Request No.
          </Button></td>
        </tr>
      </table>
    </div>
  );
};

export default Step1;