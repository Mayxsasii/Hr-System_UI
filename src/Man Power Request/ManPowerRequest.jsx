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
    Disable,
    setDisable,
    setCurrent
  } = fn_ManPower();

  return (
    <>
      <div style={{ marginBottom: "20px", marginRight: "10px" }}>
        <Steps current={current} items={items} onChange={onChange} />
      </div>
      <div style={contentStyle}>
        {steps[current].content({ formData1, setFormData1,Disable,setDisable,setCurrent })}
      </div>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {/* {current > 0 && ( */}
          <Button style={{ margin: "10 8px" }} onClick={() => prev()} >
            Previous
          </Button>
        {/* )} */}
        {/* {current < steps.length - 1 && ( */}
          <Button
            type="primary"
            style={{ marginRight: "18px" }}
            onClick={() => next()}
            disabled={current === steps.length - 1 }
          >
            Next
          </Button>
        {/* )} */}
      </div>
    </>
  );
};

export default App;
