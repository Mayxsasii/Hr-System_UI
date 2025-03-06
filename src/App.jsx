import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import Sider from './SideBar/Sider'; 
import Header from './Header/Header'; 
import Page from './Test page/test_page';
import NewManPowerRequest from './Man Power Request/New Man Power Request/ManPowerRequest';
import ManPowerRequest from './Man Power Request/Search Man Power Request/SearchManPowerRequst';
const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const backendUrl = `http://${window.location.hostname}:4005`;
  axios.defaults.baseURL = backendUrl;
  
  return (
    <Router>
      <Layout >
        <Sider collapsed={collapsed} setCollapsed={setCollapsed} /> 
        <Layout>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content style={{margin:'10px '}}>
            <Routes>
              <Route path="/test_page" element={<Page /> }/>
              <Route path="/HrSystem/NewManPowerRequest" element={<NewManPowerRequest /> }/>
              <Route path="/HrSystem/ManPowerRequest" element={<ManPowerRequest /> }/>
              {/* Add more routes here as needed */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;