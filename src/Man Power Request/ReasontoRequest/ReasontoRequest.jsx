import React from "react";
import { Checkbox, Input, Button, Select, Upload } from "antd";
import { UploadOutlined, PlusCircleOutlined,DeleteOutlined } from "@ant-design/icons";
const { TextArea } = Input;
import "../ManPowerRequest.css";
import { fn_ReasontoRequest } from "./fn_ReasontoRequest";

const Step2 = ({ formData1, setFormData1 }) => {
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
  } = fn_ReasontoRequest(formData1, setFormData1);

  return (
    <div>
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        Reason to request
      </p>

      <Checkbox
        style={{ marginTop: "10px", marginLeft: "10px" }}
        checked={formData1.CB_Substitube}
        onChange={(e) => {
          setFormData1({ ...formData1, CB_Substitube: e.target.checked });
          CheckReasontorequestSub();
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
          <Checkbox value="A" style={{ marginLeft: "30px" }}>
            Attach file:
          </Checkbox>
          <Upload maxCount={1}>
            <Button icon={<UploadOutlined />} style={{ marginLeft: "5px" }}>
              Click to Attach file
            </Button>
          </Upload>
          <p
            style={{
              marginLeft: "10px",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            File format
          </p>
        </div>
        <Button
          type="primary"
          style={{ marginRight: "30px" }}
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
                display: "flex",
                alignItems: "center",
                paddingTop: "10px",
              }}
            >
              Copy detail from No.
              <Input
                style={{ width: "70px", marginLeft: "10px" }}
                value={formData1.Person_Sub[index].CopyNo}
                onChange={(e) =>
                  handlePersonSubChange(index, "CopyNo", e.target.value)
                }
              ></Input>{" "}
              <Button
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
              size="middle"
              value={formData1.Person_Sub[index].ID_Code}
              style={{ width: "100px", marginLeft: "10px" }}
              onChange={(e) =>
                handlePersonSubChange(index, "ID_Code", e.target.value)
              }
              onBlur={(e) => GetDataPersonByIDCode(e.target.value, index)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  GetDataPersonByIDCode(
                    formData1.Person_Sub[index].ID_Code,
                    index
                  );
                }
              }}
            />
            <Input
              size="middle"
              value={formData1.Person_Sub[index].Emp_Name}
              style={{ width: "200px", marginLeft: "5px" }}
              onChange={(e) =>
                handlePersonSubChange(index, "Emp_Name", e.target.value)
              }
            />
            <Input
              size="middle"
              style={{ width: "80px", marginLeft: "5px" }}
              value={formData1.Person_Sub[index].Cost_Center}
              onChange={(e) =>
                handlePersonSubChange(index, "Cost_Center", e.target.value)
              }
            />
            <Input
              size="middle"
              value={formData1.Person_Sub[index].Job_grade}
              onChange={(e) =>
                handlePersonSubChange(index, "Job_grade", e.target.value)
              }
              style={{ width: "80px", marginLeft: "5px" }}
            />
            <p style={{ marginLeft: "10px" }}>For Dept.:</p>

            <Select
              showSearch
              value={formData1.Person_Sub[index].Dept}
              style={{ width: "80px", marginLeft: "5px" }}
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
              showSearch
              value={formData1.Person_Sub[index].Req_Jobgrade}
              style={{ width: "80px", marginLeft: "5px" }}
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
              <td colSpan={2}>
                {" "}
                {/* <Select style={{ width: "300px", marginLeft: "5px" }}></Select> */}
                <Select
                  showSearch
                  value={formData1.Person_Sub[index].Education}
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
            </tr>
            <tr>
              <td align="right">Course (หลักสูตร):</td>
              <td colSpan={2}>
                <Select
                  showSearch
                  value={formData1.Person_Sub[index].Course}
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
            </tr>
            <tr>
              <td align="right">Field (สาขาวิชา):</td>
              <td colSpan={2}>
                {" "}
                <Select
                  showSearch
                  value={formData1.Person_Sub[index].Field}
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
            </tr>
            <tr>
              <td align="right">Special (คุณสมบัติพิเศษ):</td>
              <td colSpan={2}>
                <TextArea
                  value={formData1.Person_Sub[index].Special}
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
                  style={{ width: "950px", height: "50px", marginLeft: "5px" }}
                  maxLength={2000}
                  value={formData1.Person_Sub[index].Experience}
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
                  showSearch
                  value={formData1.Person_Sub[index].StepLanguage}
                  style={{ width: "300px", marginLeft: "5px" }}
                  placeholder="Select English Language"
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
                <Input style={{}} />
              </td>
            </tr>
            <tr>
              <td align="right">คุณสมบัติอย่างละเอียด :</td>
              <td colSpan={2}>
                {" "}
                <Upload maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    style={{ marginLeft: "5px" }}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </td>
            </tr>
          </table>
        </div>
      ))}
      <br />
      <Checkbox
        style={{ marginLeft: "10px" }}
        checked={formData1.CB_Additional}
        onChange={(e) => {
          setFormData1({ ...formData1, CB_Additional: e.target.checked });
          CheckReasontorequestADD();
        }}
      >
        Additional (เพิ่มกำลังคน)
      </Checkbox>
      <div style={{ display: "flex", alignItems: "center", marginLeft: "90px", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <p style={{ textAlign: "right", marginRight: "5px" }}>
            What is target of capacity up? <br /> (Please notify)
          </p>
          <TextArea
            style={{ width: "1000px", height: "50px", marginLeft: "5px" }}
            maxLength={2000}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <TextArea
            style={{ width: "1000px", height: "50px", marginLeft: "195px" }}
            maxLength={2000}
          />
        </div>
      </div>
      

        

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
            value={formData1.txt_TotalAdditional}
            disabled
            style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
          />{" "}
          Person
          <Checkbox value="A" style={{ marginLeft: "30px" }}>
            Attach file:
          </Checkbox>
          <Upload maxCount={1}>
            <Button icon={<UploadOutlined />} style={{ marginLeft: "5px" }}>
              Click to Attach file
            </Button>
          </Upload>
          <p
            style={{
              marginLeft: "10px",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            File format
          </p>
        </div>
        <Button
          type="primary"
          style={{ marginRight: "30px" }}
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
            <p style={{ marginRight: "30px" }}>{index + 1}.</p>
            {index === 0 ? (
              <p>Copy detail from Substitube No.</p>
            ) : (
              <p>Copy detail from No.</p>
            )}
            <Input
              size="middle"
              style={{ width: "70px", marginLeft: "10px" }}
              value={formData1.Person_ADD[index].CopyNo}
              onChange={(e) =>
                handlePersonAddChange(index, "CopyNo", e.target.value)
              }
            />
            <Button
              type="primary"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                handleCopyADD(formData1.Person_ADD[index].CopyNo, index);
              }}
            >
              OK
            </Button>
          </div>
          <table className="TB_ReasontoRequest" style={{ marginLeft: "80px" }}>
            <tr>
              <td align="right">วุฒิการศึกษา (Education) :</td>
              <td colSpan={2}>
                {" "}
                {/* <Select style={{ width: "300px", marginLeft: "5px" }}></Select> */}
                <Select
                  showSearch
                  value={formData1.Person_ADD[index].Education}
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
            </tr>
            <tr>
              <td align="right">Course (หลักสูตร):</td>
              <td colSpan={2}>
                {" "}
                <Select
                  showSearch
                  value={formData1.Person_ADD[index].Course}
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
            </tr>
            <tr>
              <td align="right">Field (สาขาวิชา):</td>
              <td colSpan={2}>
                {" "}
                <Select
                  showSearch
                  value={formData1.Person_ADD[index].Field}
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
            </tr>
            <tr>
              <td align="right">Special (คุณสมบัติพิเศษ):</td>
              <td colSpan={2}>
                {" "}
                <TextArea
                  style={{ width: "960px", height: "50px", marginLeft: "5px" }}
                  maxLength={2000}
                  value={formData1.Person_ADD[index].Special}
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
                  style={{ width: "960px", height: "50px", marginLeft: "5px" }}
                  maxLength={2000}
                  value={formData1.Person_ADD[index].Experience}
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
                  value={formData1.Person_ADD[index].StepLanguage}
                  style={{ width: "300px", marginLeft: "5px" }}
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
                <Input style={{}} />
              </td>
            </tr>
            <tr>
              <td align="right">คุณสมบัติอย่างละเอียด :</td>
              <td colSpan={2}>
                {" "}
                <Upload maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    style={{ marginLeft: "5px" }}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </td>
        
            </tr>
            <tr><td colSpan={3} align="center"> <Button
                    icon={<DeleteOutlined />}
                    danger
                    type="primary"
                    style={{ marginBottom: "5px" }}
                  >
                    Delete
                  </Button></td></tr>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Step2;
