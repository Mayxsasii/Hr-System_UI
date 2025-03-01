import React, { useState, useEffect, useRef } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import imgLogo from'../assets/LogoFujikura.png';
const { Sider } = Layout;

const CustomSider = ({ collapsed, setCollapsed }) => {
  const [selectedKey, setSelectedKey] = useState('1');
  const siderRef = useRef(null);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  const handleClickOutside = (event) => {
    if (siderRef.current && !siderRef.current.contains(event.target)) {
      handleMouseLeave();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Sider
      ref={siderRef}
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        margin: '10px',
        marginRight: '10px',
        borderRadius: '15px',
        backgroundColor: '#51ada8',
        overflow: 'hidden',
        minHeight: '95vh',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          className="logo"
          style={{
            height: '50px',
            margin: '20px auto',
            textAlign: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          {collapsed ? <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} /> : <img src={imgLogo} style={{ height: '80%' }} />}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: '#51ada8' }}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={[
            {
              key: '1',
              icon: <UserOutlined style={{ color: 'white' }} />,
              style: {
                borderRadius: '15px 0 0 15px',
                width: '100%',
                backgroundColor: selectedKey === '1' ? '#439c96' : 'transparent',
              },
              label: 'User',
            },
            {
              key: '2',
              icon: <AppstoreOutlined style={{ color: 'white' }} />,
              style: {
                borderRadius: '15px 0 0 15px',
                width: '100%',
                backgroundColor: selectedKey === '2' ? '#439c96' : 'transparent',
              },
              label: 'Dashboard',
            },
            {
              key: '3',
              icon: <VideoCameraOutlined style={{ color: 'white' }} />,
              style: {
                borderRadius: '15px 0 0 15px',
                width: '100%',
                backgroundColor: selectedKey === '3' ? '#439c96' : 'transparent',
              },
              label: 'Videos',
            },
            {
              key: '4',
              icon: <UploadOutlined style={{ color: 'white' }} />,
              style: {
                borderRadius: '15px 0 0 15px',
                width: '100%',
                backgroundColor: selectedKey === '4' ? '#439c96' : 'transparent',
              },
              label: 'Upload',
            },
          ]}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{ backgroundColor: '#51ada8', position: 'absolute', bottom: 0, width: '100%' }}
        onClick={handleMenuClick}
        items={[
          {
            key: '5',
            icon: <LogoutOutlined style={{ color: 'white' }} />,
            style: {
              borderRadius: '15px 0 0 15px',
              width: '100%',
              backgroundColor: selectedKey === '5' ? '#439c96' : 'transparent',
            },
            label: 'Logout',
          },
        ]}
      />
    </Sider>
  );
};

export default CustomSider;