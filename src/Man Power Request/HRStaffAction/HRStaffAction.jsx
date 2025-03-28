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
import { UploadOutlined, CaretDownOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const Step4 = () => (
  <div>
    <p
      style={{
        fontSize: "18px",
        margin: "0 10px 0 0",
        fontWeight: "bold",
      }}
    >
      HR Staff Action{''}
        {/* {formData1.txt_ReqNo ? (
          <>
            {">>"} {formData1.txt_ReqNo}
          </>
        ) : (
          ""
        )} */}
    </p>
    <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>
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
        <p style={{ margin: 4, fontSize: "16px" }}>Result after interview</p>
      </div>
      Total Request:{" "}
      <Input
        value={3}
        style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
      />{" "}
      Person
      <p style={{ marginLeft: "50px" }}>Remain :</p>
      <Input
        value={3}
        style={{ width: "80px", marginLeft: "10px", marginRight: "5px" }}
      />{" "}
      Person
    </div>
    <div>
      <p
        style={{
          fontSize: "15px",
          margin: "0 0 10px 40px",
          fontWeight: "bold",
        }}
      >
        <CaretDownOutlined /> Substitube (เพื่อทดแทนคนเก่า)
      </p>
    </div>
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
        <Checkbox value="A" style={{ marginLeft: "80px" }}>
          Recruited
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
            value={"7046725"}
            style={{ width: "100px", marginLeft: "5px", marginRight: "5px" }}
          />
          Name :
          <Input
            size="middle"
            value={"นาย สมชาย ใจดี"}
            style={{ width: "200px", marginLeft: "5px", marginRight: "10px" }}
          />
          Surname :
          <Input
            size="middle"
            value={"SE"}
            style={{ width: "200px", marginLeft: "5px" }}
          />
          <p style={{ marginLeft: "10px" }}>Join date:</p>
          <DatePicker style={{ marginLeft: "10px" }} />
        </div>
      </div>
    ))}
    <div>
      <p
        style={{
          fontSize: "15px",
          margin: "10px 0 10px 40px",
          fontWeight: "bold",
        }}
      >
        <CaretDownOutlined /> Additional (เพิ่มกำลังคน)
      </p>
    </div>
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
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
            marginTop: "5px",
          }}
        >
          <p style={{ margin: 0 }}>{index + 1}.</p>
          <Checkbox value="A" style={{ marginLeft: "30px" }}>
            Recruited
          </Checkbox>
        </div>
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
            value={"7046725"}
            style={{ width: "100px", marginLeft: "5px", marginRight: "5px" }}
          />
          Name :
          <Input
            size="middle"
            value={"นาย สมชาย ใจดี"}
            style={{ width: "200px", marginLeft: "5px", marginRight: "10px" }}
          />
          Surname :
          <Input
            size="middle"
            value={"SE"}
            style={{ width: "200px", marginLeft: "5px" }}
          />
          <p style={{ marginLeft: "10px" }}>Join date:</p>
          <DatePicker style={{ marginLeft: "10px" }} />
        </div>
      </div>
    ))}

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
        style={{ marginLeft: "10px", marginRight: "10px" }}
        name="radiogroup"
        defaultValue={"Approve"}
        options={[
          {
            value: "On Process",
            label: "On Process",
          },
          {
            value: "Close",
            label: "Close",
          },
          {
            value: "Close by condition",
            label: "Close by condition",
          },
        ]}
      />
      <Select style={{ width: "350px" }} />
    </div>
    <div style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}>
      <p style={{ marginRight: "5px" }}>HR Staff:</p>
      <Input style={{ width: "300px" }} />
      <p style={{ marginRight: "5px", marginLeft: "35px" }}>Action Date:</p>
      <DatePicker style={{ width: "275px" }} />
    </div>
    <div style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}>
      <p style={{ marginRight: "5px" }}>Comment:</p>
      <TextArea
        style={{ width: "1150px", height: "50px", marginLeft: "5px" }}
        maxLength={2000}
      />
    </div>
    <div style={{ textAlign: "center", margin: "10px" }}>
      {" "}
      <Button type="primary" style={{ backgroundColor: "#FF9D23" }}>
        Save Draft
      </Button>
      <Button type="primary" danger style={{ marginLeft: "10px" }}>
        Reset
      </Button>
      <Button type="primary" style={{ marginLeft: "10px" }}>
        Submit
      </Button>
    </div>
  </div>
);

export default Step4;
