import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  AppstoreOutlined,
  HomeOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";
const { SubMenu } = Menu;

function fn_Sider() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);
  const [menuData, setMenuData] = useState([]);
  const [selectedKey, setSelectedKey] = useState("2604");
  const ROLL = localStorage.getItem("ROLL");
  const siderRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const currentPath = location.pathname;
    console.log(currentPath, "currentPath", menuData);
    const matchedMenu = menuData.find((item) => item.MENU_URL === currentPath);
    if (matchedMenu) {
      console.log(matchedMenu.MENU_URL, "matchedMenu", matchedMenu.MENU_ID);
      setSelectedKey(matchedMenu.MENU_ID);
    }
  }, [location.pathname, menuData]);

  useEffect(() => {
    GetMenu();
  }, []);

  const GetMenu = async () => {
    console.log(ROLL, "roll");
    await axios
      .post("/api/common/GetMenu", {
        Roll: ROLL || "",
      })
      .then((res) => {
        setMenuData(res.data);
      });
  };

  const GetIconMenu = (item) => {
    if (item.MENU_NAME === "Home") {
      return <HomeOutlined />;
    } else if (item.MENU_NAME === "Man Power") {
      return <i className="bi bi-people"></i>;
    } else if (item.MENU_NAME == "Transaction") {
      return <SwapOutlined />;
    } else if (item.MENU_NAME == "Man Power Request") {
      return <i className="bi bi-clipboard2-plus"></i>;
    } else if (item.MENU_NAME == "Approve Man Power") {
      return <i className="bi bi-clipboard-check"></i>;
    } else if (item.MENU_NAME == "Monitoring Function") {
      return <i className="bi bi-card-checklist"></i>;
    } else if (item.MENU_NAME == "Man Power Master List") {
      return <i className="bi bi-clipboard-data"></i>;
    } else if (item.MENU_NAME == "Report Function") {
      return <i className="bi bi-graph-up"></i>;
    } else if (item.MENU_NAME == "Master Data Function") {
      return <i className="bi bi-bookmark-heart"></i>;
    } else if (item.MENU_NAME == "Department Master") {
      return <i className="bi bi-folder-plus"></i>;
    } else if (item.MENU_NAME == "Cost center mapping Dept") {
      return <i className="bi bi-patch-plus"></i>;
    } else if (item.MENU_NAME == "Person Master") {
      return <i className="bi bi-person-plus"></i>;
    } else if (item.MENU_NAME == "Position mapping Job grade") {
      return <i className="bi bi-bag-plus"></i>;
    } else if (item.MENU_NAME == "Master code maintain") {
      return <i className="bi bi-calendar2-plus"></i>;
    }
    return <AppstoreOutlined />;
  };

  const renderMenu = (menuItems, parentId = null) => {
    return menuItems
      .filter((item) => item.MENU_PARENT_ID === parentId)
      .map((item) => {
        const children = menuItems.filter(
          (child) => child.MENU_PARENT_ID === item.MENU_ID
        );
        const styles =
          collapsed == false
            ? {
                whiteSpace: "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordBreak: "break-word",
                lineHeight: "1.5",
                color: "#FFFFFF",
              }
            : { color: "#FFFFFF" };
        const icon = (
          <span style={{ color: "#FFFFFF" }}>{GetIconMenu(item)}</span>
        ); // กำหนดสีไอคอนเป็นสีขาว
        if (children.length > 0) {
          return (
            <SubMenu
              key={item.MENU_ID}
              icon={icon}
              title={<span style={styles}>{item.MENU_NAME}</span>} // ฟอนต์สีขาวใน SubMenu
            >
              {renderMenu(menuItems, item.MENU_ID)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.MENU_ID} icon={icon} style={styles}>
            <span style={{ color: "#FFFFFF" }}>{item.MENU_NAME}</span>{" "}
            {/* ฟอนต์สีขาว */}
          </Menu.Item>
        );
      });
  };

  const handleMenuClick = (e) => {
    console.log(e.key, "e.key1111");
    const selectedMenu = menuData.find((item) => item.MENU_ID === e.key);
    setSelectedKey(e.key);
    console.log(e.key, selectedMenu.MENU_NAME, "e.key and menu name");
    if (selectedMenu.MENU_NAME === "Man Power Request") {
      window.location.href = "/HrSystem/ManPowerRequest";
    } else if (selectedMenu.MENU_NAME === "Approve Man Power") {
      window.location.href = "/HrSystem/ApproveManPower";
    } else if (
      selectedMenu.MENU_NAME === "Man Power Request (HR Staff Action)"
    ) {
      window.location.href = "/HrSystem/HrActionManPowerRequest";
    } else if (selectedMenu.MENU_NAME === "Man Power Master List") {
      window.location.href = "/HrSystem/ManPowerMasterList";
    } else if (selectedMenu.MENU_NAME === "Home") {
      window.location.href = "/HrSystem/Home";
    } else if (selectedMenu.MENU_NAME === "Refference Letter Request") {
      window.location.href = "/HrSystem/NewRefferenceLetter";
    }
    else if (selectedMenu.MENU_NAME === "Approve Refference Letter") {
      window.location.href = "/HrSystem/ApproveRefferenceLetter";
    }
    else if (selectedMenu.MENU_NAME === "Refference Letter Request (HR Staff Action)") {
      window.location.href = "/HrSystem/HrActionRefferenceLetter";
    } else if (selectedMenu.MENU_NAME === "Refference Letter Master List") {
      window.location.href = "/HrSystem/RefferenceLetterMasterList";
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

  return {
    menuData,
    handleMenuClick,
    siderRef,
    collapsed,
    selectedKey,
    renderMenu,
    Menu,
    setCollapsed,
  };
}

export { fn_Sider };
