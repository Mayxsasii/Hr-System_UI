import React from "react";
import { Button, Steps, Card } from "antd";
import { fn_RefferenceLetter } from "./fn_RefferenceLetter";
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
    setCurrent,
  } = fn_RefferenceLetter();

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card
        style={{
          // maxWidth: "1300px",
          margin: "0 auto",
          // padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Steps
          current={current}
          items={items}
          onChange={onChange}
          style={{ marginBottom: "20px" }}
        />
        <div style={{ ...contentStyle, padding: "20px", backgroundColor: "#fff", borderRadius: "10px" }}>
          {steps[current].content({
            formData1,
            setFormData1,
            Disable,
            setDisable,
            setCurrent,
          })}
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "0 20px",
            }}
            onClick={() => prev()}
            disabled={current === 0}
          >
            Previous
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: current === steps.length - 1 ? "#52c41a" : "#1890ff",
              border: "none",
              borderRadius: "5px",
              padding: "0 20px",
            }}
            onClick={() => next()}
            disabled={current === steps.length - 1}
          >
            {current === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default App;