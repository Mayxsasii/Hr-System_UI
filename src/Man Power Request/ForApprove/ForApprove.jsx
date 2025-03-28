import React from "react";
import { Checkbox, Input, Button, Select, Upload, Radio } from "antd";
import { fn_ForApprove } from "./fn_ForApprove";
const { TextArea } = Input;
const Step3 = ({ formData1, setFormData1 }) => {
  const {
    DepartmentManager,
    FMGM,
    HrManager,
    handleChange,
    DateToday,
    SaveDraft,
    SendApprove
  } = fn_ForApprove(formData1, setFormData1);
  return (
    <div>
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        For Approve{''}
        {formData1.txt_ReqNo ? (
          <>
            {">>"} {formData1.txt_ReqNo}
          </>
        ) : (
          ""
        )}
      </p>
      <table className="TB_ForApp">
        <tr>
          <td style={{ textAlign: "right" }}>Department Manager:</td>
          <td style={{ width: "300px" }}>
            <Select
              showSearch
              value={formData1.SL_DepartmentManager}
              style={{ width: "300px" }}
              placeholder="Select Department Manager"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={DepartmentManager}
              onChange={(value) => {
                handleChange("SL_DepartmentManager", value);
              }}
            />
          </td>
          <td style={{ textAlign: "center" ,width:'300px' }}>
            {" "}
            <Radio.Group
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
              name="radiogroup"
              value={formData1.CB_DepartmentApprove}
              onChange={(e) => {
                handleChange("CB_DepartmentApprove", e.target.value);
              }}
              options={[
                {
                  value: "Approve",
                  label: "Approve",
                },
                {
                  value: "Reject",
                  label: "Reject",
                },
              ]}
            />
          </td>
          <td style={{ textAlign: "right",width:'300px'  }}>
            <div
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
            >
              Action Date:
            </div>
          </td>
          <td style={{ width: "300px" }}>
            <Input
              disabled
              style={{
                width: "300px",
                display: formData1.ID_Status == "MR0101" ? "none" : "",
              }}
              value={DateToday}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>
            <div
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
            >
              Comment:
            </div>
          </td>
          <td colSpan={4}>
            <Input
              style={{
                width: "1050px",
                display: formData1.ID_Status == "MR0101" ? "none" : "",
              }}
              value={formData1.txt_CommentDepartmentmanager}
              onChange={(e) => {
                handleChange("txt_CommentDepartmentmanager", e.target.value);
              }}
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td style={{ textAlign: "right" }}>FM/GM:</td>
          <td>
            <Select
              showSearch
              value={formData1.SL_FMGM}
              style={{ width: "300px" }}
              placeholder="Select FM/DM"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={FMGM}
              onChange={(value) => {
                handleChange("SL_FMGM", value);
              }}
            />
          </td>
          <td style={{ textAlign: "center" }}>
            <Radio.Group
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
              name="radiogroup"
              value={formData1.CB_FMGMApprove}
              onChange={(e) => {
                handleChange("CB_FMGMApprove", e.target.value);
              }}
              options={[
                {
                  value: "Approve",
                  label: "Approve",
                },
                {
                  value: "Reject",
                  label: "Reject",
                },
              ]}
            />
          </td>
          <td style={{ textAlign: "right" }}>
            <div
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
            >
              Action Date:
            </div>
          </td>
          <td>
            <Input
              disabled
              style={{
                width: "300px",
                display: formData1.ID_Status == "MR0101" ? "none" : "",
              }}
              value={DateToday}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>
            <div
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
            >
              Comment:
            </div>
          </td>
          <td colSpan={4}>
            <Input
              style={{
                width: "1050px",
                display: formData1.ID_Status == "MR0101" ? "none" : "",
              }}
              value={formData1.txt_CommentFMGM}
              onChange={(e) => {
                handleChange("txt_CommentFMGM", e.target.value);
              }}
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td style={{ textAlign: "right" }}>HR Manager:</td>
          <td>
            <Select
              showSearch
              value={formData1.SL_HRManager}
              style={{ width: "300px" }}
              placeholder="Select HR Manager"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={HrManager}
              onChange={(value) => {
                handleChange("SL_HRManager", value);
              }}
            />
          </td>
          <td style={{ textAlign: "center" }}>
            {" "}
            <Radio.Group
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
              name="radiogroup"
              value={formData1.CB_HRManagerApprove}
              onChange={(e) => {
                handleChange("CB_HRManagerApprove", e.target.value);
              }}
              options={[
                {
                  value: "Approve",
                  label: "Approve",
                },
                {
                  value: "Reject",
                  label: "Reject",
                },
              ]}
            />
          </td>
          <td style={{ textAlign: "right" }}>
            <div
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
            >
              Action Date:
            </div>
          </td>
          <td>
            <Input
              disabled
              style={{
                width: "300px",
                display: formData1.ID_Status == "MR0101" ? "none" : "",
              }}
              value={DateToday}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>
            <div
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
            >
              Comment:
            </div>
          </td>
          <td colSpan={4}>
            <Input
              style={{
                width: "1050px",
                display: formData1.ID_Status == "MR0101" ? "none" : "",
              }}
              value={formData1.txt_CommentHRManager}
              onChange={(e) => {
                handleChange("txt_CommentHRManager", e.target.value);
              }}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={5} align="center" >
            <Button
              type="primary"
              style={{ backgroundColor: "#FF9D23" }}
              onClick={() => SaveDraft()}
            >
              Save Draft
            </Button>
            <Button type="primary" danger style={{ marginLeft: "10px" }}>
              Reset
            </Button>
            <Button type="primary" style={{ marginLeft: "10px" }}   onClick={() => SendApprove()}>
              Send Approve
            </Button>
          </td>
        </tr>
      </table>
    </div>
  );
};
export default Step3;
