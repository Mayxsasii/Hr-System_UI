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
  Flex,
} from "antd";
const { TextArea } = Input;
import dayjs from "dayjs";
// import "../RefferenceLetter.css";

import Swal from "sweetalert2";
import { fn_NewEmployeeCard } from "../New Employee Card/fn_NewEmployeeCard";
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
    handleStatus
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
                 disabled
                  value={formData1.txt_ReqbyID}
                  placeholder="กรุณากรอก ID Code"
                 
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
                 disabled
                  value={formData1.txt_Email}
                 
                />
              </td>

              <td align="right" style={{ width: "110px" }}>
                <label>เบอร์ภายใน/Tel :</label>
              </td>
              <td>
                <Input
               disabled
                 
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
                 disabled
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please Select Condition"
                 
                  value={formData1.Sl_Reason}
                  options={Reason}
                 
                />
              </td>

              <td colSpan={3}>
                <Input
                 disabled
                  value={formData1.txt_ReasonOther}
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
                  style={{ width: "80px" }}
                />
              </td>
            </tr>
            {/* <tr
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
            </tr> */}
            <tr
              
            >
              <td align="right">
                <label>วันที่ไม่ได้รูดบัตร (เฉพาะวันทำงาน):</label>{" "}
              </td>
              <td colSpan={9}>
                <TextArea
                  disabled
                  value={formData1.Date_DayWork2}
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
                 disabled
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
                 disabled
                  
                  value={formData1.Sl_Supervisor}
                  style={{ width: "300px" }}
                
                  options={supervisor}
                  
                />
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
      
                 disabled
                  name="radiogroup"
                  value={formData1.Rd_SupervisorApprove}
                 
                />
              </td>
              <td style={{ width: "90px", textAlign: "right" }}>
                <div>
                  <label
                   
                  >
                    Action Date:
                  </label>
                </div>
              </td>
              <td style={{ width: "300px" }}>
                <Input
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
                  
                  >
                    Comment :
                  </label>
                </div>
              </td>
              <td colSpan={4}>
                <Input
               disabled
                  
                  value={formData1.txt_SupervisorComment}
                
                />
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
            HR Staff Action
          </legend>
          <table style={{ width: "100%" }}>
            <tr>
              <td align="right" style={{ width: "190px" }}>
                <label>Status :</label>
              </td>
              <td colSpan={2}>
                <Radio.Group
             disabled
                  style={{ marginLeft: "5px" }}
                  name="radiogroup"
                  value={formData1.Rd_HRStatus}
                
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
                disabled
                  showSearch
                  style={{
                    width: "300px",
                    display: formData1.Rd_HRStatus == "CD0108" ? "" : "none",
                  }}
                
                  options={Condition}
                  value={formData1.Sl_HrCondion}
                  
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
                  
                  style={{
                    width: "100%",
                  }}
                  disabled
                  value={formData1.txt_cause}
                  options={Reason}
                 
                />
              </td>
              <td>
                {" "}
                <Input
             
                  style={{ width: "440px" }}
                  disabled
                  placeholder="อื่นๆโปรดระบุ"
                  
                  value={formData1.txt_CauseOther}
                />
                <label style={{ marginLeft: "30px" }}>ค่าใช้จ่ายจริง :</label>
                <Input
                disabled
                  style={{
                    width: "70px",
                    marginLeft: "5px",
                  }}
                  
                  value={formData1.txt_ExpensesCause}
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label>Comment :</label>
              </td>
              <td colSpan={2}>
                <TextArea
                  disabled
                  value={formData1.txt_HrComment}
                 
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
                disabled
                  value={formData1.txt_RecriveById}
                  
                 
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
                  disabled
                  style={{ width: "505px" }}
                  value={formData1.txt_RecriveByEmail}
                 
                />{" "}
                <label style={{ marginLeft: "80px", marginRight: "5px" }}>
                  Tel :
                </label>
                <Input
                  disabled
                  style={{ width: "120px" }}
                  value={formData1.txt_RecriveByTel}
                 
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label>Recrive Date :</label>
              </td>
              <td colSpan={2}>
                <Input
                  disabled
                  type="date"
                  style={{
                    width: "300px",
                  }}
                 
                  value={formData1.Date_RecriveDate}
                
                />
                <label style={{ marginLeft: "30px" }}>Payment status : </label>
                <Select
                    disabled
                  
                  style={{
                    width: "300px",
                  }}
                  value={formData1.Sl_PaymentStatus}
               
                  options={StatusPayment}
       
                />
                <Input
                 disabled
                  style={{ width: "300px", marginLeft: "5px" }}
                  placeholder="อื่นๆโปรดระบุ"
                  value={formData1.txt_PaymentStatusOther}
                  
                />
              </td>
            </tr>
          </table>
        </fieldset>

      </Card>
    </div>
  );
};

export default RefferenceLetterMasterList;
