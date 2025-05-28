import React, { useState, useEffect, useRef } from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

function fn_Header() {
  const user = localStorage.getItem("username");
  const [datauser, setdatauser] = useState([]);

  useEffect(() => {
    GetDataUser();
  }, []);

  const UserMenu = () => (
    <Menu>
      {user ? (
        <>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <span>{user}</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="login" icon={<UserOutlined />} onClick={logout}>
          Login
        </Menu.Item>
      )}
    </Menu>
  );

  const GetDataUser = async () => {
    await axios
      .post("/api/common/GetDataUser", {
        loginID: user,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setdatauser(res.data[0]);
        }
      });
  };

  const logout = () => {
    window.location.href = "/HrSystem/Login"
    localStorage.clear()
}

  return {
    datauser,
    logout,
    UserMenu,
    GetDataUser,
  };
}

export { fn_Header };
