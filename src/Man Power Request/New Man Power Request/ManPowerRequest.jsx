import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import Step1 from "./NewManPowerRequest";
import Step2 from "./ReasontoRequest";
import Step3 from "./ForApprove";
import Step4 from "./HRStaffAction";

const steps = [
  {
    title: "New Man Power Request",
    content: <Step1 />,
  },
  {
    title: "Reason to request",
    content: <Step2 />,
  },
  {
    title: "For Approve",
    content: <Step3 />,
  },
  {
    title: "HR Staff Action",
    content: <Step4 />,
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
  };
  return (
    <>
      <div style={{}}>
        <Steps current={current} items={items} />
      </div>
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
      {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success("Processing complete!")}>
            Done
          </Button>
        )}
       
      </div>
    </>
  );
};

export default App;