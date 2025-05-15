import React from "react";
import { Checkbox } from "antd";
import {
  FileDoneOutlined 
} from "@ant-design/icons";
const Step2 = ({ formData1, setFormData1, Disable }) => {

  const handleGroupChange = (checkedValues) => {
    const updatedFormData = options.reduce((acc, option) => {
      acc[option.value] = checkedValues.includes(option.value);
      return acc;
    }, {});
    setFormData1({ ...formData1, ...updatedFormData });
  };
  const options = [
    { label: "Checkbox 1", value: "checkbox1" },
    { label: "Checkbox 2", value: "checkbox2" },
    { label: "Checkbox 3", value: "checkbox3" },
    { label: "Checkbox 4", value: "checkbox4" },
    { label: "Checkbox 5", value: "checkbox5" },
  ];

  return (
    <div>
      <p
        style={{
          fontSize: "18px",
          margin: "0 10px 10px 0",
          fontWeight: "bold",
        }}
      >
        Letter Type/For Approve
        {/* {formData1.txt_ReqNo ? (
          <>
            {">>"} {formData1.txt_ReqNo}
          </>
        ) : (
          ""
        )} */}
      </p>
      <fieldset style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
  <legend style={{ fontSize: "16px", fontWeight: "bold", color: "#4CAF50" }}>
    Letter Options
  </legend>
  <Checkbox.Group
    style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    value={Object.keys(formData1).filter((key) => formData1[key])}
    onChange={handleGroupChange}
    disabled={Disable}
  >
    {options.map((option) => (
      <Checkbox key={option.value} value={option.value}>
        {option.label}
      </Checkbox>
    ))}
  </Checkbox.Group>
</fieldset>
      
    
    </div>
  );
};

export default Step2;
