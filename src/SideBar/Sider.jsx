import React from "react";
import {
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import "./Sider.css";
import imgLogo from "../assets/LogoFujikura.png";
import {fn_Sider} from "./fn_Sider.jsx";
const { Sider } = Layout;

const CustomSider = () => {
  const {
    menuData,handleMenuClick,siderRef,collapsed ,selectedKey ,renderMenu,Menu ,setCollapsed 
  } = fn_Sider();

  return (
    <Sider
      ref={siderRef}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={300} 
      collapsedWidth={90} 
      style={{
        overflowY: "auto",
        height: "97vh",

        position: "sticky",
        top: 10,
        backgroundColor: "#51ada8", 
        borderRadius: "15px",
        margin: "10px",
        scrollbarWidth: "thin",
        scrollbarColor: "#888 #f1f1f1",
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          className="logo"
          style={{
            height: "50px",
            margin: "20px auto",
            textAlign: "center",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
          ) : (
            <img src={imgLogo} style={{ height: "80%" }} />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: "#51ada8",color:'#FFFFFF' }}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        >
          {renderMenu(menuData)}
        </Menu>
      </div>
    </Sider>
  );
};

export default CustomSider;
