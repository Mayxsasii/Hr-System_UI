import React, { useState } from "react";
import { Button, Input, message, Steps, theme,Checkbox,Select } from "antd";
const { TextArea } = Input;
const steps = [
  {
    title: "New Man Power Request",
    content: "New Man Power Request",
  },
  {
    title: "Reason to request",
    content: "Reason to request",
  },
  {
    title: "For Approve",
    content: "For Approve",
  },
  {
    title: "HR Staff Action",
    content: "HR Staff Action",
  },
];
const App = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    padding: "10px",
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 30,
    // height: "1000px",
  };
  return (
    <>
      <div style={{}}>
        <Steps current={current} items={items} />
      </div>
      <div style={contentStyle}>
        <p
          style={{
            fontSize: "18px",
            margin: "0 10px 10px 0",
            fontWeight: "bold",
          }}
        >
          New Man Power Request
        </p>
        <table style={{ marginTop: "10px", marginLeft: "10px" }}>
        <tr>
          <td style={{ textAlign: 'right' }}>Factory :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "200px" }} />
          </td>
          <td style={{ textAlign: 'right' }}>Request Status :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "200px" }} />
          </td>
          <td style={{ textAlign: 'right' }}>Request Date :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "200px" }} />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'right' }}>Request No. :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "200px" }} />
          </td>
          <td style={{ textAlign: 'right' }}>Request By :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "200px" }} />
          </td>
          <td style={{ textAlign: 'right' }}>Department:</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "200px" }} />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'right' }}>Email :</td>
          <td colSpan={3}>
            <Input style={{ marginLeft: "5px", width: "510px" }} />
          </td>
          <td style={{ textAlign: 'right' }}>Tel :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "200px" }} />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'right' }}>Position Requirement :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "200px" }} />
          </td>
          <td style={{ textAlign: 'right' }}>Target Date :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "200px" }} />
          </td>
          <td style={{ textAlign: 'right' }}>Total Request :</td>
          <td>
            <Input style={{ marginLeft: "5px", width: "60px" }} />
          </td>
        </tr>

          <tr >
            <td style={{ textAlign: 'right' }}>
            Employee Requirment :
            </td>
            <td  colSpan={5} >  <Checkbox.Group
              style={{
                display: 'flex',
                flexDirection: 'column', // จัดเรียงในแนวตั้ง
                width: '100%',
              }}
            >
              <Checkbox value="A">Internal</Checkbox>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox value="B">External</Checkbox>
                <p style={{ marginLeft:'30px',marginRight:'10px'}}>Employee Type :</p>
                <Select  style={{ width: '200px' }}></Select>
                <Input  style={{width:'450px'}}></Input>
              </div>
              
              <div><Checkbox value="C">Other</Checkbox> <Input  style={{width:'800px'}}></Input></div>
            </Checkbox.Group></td>
          </tr>
          <tr>
            <td style={{ textAlign: 'right' }}>Remark :</td>
            <td colSpan={5}>
              <TextArea
                style={{  width: "870px",height:'100px' }}
                maxLength={2000}
                
              />
              </td>
          </tr>
        </table>
      </div>

      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default App;
