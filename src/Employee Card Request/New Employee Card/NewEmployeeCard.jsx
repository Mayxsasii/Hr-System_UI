import React from "react";
import {
  Input,
  Card,
  Select,
  Radio,
  DatePicker,
  Button,
} from "antd";
const { TextArea } = Input;
import dayjs from "dayjs";

import { fn_NewEmployeeCard } from "./fn_NewEmployeeCard";
const RefferenceLetterMasterList = ({}) => {
  const {
    formData1,
    handleChange,
    GetDataPerson,
    Reason,
    GetDayWork,
    isCalculating,
    supervisor,
    Bt_SendApprove,
    Bt_Submit,
    GetDataPersonForHr,
    Condition,
    StatusPayment,
    Bt_SubmitForHr,
    handleStatus,
    Bt_Reset,
  } = fn_NewEmployeeCard();

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          margin: "0 auto",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            margin: "0 10px 10px 0",
            fontWeight: "bold",
          }}
        >
          Employee Card Request
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
            For Request
          </legend>
          <table className="reference-table">
            <tr>
              <td align="right" style={{ width: "250px" }}>
                {" "}
                <label>Request No.:</label>
              </td>
              <td style={{ width: "165px" }}>
                {" "}
                <Input value={formData1.txt_ReqNo} disabled />
              </td>
              <td align="right">
                <label>Request Date:</label>
              </td>
              <td>
                <Input value={formData1.txt_ReqDate} disabled />
              </td>
              <td align="right" style={{}}>
                <label>Request Status:</label>
              </td>
              <td colSpan={3}>
                <Input value={formData1.txt_ReqStatusDesc} disabled />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label>ผู้ขอ/Requested By:</label>
              </td>
              <td>
                <Input
                  disabled={!["CD0101"].includes(formData1.txt_ReqStatusValue)}
                  value={formData1.txt_ReqbyID}
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
                <Input value={formData1.txt_ReqbyName} disabled />
              </td>
              <td align="right">
                <label>Factory :</label>
              </td>
              <td>
                <Input
                  value={formData1.txt_Factory}
                  style={{ width: "80px" }}
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
                />
              </td>
            </tr>

            <tr>
              <td align="right">
                <label>Employee type :</label>
              </td>
              <td colSpan={3}>
                {" "}
                <Input value={formData1.txt_EmpType} disabled />
              </td>
              <td align="right">
                <label>Join Date :</label>
              </td>
              <td>
                <Input value={formData1.txt_JoinDate} disabled />
              </td>
              <td align="right">
                <label>Job Grade :</label>
              </td>
              <td>
                <Input
                  value={formData1.txt_JobGrade}
                  style={{ width: "80px" }}
                  disabled
                />
              </td>
            </tr>
            {console.log("formData1", formData1)}
            <tr>
              <td align="right">
                <label>Email :</label>
              </td>
              <td colSpan={3}>
                <Input
                  disabled={!["CD0101"].includes(formData1.txt_ReqStatusValue)}
                  value={formData1.txt_Email}
                  onChange={(e) => handleChange("txt_Email", e.target.value)}
                />
              </td>

              <td align="right" style={{ width: "110px" }}>
                <label>เบอร์ภายใน/Tel :</label>
              </td>
              <td>
                <Input
                  disabled={!["CD0101"].includes(formData1.txt_ReqStatusValue)}
                  onChange={(e) => handleChange("txt_Tel", e.target.value)}
                  value={formData1.txt_Tel}
                  style={{ width: "80px" }}
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label>สาเหตุที่ขอทำบัตรใหม่/Reason :</label>
              </td>
              <td colSpan={3}>
                <Select
                  disabled={!["CD0101"].includes(formData1.txt_ReqStatusValue)}
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please Select Reason"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  value={formData1.Sl_Reason}
                  options={Reason}
                  onChange={(value, option) => {
                    handleChange("Sl_Reason", value);

                    // ตรวจสอบว่ามีค่า expenses ใน option ที่เลือก
                    if (option?.expenses) {
                      handleChange("txt_expenses", option.expenses);
                    } else {
                      handleChange("txt_expenses", "");
                    }
                    if (value != "CD0208") {
                      handleChange("txt_ReasonOther", "");
                    }
                  }}
                />
              </td>

              <td colSpan={3}>
                <Input
                  disabled={
                    !["CD0101"].includes(formData1.txt_ReqStatusValue) ||
                    formData1.Sl_Reason !== "CD0208"
                  }
                  value={formData1.txt_ReasonOther}
                  onChange={(e) =>
                    handleChange("txt_ReasonOther", e.target.value)
                  }
                  style={{ width: "100%" }}
                  placeholder="อื่นๆโปรดระบุ"
                />
              </td>
              <td align="right">
                <label>ค่าใช้จ่าย :</label>
              </td>
              <td>
                <Input
                  disabled
                  value={formData1.txt_expenses}
                  // onChange={(e) => handleChange("txt_expenses", e.target.value)}
                  style={{ width: "80px" }}
                />
              </td>
            </tr>
            <tr
              style={{
                display: !["CD0101"].includes(formData1.txt_ReqStatusValue)
                  ? "none"
                  : "",
              }}
            >
              <td colSpan={2} align="right" style={{}}>
                <label>
                  ไม่ได้บันทึกเวลาทำงานที่เครื่องบันทึกเวลา/No Record Working
                  Time :
                </label>{" "}
              </td>
              <td style={{}} colSpan={7}>
                <DatePicker
                  disabled={!["CD0101"].includes(formData1.txt_ReqStatusValue)}
                  multiple
                  onChange={(dates) => {
                    const formatted = dates.map((date) =>
                      date.format("YYYY-MM-DD")
                    );
                    console.log("วันที่ที่เก็บ:", formatted);
                    handleChange("Date_DayWork", formatted); // เก็บเป็น string[]
                  }}
                  maxTagCount="responsive"
                  format="DD/MM/YYYY"
                  value={
                    formData1.Date_DayWork?.map((dateStr) =>
                      dayjs(dateStr, "YYYY-MM-DD")
                    ) || []
                  }
                  size="middle"
                />
              </td>
            </tr>
            <tr
              style={{
                display: ["CD0101"].includes(formData1.txt_ReqStatusValue)
                  ? "none"
                  : "",
              }}
            >
              <td align="right">
                <label>วันที่ไม่ได้รูดบัตร (เฉพาะวันทำงาน):</label>{" "}
              </td>
              <td colSpan={9}>
                <TextArea
                  disabled
                  value={formData1.Date_DayWork2}
                  onChange={(e) => handleChange("Date_DayWork", e.target.value)}
                  style={{ height: "50px" }}
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label>หมายเหตุ/Remark :</label>{" "}
              </td>
              <td colSpan={9}>
                <TextArea
                  disabled={!["CD0101"].includes(formData1.txt_ReqStatusValue)}
                  onChange={(e) => handleChange("txt_Remark", e.target.value)}
                  value={formData1.txt_Remark}
                  style={{ height: "50px" }}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={9}>
                <label style={{ color: "red" }}>
                  *ข้อกำหนด : HR จะทำบัตรหลังเวลา 13.30 น. ของทุกวันทำงาน
                  ดังนั้นหัวหน้างานจะต้องอนุมัติการทำบัตรพนักงานก่อนเวลา 13.00
                  น.และพนักงานจะต้องมารับบัตรพนักงานหลังเวลา 15.00 น.{" "}
                </label>
              </td>
            </tr>
          </table>
        </fieldset>
        <br />

        <fieldset
          style={{
            display: formData1.txt_ReqbyName == "" ? "none" : "",
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
                  disabled={formData1.txt_ReqStatusValue != "CD0101"}
                  showSearch
                  value={formData1.Sl_Supervisor}
                  style={{ width: "300px" }}
                  placeholder="Select Supervisor Up"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={supervisor}
                  onChange={(value) => {
                    handleChange("Sl_Supervisor", value);
                  }}
                />
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  style={{
                    display:
                      formData1.txt_ReqStatusValue == "CD0101" ? "none" : "",
                  }}
                  disabled={formData1.txt_ReqStatusValue != "CD0102"}
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
                        formData1.txt_ReqStatusValue == "CD0101" ? "none" : "",
                    }}
                  >
                    Action Date:
                  </label>
                </div>
              </td>
              <td style={{ width: "300px" }}>
                <Input
                  disabled
                  style={{
                    display:
                      formData1.txt_ReqStatusValue == "CD0101" ? "none" : "",
                  }}
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
                        formData1.txt_ReqStatusValue == "CD0101" ? "none" : "",
                    }}
                  >
                    Comment :
                  </label>
                </div>
              </td>
              <td colSpan={4}>
                <Input
                  disabled={formData1.txt_ReqStatusValue != "CD0102"}
                  style={{
                    display:
                      formData1.txt_ReqStatusValue == "CD0101" ? "none" : "",
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
            width: "100%",
            marginTop: "5px",
            display: ["CD0101", "CD0102"].includes(formData1.txt_ReqStatusValue)
              ? ""
              : "none", //
          }}
        >
          <Button
            color="blue"
            variant="solid"
            style={{
              display: formData1.txt_ReqStatusValue == "CD0101" ? "" : "none",
            }}
            onClick={() => Bt_SendApprove()}
          >
            Send Approve
          </Button>{" "}
          <Button
            color="blue"
            variant="solid"
            style={{
              display: formData1.txt_ReqStatusValue == "CD0102" ? "" : "none",
            }}
            onClick={() => Bt_Submit()}
          >
            Submit
          </Button>{" "}
          <Button color="red" variant="solid" onClick={() => Bt_Reset()}>
            Reset
          </Button>{" "}
        </div>
        <br />
        <fieldset
          style={{
            display: ["CD0103", "CD0104", "CD0107", "CD0108"].includes(
              formData1.txt_ReqStatusValue
            )
              ? ""
              : "none",
            border: "1px solid #ccc",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <legend style={{ fontSize: "16px", fontWeight: "bold" }}>
            HR Staff Action
          </legend>
          <table style={{ width: "100%" }}>
            <tr>
              <td align="right" style={{ width: "190px" }}>
                <label>Status :</label>
              </td>
              <td colSpan={2}>
                <Radio.Group
                  disabled={
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  style={{ marginLeft: "5px" }}
                  name="radiogroup"
                  value={formData1.Rd_HRStatus}
                  onChange={(e) => {
                    handleStatus(e);
                  }}
                  options={[
                    {
                      value: "CD0104",
                      label: "On Process",
                    },
                    {
                      value: "CD0107",
                      label: "Close",
                    },
                    {
                      value: "CD0108",
                      label: "Close by condition",
                    },
                  ]}
                />
                <Select
                  disabled={
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  showSearch
                  style={{
                    width: "300px",
                    display: formData1.Rd_HRStatus == "CD0108" ? "" : "none",
                  }}
                  placeholder="Please Select Condition For Close"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Condition}
                  value={formData1.Sl_HrCondion}
                  onChange={(value) => {
                    handleChange("Sl_HrCondion", value);
                  }}
                />
              </td>
            </tr>
            {console.log("formData1", formData1)}
            <tr>
              <td align="right">
                <label>HR Staff :</label>
              </td>
              <td>
                {" "}
                <Input
                  style={{ width: "200px" }}
                  disabled
                  value={formData1.txt_HrStaff}
                />
              </td>
              <td>
                <label style={{ marginLeft: "80px" }}>Action Date :</label>
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
                <label>สาเหตุที่ขอทำบัตรใหม่/Reason :</label>
              </td>
              <td>
                {" "}
                <Select
                  style={{ width: "100%" }}
                  disabled
                  options={Reason}
                  value={formData1.Sl_Reason}
                />
              </td>
              <td>
                {" "}
                <Input
                  style={{ width: "440px" }}
                  disabled
                  placeholder="อื่นๆโปรดระบุ"
                  value={formData1.txt_ReasonOther}
                />
                <label style={{ marginLeft: "50px" }}>ค่าใช้จ่าย :</label>
                <Input
                  disabled
                  style={{
                    width: "70px",
                    marginLeft: "5px",
                  }}
                  value={formData1.txt_expenses}
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label>สาเหตุจริง :</label>
              </td>
              <td>
                {" "}
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  disabled={
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  placeholder="Please Select Reason"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  value={formData1.txt_cause}
                  options={Reason}
                  onChange={(value, option) => {
                    handleChange("txt_cause", value);

                    // ตรวจสอบว่ามีค่า expenses ใน option ที่เลือก
                    if (option?.expenses) {
                      handleChange("txt_ExpensesCause", option.expenses);
                    } else {
                      handleChange("txt_ExpensesCause", "");
                    }
                    if (value != "CD0208") {
                      handleChange("txt_CauseOther", "");
                    }
                  }}
                />
              </td>
              <td>
                {" "}
                <Input
                  style={{ width: "440px" }}
                  disabled={
                    formData1.txt_cause != "CD0208" ||
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  placeholder="อื่นๆโปรดระบุ"
                  onChange={(e) =>
                    handleChange("txt_CauseOther", e.target.value)
                  }
                  value={formData1.txt_CauseOther}
                />
                <label style={{ marginLeft: "30px" }}>ค่าใช้จ่ายจริง :</label>
                <Input
                  disabled={
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  style={{
                    width: "70px",
                    marginLeft: "5px",
                  }}
                  onChange={(e) => {
                    // รับเฉพาะตัวเลขเท่านั้น
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    handleChange("txt_ExpensesCause", value);
                  }}
                  value={formData1.txt_ExpensesCause}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label>Comment :</label>
              </td>
              <td colSpan={2}>
                <TextArea
                  disabled={
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  value={formData1.txt_HrComment}
                  onChange={(e) =>
                    handleChange("txt_HrComment", e.target.value)
                  }
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
                  disabled={
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  onChange={(e) =>
                    handleChange("txt_RecriveById", e.target.value)
                  }
                  onBlur={(e) => GetDataPersonForHr(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.target.blur();
                      GetDataPersonForHr(formData1.txt_RecriveById);
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
                  disabled={
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
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
                  disabled={
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  style={{ width: "120px" }}
                  value={formData1.txt_RecriveByTel}
                  onChange={(e) =>
                    handleChange("txt_RecriveByTel", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label>Recrive Date :</label>
              </td>
              <td colSpan={2}>
                <Input
                  disabled={
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  type="date"
                  style={{
                    width: "300px",
                  }}
                  onChange={(e) =>
                    handleChange("Date_RecriveDate", e.target.value)
                  }
                  value={formData1.Date_RecriveDate}
                  min={new Date().toISOString().split("T")[0]} // กำหนดวันที่ขั้นต่ำเป็น
                />
                <label style={{ marginLeft: "30px" }}>Payment status : </label>
                <Select
                  disabled={
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  showSearch
                  style={{
                    width: "300px",
                  }}
                  value={formData1.Sl_PaymentStatus}
                  placeholder="Please Select Payment status"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={StatusPayment}
                  // onChange={(value) => {
                  //   handleChange("Sl_PaymentStatus", value);
                  // }}
                  onChange={(value, option) => {
                    handleChange("Sl_PaymentStatus", value);

                    // ตรวจสอบว่ามีค่า expenses ใน option ที่เลือก

                    if (value != "CD0403") {
                      handleChange("txt_PaymentStatusOther", "");
                    }
                  }}
                />
                <Input
                  disabled={
                    formData1.Sl_PaymentStatus != "CD0403" ||
                    !["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
                  }
                  style={{ width: "300px", marginLeft: "5px" }}
                  placeholder="อื่นๆโปรดระบุ"
                  value={formData1.txt_PaymentStatusOther}
                  onChange={(e) =>
                    handleChange("txt_PaymentStatusOther", e.target.value)
                  }
                />
              </td>
            </tr>
          </table>
        </fieldset>
        <div
          style={{
            textAlign: "center",
            marginTop: "10px",
            display: ["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
              ? ""
              : "none", //
          }}
        >
          <Button
            color="gold"
            variant="solid"
            onClick={() => {
              Bt_SubmitForHr("SaveDraft");
            }}
          >
            Save Draft
          </Button>
          <Button
            color="cyan"
            variant="solid"
            style={{ marginLeft: 8 }}
            onClick={() => {
              Bt_SubmitForHr("Submit");
            }}
          >
            Submit
          </Button>
          <Button
            color="red"
            variant="solid"
            style={{ marginLeft: 8 }}
           onClick={() => Bt_Reset()}
          >
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RefferenceLetterMasterList;
