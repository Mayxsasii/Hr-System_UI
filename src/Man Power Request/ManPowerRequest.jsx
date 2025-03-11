import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import Step1 from "./NewManPowerRequset/NewManPowerRequest";
import Step2 from "./ReasontoRequest/ReasontoRequest";
import Step3 from "./ForApprove/ForApprove";
import Step4 from ".//HRStaffAction/HRStaffAction";

const steps = [
  {
    title: "New Man Power Request",
    content: (props) => <Step1 {...props} />,
  },
  {
    title: "Reason to request",
    content: (props) => <Step2 {...props} />,
  },
  {
    title: "For Approve",
    content: (props) => <Step3 {...props} />,
  },
  {
    title: "HR Staff Action",
    content: (props) => <Step4 {...props} />,
  },
];

const App = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [formData1, setFormData1] = useState({
    SL_Factory: null,
    SL_Department: null,
    SL_Position: null,
    txt_TelNo: "",
    Date_Target: null,
    SL_Employee: null,
    txt_EmpType: "",
    txt_EmpReq_Other: "",
    txt_Remark: "",
  });

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
    marginRight: 10,
  };

  const onChange = (current) => {
    setCurrent(current);
  };

  return (
    <>
      <div style={{ marginBottom: "20px", marginRight: "10px" }}>
        <Steps current={current} items={items} onChange={onChange} />
      </div>
      <div style={contentStyle}>
        {steps[current].content({ formData1, setFormData1 })}
      </div>
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
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default App;
