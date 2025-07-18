import React from "react";
import { Input, Button, Select, Radio } from "antd";
import { fn_ForApprove } from "./fn_ForApprove";
import "../ManPowerRequest.css"; // แนะนำสร้างไฟล์ CSS สำหรับความสวยงาม

const Step3 = ({
  formData1,
  setFormData1,
  Disable,
  setDisable,
  setCurrent,
}) => {
  const {
    DepartmentManager,
    FMGM,
    HrManager,
    handleChange,
    DateToday,
    SaveDraft,
    SendApprove,
    Bt_Submit,
    GetmailSend,
    bt_Reset,    COO,
    CEO
  } = fn_ForApprove(formData1, setFormData1, Disable, setDisable, setCurrent);

  return (
    <div className="for-approve-container">
      <div className="for-approve-card">
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
        <br />

        {/* Department Manager */}
        <div className="for-approve-row">
          <div className="for-approve-label">
            <label className="labelApprove Dept">Divison Manager :</label>
          </div>
          <div>
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
          </div>
          <div className="for-approve-radio">
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
          </div>
          <div
            className="for-approve-label-Date"
            style={{ textAlign: "right" }}
          >
            <div
              style={{
                display: formData1.ID_Status === "MR0101" ? "none" : "",
              }}
            >
              Action Date :
            </div>
          </div>
          <div>
            <Input
              disabled
              style={{
                width: "300px",
                display: formData1.ID_Status == "MR0101" ? "none" : "",
              }}
              value={formData1.Date_DepartmentManager}
            />
          </div>
        </div>
        <div className="for-approve-row">
          <div className="for-approve-label">
            <div
              style={{
                display: formData1.ID_Status === "MR0101" ? "none" : "",
              }}
            >
              Comment :
            </div>
          </div>
          <div style={{ flex: 4 }}>
            <Input
              disabled={Disable.txt_CommentDepartmentmanager}
              style={{
                width: "100%",
                display: formData1.ID_Status == "MR0101" ? "none" : "",
              }}
              value={formData1.txt_CommentDepartmentmanager}
              onChange={(e) => {
                handleChange("txt_CommentDepartmentmanager", e.target.value);
              }}
            />
          </div>
        </div>

        {/* FM/GM */}
        <div className="for-approve-row">
          <div className="for-approve-label">
            <label className="labelApprove FMGM">FM/GM :</label>
          </div>
          <div>
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
          </div>
          <div className="for-approve-radio">
            <Radio.Group
              disabled={Disable.CB_FMGMApprove}
              style={{
                display: ["MR0101", "MR0102", "MR0129"].includes(
                  formData1.ID_Status
                )
                  ? "none"
                  : "",
              }}
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
          </div>
          <div
            className="for-approve-label-Date"
            style={{ textAlign: "right" }}
          >
            <div
              style={{
                display: ["MR0101", "MR0102", "MR0129"].includes(
                  formData1.ID_Status
                )
                  ? "none"
                  : "",
              }}
            >
              Action Date :
            </div>
          </div>
          <div>
            <Input
              disabled
              style={{
                width: "300px",
                display: ["MR0101", "MR0102", "MR0129"].includes(
                  formData1.ID_Status
                )
                  ? "none"
                  : "",
              }}
              value={formData1.Date_FMGM}
            />
          </div>
        </div>
        <div className="for-approve-row">
          <div className="for-approve-label">
            <div
              style={{
                display: ["MR0101", "MR0102", "MR0129"].includes(
                  formData1.ID_Status
                )
                  ? "none"
                  : "",
              }}
            >
              Comment :
            </div>
          </div>
          <div style={{ flex: 4 }}>
            <Input
              disabled={Disable.txt_CommentFMGM}
              style={{
                width: "100%",
                display: ["MR0101", "MR0102", "MR0129"].includes(
                  formData1.ID_Status
                )
                  ? "none"
                  : "",
              }}
              value={formData1.txt_CommentFMGM}
              onChange={(e) => {
                handleChange("txt_CommentFMGM", e.target.value);
              }}
            />
          </div>
        </div>

        {/* Chief Operating Officer */}
        <div className="for-approve-row">
          <div className="for-approve-label" style={{ width: "170px" }}>
            <label className="labelApprove Chief">
              Chief Operating Officer :
            </label>
          </div>
          <div>
            <Select
              disabled
              showSearch
              value={formData1.SL_Chief}
              style={{ width: "300px" }}
              placeholder="Select Chief Operating Officer"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={COO}
              onChange={(value) => {
                handleChange("SL_Chief", value);
              }}
            />
          </div>
          <div className="for-approve-radio">
            <Radio.Group
              disabled={Disable.CB_ChiefApprove}
              style={
                {
                  display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0129",
                    "MR0139",
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
                }
              }
              name="radiogroup"
              value={formData1.CB_ChiefApprove}
              onChange={(e) => {
                handleChange("CB_ChiefApprove", e.target.value);
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
          </div>
          <div
            className="for-approve-label-Date"
            style={{ textAlign: "right" }}
          >
            <div
              style={
                {
                  display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0129",
                    "MR0139",
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
                }
              }
            >
              Action Date :
            </div>
          </div>
          <div>
            <Input
              disabled
              style={{
                width: "300px",
                display: [
                  "MR0101",
                  "MR0102",
                  "MR0103",
                  "MR0129",
                  "MR0139",
                ].includes(formData1.ID_Status)
                  ? "none"
                  : "",
              }}
              value={formData1.Date_Chief}
            />
          </div>
        </div>
        <div className="for-approve-row">
          <div className="for-approve-label">
            <div
              style={
                {
                  display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0129",
                    "MR0139",
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
                }
              }
            >
              Comment :
            </div>
          </div>
          <div style={{ flex: 4 }}>
            <Input
              disabled={Disable.txt_CommentChief}
              style={{
                width: "100%",
                display: [
                  "MR0101",
                  "MR0102",
                  "MR0103",
                  "MR0129",
                  "MR0139",
                ].includes(formData1.ID_Status)
                  ? "none"
                  : "",
              }}
              value={formData1.txt_CommentChief}
              onChange={(e) => {
                handleChange("txt_CommentChief", e.target.value);
              }}
            />
          </div>
        </div>

        {/* President & CEO */}
        <div className="for-approve-row">
          <div className="for-approve-label" style={{ width: "170px" }}>
            <label className="labelApprove President">President & CEO :</label>
          </div>
          <div>
            <Select
              disabled
              showSearch
              value={formData1.SL_President}
              style={{ width: "300px" }}
              placeholder="Select President & CEO"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={CEO}
              onChange={(value) => {
                handleChange("SL_President", value);
              }}
            />
          </div>
          <div className="for-approve-radio">
            <Radio.Group
              disabled={Disable.CB_PresidentApprove}
              style={
                {
                  display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0109",
                    "MR0129",
                    "MR0139",
                    "MR0199"
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
                }
              }
              name="radiogroup"
              value={formData1.CB_PresidentApprove}
              onChange={(e) => {
                handleChange("CB_PresidentApprove", e.target.value);
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
          </div>
          <div
            className="for-approve-label-Date"
            style={{ textAlign: "right" }}
          >
            <div
              style={
                {
                  display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0109",
                    "MR0129",
                    "MR0139",
                    "MR0199"
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
                }
              }
            >
              Action Date :
            </div>
          </div>
          <div>
            <Input
              disabled
              style={{
                width: "300px",
                  display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0109",
                    "MR0129",
                    "MR0139",
                    "MR0199"
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
              }}
              value={formData1.Date_President}
            />
          </div>
        </div>
        <div className="for-approve-row">
          <div className="for-approve-label">
            <div
              style={
                {
                 display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0109",
                    "MR0129",
                    "MR0139",
                    "MR0199"
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
                }
              }
            >
              Comment :
            </div>
          </div>
          <div style={{ flex: 4 }}>
            <Input
              disabled={Disable.txt_CommentPresident}
              style={{
                width: "100%",
                display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0109",
                    "MR0129",
                    "MR0139",
                    "MR0199"
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
              }}
              value={formData1.txt_CommentPresident}
              onChange={(e) => {
                handleChange("txt_CommentPresident", e.target.value);
              }}
            />
          </div>
        </div>

        {/* HR Manager */}
        <div className="for-approve-row">
          <div className="for-approve-label" style={{ width: "170px" }}>
            <label className="labelApprove HR">HR Manager :</label>
          </div>
          <div>
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
          </div>
          <div className="for-approve-radio">
            <Radio.Group
              disabled={Disable.CB_HRManagerApprove}
              style={{
                 display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0109",
                    "MR0129",
                    "MR0139",
                    "MR0199",
                    "MR0119", 
                    "MR0110"
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
              }}
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
          </div>
          <div
            className="for-approve-label-Date"
            style={{ textAlign: "right" }}
          >
            <div
              style={{
                display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0109",
                    "MR0129",
                    "MR0139",
                    "MR0199",
                    "MR0119", 
                    "MR0110"
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
              }}
            >
              Action Date :
            </div>
          </div>
          <div>
            <Input
              disabled
              style={{
                 display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0109",
                    "MR0129",
                    "MR0139",
                    "MR0199",
                    "MR0119", 
                    "MR0110"
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
                    width: "300px",
              }}
              value={formData1.Date_HRManager}
            />
          </div>
        </div>
        <div className="for-approve-row">
          <div className="for-approve-label">
            <div
              style={{
                display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0109",
                    "MR0129",
                    "MR0139",
                    "MR0199",
                    "MR0119", 
                    "MR0110"
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
              }}
            >
              Comment :
            </div>
          </div>
          <div style={{ flex: 4 }}>
            <Input
              disabled={Disable.txt_CommentHRManager}
              style={{
                width: "100%",
                display: [
                    "MR0101",
                    "MR0102",
                    "MR0103",
                    "MR0109",
                    "MR0129",
                    "MR0139",
                    "MR0199",
                    "MR0119", 
                    "MR0110"
                  ].includes(formData1.ID_Status)
                    ? "none"
                    : "",
              }}
              value={formData1.txt_CommentHRManager}
              onChange={(e) => {
                handleChange("txt_CommentHRManager", e.target.value);
              }}
            />
          </div>
        </div>

        {/* ปุ่มต่างๆ */}
        <div className="for-approve-btn-group">
          <Button
            type="primary"
            size="small"
            style={{
              backgroundColor: "#66D2CE",
              display: ["A", "R"].includes(formData1.StatusType) ? "" : "none",
            }}
            onClick={() =>
              formData1.StatusType === "R" ? SendApprove() : Bt_Submit()
            }
          >
            Submit
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: "#FF9D23",
              display: formData1.ID_Status === "MR0101" ? "" : "none",
            }}
            onClick={() => SaveDraft("3")}
          >
            Save Draft
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => bt_Reset()}
            style={{
              backgroundColor: "#758694",
              display: ["A", "R", "C"].includes(formData1.StatusType)
                ? ""
                : "none",
            }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: "#3F7D58",
              display: formData1.ID_Status === "MR0101" ? "" : "none",
            }}
            onClick={() => SendApprove()}
          >
            Send Approve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
