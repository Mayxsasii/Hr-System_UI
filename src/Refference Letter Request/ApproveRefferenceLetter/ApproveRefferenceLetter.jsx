import React from "react";
import { Checkbox, Input, Button, Select, Radio } from "antd";
const { TextArea } = Input;
import { fn_ApproveRefferenceLetter } from "../ApproveRefferenceLetter/fn_ApproveRefferenceLetter";
const Step2 = ({ formData1, setFormData1 }) => {
  const {
    handleChange,
    options,
    Supervisor,
    SendApprove,
    Bt_Submit,
    Bt_Reset,
    HandleChange_CheckBoxLetter,
  } = fn_ApproveRefferenceLetter(formData1, setFormData1);

  return (
    <div>
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        Letter Type/For Approve{" "}
        {formData1.txt_ReqNo ? (
          <>
            {" >>"} {formData1.txt_ReqNo}
          </>
        ) : (
          ""
        )}
      </p>
      <fieldset
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <legend style={{ fontSize: "16px", fontWeight: "bold" }}>
          Letter Type
        </legend>
        <Checkbox.Group
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          value={formData1.CB_letterType || []}
          disabled={formData1.txt_ReqStatusValue != "LT0101"}
          onChange={(checkedValues) => {
            HandleChange_CheckBoxLetter(checkedValues);
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Checkbox value={option.value}>{option.label}</Checkbox>
              {formData1.CB_letterType?.includes(option.value) && (
                <>
                  {option.value === "LT0203" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      <label style={{ marginRight: "10px" }}>
                        วันที่ลาออกจากบริษัท:
                      </label>
                      <Input
                        type="date"
                        disabled={formData1.txt_ReqStatusValue != "LT0101"}
                        style={{ width: "300px" }}
                        placeholder="กรุณาเลือกวันที่"
                        value={formData1.Date_Resignation}
                        onChange={(e) =>
                          handleChange("Date_Resignation", e.target.value)
                        }
                      />
                    </div>
                  )}
                  {option.value === "LT0205" && (
                    <Input
                      type="text"
                      disabled={formData1.txt_ReqStatusValue != "LT0101"}
                      style={{ marginLeft: "10px", width: "500px" }}
                      placeholder="กรุณากรอกชื่อเอกสารที่ต้องการ"
                      value={formData1.txt_LetterOther}
                      onChange={(e) =>
                        handleChange("txt_LetterOther", e.target.value)
                      }
                    />
                  )}
                  {option.value === "LT0201" && (
                    <>
                      <label style={{ marginLeft: "40px" }}>ภาษาไทย</label>
                      <Input
                        type="text"
                        disabled={formData1.txt_ReqStatusValue != "LT0101"}
                        style={{ marginLeft: "10px", width: "40px" }}
                        value={formData1.txt_LetterThai}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          handleChange("txt_LetterThai", value);
                        }}
                      />
                      <label style={{ marginLeft: "10px" }}>ฉบับ</label>
                      <label style={{ marginLeft: "40px" }}>ภาษาอังกฤษ</label>
                      <Input
                        type="text"
                        disabled={formData1.txt_ReqStatusValue != "LT0101"}
                        style={{ marginLeft: "10px", width: "40px" }}
                        value={formData1.txt_LetterEng}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          handleChange("txt_LetterEng", value);
                        }}
                      />
                      <label style={{ marginLeft: "10px" }}>ฉบับ</label>
                    </>
                  )}
                  {option.value === "LT0202" && (
                    <>
                      <label style={{ marginLeft: "30px" }}>ภาษาไทย</label>
                      <Input
                        type="text"
                        disabled={formData1.txt_ReqStatusValue != "LT0101"}
                        style={{ marginLeft: "10px", width: "40px" }}
                        value={formData1.txt_WorkCerThai}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          handleChange("txt_WorkCerThai", value);
                        }}
                      />
                      <label style={{ marginLeft: "10px" }}>ฉบับ</label>
                      <label style={{ marginLeft: "40px" }}>ภาษาอังกฤษ</label>
                      <Input
                        type="text"
                        disabled={formData1.txt_ReqStatusValue != "LT0101"}
                        style={{ marginLeft: "10px", width: "40px" }}
                        value={formData1.txt_WorkCerEng}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          handleChange("txt_WorkCerEng", value);
                        }}
                      />
                      <label style={{ marginLeft: "10px" }}>ฉบับ</label>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </Checkbox.Group>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label style={{ marginRight: "10px" }}>หมายเหตุ/Remark:</label>
          <TextArea
            disabled={formData1.txt_ReqStatusValue != "LT0101"}
            value={formData1.txt_Remark}
            onChange={(e) => handleChange("txt_Remark", e.target.value)}
            style={{ height: "50px" }}
            maxLength={2000}
          />
        </div>
      </fieldset>
      <br />
      <fieldset
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <legend style={{ fontSize: "16px", fontWeight: "bold" }}>
          For Approve
        </legend>
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ textAlign: "right", width: "100px" }}>
              Supervisor Up :
            </td>
            <td style={{ width: "300px" }}>
              <Select
                disabled={formData1.txt_ReqStatusValue != "LT0101"}
                showSearch
                value={formData1.Sl_Supervisor}
                style={{ width: "300px" }}
                placeholder="Select Department Manager"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={Supervisor}
                onChange={(value) => {
                  handleChange("Sl_Supervisor", value);
                }}
              />
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              <Radio.Group
                disabled={formData1.txt_ReqStatusValue != "LT0102"}
                style={{
                  display:
                    formData1.txt_ReqStatusValue === "LT0101" ? "none" : "",
                }}
                name="radiogroup"
                value={formData1.Rd_SupervisorApprove}
                onChange={(e) => {
                  handleChange("Rd_SupervisorApprove", e.target.value);
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
            <td style={{ width: "90px", textAlign: "right" }}>
              <div>
                <label
                  style={{
                    display:
                      formData1.txt_ReqStatusValue === "LT0101" ? "none" : "",
                  }}
                >
                  Action Date:
                </label>
              </div>
            </td>
            <td style={{ width: "300px" }}>
              <Input
                style={{
                  display:
                    formData1.txt_ReqStatusValue === "LT0101" ? "none" : "",
                }}
                disabled
                value={formData1.Date_SupervisorActionDate}
              />
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <div>
                {" "}
                <label
                  style={{
                    display:
                      formData1.txt_ReqStatusValue === "LT0101" ? "none" : "",
                  }}
                >
                  Comment :
                </label>
              </div>
            </td>
            <td colSpan={4}>
              <Input
                disabled={formData1.txt_ReqStatusValue != "LT0102"}
                style={{
                  display:
                    formData1.txt_ReqStatusValue === "LT0101" ? "none" : "",
                }}
                value={formData1.txt_SupervisorComment}
                onChange={(e) => {
                  handleChange("txt_SupervisorComment", e.target.value);
                }}
              />
            </td>
          </tr>
        </table>
      </fieldset>
      <div
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        {" "}
        {console.log(formData1, "formmmm")}
        <Button
          variant="solid"
          color="cyan"
          style={{
            display: formData1.txt_ReqStatusValue === "LT0102" ? "" : "none",
          }}
          onClick={() => Bt_Submit()}
        >
          Submit
        </Button>{" "}
        <Button
          variant="solid"
          color="cyan"
          onClick={() => SendApprove()}
          style={{
            display: formData1.txt_ReqStatusValue === "LT0101" ? "" : "none",
          }}
        >
          Send Approve
        </Button>{" "}
        <Button
          // type="primary"
          variant="solid"
          color="danger"
          onClick={() => Bt_Reset()}
          style={{
            display:
              formData1.txt_ReqStatusValue === "LT0101" ||
              formData1.txt_ReqStatusValue === "LT0102"
                ? ""
                : "none",
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Step2;
