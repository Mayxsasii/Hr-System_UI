import React from "react";
import { Button, message, Steps,Card } from "antd";

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
       <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card     style={{
          // maxWidth: "1300px",
          margin: "0 auto",
          // padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}>
          <Steps current={current} items={items} onChange={onChange}   style={{ marginBottom: "20px" }} />
          <div style={{ ...contentStyle, padding: "20px", backgroundColor: "#fff", borderRadius: "10px" }}>
            {steps[current].content({ formData1, setFormData1,Disable,setDisable,setCurrent })}
          </div>
           <div
        style={{
         marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
        }}
      >
        {/* {current > 0 && ( */}
          <Button   type="primary" style={{ }} onClick={() => prev()} >
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
      </Card>
     
      </div>
    </>
  );
};

export default App;
