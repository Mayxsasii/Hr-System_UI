import React from "react";
import { Checkbox, Input, Button, Select, Upload, Radio } from "antd";
const { TextArea } = Input;
const Step3 = () => (
  <div>
    <p
      style={{
        fontSize: "18px",
        margin: "0 10px 10px 0",
        fontWeight: "bold",
      }}
    >
      For Approve
    </p>
    <table className="TB_ForApp">
      <tr>
        <td style={{ textAlign: "right" }}>Department Manager:</td>
        <td style={{ width: "300px" }}>
          <Select style={{ width: "300px" }} />
        </td>
        <td style={{ textAlign: "center" }}>
          {" "}
          <Radio.Group
            name="radiogroup"
            defaultValue={"Approve"}
            options={[
              {
                value: "Approve",
                label: "Approve",
              },
              {
                value: "Reject",
                label: "Reject",
              },
            ]}
          />
        </td>
        <td style={{ textAlign: "right" }}>Action Date:</td>
        <td style={{ width: "300px" }}>
          <Input style={{ width: "300px" }} />
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }}>Comment:</td>
        <td colSpan={4}>
          <Input style={{ width: "1050px" }} />
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td style={{ textAlign: "right" }}>FM/DM:</td>
        <td>
          <Select style={{ width: "300px" }} />
        </td>
        <td style={{ textAlign: "center" }}>
          <Radio.Group
            name="radiogroup"
            defaultValue={"Approve"}
            options={[
              {
                value: "Approve",
                label: "Approve",
              },
              {
                value: "Reject",
                label: "Reject",
              },
            ]}
          />
        </td>
        <td style={{ textAlign: "right" }}>Action Date:</td>
        <td>
          <Input style={{ width: "300px" }} />
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }}>Comment:</td>
        <td colSpan={4}>
          <Input style={{ width: "1050px" }} />
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td style={{ textAlign: "right" }}>HR Manager:</td>
        <td>
          <Select style={{ width: "300px" }} />
        </td>
        <td style={{ textAlign: "center" }}>
          {" "}
          <Radio.Group
            name="radiogroup"
            defaultValue={"Approve"}
            options={[
              {
                value: "Approve",
                label: "Approve",
              },
              {
                value: "Reject",
                label: "Reject",
              },
            ]}
          />
        </td>
        <td style={{ textAlign: "right" }}>Action Date:</td>
        <td>
          <Input style={{ width: "300px" }} />
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }}>Comment:</td>
        <td colSpan={4}>
          <Input style={{ width: "110px" }} />
        </td>
      </tr>
      <tr>
        <td colSpan={5} align="center">
          {" "}
          <Button type="primary" style={{ backgroundColor: "#FF9D23" }}>
            Save Draft
          </Button>
          <Button type="primary" danger style={{ marginLeft: "10px" }}>
            Reset
          </Button>
          <Button type="primary" style={{ marginLeft: "10px" }}>
            Send Approve
          </Button>
        </td>
      </tr>
    </table>
  </div>
);

export default Step3;
