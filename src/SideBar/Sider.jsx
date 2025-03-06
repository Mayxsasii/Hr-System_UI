import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  HomeOutlined,
  SwapOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import './Sider.css'; 
import imgLogo from "../assets/LogoFujikura.png";
import "bootstrap-icons/font/bootstrap-icons.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

const CustomSider = ({ collapsed, setCollapsed }) => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [menuData, setMenuData] = useState([]);
  const siderRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    GetMenu();
  }, []);

  const GetMenu = async () => {
    await axios
      .post("/api/common/GetMenu", {})
      .then((res) => {
        setMenuData(res.data);
      });
  };


  const handleMenuClick = (e) => {
    const selectedMenu = menuData.find(item => item.MENU_ID === e.key);
    setSelectedKey(e.key);
    console.log(e.key, selectedMenu.MENU_NAME, 'e.key and menu name');
    if(selectedMenu.MENU_NAME === 'Man Power Request'){
      
      window.location.href = '/HrSystem/ManPowerRequest';
    }
  };
  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  const handleClickOutside = (event) => {
    if (siderRef.current && !siderRef.current.contains(event.target)) {
      handleMouseLeave();
    }
  };
  const GetIconMenu = (item) => {
    if (item.MENU_NAME === "Home") {
      return <HomeOutlined />
    }
    else  if (item.MENU_NAME === "Man Power") {
      return <i className="bi bi-people" ></i>

    }
    else  if (item.MENU_NAME=='Transaction'){
      return <SwapOutlined />
    }
    else  if (item.MENU_NAME=='Man Power Request'){
      return <i className="bi bi-clipboard2-plus"></i>
    }
    else  if (item.MENU_NAME=='Approve Man Power'){
      return <i className="bi bi-clipboard-check"></i>
    }
    else  if (item.MENU_NAME=='Monitoring Function'){
      return <i className="bi bi-card-checklist"></i>
    }
    else  if (item.MENU_NAME=='Man Power Master List'){
      return <i className="bi bi-clipboard-data"></i>
    }
    else  if (item.MENU_NAME=='Report Function'){
      return <i className="bi bi-graph-up"></i>
    }
    else  if (item.MENU_NAME=='Master Data Function'){
      return <i className="bi bi-bookmark-heart"></i>
    }
    else  if (item.MENU_NAME=='Department Master'){
      return <i className="bi bi-folder-plus"></i>
    }
    else  if (item.MENU_NAME=='Cost center mapping Dept'){
      return <i className="bi bi-patch-plus"></i>
    }
    else  if (item.MENU_NAME=='Person Master'){
      return <i className="bi bi-person-plus"></i>
    }
    else  if (item.MENU_NAME=='Position mapping Job grade'){
      return <i className="bi bi-bag-plus"></i>
    }
    // else  if (item.MENU_NAME=='Approve Man Power'){
    //   return <i className="bi bi-clipboard2-plus"></i>
    // }
    // else  if (item.MENU_NAME=='Approve Man Power'){
    //   return <i className="bi bi-clipboard2-plus"></i>
    // }
    else  if (item.MENU_NAME=='Master code maintain'){
      return <i className="bi bi-calendar2-plus"></i>
    }
    //
    // เพิ่มเงื่อนไขสำหรับเมนูอื่น ๆ ตามต้องการ
    return <AppstoreOutlined />;
  };
  const renderMenu = (menuItems, parentId = null) => {
    return menuItems
      .filter(item => item.MENU_PARENT_ID === parentId)
      .map(item => {
        const children = menuItems.filter(child => child.MENU_PARENT_ID === item.MENU_ID);
        if (children.length > 0) {
          return (
            <SubMenu key={item.MENU_ID} icon={GetIconMenu(item)} title={item.MENU_NAME} >
              {renderMenu(menuItems, item.MENU_ID)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.MENU_ID} icon={GetIconMenu(item)} >
            {item.MENU_NAME}
          </Menu.Item>
        );
      });
  };
  return (
    <Sider
      ref={siderRef}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={300} // ปรับความกว้างเมื่อไม่หุบ
      collapsedWidth={90} // ปรับความกว้างเมื่อหุบ
      style={{
        overflowY: 'auto',
        height: '97vh',
        
        position: 'sticky',
        top: 10,
        backgroundColor: "#51ada8", // พื้นหลังของ Sider
        borderRadius: "15px",
        margin: "10px",
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f1f1f1',
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
          style={{ backgroundColor: "#51ada8" }}
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