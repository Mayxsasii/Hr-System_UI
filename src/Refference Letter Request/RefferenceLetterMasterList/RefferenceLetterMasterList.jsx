import React, { useState, useEffect } from "react";
import {
  Input,
  Card,
  Checkbox,
  Select,
  Radio,
} from "antd";
const { TextArea } = Input;
import "../RefferenceLetter.css";

import { fn_RefferenceLetterMasterList } from "../RefferenceLetterMasterList/fn_RefferenceLetterMasterList";
const RefferenceLetterMasterList = ({}) => {
  const { formData1, contentStyle } = fn_RefferenceLetterMasterList();
  useEffect(() => {
    GetConditionClose();
    GetSupervisor()
  }, []);

  const GetConditionClose = async () => {
    await axios
      .post("/api/RefferenceLetter/GetConditionClose", {})
      .then(async (res) => {
        setCondition(res.data);
      });
  };
  const [Supervisor, setSupervisor] = useState([]);
  const [Condition, setCondition] = useState([]);
  const options = [
    { label: "หนังสือรับรองเงินเดือน", value: "LT0201" },
    { label: "หนังสือรับรองการทำงาน", value: "LT0202" },
    {
      label: "หนังสือรับรองการผ่านงาน (เฉพาะพนักงานที่ลาออก)",
      value: "LT0203",
    },
    { label: "หนังสือผ่านสิทธิสวัสดิการ ธอส.", value: "LT0204" },
    { label: "อื่นๆ (ใส่ชื่อเอกสารที่ต้องการ)", value: "LT0205" },
  ];

  const GetSupervisor = async () => {
    await axios
      .post("/api/RefferenceLetter/GetSupervisorUp", {
        Fac: formData1.txt_FactoryValue,
        Dept: formData1.txt_Department,
      })
      .then((res) => {
        setSupervisor(res.data);
      });
  };
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
          Refference Letter Request
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
                <td align="right">
                  {" "}
                  <label>Request No.:</label>
                </td>
                <td>
                  {" "}
                  <Input
                    value={formData1.txt_ReqNo}
                    disabled
                    onChange={(e) => handleChange("txt_ReqNo", e.target.value)}
                  />
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
                <td align="right">
                  <label>Request Status:</label>
                </td>
                <td colSpan={3}>
                  <Input
                    value={formData1.txt_ReqStatusDesc}
                    // style={{ width: "300px" }}
                    disabled
                    onChange={(e) =>
                      handleChange("txt_ReqStatusDesc", e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="right">
                  <label>ผู้ขอ/Requested By:</label>
                </td>
                <td>
                  <Input
                    value={formData1.txt_ReqbyID}
                    disabled
                    placeholder="กรุณากรอก ID Code"
                    
                  />
                </td>
                <td colSpan={2}>
                  <Input
                    value={formData1.txt_ReqbyName}

                    disabled
                  />
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
                  <Input
                    value={formData1.txt_EmpType}
                   
                    disabled
                  />
                </td>
                <td align="right">
                  <label>Join Date :</label>
                </td>
                <td>
                  <Input
                    value={formData1.txt_JoinDate}
                
                    disabled
                  />
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
                   disabled
                    value={formData1.txt_Email}
                   
                  />
                </td>
                <td align="right" style={{ width: "170px" }}>
                  <label>วันที่ต้องการ/Target Date :</label>
                </td>
                <td>
                  <Input
                     disabled
                    type="date"
                    style={{ width: "100%" }}
                    value={formData1.Date_Target || ""}
                  
                    placeholder="กรุณาเลือกวันที่"
                    
                  />
                </td>
                <td align="right">
                  <label>เบอร์ภายใน/Tel :</label>
                </td>
                <td>
                  <Input
                    disabled
                    placeholder="เบอร์ภายใน/Tel :"
                    value={formData1.txt_Tel}
                    style={{ width: "80px" }}
                   
                  />
                </td>
              </tr>
            </table>
            <Checkbox.Group
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginLeft: "30px",
              }}
              value={formData1.CB_letterType || []}
               disabled
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
                             disabled
                            style={{ width: "300px" }}
                            placeholder="กรุณาเลือกวันที่"
                            value={formData1.Date_Resignation}
                            
                          />
                        </div>
                      )}
                      {option.value === "LT0205" && (
                        <Input
                          type="text"
                           disabled
                          style={{ marginLeft: "10px", width: "500px" }}
                          placeholder="กรุณากรอกชื่อเอกสารที่ต้องการ"
                          value={formData1.txt_LetterOther}
                        />
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
                // marginBottom: "10px",
                marginLeft: "30px",
              }}
            >
              <label style={{ marginRight: "10px" }}>หมายเหตุ/Remark:</label>
              <TextArea
                 disabled
                value={formData1.txt_Remark}
                style={{ height: "50px" }}
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
                     disabled
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
                   
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    name="radiogroup"
                    disabled
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
                          formData1.txt_ReqStatusValue === "LT0101"
                            ? "none"
                            : "",
                      }}
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
                <td align="right" style={{ width: "150px" }}>
                  <label>Status :</label>
                </td>
                <td style={{ width: "360px" }}>
                  <Radio.Group
                    style={{ marginLeft: "5px" }}
                    name="radiogroup"
                    disabled
                    value={formData1.Rd_HRStatus}
                   
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
                   disabled
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
                    value={formData1.txt_HrStaff }
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
                    value={formData1.Date_HrConfirmAcDate}
                   disabled
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
                   disabled
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
                    disabled
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
                    disabled
                  />{" "}
                  <label style={{ marginLeft: "80px", marginRight: "5px" }}>
                    Tel :
                  </label>
                  <Input
                    style={{ width: "120px" }}
                    value={formData1.txt_RecriveByTel}
                    disabled
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
                    disabled
                    value={formData1.Date_RecriveDate}
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
