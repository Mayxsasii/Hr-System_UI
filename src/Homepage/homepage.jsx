// FILE: Login.jsx
import React from "react";
import ImgHR1 from "../assets/candidate.png";
import ImgHR2 from "../assets/human-resources.png";
import ImgHR3 from "../assets/id-card.png";
import ImgHR4 from "../assets/stationery (1).png";
import ImgHR5 from "../assets/safety-at-work.png";
import { fn_home } from "./fn_home";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./HomePage.css";

const Login = () => {
  const {
    ManPower,
    GoPathManPower,
    GoPathLetter,
    Letter,
    GoPathEmpCard,
    EmpCard,
    Roll
  } = fn_home();

  
  return (
    <div>
      <div className="Home_Page">
        <div className="card_HomePage" style={{   display: ["241", "243", "244"].some((role) => String(Roll).includes(role))
                ? ""
                : "none",}}>
          <div
            className="Title_card green"
            style={{
              // borderBottom: "2px solid #3F7D58",
            
            }}
          >

            <img src={ImgHR1} alt="Hiring" className="Img_Card" />
            
            <div className="Div_Span">
              <span
                className="Font_Title"
                style={{
                  color: "#3F7D58",
                }}
              >
                Man Power Request
              </span>
              <span className="Font_Count">
                Total {ManPower[7]?.Total || 0} Request
              </span>
            </div>
        
          </div>
           
          <div className="Div_Status">
            
            <div
              className="Home_Status"
              style={{
                background: "#E3FCEF",
                borderLeft: "10px solid #2E7D32",
              }}
              onClick={() => GoPathManPower("1", ManPower[0]?.Create)}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#2E7D32",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#2E7D32",
                  border: "2px solid #2E7D32",
                }}
              >
                {ManPower[0]?.Create || 0}
              </p>
            </div>
            <div
              className="Home_Status"
              style={{
                background: "#E3FCEF",
                borderLeft: "10px solid #2E7D32",
              }}
              onClick={() => GoPathManPower("2", ManPower[1]?.WaitDeptApprove)}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#2E7D32",
                }}
              >
                Wait Department Manager Approve
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#2E7D32",
                  border: "2px solid #2E7D32",
                }}
              >
                {ManPower[1]?.WaitDeptApprove || 0}
              </p>
            </div>

            <div
              className="Home_Status"
              style={{
                background: "#E3FCEF",
                borderLeft: "10px solid #2E7D32",
              }}
              onClick={() => GoPathManPower("2", ManPower[2]?.WaitFMGMApprove)}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#2E7D32",
                }}
              >
                Wait FM/GM Approve
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#2E7D32",
                  border: "2px solid #2E7D32",
                }}
              >
                {ManPower[2]?.WaitFMGMApprove || 0}
              </p>
            </div>
            <div
              className="Home_Status"
              style={{
                background: "#E3FCEF",
                borderLeft: "10px solid #2E7D32",
              }}
              onClick={() => GoPathManPower("2", ManPower[3]?.WaitCOOApprove)}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#2E7D32",
                }}
              >
                Wait Chief Operating Officer
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#2E7D32",
                  border: "2px solid #2E7D32",
                }}
              >
                { ManPower[3]?.WaitCOOApprove || 0}
              </p>
            </div>
            <div
              className="Home_Status"
              style={{
                background: "#E3FCEF",
                borderLeft: "10px solid #2E7D32",
              }}
               onClick={() => GoPathManPower("2", ManPower[4]?.WaitCEOApprove)}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#2E7D32",
                }}
              >
                Wait President & CEO
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#2E7D32",
                  border: "2px solid #2E7D32",
                }}
              >
                {ManPower[4]?.WaitCEOApprove || 0}
              </p>
            </div>

            <div
              className="Home_Status"
              style={{
                background: "#E3FCEF",
                borderLeft: "10px solid #2E7D32",
              }}
              onClick={() =>
                GoPathManPower("2", ManPower[5]?.WaitHRManagerApprove)
              }
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#2E7D32",
                }}
              >
                Wait HR Manager Approve
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#2E7D32",
                  border: "2px solid #2E7D32",
                }}
              >
                {ManPower[5]?.WaitHRManagerApprove || 0}
              </p>
            </div>

            <div
              className="Home_Status"
              style={{
                background: "#E3FCEF",
                borderLeft: "10px solid #2E7D32",
              }}
              onClick={() => GoPathManPower("3", ManPower[6]?.WaitHRStaff)}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#2E7D32",
                }}
              >
                Wait HR Staff Action
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#2E7D32",
                  border: "2px solid #2E7D32",
                }}
              >
                {ManPower[6]?.WaitHRStaff || 0}
              </p>
            </div>
          </div>
        </div>
        {/* content2*/}
        <div className="card_HomePage">
          {/* Header Section */}
          <div
            className="Title_card orange"
           
          >
            <img src={ImgHR2} alt="Hiring" className="Img_Card" />
            <div className="Div_Span">
              <span
                className="Font_Title"
                style={{
                  color: "#F57C00",
                }}
              >
                Reference Letter Request
              </span>
              <span className="Font_Count">
                Total {Letter[2]?.Total || 0} Request
              </span>
            </div>
          </div>

          {/* Status Section */}
          <div className="Div_Status">
            {/* Create */}
            <div
              className="Home_Status"
              style={{
                background: "#FFF3E0", // สีเขียวอ่อน
                borderLeft: "10px solid #F57C00", // สีเขียวเข้ม
              }}
              onClick={() => GoPathLetter("C", "")}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#F57C00",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#F57C00",
                  border: "2px solid #F57C00",
                  // fontWeight: "bold",
                }}
              >
                <ArrowRightOutlined />
              </p>
            </div>

            {/* Wait Approve */}
            <div
              className="Home_Status"
              style={{
                background: "#FFF3E0", // สีเขียวอ่อน
                borderLeft: "10px solid #F57C00", // สีเขียวเข้ม
              }}
              onClick={() => GoPathLetter("A", Letter[0]?.WaitSVApprove || 0)}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#F57C00",
                }}
              >
                Wait Supervisor Up Approve
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#F57C00",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "2px solid #F57C00",
                  margin: 0,
                }}
              >
                {Letter[0]?.WaitSVApprove || 0}
              </p>
            </div>

            {/* Wait HR */}
            <div
              className="Home_Status"
              style={{
                background: "#FFF3E0", // สีเขียวอ่อน
                borderLeft: "10px solid #F57C00", // สีเขียวเข้ม
              }}
              onClick={() => GoPathLetter("H", Letter[1]?.WaitHRStaff || 0)}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#F57C00",
                }}
              >
                Wait HR Staff Action
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#F57C00",
                  border: "2px solid #F57C00",
                }}
              >
                {Letter[1]?.WaitHRStaff || 0}
              </p>
            </div>

            {/* Wait Receive  */}
            <div
              className="Home_Status"
              style={{
                background: "#FFF3E0", // สีเขียวอ่อน
                borderLeft: "10px solid #F57C00", // สีเขียวเข้ม
              }}
              onClick={() => GoPathLetter("R", "")}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#F57C00",
                }}
              >
                Wait Receive
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#F57C00",
                  border: "2px solid #F57C00",
                }}
              >
                <ArrowRightOutlined />
              </p>
            </div>
          </div>
        </div>
        {/* content3 */}
        <div className="card_HomePage">
          {/* Header Section */}
          <div
            className="Title_card blue"
            
          >
            <img src={ImgHR3} alt="Hiring" className="Img_Card" />
            <div className="Div_Span">
              <span
                className="Font_Title"
                style={{
                  color: "#0288D1",
                }}
              >
                Employee Card Request
              </span>
              <span className="Font_Count">
                Total {EmpCard[2]?.Total || 0} Request
              </span>
            </div>
          </div>

          {/* Status Section */}
          <div className="Div_Status">
            {/* Create */}
            <div
              className="Home_Status"
              style={{
                background: "#E3F2FD", // สีเขียวอ่อน
                borderLeft: "10px solid #0288D1", // สีเขียวเข้ม
              }}
              onClick={() => GoPathEmpCard("C", "")}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#0288D1",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#0288D1",
                  border: "2px solid #0288D1",
                }}
              >
                <ArrowRightOutlined />
              </p>
            </div>

            <div
              className="Home_Status"
              style={{
                background: "#E3F2FD", // สีเขียวอ่อน
                borderLeft: "10px solid #0288D1", // สีเขียวเข้ม
              }}
              onClick={() => GoPathEmpCard("A", EmpCard[0]?.WaitSVApprove || 0)}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#0288D1",
                }}
              >
                Wait Supervisor Up Approve
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#0288D1",
                  border: "2px solid #0288D1",
                }}
              >
                {EmpCard[0]?.WaitSVApprove || 0}
              </p>
            </div>

            <div
              className="Home_Status"
              style={{
                background: "#E3F2FD", // สีเขียวอ่อน
                borderLeft: "10px solid #0288D1", // สีเขียวเข้ม
              }}
              onClick={() => GoPathEmpCard("H", EmpCard[1]?.WaitHRStaff)}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#0288D1",
                }}
              >
                Wait HR Staff Action
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#0288D1",
                  border: "2px solid #0288D1",
                }}
              >
                {EmpCard[1]?.WaitHRStaff || 0}
              </p>
            </div>
          </div>
        </div>
        {/* content4 */}
        <div className="card_HomePage">
          {/* Header Section */}
          <div
            className="Title_card purple"
           
          >
            <img src={ImgHR4} alt="Hiring" className="Img_Card" />
            <div className="Div_Span">
              <span
                style={{
                  color: "#6A1B9A",
                }}
                className="Font_Title"
              >
               Stationery Purchasing Order Request

              </span>
              <span className="Font_Count">Total 10 Request</span>
            </div>
          </div>

          {/* Status Section */}
          <div className="Div_Status">
            <div
              className="Home_Status"
              style={{
                background: "#F3E5F5", // สีเขียวอ่อน
                borderLeft: "10px solid #6A1B9A", // สีเขียวเข้ม
              }}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#6A1B9A",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{ color: "#6A1B9A", border: "2px solid #6A1B9A" }}
              >
                5
              </p>
            </div>
            <div
              className="Home_Status"
              style={{
                background: "#F3E5F5", // สีเขียวอ่อน
                borderLeft: "10px solid #6A1B9A", // สีเขียวเข้ม
              }}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#6A1B9A",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{ color: "#6A1B9A", border: "2px solid #6A1B9A" }}
              >
                5
              </p>
            </div>
            <div
              className="Home_Status"
              style={{
                background: "#F3E5F5", // สีเขียวอ่อน
                borderLeft: "10px solid #6A1B9A", // สีเขียวเข้ม
              }}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#6A1B9A",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{ color: "#6A1B9A", border: "2px solid #6A1B9A" }}
              >
                5
              </p>
            </div>
            <div
              className="Home_Status"
              style={{
                background: "#F3E5F5", // สีเขียวอ่อน
                borderLeft: "10px solid #6A1B9A", // สีเขียวเข้ม
              }}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#6A1B9A",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{ color: "#6A1B9A", border: "2px solid #6A1B9A" }}
              >
                5
              </p>
            </div>
            <div
              className="Home_Status"
              style={{
                background: "#F3E5F5", // สีเขียวอ่อน
                borderLeft: "10px solid #6A1B9A", // สีเขียวเข้ม
              }}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#6A1B9A",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{ color: "#6A1B9A", border: "2px solid #6A1B9A" }}
              >
                5
              </p>
            </div>
          </div>
        </div>
        {/* content5 */}
        <div className="card_HomePage">
          {/* Header Section */}
          <div
            className="Title_card red"
           
          >
            <img src={ImgHR5} alt="Hiring" className="Img_Card" />
            <div className="Div_Span">
              <span
                className="Font_Title"
                style={{
                  color: "#D32F2F",
                }}
              >
                Safty Shoes Request
              </span>
              <span className="Font_Count">Total 10 Request</span>
            </div>
          </div>

          {/* Status Section */}
          <div className="Div_Status">
            {/* Create */}
            <div
              className="Home_Status"
              style={{
                background: "#FFEBEE", // สีเขียวอ่อน
                borderLeft: "10px solid #D32F2F", // สีเขียวเข้ม
              }}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#D32F2F",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#D32F2F",
                  border: "2px solid #D32F2F",
                }}
              >
                5
              </p>
            </div>

            <div
              className="Home_Status"
              style={{
                background: "#FFEBEE", // สีเขียวอ่อน
                borderLeft: "10px solid #D32F2F", // สีเขียวเข้ม
              }}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#D32F2F",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#D32F2F",
                  border: "2px solid #D32F2F",
                }}
              >
                5
              </p>
            </div>
            <div
              className="Home_Status"
              style={{
                background: "#FFEBEE", // สีเขียวอ่อน
                borderLeft: "10px solid #D32F2F", // สีเขียวเข้ม
              }}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#D32F2F",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#D32F2F",
                  border: "2px solid #D32F2F",
                }}
              >
                5
              </p>
            </div>
            <div
              className="Home_Status"
              style={{
                background: "#FFEBEE", // สีเขียวอ่อน
                borderLeft: "10px solid #D32F2F", // สีเขียวเข้ม
              }}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#D32F2F",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#D32F2F",
                  border: "2px solid #D32F2F",
                }}
              >
                5
              </p>
            </div>
            <div
              className="Home_Status"
              style={{
                background: "#FFEBEE", // สีเขียวอ่อน
                borderLeft: "10px solid #D32F2F", // สีเขียวเข้ม
              }}
            >
              <p
                className="P_Title_Status"
                style={{
                  color: "#D32F2F",
                }}
              >
                Create
              </p>
              <p
                className="P_Count_Status"
                style={{
                  color: "#D32F2F",
                  border: "2px solid #D32F2F",
                }}
              >
                5
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
