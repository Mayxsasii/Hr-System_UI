import React from "react";
import { Checkbox, Input, Button, Select, Upload } from "antd";
import {
  UploadOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  LinkOutlined,
  CloseOutlined,
  SendOutlined,
  CloudUploadOutlined,
  CloudOutlined,
} from "@ant-design/icons";
const { TextArea } = Input;
import "../ManPowerRequest.css";
import { fn_ReasontoRequest } from "./fn_ReasontoRequest";
import { fn_ForApprove } from "../ForApprove/fn_ForApprove";
const Step2 = ({ formData1, setFormData1, Disable, setDisable }) => {
  const { SaveDraft } = fn_ForApprove(
    formData1,
    setFormData1,
    Disable,
    setDisable
  );

  const {
    handleChange,
    handlePersonSubChange,
    ForDept,
    GetDataPersonByIDCode,
    ForReqJobGrade,
    Education,
    Course,
    Field,
    English,
    handleAddPersonSub,
    CheckReasontorequestSub,
    handleCopySub,
    handlePersonAddChange,
    handleAddPersonAdd,
    handleCopyADD,
    CheckReasontorequestADD,
    handleDeletePerson,
    // CB_AttachFileSub,
    // CB_AttachFileAdd,
    handleFileChange,
    handleFilefeatureChange,
    DeleteFile,
    DisableChange,
    DownLoadFile,
    handleFileRead,
    ReadFile,
    FileFormat,
    bt_Reset
  } = fn_ReasontoRequest(formData1, setFormData1, Disable, setDisable);

  return (
    <div>
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        Reason to request {""}
        {formData1.txt_ReqNo ? (
          <>
            {" >>"} {formData1.txt_ReqNo}
          </>
        ) : (
          ""
        )}
      </p>
      <div
        className="file-upload"
        style={{
          marginLeft: "10px",
          display:
            formData1.StatusType !== "C" && formData1.StatusType !== "R"
              ? "none"
              : "",
        }}
      >
        <label
          htmlFor="fileReadData"
          className={`custom-file-upload ${
            formData1.StatusType !== "C" && formData1.StatusType !== "R"
              ? "disabled"
              : ""
          }`}
          style={{
            pointerEvents:
              formData1.StatusType !== "C" && formData1.StatusType !== "R"
                ? "none"
                : "auto",
            opacity:
              formData1.StatusType !== "C" && formData1.StatusType !== "R"
                ? 0.5
                : 1,
          }}
        >
          <CloudOutlined /> Click to Attach file
        </label>
        <input
          id="fileReadData"
          type="file"
          onChange={(e) => handleFileRead(e)}
        />
        <Button
          type="primary"
          style={{
            marginLeft: "10px",
          }}
          onClick={() => {
            ReadFile();
          }}
          icon={<SendOutlined />}
        >
          Read File
        </Button>
        <a
          style={{
            marginLeft: "10px",
            cursor: "pointer",
            // color: "blue",
            // textDecoration: "underline",
          }}
          href={FileFormat}
        >
          File format
        </a>
      </div>
      <div
        style={{
          borderBottom: "2px dashed #706D54",
          display:
            formData1.StatusType !== "C" && formData1.StatusType !== "R"
              ? "none"
              : "",
          paddingBottom: "5px",
        }}
      >
        {formData1.txt_FileNameReadData && (
          <p className="NameFile">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                DownLoadFile(
                  formData1.DataFileReadData,
                  formData1.txt_FileNameReadData
                );
              }}
            >
              <LinkOutlined style={{ marginRight: "4px", color: "black" }} />{" "}
              <span>{formData1.txt_FileNameReadData}</span>
            </span>
            <CloseOutlined  onClick={() => {
                DeleteFile("ReadFile", "");
              }} className="DeleteFile" />
          </p>
        )}
      </div>
      <Checkbox
        style={{ marginTop: "10px", marginLeft: "10px" }}
        checked={formData1.CB_Substitube}
        disabled={Disable.CB_Substitube}
        onChange={(e) => {
          CheckReasontorequestSub(e);
        }}
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
            onChange={(e) => {
              handleChange("CB_FileSubstitube", e.target.checked);
              // CB_AttachFileSub(e);
            }}
            style={{ marginLeft: "30px" }}
            // disabled={!formData1.CB_Substitube}
            disabled={Disable.CB_FileSubstitube}
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
                  (formData1.StatusType !== "C" && formData1.StatusType !== "R")
                    ? "none"
                    : "auto",
                opacity:
                  !formData1.CB_Substitube ||
                  !formData1.CB_FileSubstitube ||
                  (formData1.StatusType !== "C" && formData1.StatusType !== "R")
                    ? 0.5
                    : 1,
              }}
            >
              {console.log(
                "formData1.formData1.StatusType ",
                formData1.StatusType
              )}
              <UploadOutlined /> Click to Attach file
            </label>
            <input
              id="fileInputSUB"
              type="file"
              onChange={(e) => handleFileChange("SUB", e)}
              disabled={
                !formData1.CB_Substitube ||
                !formData1.CB_FileSubstitube ||
                (formData1.StatusType !== "C" && formData1.StatusType !== "R")
              }
            />
            {/* <p
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                color:
                  !formData1.CB_Substitube ||
                  !formData1.CB_FileSubstitube ||
                  (formData1.StatusType !== "C" && formData1.StatusType !== "R")
                    ? "gray"
                    : "blue",
                textDecoration: "underline",
              }}
            >
              File format
            </p> */}
          </div>
        </div>

      </div>
      <div style={{ marginLeft: "375px" }}>
        {formData1.FileName_Sub && (
          <p  className="NameFile">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                DownLoadFile(formData1.DataFileSub, formData1.FileName_Sub);
              }}
            >
              <LinkOutlined style={{ marginRight: "4px", color: "black"  }} />
              {formData1.FileName_Sub}
            </span>
            <CloseOutlined
              onClick={() => {
                DeleteFile("SUB", "");
              }}
              className="DeleteFile"
              style={{
                display:
                  formData1.StatusType !== "C" && formData1.StatusType !== "R"
                    ? "none"
                    : "",
              }}
            />
          </p>
        )}
      </div>
      <br />
      {Array.from({ length: formData1.txt_TotalSubstitube }, (Data, index) => (
        <div
          key={index}
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            alignItems: "center",
            border: "1px dashed #b0aeae",
          }}
        >
          {index >= 1 && (
            <div
              key={index}
              style={{
                marginLeft: "45px",
                marginRight: "10px",
                paddingLeft: "10px",
                display: Disable.Sub_CopyNo == true ? "none" : "flex",
                alignItems: "center",
                paddingTop: "10px",
              }}
            >
              Copy detail from No.
              <Input
                disabled={Disable.Sub_CopyNo}
                style={{ width: "70px", marginLeft: "10px" }}
                value={formData1.Person_Sub[index]?.CopyNo}
                onChange={(e) =>
                  handlePersonSubChange(index, "CopyNo", e.target.value)
                }
              ></Input>{" "}
              <Button
                disabled={Disable.Sub_CopyNo}
                type="primary"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  handleCopySub(formData1.Person_Sub[index].CopyNo, index);
                }}
              >
                OK
              </Button>
            </div>
          )}
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
              // disabled={formData1.CB_FileSubstitube}
              disabled={Disable.Sub_ID_Code}
              size="middle"
              value={formData1.Person_Sub[index]?.ID_Code}
              style={{ width: "100px", marginLeft: "10px" }}
              onChange={(e) =>
                handlePersonSubChange(index, "ID_Code", e.target.value)
              }
              onBlur={(e) => GetDataPersonByIDCode(e.target.value, index)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                  GetDataPersonByIDCode(
                    formData1.Person_Sub[index].ID_Code,
                    index
                  );
                }
              }}
            />
            <Input
              disabled
              size="middle"
              value={formData1.Person_Sub[index]?.Emp_Name}
              style={{ width: "300px", marginLeft: "5px" }}
              onChange={(e) =>
                handlePersonSubChange(index, "Emp_Name", e.target.value)
              }
            />
            <Input
              disabled
              size="middle"
              style={{ width: "80px", marginLeft: "5px" }}
              value={formData1.Person_Sub[index]?.Cost_Center}
              onChange={(e) =>
                handlePersonSubChange(index, "Cost_Center", e.target.value)
              }
            />
            <Input
              size="middle"
              disabled
              value={formData1.Person_Sub[index]?.Job_grade}
              onChange={(e) =>
                handlePersonSubChange(index, "Job_grade", e.target.value)
              }
              style={{ width: "80px", marginLeft: "5px" }}
            />
            <p style={{ marginLeft: "10px" }}>For Dept.:</p>

            <Select
              disabled={Disable.Sub_Dept}
              showSearch
              value={formData1.Person_Sub[index]?.Dept}
              style={{ width: "120px", marginLeft: "5px" }}
              placeholder="Select Dept"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={ForDept}
              onChange={(value) => {
                handlePersonSubChange(index, "Dept", value);
              }}
            />
            <p style={{ marginLeft: "10px" }}>Request Job Grade :</p>
            <Select
              // disabled={formData1.CB_FileSubstitube}
              disabled={Disable.Sub_Req_Jobgrade}
              showSearch
              mode="multiple"
              // maxTagCount={"responsive"}
              value={formData1.Person_Sub[index]?.Req_Jobgrade}
              style={{ width: "150px", marginLeft: "5px" }}
              placeholder="Select Dept"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={ForReqJobGrade}
              onChange={(value) => {
                handlePersonSubChange(index, "Req_Jobgrade", value);
              }}
            />
          </div>
          <table className="TB_ReasontoRequest" style={{ marginLeft: "80px" }}>
            <tr>
              <td align="right">วุฒิการศึกษา (Education) :</td>
              <td colSpan={1}>
                {" "}
                <Select
                  // disabled={formData1.CB_FileSubstitube}
                  disabled={Disable.Sub_Education}
                  showSearch
                  mode="multiple"
                  // maxTagCount={"responsive"}
                  value={formData1.Person_Sub[index]?.Education}
                  style={{ width: "400px", marginLeft: "5px" }}
                  placeholder="Select Education"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Education}
                  onChange={(value) => {
                    handlePersonSubChange(index, "Education", value);
                  }}
                />
              </td>
              <td>
                {" "}
                <Input
                  disabled={Disable.Sub_EducationOther}
                  style={{
                    display:
                      // formData1.Person_Sub[index].Field.includes("Other")
                      formData1.Person_Sub[index]?.Education &&
                      formData1.Person_Sub[index]?.Education.includes("MR0490")
                        ? ""
                        : "none",
                  }}
                  value={formData1.Person_Sub[index]?.EducationOther}
                  onChange={(e) =>
                    handlePersonSubChange(
                      index,
                      "EducationOther",
                      e.target.value
                    )
                  }
                ></Input>
              </td>
            </tr>
            <tr>
              <td align="right">Course (หลักสูตร):</td>
              <td colSpan={1}>
                <Select
                  // disabled={formData1.CB_FileSubstitube}
                  disabled={Disable.Sub_Course}
                  showSearch
                  mode="multiple"
                  // maxTagCount={"responsive"}
                  value={formData1.Person_Sub[index]?.Course}
                  style={{ width: "400px", marginLeft: "5px" }}
                  placeholder="Select Course"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Course}
                  onChange={(value) => {
                    handlePersonSubChange(index, "Course", value);
                  }}
                />
              </td>
              <td>
                {" "}
                <Input
                  disabled={Disable.Sub_CourseOther}
                  style={{
                    display:
                      formData1.Person_Sub[index]?.Course &&
                      // formData1.Person_Sub[index].Course == "MR0507"
                      formData1.Person_Sub[index]?.Course.includes("MR0507")
                        ? ""
                        : "none",
                  }}
                  value={formData1.Person_Sub[index]?.CourseOther}
                  onChange={(e) =>
                    handlePersonSubChange(index, "CourseOther", e.target.value)
                  }
                ></Input>
              </td>
            </tr>
            <tr>
              <td align="right">Field (สาขาวิชา):</td>
              <td colSpan={1}>
                {" "}
                <Select
                  // disabled={formData1.CB_FileSubstitube}
                  disabled={Disable.Sub_Field}
                  showSearch
                  mode="multiple"
                  // maxTagCount={"responsive"}
                  value={formData1.Person_Sub[index]?.Field}
                  style={{ width: "400px", marginLeft: "5px" }}
                  placeholder="Select Field"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Field}
                  onChange={(value) => {
                    handlePersonSubChange(index, "Field", value);
                  }}
                />
              </td>
              <td>
                {" "}
                <Input
                  disabled={Disable.Sub_FieldOther}
                  style={{
                    display:
                      formData1.Person_Sub[index]?.Field &&
                      formData1.Person_Sub[index]?.Field.includes("MR0699")
                        ? ""
                        : "none",
                  }}
                  value={formData1.Person_Sub[index]?.FieldOther}
                  onChange={(e) =>
                    handlePersonSubChange(index, "FieldOther", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td align="right">Special (คุณสมบัติพิเศษ):</td>
              <td colSpan={2}>
                <TextArea
                  disabled={Disable.Sub_Special}
                  // disabled={formData1.CB_FileSubstitube}
                  value={formData1.Person_Sub[index]?.Special}
                  style={{ width: "950px", height: "50px", marginLeft: "5px" }}
                  maxLength={2000}
                  onChange={(e) =>
                    handlePersonSubChange(index, "Special", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td align="right">Experience (ประสบการณ์):</td>
              <td colSpan={2}>
                {" "}
                <TextArea
                  disabled={Disable.Sub_Experience}
                  // disabled={formData1.CB_FileSubstitube}
                  style={{ width: "950px", height: "50px", marginLeft: "5px" }}
                  maxLength={2000}
                  value={formData1.Person_Sub[index]?.Experience}
                  onChange={(e) =>
                    handlePersonSubChange(index, "Experience", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td align="right">English Language or other :</td>
              <td style={{ width: "300px" }}>
                {" "}
                <Select
                  // disabled={formData1.CB_FileSubstitube}
                  disabled={Disable.Sub_StepLanguage}
                  showSearch
                  value={formData1.Person_Sub[index]?.StepLanguage}
                  style={{ width: "400px", marginLeft: "5px" }}
                  placeholder="Select English Language or other"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={English}
                  onChange={(value) => {
                    handlePersonSubChange(index, "StepLanguage", value);
                  }}
                />
              </td>
              <td>
                {" "}
                <Input
                  disabled={Disable.Sub_StepLanguage_other}
                  value={formData1.Person_Sub[index]?.Sub_StepLanguage_other}
                  onChange={(e) =>
                    handlePersonSubChange(
                      index,
                      "Sub_StepLanguage_other",
                      e.target.value
                    )
                  }
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
                      // formData1.CB_FileSubstitube ||
                      formData1.StatusType !== "C" &&
                      formData1.StatusType !== "R"
                        ? "disabled"
                        : ""
                    }`}
                    style={{
                      pointerEvents:
                        // formData1.CB_FileSubstitube ||
                        formData1.StatusType !== "C" &&
                        formData1.StatusType !== "R"
                          ? "none"
                          : "auto",
                      opacity:
                        // formData1.CB_FileSubstitube ||
                        formData1.StatusType !== "C" &&
                        formData1.StatusType !== "R"
                          ? 0.5
                          : 1,
                    }}
                  >
                    <UploadOutlined /> Click to Attach file
                  </label>
                  <input
                    id="fileInputFeatureSUB"
                    type="file"
                    onChange={(e) => handleFilefeatureChange("SUB", index, e)}
                    disabled={
                      // formData1.CB_FileSubstitube ||
                      formData1.StatusType !== "C" &&
                      formData1.StatusType !== "R"
                    }
                  />
                  {formData1.Person_Sub[index]?.Filefeature && (
                    <p
                      style={{
                        color: "black",
                        margin: 0,
                        marginTop: "0px",
                        marginLeft: "10px",
                      }}
                    >
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          DownLoadFile(
                            formData1.Person_Sub[index].DataFilefeature,
                            formData1.Person_Sub[index].Filefeature
                          );
                        }}
                      >
                        <LinkOutlined style={{ marginRight: "5px" }} />{" "}
                        {formData1.Person_Sub[index]?.Filefeature}
                      </span>
                      <CloseOutlined
                        onClick={() => {
                          DeleteFile("SUBFeature", index);
                        }}
                        style={{
                          marginLeft: "20px",
                          cursor: "pointer",
                          color: "red",
                          display:
                            formData1.StatusType !== "C" &&
                            formData1.StatusType !== "R",
                        }}
                      />
                    </p>
                  )}
                </div>
              </td>
            </tr>
          </table>
          <div align="center">
            <Button
              // disabled={formData1.CB_FileSubstitube}
              disabled={Disable.Button_DeleteSub}
              icon={<DeleteOutlined />}
              danger
              type="primary"
              style={{
                marginBottom: "5px",
                display:
                  formData1.StatusType == "C" || formData1.StatusType == "R"
                    ? ""
                    : "none",
              }}
              onClick={() => {
                handleDeletePerson("Substitube", index);
              }}
            >
              Delete Person
            </Button>
          </div>
        </div>
      ))}
      <div
  style={{
    display: "flex",
    justifyContent: "flex-end", // จัดตำแหน่งให้อยู่ชิดขวา
     marginTop:'10px',
     paddingBottom:'10px',
     borderBottom: "2px dashed #706D54",
  }}
>
  <Button
    disabled={Disable.ButtonSUB_ADD}
    type="primary"
    style={{
      marginRight: "30px",
      display:
        formData1.StatusType == "C" || formData1.StatusType == "R"
          ? ""
          : "none",
    }}
    onClick={() => {
      handleChange(
        "txt_TotalSubstitube",
        formData1.txt_TotalSubstitube + 1
      );
      handleAddPersonSub();
    }}
    icon={<PlusCircleOutlined />}
  >
    Add
  </Button>
  
</div>

     <br/>
      <Checkbox
        style={{ marginLeft: "10px" }}
        checked={formData1.CB_Additional}
        onChange={(e) => {
          CheckReasontorequestADD(e);
        }}
        disabled={Disable.CB_Additional}
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
            onChange={(e) =>
              handleChange("txt_TargetCapacity1", e.target.value)
            }
            style={{ width: "1000px", height: "50px", marginLeft: "5px" }}
            maxLength={2000}
            disabled={Disable.txt_TargetCapacity1}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <TextArea
            disabled={Disable.txt_TargetCapacity2}
            style={{ width: "1000px", height: "50px", marginLeft: "195px" }}
            maxLength={2000}
            value={formData1.txt_TargetCapacity2}
            onChange={(e) =>
              handleChange("txt_TargetCapacity2", e.target.value)
            }
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
            // disabled={!formData1.CB_Additional}
            disabled={Disable.CB_FileAdditional}
            checked={formData1.CB_FileAdditional}
            onChange={(e) => {
              // CB_AttachFileAdd(e);
              handleChange("CB_FileAdditional", e.target.checked);
            }}
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
                  (formData1.StatusType !== "C" && formData1.StatusType !== "R")
                    ? "none"
                    : "auto",
                opacity:
                  !formData1.CB_Additional ||
                  !formData1.CB_FileAdditional ||
                  (formData1.StatusType !== "C" && formData1.StatusType !== "R")
                    ? 0.5
                    : 1,
              }}
            >
              <UploadOutlined /> Click to Attach file
            </label>
            <input
              id="fileInputADD"
              type="file"
              onChange={(e) => handleFileChange("ADD", e)}
              disabled={
                !formData1.CB_Additional ||
                !formData1.CB_FileAdditional ||
                (formData1.StatusType !== "C" && formData1.StatusType !== "R")
              }
            />
            {/* <p
              // onClick={handleUpload}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                color:
                  !formData1.CB_Additional ||
                  !formData1.CB_FileAdditional ||
                  (formData1.StatusType !== "C" && formData1.StatusType !== "R")
                    ? "gray"
                    : "blue",
                textDecoration: "underline",
              }}
            >
              File format
            </p> */}
          </div>
        </div>

      </div>

      <div style={{ marginLeft: "395px" }}>
        {formData1.FileName_Add && (
          <p style={{ color: "black", margin: 0, marginTop: "0px" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                DownLoadFile(formData1.DataFileADD, formData1.FileName_Add);
              }}
            >
              <LinkOutlined style={{ marginRight: "5px" }} />{" "}
              {formData1.FileName_Add}
            </span>
            <CloseOutlined
              onClick={() => {
                DeleteFile("ADD", "");
              }}
              style={{
                marginLeft: "20px",
                cursor: "pointer",
                color: "red",
                display:
                  formData1.StatusType !== "C" && formData1.StatusType !== "R"
                    ? "none"
                    : "",
              }}
            />
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
            paddingTop: "5px",
          }}
        >
          <div
            key={index}
            style={{
              marginLeft: "40px",
              marginRight: "10px",
              paddingLeft: "10px",
              display: Disable.ADD_CopyNo == true ? "none" : "flex",
              alignItems: "center",
            }}
          >
            {index === 0 ? (
              <p>Copy detail from Substitube No.</p>
            ) : (
              <p>Copy detail from No.</p>
            )}
            <Input
              disabled={Disable.ADD_CopyNo}
              size="middle"
              style={{ width: "70px", marginLeft: "10px" }}
              value={formData1.Person_ADD[index]?.CopyNo}
              onChange={(e) =>
                handlePersonAddChange(index, "CopyNo", e.target.value)
              }
            />
            <Button
              disabled={Disable.ADD_CopyNo}
              type="primary"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                handleCopyADD(formData1.Person_ADD[index]?.CopyNo, index);
              }}
            >
              OK
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <p style={{ margin: 0, marginLeft: "20px", marginTop: "5px" }}>
              {index + 1}.
            </p>
            <table style={{ marginLeft: "80px" }}>
              <tr>
                <td align="right">For Dept.:</td>
                <td colSpan={2} style={{}}>
                  <Select
                    disabled={Disable.ADD_Dept}
                    showSearch
                    value={formData1.Person_ADD[index]?.Dept}
                    style={{
                      width: "80px",
                      marginLeft: "5px",
                      marginRight: "40px",
                    }}
                    placeholder="Select Dept"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={ForDept}
                    onChange={(value) => {
                      handlePersonAddChange(index, "Dept", value);
                    }}
                  />
                  Request Job Grade :
                  <Select
                    disabled={Disable.ADD_Req_Jobgrade}
                    showSearch
                    mode="multiple"
                    value={formData1.Person_ADD[index]?.Req_Jobgrade}
                    style={{ width: "250px", marginLeft: "5px" }}
                    placeholder="Select Dept"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={ForReqJobGrade}
                    onChange={(value) => {
                      handlePersonAddChange(index, "Req_Jobgrade", value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td align="right">วุฒิการศึกษา (Education) :</td>
                <td colSpan={1}>
                  <Select
                    mode="multiple"
                    disabled={Disable.ADD_Education}
                    showSearch
                    value={formData1.Person_ADD[index]?.Education}
                    style={{ width: "400px", marginLeft: "5px" }}
                    placeholder="Select Education"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={Education}
                    onChange={(value) => {
                      handlePersonAddChange(index, "Education", value);
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <Input
                    style={{
                      display:
                        formData1.Person_ADD[index]?.Education &&
                        // formData1.Person_ADD[index].Education == "MR0490"
                        formData1.Person_ADD[index]?.Education.includes(
                          "MR0490"
                        )
                          ? ""
                          : "none",
                    }}
                    value={formData1.Person_ADD[index]?.EducationOther}
                    disabled={Disable.ADD_EducationOther}
                    onChange={(e) =>
                      handlePersonAddChange(
                        index,
                        "EducationOther",
                        e.target.value
                      )
                    }
                  ></Input>
                </td>
              </tr>
              <tr>
                <td align="right">Course (หลักสูตร):</td>
                <td colSpan={1}>
                  {" "}
                  <Select
                    mode="multiple"
                    // maxTagCount={"responsive"}
                    disabled={Disable.ADD_Course}
                    showSearch
                    value={formData1.Person_ADD[index]?.Course}
                    style={{ width: "400px", marginLeft: "5px" }}
                    placeholder="Select Course"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={Course}
                    onChange={(value) => {
                      handlePersonAddChange(index, "Course", value);
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <Input
                    disabled={Disable.ADD_CourseOther}
                    style={{
                      display:
                        formData1.Person_ADD[index]?.Course &&
                        // formData1.Person_ADD[index].Course == "MR0507"
                        formData1.Person_ADD[index]?.Course.includes("MR0507")
                          ? ""
                          : "none",
                    }}
                    value={formData1.Person_ADD[index]?.CourseOther}
                    onChange={(e) =>
                      handlePersonAddChange(
                        index,
                        "CourseOther",
                        e.target.value
                      )
                    }
                  ></Input>
                </td>
              </tr>
              <tr>
                <td align="right">Field (สาขาวิชา):</td>
                <td colSpan={1}>
                  {" "}
                  <Select
                    // disabled={formData1.CB_FileAdditional}
                    disabled={Disable.ADD_Field}
                    showSearch
                    mode="multiple"
                    // maxTagCount={"responsive"}
                    value={formData1.Person_ADD[index]?.Field}
                    style={{ width: "400px", marginLeft: "5px" }}
                    placeholder="Select Field"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={Field}
                    onChange={(value) => {
                      handlePersonAddChange(index, "Field", value);
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <Input
                    disabled={Disable.ADD_FieldOther}
                    style={{
                      display:
                        formData1.Person_ADD[index]?.Field &&
                        // formData1.Person_ADD[index].Field == "MR0490"
                        formData1.Person_ADD[index]?.Field.includes("MR0699")
                          ? ""
                          : "none",
                    }}
                    value={formData1.Person_ADD[index]?.FieldOther}
                    onChange={(e) =>
                      handlePersonAddChange(index, "FieldOther", e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="right">Special (คุณสมบัติพิเศษ):</td>
                <td colSpan={2}>
                  {" "}
                  <TextArea
                    // disabled={formData1.CB_FileAdditional}
                    disabled={Disable.ADD_Special}
                    style={{
                      width: "960px",
                      height: "50px",
                      marginLeft: "5px",
                    }}
                    maxLength={2000}
                    value={formData1.Person_ADD[index]?.Special}
                    onChange={(e) =>
                      handlePersonAddChange(index, "Special", e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="right">Experience (ประสบการณ์):</td>
                <td colSpan={2}>
                  {" "}
                  <TextArea
                    disabled={Disable.ADD_Experience}
                    // disabled={formData1.CB_FileAdditional}
                    style={{
                      width: "960px",
                      height: "50px",
                      marginLeft: "5px",
                    }}
                    maxLength={2000}
                    value={formData1.Person_ADD[index]?.Experience}
                    onChange={(e) =>
                      handlePersonAddChange(index, "Experience", e.target.value)
                    }
                  />
                </td>
              </tr>

              <tr>
                <td align="right">English Language or other :</td>
                <td style={{ width: "300px" }}>
                  {" "}
                  <Select
                    showSearch
                    // disabled={formData1.CB_FileAdditional}
                    disabled={Disable.ADD_StepLanguage}
                    value={formData1.Person_ADD[index]?.StepLanguage}
                    style={{ width: "400px", marginLeft: "5px" }}
                    placeholder="Select English Language or other"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={English}
                    onChange={(value) => {
                      handlePersonAddChange(index, "StepLanguage", value);
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <Input
                    disabled={Disable.ADD_StepLanguage_other}
                    style={{
                      display:
                        formData1.Person_ADD[index]?.StepLanguage &&
                        formData1.Person_ADD[index]?.StepLanguage == "MR0790"
                          ? ""
                          : "none",
                    }}
                    value={formData1.Person_ADD[index]?.StepLanguage_other}
                    onChange={(e) =>
                      handlePersonAddChange(
                        index,
                        "StepLanguage_other",
                        e.target.value
                      )
                    }
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
                        // formData1.CB_FileAdditional ||
                        formData1.StatusType !== "C" &&
                        formData1.StatusType !== "R"
                          ? "disabled"
                          : ""
                      }`}
                      style={{
                        pointerEvents:
                          // formData1.CB_FileAdditional ||
                          formData1.StatusType !== "C" &&
                          formData1.StatusType !== "R"
                            ? "none"
                            : "auto",
                        opacity:
                          // formData1.CB_FileAdditional ||
                          formData1.StatusType !== "C" &&
                          formData1.StatusType !== "R"
                            ? 0.5
                            : 1,
                      }}
                    >
                      <UploadOutlined /> Click to Attach file
                    </label>
                    <input
                      id="fileInputFeatureADD"
                      type="file"
                      onChange={(e) => handleFilefeatureChange("ADD", index, e)}
                      disabled={
                        // formData1.CB_FileAdditional ||
                        (formData1.StatusType !== "C" &&
                          formData1.StatusType !== "R")
                      }
                    />
                    {formData1.Person_ADD[index]?.Filefeature && (
                      <p
                        style={{
                          color: "black",
                          margin: 0,
                          marginTop: "0px",
                          marginLeft: "10px",
                        }}
                      >
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            DownLoadFile(
                              formData1.Person_ADD[index].DataFilefeature,
                              formData1.Person_ADD[index].Filefeature
                            );
                          }}
                        >
                          <LinkOutlined style={{ marginRight: "5px" }} />{" "}
                          {formData1.Person_ADD[index]?.Filefeature}
                        </span>
                        <CloseOutlined
                          onClick={() => {
                            DeleteFile("ADDFeature", index);
                          }}
                          style={{
                            marginLeft: "20px",
                            cursor: "pointer",
                            color: "red",
                            display:
                              formData1.StatusType !== "C" &&
                              formData1.StatusType !== "R"
                                ? "none"
                                : "",
                          }}
                        />
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div align="center">
            {" "}
            <Button
              // disabled={formData1.CB_FileAdditional}
              disabled={Disable.Button_DeleteAdd}
              icon={<DeleteOutlined />}
              danger
              type="primary"
              style={{
                marginBottom: "5px",
                display:
                  formData1.StatusType == "C" || formData1.StatusType == "R"
                    ? ""
                    : "none",
              }}
              onClick={() => {
                handleDeletePerson("Additional", index);
              }}
            >
              Delete Person
            </Button>
          </div>
        </div>
      ))}
          <div
  style={{
    display: "flex",
    justifyContent: "flex-end", // จัดตำแหน่งให้อยู่ชิดขวา
     marginTop:'10px',
     paddingBottom:'10px',
     borderBottom: "2px dashed #706D54",
  }}
>

<Button
          disabled={Disable.ButtonADD_ADD}
          type="primary"
          style={{
            marginRight: "30px",
            display:
              formData1.StatusType == "C" || formData1.StatusType == "R"
                ? ""
                : "none",
          }}
          onClick={() => {
            handleChange(
              "txt_TotalAdditional",
              formData1.txt_TotalAdditional + 1
            );
            handleAddPersonAdd();
          }}
          icon={<PlusCircleOutlined />}
        >
          Add
        </Button>
</div>
      <div align="center" style={{ marginTop: "10px" }}>
        {" "}
        <Button
          type="primary"
          style={{
            display: formData1.ID_Status != "MR0101" ? "none" : "",
            backgroundColor: "#FF9D23",
          }}
          onClick={() => SaveDraft("2")}
        >
          Save Draft
        </Button>
        <Button
          type="primary"
          style={{
            marginLeft: "10px",
            display: formData1.ID_Status != "MR0101" ? "none" : "",

            backgroundColor: "#758694",
            color: "#FFFFFF",
          }}
          onClick={() => bt_Reset()}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Step2;
