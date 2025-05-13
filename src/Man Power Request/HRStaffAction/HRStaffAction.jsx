import React from "react";
import {
  Checkbox,
  Input,
  Button,
  Select,
  Upload,
  DatePicker,
  Radio,
} from "antd";
import moment from "moment";
import {
  UploadOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  LinkOutlined,
  CloseOutlined,
  CaretDownOutlined,
  SendOutlined
} from "@ant-design/icons";
const { TextArea } = Input;
import ImgExcel from "../../assets/excel.png";
import { fn_HrStarffAction } from "./fn_HrStarffAction";
const Step4 = ({
  formData1,
  setFormData1,
  Disable,
  setDisable,
  setCurrent,
}) => {
  const {
    handleChange,
    datauser,
    DateToday,
    ConditionClose,
    Save,
    handleFileChange,
    CB_AttachFile,
    ManualCompleted,
    handleStatus,
    handleChangeHr_Add,
    handleChangeHr_Sub,
    CheckComplete,
    CheckCompleteAdd,
    Submit,
    DownloadFileforUpload,
    ReadFile,
    handleFileOtherChange,
    DeleteFile,
    Bt_Reset
  } = fn_HrStarffAction(formData1, setFormData1);
  return (
    <>
      <div>
        <p
          style={{
            fontSize: "18px",
            margin: "0 10px 0 0",
            fontWeight: "bold",
          }}
        >
          HR Staff Action{""}
          {formData1.txt_ReqNo ? (
            <>
              {" >>"} {formData1.txt_ReqNo}
            </>
          ) : (
            ""
          )}
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
            disabled={
              formData1.ID_Status == "MR0107" || formData1.ID_Status == "MR0108"
                ? true
                : false
            }
            style={{ marginLeft: "10px", marginRight: "10px" }}
            name="radiogroup"
            // defaultValue={"Approve"}
            value={formData1.Radio_HrStatus}
            onChange={(e) => {
              // handleChange("Radio_HrStatus", e.target.value);
              handleStatus(e);
            }}
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

          {console.log("GetConditionForClose1", ConditionClose)}
          <Select
            showSearch
            value={formData1.Sl_HrCloseBy}
            style={{
              width: "300px",
              display: formData1.Radio_HrStatus == "MR0108" ? "" : "none",
            }}
            placeholder="Please Select Condition"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={ConditionClose}
            onChange={(value) => {
              handleChange("Sl_HrCloseBy", value);
            }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
        >
          <p style={{ marginRight: "5px" }}>HR Staff:</p>
          <Input
            style={{ width: "300px" }}
            disabled
            value={datauser.LOGIN || formData1.txt_HrStaffBy}
          />
          <p style={{ marginRight: "5px", marginLeft: "35px" }}>Action Date:</p>
          {/* {/* <DatePicker style={{ width: "275px" }} /> */}
          <Input
            disabled
            style={{
              width: "275px",
              // display: ["MR0101", "MR0102","MR0129"].includes(formData1.ID_Status) ? "none" : "",
            }}
            value={formData1.Date_HrAction || DateToday}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
        >
          <p style={{ marginRight: "5px" }}>Comment:</p>
          <TextArea
            value={formData1.txt_HrComment}
            onChange={(e) => handleChange("txt_HrComment", e.target.value)}
            disabled={
              formData1.ID_Status == "MR0107" || formData1.ID_Status == "MR0108"
                ? true
                : false
            }
            style={{ width: "1150px", height: "50px", marginLeft: "5px" }}
            maxLength={2000}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            margin: "10px",
            borderBottom: "2px dashed #706D54",
            paddingBottom: "10px",
          }}
        >
          {" "}
          <Button
            type="primary"
            style={{
              backgroundColor: "#FF9D23",
              display:
                formData1.ID_Status == "MR0107" ||
                formData1.ID_Status == "MR0108"
                  ? "none"
                  : "",
            }}
            onClick={() => Save("SaveDarft")}
          >
            Save Draft
          </Button>
          <Button
            type="primary"
            danger
            style={{
              marginLeft: "10px",
              display:
                formData1.ID_Status == "MR0107" ||
                formData1.ID_Status == "MR0108"
                  ? "none"
                  : "",
            }}
            onClick={() => Bt_Reset()}
          >
            Reset
          </Button>
          <Button
            type="primary"
            style={{
              marginLeft: "10px",
              display:
                formData1.ID_Status == "MR0107" ||
                formData1.ID_Status == "MR0108"
                  ? "none"
                  : "",
            }}
            onClick={() => Submit()}
          >
            Submit
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // จัดตำแหน่งให้มีระยะห่างระหว่างองค์ประกอบ
            marginLeft: "30px",
          }}
        >

          <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              borderRadius: "15px",
              width: "180px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "15px",
              backgroundColor: "#FFB433",
            }}
          >
            <p style={{ margin: 4, fontSize: "16px" }}>Result after interview</p>
          </div>
            Total Request:{" "}
            <Input
              value={formData1.txt_TotalSubstitube + formData1.txt_TotalAdditional}
              disabled
              style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
            />{" "}
            <p style={{ marginLeft: "" }}> Person</p>
            {/* <p
              style={{
                marginLeft: "50px",
                display: !formData1.CB_HrFileAttach ? "none" : "",
              }}
            >
              Manual Completed :
            </p> */}
            {/* <Input
              value={formData1.txt_TotalManual}
              style={{
                width: "80px",
                marginLeft: "10px",
                marginRight: "5px",
                display: !formData1.CB_HrFileAttach ? "none" : "",
              }}
              disabled={
                formData1.ID_Status == "MR0107" || formData1.ID_Status == "MR0108"
                  ? true
                  : false
              }
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  ManualCompleted(e.target.value);
                }
              }}
            />{" "}
            <p style={{ display: !formData1.CB_HrFileAttach ? "none" : "" }}> Person</p> */}
            <p style={{ marginLeft: "30px" }}>Remain :</p>
            <Input
              value={formData1.txt_TotalRemain}
              disabled
              style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
            />{" "}
            <p style={{ marginRight: "20px" }}> Person</p>
          </div>
          <Button
            style={{
              marginRight:'20px',
              display:
                formData1.ID_Status == "MR0107" || formData1.ID_Status == "MR0108"
                  ? "none"
                  : "",
            }}
            onClick={DownloadFileforUpload}
          >
            <img
              src={ImgExcel}
              alt="Excel Icon"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "4px",
              }}
            />
            File For Upload
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "10px",
            marginBottom: "0",
          }}
        >
          {" "}
          <Checkbox
            disabled={
              formData1.ID_Status == "MR0107" || formData1.ID_Status == "MR0108"
                ? true
                : false
            }
            checked={formData1.CB_HrFileAttach}
            onChange={CB_AttachFile}
            style={{ marginLeft: "30px" }}
          >
            Upload File :
          </Checkbox>
          <div className="file-upload" style={{ marginLeft: "1px" }}>
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
              onChange={(e) => handleFileChange(e)}
              disabled={
                !formData1.CB_HrFileAttach ||
                formData1.ID_Status == "MR0107" ||
                formData1.ID_Status == "MR0108"
              }
            />
            <Button
            disabled={!formData1.CB_HrFileAttach ||
              formData1.ID_Status == "MR0107" ||
              formData1.ID_Status == "MR0108"}
          type="primary"
          style={{
            marginLeft: "10px",
           marginRight:'40px',
            display:formData1.ID_Status == "MR0107" ||
              formData1.ID_Status == "MR0108"? "none" : "",
          }}
          onClick={() => {
            ReadFile();
          }}
          icon={<SendOutlined />}
        >
          Read File
        </Button>
        <span style={{marginRight:'5px',marginLeft:'10px'}}>  Other documents :</span>
       
        <div className="file-upload" style={{ marginLeft: "1px" }}>
            <label
              htmlFor="fileInputHrOther"
              className={`custom-file-upload ${
                formData1.ID_Status == "MR0107" ||
                formData1.ID_Status == "MR0108"
                  ? "disabled"
                  : ""
              }`}
              style={{
                pointerEvents: !formData1.CB_HrFileAttach ? "none" : "auto",
                opacity:
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                    ? 0.5
                    : 1,
              }}
            >
              <UploadOutlined /> Click to Attach file
            </label>
            <input
              id="fileInputHrOther"
              type="file"
              onChange={(e) => handleFileOtherChange(e)}
              disabled={
                formData1.ID_Status == "MR0107" ||
                formData1.ID_Status == "MR0108"
              }
            />
          </div>
          </div>
          {formData1.Hr_NameFileOther && (
            <p style={{marginLeft:'7px'}}
             className="NameFile"
            >
              <LinkOutlined style={{ marginRight: "5px" }} /> {formData1.Hr_NameFileOther}{" "}
              <CloseOutlined
               className="DeleteFile"
                onClick={() => {
                  DeleteFile("HrFileOther");
                }}
                style={{
                  marginLeft: "20px",
                  cursor: "pointer",
                  color: "red",
                  display:
                    formData1.ID_Status == "MR0107" || formData1.ID_Status == "MR0108"
                      ? "none"
                      : "",
                }}
              />
            </p>
          )}
        </div>
        <div style={{ marginLeft: "130px", display: "flex", alignItems: "center",marginTop:'5px'}}>

          {formData1.Hr_FileAttach && (
            <p
             className="NameFile"
            >
              <LinkOutlined style={{ marginRight: "5px" }} /> {formData1.Hr_FileAttach}{" "}
              <CloseOutlined
               className="DeleteFile"
                onClick={() => {
                  DeleteFile("HrFileReadFile");
                }}
                style={{
                  marginLeft: "20px",
                  cursor: "pointer",
                  color: "red",
                  display:
                    formData1.ID_Status == "MR0107" || formData1.ID_Status == "MR0108"
                      ? "none"
                      : "",
                }}
              />
            </p>
          )}

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
                value={formData1.Person_Sub[index].ID_Code}
                style={{ width: "100px", marginLeft: "10px" }}
              />
              <Input
                size="middle"
                value={formData1.Person_Sub[index].Emp_Name}
                disabled
                style={{ width: "200px", marginLeft: "5px" }}
              />
              <Input
                size="middle"
                value={formData1.Person_Sub[index].Cost_Center}
                disabled
                style={{ width: "80px", marginLeft: "5px" }}
              />
              <Input
                size="middle"
                value={formData1.Person_Sub[index].Job_grade}
                disabled
                style={{ width: "80px", marginLeft: "5px" }}
              />
              <p style={{ marginLeft: "10px" }}>For Dept.:</p>
              <Input
                value={formData1.Person_Sub[index].Dept}
                disabled
                style={{ width: "80px", marginLeft: "5px" }}
              ></Input>
              <p style={{ marginLeft: "10px" }}>Request Job Grade :</p>
              <Input
                value={formData1.Person_Sub[index].Req_Jobgrade}
                disabled
                style={{ width: "300px", marginLeft: "5px" }}
              ></Input>
            </div>
            <Checkbox
              disabled={
                
                formData1.ID_Status == "MR0107" ||
                formData1.ID_Status == "MR0108"
              }
              checked={formData1.Hr_Sub[index].CB_Complete}
              onChange={(e) => {
                CheckComplete(e, index);
              }}
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
              {/* {console.log('formData1.Hr_Sub[index].CB_Complete',formData1.Hr_Sub[index].CB_Complete)} */}
              <Input
                size="middle"
                // disabled={!formData1.Hr_Sub[index].CB_Complete}
                onChange={(e) =>
                  handleChangeHr_Sub(index, "Emp_id", e.target.value)
                }
                disabled={
                  !formData1.Hr_Sub[index].CB_Complete ||
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                }
                value={formData1.Hr_Sub[index].Emp_id}
                style={{
                  width: "100px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
              Name :
              <Input
                size="middle"
                disabled={
                  !formData1.Hr_Sub[index].CB_Complete ||
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                }
                onChange={(e) =>
                  handleChangeHr_Sub(index, "Emp_name", e.target.value)
                }
                value={formData1.Hr_Sub[index].Emp_name}
                style={{
                  width: "200px",
                  marginLeft: "5px",
                  marginRight: "10px",
                }}
              />
              Surname :
              <Input
                size="middle"
                value={formData1.Hr_Sub[index].Emp_sername}
                disabled={
                  !formData1.Hr_Sub[index].CB_Complete ||
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                }
                onChange={(e) =>
                  handleChangeHr_Sub(index, "Emp_sername", e.target.value)
                }
                style={{ width: "200px", marginLeft: "5px" }}
              />
              {console.log("JoinDate2", formData1.Hr_Sub[index].Emp_JoinDate)}
              <p style={{ marginLeft: "10px" }}>Join date:</p>
              <Input
                type="date"
                disabled={
                 
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                }
                style={{ marginLeft: "5px", width: "200px" }}
                value={
                  formData1.Hr_Sub[index].Emp_JoinDate
                    ? formData1.Hr_Sub[index].Emp_JoinDate.split("/")
                        .reverse()
                        .join("-")
                    : ""
                }
                onChange={(e) => {
                  const dateValue = e.target.value;
                  const formattedDate = dateValue
                    .split("-")
                    .reverse()
                    .join("/");
                  handleChangeHr_Sub(index, "Emp_JoinDate", formattedDate);
                }}
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
                disabled={
                 
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                }
                checked={formData1.Hr_Add[index].CB_Complete}
                onChange={(e) => {
                  CheckCompleteAdd(e, index);
                }}
                style={{ marginLeft: "30px" }}
              >
                Completed
              </Checkbox>
{console.log('vvvvvvvvvvvvvvvvvvv',formData1.Hr_Add[index].CB_Complete)}
              <p style={{ marginLeft: "25px" }}>For Dept.:</p>
              <Input
                value={formData1.Person_ADD[index].Dept}
                disabled
                style={{ width: "80px", marginLeft: "5px" }}
              ></Input>
              <p style={{ marginLeft: "10px" }}>Request Job Grade :</p>
              <Input
                value={formData1.Person_ADD[index].Req_Jobgrade}
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
                
                disabled={
                  !formData1.Hr_Add[index].CB_Complete||
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                }
                onChange={(e) =>
                  handleChangeHr_Add(index, "Emp_id", e.target.value)
                }
                value={formData1.Hr_Add[index].Emp_id}
                style={{
                  width: "100px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
              Name :
              <Input
                size="middle"
                disabled={
                  !formData1.Hr_Add[index].CB_Complete||
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                }
                onChange={(e) =>
                  handleChangeHr_Add(index, "Emp_name", e.target.value)
                }
                value={formData1.Hr_Add[index].Emp_name}
                style={{
                  width: "200px",
                  marginLeft: "5px",
                  marginRight: "10px",
                }}
              />
              Surname :
              <Input
                size="middle"
                disabled={
                  !formData1.Hr_Add[index].CB_Complete||
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                }
                value={formData1.Hr_Add[index].Emp_sername}
                onChange={(e) =>
                  handleChangeHr_Add(index, "Emp_sername", e.target.value)
                }
                style={{ width: "200px", marginLeft: "5px" }}
              />
              <p style={{ marginLeft: "10px" }}>Join date:</p>
              {console.log("JoinDate1", formData1.Hr_Add[index].Emp_JoinDate)}
              <Input
                type="date"
                disabled={
                  !formData1.Hr_Add[index].CB_Complete||
                  formData1.ID_Status == "MR0107" ||
                  formData1.ID_Status == "MR0108"
                }
                style={{ marginLeft: "5px", width: "200px" }}
                value={
                  formData1.Hr_Add[index].Emp_JoinDate
                    ? formData1.Hr_Add[index].Emp_JoinDate.split("/")
                        .reverse()
                        .join("-")
                    : ""
                }
                onChange={(e) => {
                  const dateValue = e.target.value;
                  const formattedDate = dateValue
                    .split("-")
                    .reverse()
                    .join("/"); // แปลงกลับเป็น DD/MM/YYYY
                  handleChangeHr_Add(index, "Emp_JoinDate", formattedDate);
                }}
              />
              {/* <Input
                type="date"
                disabled={!formData1.Hr_Add[index].CB_Complete}
                style={{ width: "200px", marginLeft: "5px" }}
                value={formData1.Hr_Add[index].Emp_JoinDate}
                onChange={(e) =>
                  handleChangeHr_Add(index, "Emp_JoinDate", e.target.value)
                }
              /> */}
            </div>
          </div>
        ))}
        <div style={{ marginTop: "10px" }} align="center">
          {" "}
          <Button
            type="primary"
            style={{
              backgroundColor: "#FF9D23",
              display:
                formData1.ID_Status == "MR0107" ||
                formData1.ID_Status == "MR0108"
                  ? "none"
                  : "",
            }}
            onClick={() => Save("SaveDarft")}
          >
            Save Draft
          </Button>
        </div>
      </div>
    </>
  );
};

export default Step4;
