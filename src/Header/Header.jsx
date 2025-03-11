import React, { useState, useEffect, useRef } from "react";
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import imgHr from '../assets/social-security.png'; 
import imgUser from '../assets/user (1).png'; 
import {fn_Header} from "./fn_Header";

const { Header } = Layout;



const HeaderPage = () => {
  const {  datauser,
    logout,UserMenu,GetDataUser } = fn_Header();
  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '5px',
        marginLeft: '10px',
        position: 'sticky', // ทำให้ header เป็นแบบ sticky
        top: 0, // ตำแหน่งด้านบน
        zIndex: 1000, // เพื่อให้ header อยู่ด้านบนสุด
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={imgHr}
          style={{
            fontSize: '16px',
            borderRadius: '8px',
          }}
          // onClick={() => setCollapsed(!collapsed)}
        />
        <span style={{ marginLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}>HR System</span>
      </div>
      <div style={{ marginRight: '30px' }}>
        <Dropdown overlay={<UserMenu onLogout={logout} />} trigger={['click']}>
          <Avatar
            src={imgUser}
            style={{
              fontSize: '16px',
              borderRadius: '8px',
              marginLeft: '8px',
              cursor: 'pointer',
            }}
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderPage;