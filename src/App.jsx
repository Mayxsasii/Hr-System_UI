import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sider from './SideBar/Sider'; 
import Header from './Header/Header'; 
import Page from './Test page/test_page';
const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <Sider collapsed={collapsed} setCollapsed={setCollapsed} /> 
        <Layout>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content style={{margin:'10px 10px 10px 0'}}>
            <Routes>
              <Route path="/test_page" element={<Page /> }/>
              {/* Add more routes here as needed */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;