import React from "react";
import { Button, message, Steps } from "antd";

import { fn_ManPower } from "./fn_ManPower";

const App = () => {
  const {
    current,
    onChange,
    items,
    steps,
    formData1,
    setFormData1,
    prev,
    next,
    contentStyle,
  } = fn_ManPower();
 

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
