import React from "react";
import { Checkbox, Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;
import "../ManPowerRequest.css";

const Step2 = () => {
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
    
        <Checkbox value="A" style={{ margintop: "10px" }}>
          Substitube (เพื่อทดแทนคนเก่า)
        </Checkbox>
      
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "90px" }}
      >
        Total:{" "}
        <Input
          value={3}
          style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
        />{" "}
        Person
        <Button type="primary" style={{ marginLeft: "20px" }}>
          Add
        </Button>
        <Checkbox value="A" style={{ marginLeft: "30px" }}>
        Person detail same with No.1
      </Checkbox>
      </div>
      <br />
      {Array.from({ length: 3 }, (_, index) => (
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
              value={"7046725"}
              style={{ width: "100px", marginLeft: "10px" }}
            />
            <Input
              size="middle"
              value={"นาย สมชาย ใจดี"}
              style={{ width: "200px", marginLeft: "5px" }}
            />
            <Input
              size="middle"
              value={"SE"}
              style={{ width: "80px", marginLeft: "5px" }}
            />
            <Input
              size="middle"
              value={"TE3"}
              style={{ width: "80px", marginLeft: "5px" }}
            />
            <p style={{ marginLeft: "10px" }}>For Dept.:</p>
            <Select style={{ width: "80px", marginLeft: "5px" }}></Select>
            <p style={{ marginLeft: "10px" }}>Request Job Grade :</p>
            <Select style={{ width: "80px", marginLeft: "5px" }}></Select>
          </div>
          <table className="TB_ReasontoRequest" style={{ marginLeft: "80px" }}>
            <tr>
              <td align="right">วุฒิการศึกษา (Education) :</td>
              <td colSpan={2}>
                {" "}
                <Select style={{ width: "300px", marginLeft: "5px" }}></Select>
              </td>
            </tr>
            <tr>
              <td align="right">Course (หลักสูตร):</td>
              <td colSpan={2}>
                {" "}
                <Select style={{ width: "300px", marginLeft: "5px" }}></Select>
              </td>
            </tr>
            <tr>
              <td align="right">Field (สาขาวิชา):</td>
              <td colSpan={2}>
                {" "}
                <Select style={{ width: "300px", marginLeft: "5px" }}></Select>
              </td>
            </tr>
            <tr>
              <td align="right">Special (คุณสมบัติพิเศษ):</td>
              <td colSpan={2}>
                {" "}
                <TextArea
                  style={{ width: "950px", height: "50px", marginLeft: "5px" }}
                  maxLength={2000}
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
                />
              </td>
            </tr>
            <tr>
              <td align="right">English Language or other :</td>
              <td onScrollCapturetyle={{ width: "300px" }}>
                {" "}
                <Select style={{ width: "300px", marginLeft: "5px" }}></Select>
              </td>
              <td>
                {" "}
                <Input style={{}} />
              </td>
            </tr>
            <tr>
              <td align="right">Other requirment:</td>
              <td style={{ width: "300px" }}>
                {" "}
                <Select style={{ width: "300px", marginLeft: "5px" }}></Select>
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
                  <Button icon={<UploadOutlined /> }style={{marginLeft:'5px'}}>Click to Upload</Button>
                </Upload>
              </td>
            </tr>
          </table>
        </div>
      ))}
      <br/>
      <Checkbox value="A" style={{ marginLeft: "10px" }}>
      Additional (เพิ่มกำลังคน)
      </Checkbox>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "90px" }}
      >
       <p style={{ textAlign: 'right', marginRight: "5px" }}>What is target of capacity up?{" "}
       <br/> (Please notify)</p>
        <TextArea
                  style={{ width: "1000px", height: "50px", marginLeft: "5px" }}
                  maxLength={2000}
                />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "90px" }}
      >
        Total:{" "}
        <Input
          value={3}
          style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
        />{" "}
        Person
        <Button type="primary" style={{ marginLeft: "20px" }}>
          Add
        </Button>
        <Checkbox value="A" style={{ marginLeft: "30px" }}>
        Person detail same with No.1
      </Checkbox>
      
      </div>
      <br />
      {Array.from({ length: 3 }, (_, index) => (
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
              value={"7046725"}
              style={{ width: "100px", marginLeft: "10px" }}
            />
            <Input
              size="middle"
              value={"นาย สมชาย ใจดี"}
              style={{ width: "200px", marginLeft: "5px" }}
            />
            <Input
              size="middle"
              value={"SE"}
              style={{ width: "80px", marginLeft: "5px" }}
            />
            <Input
              size="middle"
              value={"TE3"}
              style={{ width: "80px", marginLeft: "5px" }}
            />
            <p style={{ marginLeft: "10px" }}>For Dept.:</p>
            <Select style={{ width: "80px", marginLeft: "5px" }}></Select>
            <p style={{ marginLeft: "10px" }}>Request Job Grade :</p>
            <Select style={{ width: "80px", marginLeft: "5px" }}></Select>
          </div>
          <table className="TB_ReasontoRequest" style={{ marginLeft: "80px" }}>
            <tr>
              <td align="right">วุฒิการศึกษา (Education) :</td>
              <td colSpan={2}>
                {" "}
                <Select style={{ width: "300px", marginLeft: "5px" }}></Select>
              </td>
            </tr>
            <tr>
              <td align="right">Course (หลักสูตร):</td>
              <td colSpan={2}>
                {" "}
                <Select style={{ width: "300px", marginLeft: "5px" }}></Select>
              </td>
            </tr>
            <tr>
              <td align="right">Field (สาขาวิชา):</td>
              <td colSpan={2}>
                {" "}
                <Select style={{ width: "300px", marginLeft: "5px" }}></Select>
              </td>
            </tr>
            <tr>
              <td align="right">Special (คุณสมบัติพิเศษ):</td>
              <td colSpan={2}>
                {" "}
                <TextArea
                  style={{ width: "960px", height: "50px", marginLeft: "5px" }}
                  maxLength={2000}
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
                />
              </td>
            </tr>
            <tr>
              <td align="right">English Language or other :</td>
              <td onScrollCapturetyle={{ width: "300px" }}>
                {" "}
                <Select style={{ width: "300px", marginLeft: "5px" }}></Select>
              </td>
              <td>
                {" "}
                <Input style={{}} />
              </td>
            </tr>
            <tr>
              <td align="right">Other requirment:</td>
              <td style={{ width: "300px" }}>
                {" "}
                <Select style={{ width: "300px", marginLeft: "5px" }}></Select>
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
                <Upload maxCount={1}  >
                  <Button icon={<UploadOutlined />} style={{marginLeft:'5px'}}>Click to Upload</Button>
                </Upload>
              </td>
            </tr>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Step2;
