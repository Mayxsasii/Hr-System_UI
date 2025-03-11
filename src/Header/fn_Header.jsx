import React, { useState, useEffect, useRef } from "react";
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";
// import { fn_login } from "../../Login/fn_login";


function fn_Header() {
  const user = localStorage.getItem("username");
  const [datauser, setdatauser] = useState([]);
  
  useEffect(() => {
    GetDataUser()
  }, []);

  const UserMenu = () => (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <span>May Sasithorn</span>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
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
        console.log(res.data[0], "GetDataUser");
        } 
      });
  };

  const logout = () => (
    localStorage.clear(),
    window.location.href = "/HrSystem/Login"
  );

  return {
    datauser,
    logout,UserMenu,GetDataUser
  };
}

export { fn_Header };
