import React from "react";
import { Input, Button, Select, Radio } from "antd";
import { fn_ForApprove } from "./fn_ForApprove";
const Step3 = ({ formData1, setFormData1,Disable,setDisable,setCurrent }) => {
  const {
    DepartmentManager,
    FMGM,
    HrManager,
    handleChange,
    DateToday,
    SaveDraft,
    SendApprove,
    Bt_Submit,
    GetmailSend
  } = fn_ForApprove(formData1, setFormData1,Disable,setDisable,setCurrent);
  return (
    <div>
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        For Approve{""}
        {formData1.txt_ReqNo ? (
          <>
            {" >>"} {formData1.txt_ReqNo}
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
              // Disable={Disable.SL_DepartmentManager}
              disabled={Disable.SL_DepartmentManager}
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
          <td style={{ textAlign: "center", width: "500px" }}>
            {" "}
            {/* ||formData1.ID_Status!="MR0103"||formData1.ID_Status!="MR0104" */}
            <Radio.Group
              disabled={Disable.CB_DepartmentApprove}
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
              name="radiogroup"
              value={formData1.CB_DepartmentApprove}
              onChange={(e) => {
                handleChange("CB_DepartmentApprove", e.target.value);
              }}
              options={[
                {
                  value: "A",
                  label: "Approve",
                },
                {
                  value: "R",
                  label: "Reject",
                },
              ]}
            />
          </td>
          <td style={{ textAlign: "right", width: "80px" }}>
            <div
              style={{ display: formData1.ID_Status == "MR0101"  ? "none" : "" }}
            >
              Action Date:
            </div>
          </td>
          <td style={{ width: "300px" }}>
            <Input
              disabled
              style={{
                width: "300px",
                display: formData1.ID_Status == "MR0101"  ? "none" : "",
              }}
              value={formData1.Date_DepartmentManager}
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
            disabled={Disable.txt_CommentDepartmentmanager}
              style={{
                width: "1200px",
                display: formData1.ID_Status == "MR0101"  ? "none" : "",
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
              disabled={Disable.SL_FMGM}
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
            disabled={Disable.CB_FMGMApprove}
              style={{  display: ["MR0101", "MR0102","MR0129"].includes(formData1.ID_Status) ? "none" : "",}}
              name="radiogroup"
              value={formData1.CB_FMGMApprove}
              onChange={(e) => {
                handleChange("CB_FMGMApprove", e.target.value);
              }}
              options={[
                {
                  value: "A",
                  label: "Approve",
                },
                {
                  value: "R",
                  label: "Reject",
                },
              ]}
            />
          </td>
          <td style={{ textAlign: "right" }}>
            <div
              style={{ display: ["MR0101", "MR0102","MR0129"].includes(formData1.ID_Status) ? "none" : "", }}
            >
              Action Date:
            </div>
          </td>
          <td>
            <Input
              disabled
              style={{
                width: "300px",
                display: ["MR0101", "MR0102","MR0129"].includes(formData1.ID_Status) ? "none" : "",
              }}
              value={formData1.Date_FMGM}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>
            <div
              style={{ display: ["MR0101", "MR0102","MR0129"].includes(formData1.ID_Status) ? "none" : "", }}
            >
              Comment:
            </div>
          </td>
          <td colSpan={4}>
            <Input
            disabled={Disable.txt_CommentFMGM}
              style={{
                width: "1200px",
                display: ["MR0101", "MR0102","MR0129"].includes(formData1.ID_Status) ? "none" : "",
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
            disabled={Disable.SL_HRManager}
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
            disabled={Disable.CB_HRManagerApprove}
              style={{   display: ["MR0101", "MR0102","MR0103","MR0129","MR0139"].includes(formData1.ID_Status) ? "none" : "", }}
              name="radiogroup"
              value={formData1.CB_HRManagerApprove}
              onChange={(e) => {
                handleChange("CB_HRManagerApprove", e.target.value);
              }}
              options={[
                {
                  value: "A",
                  label: "Approve",
                },
                {
                  value: "R",
                  label: "Reject",
                },
              ]}
            />
          </td>
          <td style={{ textAlign: "right" }}>
            <div
              style={{   display: ["MR0101", "MR0102","MR0103","MR0129","MR0139"].includes(formData1.ID_Status) ? "none" : "", }}
            >
              Action Date:
            </div>
          </td>
          <td>
            <Input
              disabled
              style={{
                width: "300px",
                display: ["MR0101", "MR0102","MR0103","MR0129","MR0139"].includes(formData1.ID_Status) ? "none" : "",
              }}
              value={formData1.Date_HRManager}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>
            <div
              style={{   display: ["MR0101", "MR0102","MR0103","MR0129","MR0139"].includes(formData1.ID_Status) ? "none" : "", }}
            >
              Comment:
            </div>
          </td>
          <td colSpan={4}>
            <Input
            disabled={Disable.txt_CommentHRManager}
              style={{
                width: "1200px",
                display: ["MR0101", "MR0102","MR0103","MR0129","MR0139"].includes(formData1.ID_Status) ? "none" : "",
              }}
              value={formData1.txt_CommentHRManager}
              onChange={(e) => {
                handleChange("txt_CommentHRManager", e.target.value);
              }}
            />
          </td>
        </tr>
      </table>
      <div align="center" style={{ marginTop: "5px" }}>
      <Button
          type="primary"
          style={{
           
            backgroundColor: "#66D2CE",
            display: ["A", "R"].includes(formData1.StatusType) ? "" : "none",
          }}
          onClick={() => formData1.StatusType=='R'?SendApprove(): Bt_Submit()}
        >
          Submit
        </Button>
        <Button
          type="primary"
          style={{
            marginLeft: "10px",
            backgroundColor: "#FF9D23",
            display: formData1.ID_Status == "MR0101" ? "" : "none",
          }}
          onClick={() => SaveDraft('3')}
        >
          Save Draft
        </Button>
        <Button
          type="primary"
          danger
          style={{ marginLeft: "10px", backgroundColor: "#758694", display: ["A", "R","C"].includes(formData1.StatusType) ? "" : "none"} }
        >
          Reset
        </Button>
        <Button
          type="primary"
          style={{
            marginLeft: "10px",
            backgroundColor: "#3F7D58",
            display: formData1.ID_Status == "MR0101" ? "" : "none",
          }}
          onClick={() => SendApprove()}
          // onClick={() => GetmailSend()}
        >
          Send Approve
        </Button>
       
      </div>
    </div>
  );
};
export default Step3;
