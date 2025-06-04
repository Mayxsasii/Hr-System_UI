import React from "react";
import {
  Input,
  Card,
  Checkbox,
  Select,
  Radio,
  DatePicker,
  Button,
  Spin,
} from "antd";
const { TextArea } = Input;
// import "../RefferenceLetter.css";

import Swal from "sweetalert2";
import { fn_NewEmployeeCard } from "./fn_NewEmployeeCard";
const RefferenceLetterMasterList = ({}) => {
  const {
    formData1,
    handleChange,
    GetDataPerson,
    Reason,
    GetDayWork,
    isCalculating,
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
                <Input
                  value={formData1.txt_ReqDate}
                  disabled
                  // value={formData1.txt_ReqNo}
                  // onChange={(e) => handleChange("txt_ReqDate", e.target.value)}
                />
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

            <tr>
              <td align="right">
                <label>Email :</label>
              </td>
              <td colSpan={3}>
                <Input
                  value={formData1.txt_Email}
                  onChange={(e) => handleChange("txt_Email", e.target.value)}
                />
              </td>

              <td align="right" style={{ width: "110px" }}>
                <label>เบอร์ภายใน/Tel :</label>
              </td>
              <td>
                <Input
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
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please Select Condition"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Reason}
                  onChange={(value, option) => {
                    handleChange("Sl_Reason", value);

                    // ตรวจสอบว่ามีค่า expenses ใน option ที่เลือก
                    if (option?.expenses) {
                      handleChange("txt_expenses", option.expenses);
                    } else {
                      handleChange("txt_expenses", "");
                    }
                  }}
                />
              </td>

              <td colSpan={3}>
                <Input
                  disabled={formData1.Sl_Reason !== "CD0208"}
                  value={formData1.txt_ReasonOther}
                  onChange={(e) =>
                    handleChange("txt_ReasonOther", e.target.value)
                  }
                  style={{ width: "100%" }}
                  placeholder="หากเลือกอื่นๆ กรุณากรอกสาเหตุที่ขอทำบัตรใหม่"
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
            <tr>
              <td colSpan={2} align="right" style={{}}>
                <label>
                  ไม่ได้บันทึกเวลาทำงานที่เครื่องบันทึกเวลา/No Record Working
                  Time :
                </label>{" "}
              </td>
              <td>
                <Input
                  value={formData1.Date_WorkingForm}
                  type="date"
                  onChange={(e) =>
                    handleChange("Date_WorkingForm", e.target.value)
                  }
                  // style={{ width: "80px" }}
                />
              </td>
              {console.log("isCalculating", isCalculating)}
              <td style={{ display: "flex", alignItems: "center" }}>
                <label style={{ marginRight: "5px" }}>to:</label>
                <Input
                  value={formData1.Date_WorkingTo}
                  style={{ width: "100%" }}
                  type="date"
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const startDate = new Date(formData1.Date_WorkingForm);

                    if (selectedDate < startDate) {
                      Swal.fire({
                        icon: "warning",
                        text: "วันที่สิ้นสุดต้องไม่น้อยกว่าวันที่เริ่มต้น!",
                      });
                      return;
                    }

                    handleChange("Date_WorkingTo", e.target.value);
                  }}
                />
              </td>
              <td>
                {" "}
                <Button
                  disabled={isCalculating}
                  onClick={() =>
                    GetDayWork(
                      formData1.Date_WorkingForm,
                      formData1.Date_WorkingTo
                    )
                  }
                >
                  {" "}
                  {isCalculating ? (
                    <>
                      <Spin size="small" style={{ marginRight: "5px" }} />
                      กำลังคำนวณ
                    </>
                  ) : (
                    "คำนวณ"
                  )}
                </Button>{" "}
              </td>
              {/**/}
            </tr>
            <tr>
              <td align="right">
                <label>วันที่ไม่ได้รูดบัตร (เฉพาะวันทำงาน):</label>{" "}
              </td>
              <td colSpan={9}>
                <TextArea
                  disabled
                  value={formData1.Date_DayWork}
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
                  // options={Supervisor}
                />
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  style={{
                    display:
                      formData1.txt_ReqStatusValue == "CD0101" ? "none" : "",
                  }}
                  name="radiogroup"
                  value={formData1.Rd_SupervisorApprove}
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
                  style={{
                    display:
                      formData1.txt_ReqStatusValue == "CD0101" ? "none" : "",
                  }}
                  // value={formData1.txt_SupervisorCooment}
                />
              </td>
            </tr>
          </table>
        </fieldset>
        <div style={{textAlign:'center',width:'100%',marginTop:'5px'}}><Button>Send Approve</Button> <Button>Save</Button> <Button>Reset</Button> </div>

        <br />
        <fieldset
          style={{
            display: ["CD0103", "CD0104"].includes(formData1.txt_ReqStatusValue)
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
          fdsfsdfsdf
        </fieldset>
      </Card>
    </div>
  );
};

export default RefferenceLetterMasterList;
