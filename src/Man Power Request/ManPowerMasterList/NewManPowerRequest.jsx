import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Input,
  message,
  Steps,
  theme,
  Checkbox,
  Select,
  DatePicker,
  Radio
} from "antd";
import {
  UploadOutlined,
  PlusCircleOutlined,
  LinkOutlined,
  CaretDownOutlined
} from "@ant-design/icons";
const { TextArea } = Input;
import moment from "moment";
import { fn_ManPower } from "../fn_ManPower";
import { fn_NewManPowerRequset } from "../NewManPowerRequset/fn_NewManPowerRequset";
import { fn_ReasontoRequest } from "../ReasontoRequest/fn_ReasontoRequest";
import { Await, useLocation } from "react-router-dom";
import { useLoading } from "../../loading/fn_loading";
const Step1 = ({}) => {
  const {
    formData1,
    GetdataEdit
  } = fn_ManPower();
  const { token } = theme.useToken();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ReqNo = queryParams.get("ReqNo");
  const { showLoading, hideLoading } = useLoading();
  const { Factory } = fn_NewManPowerRequset(formData1);
  const { Education,Course,Field,English } = fn_ReasontoRequest();

  useEffect(async() => {
    if (ReqNo != null) {
      showLoading("Loading...");
      await GetdataEdit();
      hideLoading();
    }
  }, []);

  return (
    <>
    {/* <div style={{ marginBottom: "20px", marginLeft: "10px",  fontSize: "18px",  fontWeight: "bold", }}>
      <p>Man Power Master List</p>
  </div> */}
    <div
      style={{
        padding: "10px",
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 30,
        marginRight: 10,
      }}
    >
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        Man Power Request{" "}
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
              disabled
              showSearch
              value={formData1.SL_Factory}
              style={{
                width: "200px",
                marginLeft: "5px",
              }}
              placeholder="Select Factory"
              options={Factory}
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
              value={formData1.txt_ReqBy}
            />
          </td>
          <td style={{ textAlign: "right" }}>Department:</td>
          <td>
            <Select
              disabled
              showSearch
              value={formData1.SL_Department}
              style={{
                width: "200px",
                marginLeft: "5px",
              }}

              // options={Department}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Email :</td>
          <td colSpan={3}>
            <Input
              value={formData1.txt_Email}
              disabled
              style={{ marginLeft: "5px", width: "600px" }}
            />
          </td>
          <td style={{ textAlign: "right" }}>Tel :</td>
          <td>
            <Input
              style={{ marginLeft: "5px", width: "200px" }}
              value={formData1.txt_TelNo}
              disabled
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Position Requirement :</td>
          <td>
            <Select
              disabled
              value={formData1.SL_Position}
              style={{
                width: "200px",
                marginLeft: "5px",
              }}
              placeholder="Select Position Requirement"

              // options={Position}
            />
          </td>
          <td style={{ textAlign: "right" }}>Target Date :</td>
          <td>
            <DatePicker
              disabled
              style={{ marginLeft: "5px", width: "200px" }}
              value={
                formData1.Date_Target
                  ? moment(formData1.Date_Target, "DD/MM/YYYY")
                  : null
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
              disabled
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              value={formData1.CB_EmpRequirment}
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
                  disabled
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

                  // options={EmployeeType}
                />
                <Input
                  disabled
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
                />
              </div>
              <div style={{ marginTop: "2px" }}>
                <Checkbox value="MR0290">Other</Checkbox>
                <Input
                  disabled
                  style={{
                    width: "815px",
                    display: formData1.CB_EmpRequirment.includes("MR0290")
                      ? ""
                      : "none",
                  }}
                  value={formData1.txt_EmpReq_Other}
                />
              </div>
            </Checkbox.Group>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>Remark :</td>
          <td colSpan={5}>
            <TextArea
              disabled
              value={formData1.txt_Remark}
              style={{ width: "1000px", height: "50px" }}
            />
          </td>
        </tr>
        </table>
        <div style={{borderBottom: "2px dashed #706D54",margin:'5px'}}></div>
        {/* step2 */}
        <p
        style={{
          fontSize: "18px",
          margin: "10px 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        Reason to request {""}
        {/* {formData1.txt_ReqNo ? (
          <>
            {" >>"} {formData1.txt_ReqNo}
          </>
        ) : (
          ""
        )} */}
      </p>
        <Checkbox
          style={{ marginLeft: "10px" }}
          checked={formData1.CB_Substitube}
          disabled
        >
          Substitube (เพื่อทดแทนคนเก่า)
        </Checkbox>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "90px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            Total:{" "}
            <Input
              value={formData1.txt_TotalSubstitube}
              disabled
              style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
            />{" "}
            Person
            <Checkbox
              checked={formData1.CB_FileSubstitube}
              style={{ marginLeft: "30px" }}
              disabled
            >
              Attach file:
            </Checkbox>
            <div className="file-upload">
              <label
                htmlFor="fileInputSUB"
                className={`custom-file-upload ${
                  !formData1.CB_Substitube ||
                  !formData1.CB_FileSubstitube ||
                  (formData1.StatusType !== "C" && formData1.StatusType !== "R")
                    ? "disabled"
                    : ""
                }`}
                style={{
                  pointerEvents:
                    !formData1.CB_Substitube ||
                    !formData1.CB_FileSubstitube ||
                    (formData1.StatusType !== "C" &&
                      formData1.StatusType !== "R")
                      ? "none"
                      : "auto",
                  opacity:
                    !formData1.CB_Substitube ||
                    !formData1.CB_FileSubstitube ||
                    (formData1.StatusType !== "C" &&
                      formData1.StatusType !== "R")
                      ? 0.5
                      : 1,
                }}
              >
                <UploadOutlined /> Click to Attach file
              </label>
              <input id="fileInputSUB" type="file" disabled />
             
            </div>
          </div>
          <Button
            // disabled={!formData1.CB_Substitube || formData1.CB_FileSubstitube}
            disabled
            type="primary"
            style={{
              marginRight: "30px",
              display:
                formData1.StatusType == "C" || formData1.StatusType == "R"
                  ? ""
                  : "none",
            }}
            icon={<PlusCircleOutlined />}
          >
            Add
          </Button>
        </div>
        <div style={{ marginLeft: "395px" }}>
          {formData1.FileName_Sub && (
            <p style={{ color: "black", margin: 0, marginTop: "0px" }}>
              <LinkOutlined style={{ marginRight: "5px" }} />
              {formData1.FileName_Sub}
            </p>
          )}
        </div>
        <br />
        {Array.from(
          { length: formData1.txt_TotalSubstitube },
          (Data, index) => (
            <div
              key={index}
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                alignItems: "center",
                border: "1px dashed #b0aeae",
              }}
            >
              <div
                key={index}
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  paddingLeft: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ marginRight: "10px" }}>{index + 1}.</p>
                <Input
                  disabled
                  size="middle"
                  value={formData1.Person_Sub[index]?.ID_Code||''}
                  style={{ width: "100px", marginLeft: "10px" }}
                />
                <Input
                  disabled
                  size="middle"
                  value={formData1.Person_Sub[index]?.Emp_Name||''}
                  style={{ width: "200px", marginLeft: "5px" }}
                />
                <Input
                  disabled
                  size="middle"
                  style={{ width: "80px", marginLeft: "5px" }}
                  value={formData1.Person_Sub[index]?.Cost_Center||''}
                />
                <Input
                  size="middle"
                  disabled
                  value={formData1.Person_Sub[index]?.Job_grade||''}
                  style={{ width: "80px", marginLeft: "5px" }}
                />
                <p style={{ marginLeft: "10px" }}>For Dept.:</p>

                <Select
                  disabled
                  value={formData1.Person_Sub[index]?.Dept||null}
                  style={{ width: "80px", marginLeft: "5px" }}
                  placeholder="Select Dept"

                  // options={ForDept}
                />
                <p style={{ marginLeft: "10px" }}>Request Job Grade :</p>
                <Select
                  disabled
                  mode="multiple"
                  value={formData1.Person_Sub[index]?.Req_Jobgrade||null}
                  style={{ width: "150px", marginLeft: "5px" }}
                  placeholder="Select Dept"

                  // options={ForReqJobGrade}
                />
              </div>
              <table
                className="TB_ReasontoRequest"
                style={{ marginLeft: "80px" }}
              >
                <tr>
                  <td align="right">วุฒิการศึกษา (Education) :</td>
                  <td colSpan={1}>
                    {" "}
                    <Select
                      disabled
                      mode="multiple"
                      value={formData1.Person_Sub[index]?.Education||null}
                      style={{ width: "400px", marginLeft: "5px" }}
                      placeholder="Select Education"

                      options={Education}
                    />
                  </td>
                  <td>
                    {" "}
                    <Input
                      disabled
                      style={{
                        display:
                          formData1.Person_Sub[index]?.Education &&
                          formData1.Person_Sub[index]?.Education.includes(
                            "MR0490"
                          )
                            ? ""
                            : "none",
                      }}
                      value={formData1.Person_Sub[index]?.EducationOther||''}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td align="right">Course (หลักสูตร):</td>
                  <td colSpan={1}>
                    <Select
                      disabled
                      showSearch
                      mode="multiple"
                      value={formData1.Person_Sub[index]?.Course||null}
                      style={{ width: "400px", marginLeft: "5px" }}
                      placeholder="Select Course"

                      options={Course}
                    />
                  </td>
                  <td>
                    {" "}
                    <Input
                      disabled
                      style={{
                        display:
                          formData1.Person_Sub[index]?.Course &&
                          // formData1.Person_Sub[index]?.Course == "MR0507"
                          formData1.Person_Sub[index]?.Course.includes("MR0507")
                            ? ""
                            : "none",
                      }}
                      value={formData1.Person_Sub[index]?.CourseOther||''}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td align="right">Field (สาขาวิชา):</td>
                  <td colSpan={1}>
                    {" "}
                    <Select
                      disabled
                      mode="multiple"
                      value={formData1.Person_Sub[index]?.Field||null}
                      style={{ width: "400px", marginLeft: "5px" }}
                      placeholder="Select Field"

                      options={Field}
                    />
                  </td>
                  <td>
                    {" "}
                    <Input
                      disabled
                      style={{
                        display:
                          formData1.Person_Sub[index]?.Field &&
                          formData1.Person_Sub[index]?.Field.includes("MR0699")
                            ? ""
                            : "none",
                      }}
                      value={formData1.Person_Sub[index]?.FieldOther||''}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">Special (คุณสมบัติพิเศษ):</td>
                  <td colSpan={2}>
                    <TextArea
                      disabled
                      value={formData1.Person_Sub[index]?.Special||''}
                      style={{
                        width: "950px",
                        height: "50px",
                        marginLeft: "5px",
                      }}
                      maxLength={2000}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">Experience (ประสบการณ์):</td>
                  <td colSpan={2}>
                    {" "}
                    <TextArea
                      disabled
                      style={{
                        width: "950px",
                        height: "50px",
                        marginLeft: "5px",
                      }}
                      maxLength={2000}
                      value={formData1.Person_Sub[index]?.Experience||''}
                    />
                  </td>
                </tr>

                <tr>
                  <td align="right">English Language or other :</td>
                  <td style={{ width: "300px" }}>
                    {" "}
                    <Select
                      showSearch
                      disabled
                      value={formData1.Person_Sub[index]?.StepLanguage||null}
                      style={{ width: "400px", marginLeft: "5px" }}
                      placeholder="Select English Language or other"

                      options={English}
                    />
                  </td>
                  <td>
                    {" "}
                    <Input
                      disabled
                      value={formData1.Person_Sub[index]?.Sub_StepLanguage_other||''}
                      style={{
                        display:
                          formData1.Person_Sub[index]?.StepLanguage &&
                          formData1.Person_Sub[index]?.StepLanguage == "MR0790"
                            ? ""
                            : "none",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">คุณสมบัติอย่างละเอียด :</td>
                  <td colSpan={2}>
                    <div className="file-upload" style={{ marginLeft: "5px" }}>
                      <label
                        htmlFor="fileInputFeatureSUB"
                        className={`custom-file-upload ${
                          formData1.CB_FileSubstitube ||
                          (formData1.StatusType !== "C" &&
                            formData1.StatusType !== "R")
                            ? "disabled"
                            : ""
                        }`}
                        style={{
                          pointerEvents:
                            formData1.CB_FileSubstitube ||
                            (formData1.StatusType !== "C" &&
                              formData1.StatusType !== "R")
                              ? "none"
                              : "auto",
                          opacity:
                            formData1.CB_FileSubstitube ||
                            (formData1.StatusType !== "C" &&
                              formData1.StatusType !== "R")
                              ? 0.5
                              : 1,
                        }}
                      >
                        <UploadOutlined /> Click to Attach file
                      </label>
                      <input id="fileInputFeatureSUB" type="file" disabled />
                      {formData1.Person_Sub[index]?.Filefeature && (
                        <p
                          style={{
                            color: "black",
                            margin: 0,
                            marginTop: "0px",
                            marginLeft: "10px",
                          }}
                        >
                          <LinkOutlined style={{ marginRight: "5px" }} />{" "}
                          {formData1.Person_Sub[index]?.Filefeature}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          )
        )}
        <br />
        <Checkbox
          style={{ marginLeft: "10px" }}
          checked={formData1.CB_Additional}
          disabled
        >
          Additional (เพิ่มกำลังคน)
        </Checkbox>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "90px",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <p style={{ textAlign: "right", marginRight: "5px" }}>
              What is target of capacity up? <br /> (Please notify)
            </p>
            <TextArea
              value={formData1.txt_TargetCapacity1}
              style={{ width: "1000px", height: "50px", marginLeft: "5px" }}
              maxLength={2000}
              disabled
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextArea
              disabled
              style={{ width: "1000px", height: "50px", marginLeft: "195px" }}
              maxLength={2000}
              value={formData1.txt_TargetCapacity2}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "90px",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            Total:{" "}
            <Input
              value={formData1.txt_TotalAdditional}
              disabled
              style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
            />{" "}
            Person
            <Checkbox
              style={{ marginLeft: "30px" }}
              disabled
              checked={formData1.CB_FileAdditional}
            >
              Attach file:
            </Checkbox>
            <div className="file-upload">
              <label
                htmlFor="fileInputADD"
                className={`custom-file-upload ${
                  !formData1.CB_Additional ||
                  !formData1.CB_FileAdditional ||
                  (formData1.StatusType !== "C" && formData1.StatusType !== "R")
                    ? "disabled"
                    : ""
                }`}
                style={{
                  pointerEvents:
                    !formData1.CB_Additional ||
                    !formData1.CB_FileAdditional ||
                    (formData1.StatusType !== "C" &&
                      formData1.StatusType !== "R")
                      ? "none"
                      : "auto",
                  opacity:
                    !formData1.CB_Additional ||
                    !formData1.CB_FileAdditional ||
                    (formData1.StatusType !== "C" &&
                      formData1.StatusType !== "R")
                      ? 0.5
                      : 1,
                }}
              >
                <UploadOutlined /> Click to Attach file
              </label>
              <input id="fileInputADD" type="file" disabled />
             
            </div>
          </div>
        </div>

        <div style={{ marginLeft: "395px" }}>
          {formData1.FileName_Add && (
            <p style={{ color: "black", margin: 0, marginTop: "0px" }}>
              <LinkOutlined style={{ marginRight: "5px" }} />{" "}
              {formData1.FileName_Add}{" "}
            </p>
          )}
        </div>
        <br />
        {Array.from({ length: formData1.txt_TotalAdditional }, (_, index) => (
          <div
            key={index}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              alignItems: "center",
              border: "1px dashed #b0aeae",
            }}
          >
            <table
              className="TB_ReasontoRequest"
              style={{ marginLeft: "80px" }}
            >
              <tr>
                <td align="right">For Dept. :</td>
                <td colSpan={2} style={{}}>
                  <Select
                    disabled
                    showSearch
                    value={formData1.Person_ADD[index].Dept||null}
                    style={{
                      width: "80px",
                      marginLeft: "5px",
                      marginRight: "40px",
                    }}
                    placeholder="Select Dept"

                    // options={ForDept}
                  />
                  Request Job Grade :
                  <Select
                    disabled
                    mode="multiple"
                    value={formData1.Person_ADD[index].Req_Jobgrade||null}
                    style={{ width: "250px", marginLeft: "5px" }}
                    placeholder="Select Dept"

                    // options={ForReqJobGrade}
                  />
                </td>
              </tr>
              <tr>
                <td align="right">วุฒิการศึกษา (Education) :</td>
                <td colSpan={1}>
                  <Select
                    mode="multiple"
                    disabled
                    value={formData1.Person_ADD[index].Education||null}
                    style={{ width: "400px", marginLeft: "5px" }}
                    placeholder="Select Education"

                    options={Education}
                  />
                </td>
                <td>
                  {" "}
                  <Input
                    style={{
                      display:
                        formData1.Person_ADD[index].Education &&
                        formData1.Person_ADD[index].Education.includes("MR0490")
                          ? ""
                          : "none",
                    }}
                    value={formData1.Person_ADD[index].EducationOther||''}
                    disabled
                  ></Input>
                </td>
              </tr>
              <tr>
                <td align="right">Course (หลักสูตร):</td>
                <td colSpan={1}>
                  {" "}
                  <Select
                    mode="multiple"
                    disabled
                    value={formData1.Person_ADD[index].Course||null}
                    style={{ width: "400px", marginLeft: "5px" }}
                    placeholder="Select Course"

                    options={Course}
                  />
                </td>
                <td>
                  {" "}
                  <Input
                    disabled
                    style={{
                      display:
                        formData1.Person_ADD[index].Course &&
                        // formData1.Person_ADD[index].Course == "MR0507"
                        formData1.Person_ADD[index].Course.includes("MR0507")
                          ? ""
                          : "none",
                    }}
                    value={formData1.Person_ADD[index].CourseOther||''}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td align="right">Field (สาขาวิชา):</td>
                <td colSpan={1}>
                  {" "}
                  <Select
                    disabled
                    mode="multiple"
                    value={formData1.Person_ADD[index].Field||null}
                    style={{ width: "400px", marginLeft: "5px" }}
                    placeholder="Select Field"

                    options={Field}
                  />
                </td>
                <td>
                  {" "}
                  <Input
                    disabled
                    style={{
                      display:
                        formData1.Person_ADD[index].Field &&
                        formData1.Person_ADD[index].Field.includes("MR0699")
                          ? ""
                          : "none",
                    }}
                    value={formData1.Person_ADD[index].FieldOther||''}
                  />
                </td>
              </tr>
              <tr>
                <td align="right">Special (คุณสมบัติพิเศษ):</td>
                <td colSpan={2}>
                  {" "}
                  <TextArea
                    disabled
                    style={{
                      width: "960px",
                      height: "50px",
                      marginLeft: "5px",
                    }}
                    maxLength={2000}
                    value={formData1.Person_ADD[index].Special||''}
                  />
                </td>
              </tr>
              <tr>
                <td align="right">Experience (ประสบการณ์):</td>
                <td colSpan={2}>
                  {" "}
                  <TextArea
                    disabled
                    style={{
                      width: "960px",
                      height: "50px",
                      marginLeft: "5px",
                    }}
                    maxLength={2000}
                    value={formData1.Person_ADD[index].Experience||''}
                  />
                </td>
              </tr>

              <tr>
                <td align="right">English Language or other :</td>
                <td style={{ width: "300px" }}>
                  {" "}
                  <Select
                    // disabled={Disable.ADD_StepLanguage}
                    value={formData1.Person_ADD[index].StepLanguage||null}
                    style={{ width: "400px", marginLeft: "5px" }}
                    placeholder="Select English Language or other"
                    disabled
                    options={English}
                  />
                </td>
                <td>
                  {" "}
                  <Input
                    disabled
                    style={{
                      display:
                        formData1.Person_ADD[index].StepLanguage &&
                        formData1.Person_ADD[index].StepLanguage == "MR0790"
                          ? ""
                          : "none",
                    }}
                    value={formData1.Person_ADD[index].StepLanguage_other||''}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td align="right">คุณสมบัติอย่างละเอียด :</td>
                <td colSpan={2}>
                  <div className="file-upload" style={{ marginLeft: "5px" }}>
                    <label
                      htmlFor="fileInputFeatureADD"
                      className={`custom-file-upload ${
                        formData1.CB_FileAdditional ||
                        (formData1.StatusType !== "C" &&
                          formData1.StatusType !== "R")
                          ? "disabled"
                          : ""
                      }`}
                      style={{
                        pointerEvents:
                          formData1.CB_FileAdditional ||
                          (formData1.StatusType !== "C" &&
                            formData1.StatusType !== "R")
                            ? "none"
                            : "auto",
                        opacity:
                          formData1.CB_FileAdditional ||
                          (formData1.StatusType !== "C" &&
                            formData1.StatusType !== "R")
                            ? 0.5
                            : 1,
                      }}
                    >
                      <UploadOutlined /> Click to Attach file
                    </label>
                    <input id="fileInputFeatureADD" type="file" disabled />
                    {formData1.Person_ADD[index].Filefeature && (
                      <p
                        style={{
                          color: "black",
                          margin: 0,
                          marginTop: "0px",
                          marginLeft: "10px",
                        }}
                      >
                        <LinkOutlined style={{ marginRight: "5px" }} />{" "}
                        {formData1.Person_ADD[index].Filefeature||''}{" "}
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            </table>
          </div>
        ))}
      {/* step3 */}
      <div style={{borderBottom: "2px dashed #706D54",margin:'5px'}}></div>
      <p
        style={{
          fontSize: "18px",
          margin: "10px 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        For Approve{""}
        {/* {formData1.txt_ReqNo ? (
          <>
            {" >>"} {formData1.txt_ReqNo}
          </>
        ) : (
          ""
        )} */}
      </p>
      <table className="TB_ForApp">
        <tr>
          <td style={{ textAlign: "right" }}>Department Manager:</td>
          <td style={{ width: "300px" }}>
            <Select
              showSearch
              // Disable={Disable.SL_DepartmentManager}
              disabled
              value={formData1.SL_DepartmentManager}
              style={{ width: "300px" }}
              placeholder="Select Department Manager"
             
              // options={DepartmentManager}
             
            />
          </td>
          <td style={{ textAlign: "center", width: "500px" }}>
            {" "}
            {/* ||formData1.ID_Status!="MR0103"||formData1.ID_Status!="MR0104" */}
            <Radio.Group
              disabled
              style={{ display: formData1.ID_Status == "MR0101" ? "none" : "" }}
              name="radiogroup"
              value={formData1.CB_DepartmentApprove}
             
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
            disabled
              style={{
                width: "1200px",
                display: formData1.ID_Status == "MR0101"  ? "none" : "",
              }}
              value={formData1.txt_CommentDepartmentmanager}
              
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td style={{ textAlign: "right" }}>FM/GM:</td>
          <td>
            <Select
              disabled
              value={formData1.SL_FMGM}
              style={{ width: "300px" }}
              placeholder="Select FM/DM"
              
              // options={FMGM}
              
            />
          </td>
          <td style={{ textAlign: "center" }}>
            <Radio.Group
            disabled
              style={{  display: ["MR0101", "MR0102","MR0129"].includes(formData1.ID_Status) ? "none" : "",}}
              name="radiogroup"
              value={formData1.CB_FMGMApprove}
              
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
            disabled
              style={{
                width: "1200px",
                display: ["MR0101", "MR0102","MR0129"].includes(formData1.ID_Status) ? "none" : "",
              }}
              value={formData1.txt_CommentFMGM}
              
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td style={{ textAlign: "right" }}>HR Manager:</td>
          <td>
            <Select
            disabled
              
              value={formData1.SL_HRManager}
              style={{ width: "300px" }}
              placeholder="Select HR Manager"
              
              // options={HrManager}
             
            />
          </td>
          <td style={{ textAlign: "center" }}>
            {" "}
            <Radio.Group
            disabled
              style={{   display: ["MR0101", "MR0102","MR0103","MR0129","MR0139"].includes(formData1.ID_Status) ? "none" : "", }}
              name="radiogroup"
              value={formData1.CB_HRManagerApprove}
              
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
            disabled
              style={{
                width: "1200px",
                display: ["MR0101", "MR0102","MR0103","MR0129","MR0139"].includes(formData1.ID_Status) ? "none" : "",
              }}
              value={formData1.txt_CommentHRManager}
              
            />
          </td>
        </tr>
      </table>
      {/* step4 */}
      <div style={{borderBottom: "2px dashed #706D54",margin:'5px'}}></div>
      <p
          style={{
            fontSize: "18px",
            margin: "0 10px 0 0",
            fontWeight: "bold",
          }}
        >
          HR Staff Action{""}
          {/* {formData1.txt_ReqNo ? (
            <>
              {" >>"} {formData1.txt_ReqNo}
            </>
          ) : (
            ""
          )} */}
        </p>
      <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "5px",
            marginLeft: "50px",
          }}
        >
          <p style={{ marginRight: "10px" }}>Status:</p>
          <Radio.Group
            disabled
            style={{ marginLeft: "10px", marginRight: "10px" }}
            name="radiogroup"
           
            value={formData1.Radio_HrStatus}
           
            options={[
              {
                value: "MR0106",
                label: "On Process",
              },
              {
                value: "MR0107",
                label: "Close",
              },
              {
                value: "MR0108",
                label: "Close by condition",
              },
            ]}
          />

        
          <Select
            value={formData1.Sl_HrCloseBy}
            style={{
              width: "300px",
              display: formData1.Radio_HrStatus == "MR0108" ? "" : "none",
            }}
            placeholder="Please Select Condition"
            
            // options={ConditionClose}
           
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
        >
          <p style={{ marginRight: "5px" }}>HR Staff:</p>
          <Input
            style={{ width: "300px" }}
            disabled
            value={formData1.txt_HrStaffBy}
          />
          <p style={{ marginRight: "5px", marginLeft: "35px" }}>Action Date:</p>
         
          <Input
            disabled
            style={{
              width: "275px",
              // display: ["MR0101", "MR0102","MR0129"].includes(formData1.ID_Status) ? "none" : "",
            }}
            value={formData1.Date_HrAction }
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
        >
          <p style={{ marginRight: "5px" }}>Comment:</p>
          <TextArea
            value={formData1.txt_HrComment}
            disabled
            style={{ width: "1150px", height: "50px", marginLeft: "5px" }}
            maxLength={2000}
          />
        </div>

        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}
        >
          <div
            style={{
              //   border: "2px dashed #80CBC4",
              borderRadius: "15px",
              width: "180px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "15px",
              backgroundColor: "#FFB433",
            }}
          >
            <p style={{ margin: 4, fontSize: "16px" }}>
              Result after interview
            </p>
          </div>
          Total Request:{" "}
          <Input
            value={
              formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional
            }
            disabled
            style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
          />{" "}
          <p style={{ marginLeft: "" }}> Person</p>
          <p
            style={{
              marginLeft: "50px",
              display: !formData1.CB_HrFileAttach ? "none" : "",
            }}
          >
            Manual Completed :
          </p>
          <Input
            value={formData1.txt_TotalManual}
            style={{
              width: "80px",
              marginLeft: "10px",
              marginRight: "5px",
              display: !formData1.CB_HrFileAttach ? "none" : "",
            }}
            disabled
          
          />{" "}
          <p style={{ display: !formData1.CB_HrFileAttach ? "none" : "" }}>
            {" "}
            Person
          </p>
          <p style={{ marginLeft: "50px" }}>Remain :</p>
          <Input
            value={formData1.txt_TotalRemain}
            disabled
            style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
          />{" "}
          <p style={{ marginLeft: "" }}> Person</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          {" "}
          <Checkbox
            disabled
            checked={formData1.CB_HrFileAttach}
           
            style={{ marginLeft: "30px" }}
          >
            Attach file:
          </Checkbox>
          <div className="file-upload" style={{ marginLeft: "10px" }}>
            <label
              htmlFor="fileInputHr"
              className={`custom-file-upload ${
                formData1.CB_HrFileAttach ||
                formData1.ID_Status == "MR0107" ||
                formData1.ID_Status == "MR0108"
                  ? "disabled"
                  : ""
              }`}
              style={{
                pointerEvents: !formData1.CB_HrFileAttach ? "none" : "auto",
                opacity:
                  !formData1.CB_HrFileAttach ||
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                    ? 0.5
                    : 1,
              }}
            >
              <UploadOutlined /> Click to Attach file
            </label>
            <input
              id="fileInputHr"
              type="file"
              disabled
            />
            {formData1.Hr_FileAttach && (
              <p
                style={{
                  color: "black",
                  margin: 0,
                  marginTop: "0px",
                  marginLeft: "10px",
                }}
              >
                <LinkOutlined style={{ marginRight: "5px" }} />{" "}
                {formData1.Hr_FileAttach}{" "}
                <CloseOutlined
                  
                  style={{
                    marginLeft: "20px",
                    cursor: "pointer",
                    color: "red",
                 
                  }}
                />
              </p>
            )}
          </div>
        </div>
        <div>
          <p
            style={{
              fontSize: "15px",
              margin: "0 0 10px 40px",
              fontWeight: "bold",
              display: formData1.txt_TotalSubstitube > 0 ? "" : "none",
            }}
          >
            <CaretDownOutlined /> Substitube (เพื่อทดแทนคนเก่า)
          </p>
        </div>

        {Array.from({ length: formData1.txt_TotalSubstitube }, (_, index) => (
          <div
            key={index}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              alignItems: "center",
              border: "1px dashed #b0aeae",
            }}
          >
            <div
              key={index}
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                paddingLeft: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p style={{ marginRight: "10px" }}>{index + 1}.</p>
              <Input
                size="middle"
                disabled
                value={formData1.Person_Sub[index]?.ID_Code}
                style={{ width: "100px", marginLeft: "10px" }}
              />
              <Input
                size="middle"
                value={formData1.Person_Sub[index]?.Emp_Name}
                disabled
                style={{ width: "200px", marginLeft: "5px" }}
              />
              <Input
                size="middle"
                value={formData1.Person_Sub[index]?.Cost_Center}
                disabled
                style={{ width: "80px", marginLeft: "5px" }}
              />
              <Input
                size="middle"
                value={formData1.Person_Sub[index]?.Job_grade}
                disabled
                style={{ width: "80px", marginLeft: "5px" }}
              />
              <p style={{ marginLeft: "10px" }}>For Dept.:</p>
              <Input
                value={formData1.Person_Sub[index]?.Dept}
                disabled
                style={{ width: "80px", marginLeft: "5px" }}
              ></Input>
              <p style={{ marginLeft: "10px" }}>Request Job Grade :</p>
              <Input
                value={formData1.Person_Sub[index]?.Req_Jobgrade}
                disabled
                style={{ width: "300px", marginLeft: "5px" }}
              ></Input>
            </div>
            <Checkbox
              disabled
              checked={formData1.Hr_Sub[index]?.CB_Complete}
             
              style={{ marginLeft: "60px" }}
            >
              Completed
            </Checkbox>
            <div
              key={index}
              style={{
                marginLeft: "30px",
                marginRight: "10px",
                paddingLeft: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Emp ID :
              <Input
                size="middle"
                // disabled={!formData1.Hr_Sub[index].CB_Complete}
                
                disabled
                value={formData1.Hr_Sub[index]?.Emp_id}
                style={{
                  width: "100px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
              Name :
              <Input
                size="middle"
                disabled
               
                value={formData1.Hr_Sub[index]?.Emp_name}
                style={{
                  width: "200px",
                  marginLeft: "5px",
                  marginRight: "10px",
                }}
              />
              Surname :
              <Input
                size="middle"
                value={formData1.Hr_Sub[index]?.Emp_sername}
                disabled
                
                style={{ width: "200px", marginLeft: "5px" }}
              />
             
              <p style={{ marginLeft: "10px" }}>Join date:</p>
              <Input
                type="date"
                disabled
                style={{ marginLeft: "5px", width: "200px" }}
                value={
                  formData1.Hr_Sub[index]?.Emp_JoinDate
                    ? formData1.Hr_Sub[index]?.Emp_JoinDate.split("/")
                        .reverse()
                        .join("-")
                    : ""
                }
               
              />
            </div>
          </div>
        ))}
        <div>
          <p
            style={{
              fontSize: "15px",
              margin: "10px 0 10px 40px",
              fontWeight: "bold",
              display: formData1.txt_TotalAdditional > 0 ? "" : "none",
            }}
          >
            <CaretDownOutlined /> Additional (เพิ่มกำลังคน)
          </p>
        </div>
        {Array.from({ length: formData1.txt_TotalAdditional }, (_, index) => (
          <div
            key={index}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              alignItems: "center",
              border: "1px dashed #b0aeae",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
                marginTop: "5px",
              }}
            >
              <p style={{ margin: 0 }}>{index + 1}.</p>
              <Checkbox
                disabled
                checked={formData1.Hr_Add[index].CB_Complete}
          
                style={{ marginLeft: "30px" }}
              >
                Completed
              </Checkbox>

              <p style={{ marginLeft: "25px" }}>For Dept.:</p>
              <Input
                value={formData1.Person_ADD[index]?.Dept}
                disabled
                style={{ width: "80px", marginLeft: "5px" }}
              ></Input>
              <p style={{ marginLeft: "10px" }}>Request Job Grade :</p>
              <Input
                value={formData1.Person_ADD[index]?.Req_Jobgrade}
                disabled
                style={{ width: "300px", marginLeft: "5px" }}
              ></Input>
            </div>
            <div
              key={index}
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                paddingLeft: "10px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px",
                // border:'1px solid red'
              }}
            ></div>
            <div
              key={index}
              style={{
                marginLeft: "30px",
                marginRight: "10px",
                paddingLeft: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Emp ID :
              <Input
                size="middle"
                disabled
                
                value={formData1.Hr_Add[index]?.Emp_id}
                style={{
                  width: "100px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
              Name :
              <Input
                size="middle"
                disabled
                
                value={formData1.Hr_Add[index]?.Emp_name}
                style={{
                  width: "200px",
                  marginLeft: "5px",
                  marginRight: "10px",
                }}
              />
              Surname :
              <Input
                size="middle"
                disabled
                value={formData1.Hr_Add[index]?.Emp_sername}
               
                style={{ width: "200px", marginLeft: "5px" }}
              />
              <p style={{ marginLeft: "10px" }}>Join date:</p>
             
              <Input
                type="date"
                disabled
                style={{ marginLeft: "5px", width: "200px" }}
                value={
                  formData1.Hr_Add[index]?.Emp_JoinDate
                    ? formData1.Hr_Add[index]?.Emp_JoinDate.split("/")
                        .reverse()
                        .join("-")
                    : ""
                }
                
              />
              
            </div>
          </div>
        ))}
    </div>
    </>
  );
};

export default Step1;
