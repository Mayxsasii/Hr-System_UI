import React from 'react';
import { Layout } from 'antd';
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import Sider from './SideBar/Sider'; 
import Header from './Header/Header'; 
import Page from './Test page/test_page';
import NewManPowerRequest from './Man Power Request/ManPowerRequest';
import ManPowerRequest from './Man Power Request/Search Man Power Request/SearchManPowerRequst';
import Login from './Login/Login';
import Home from './Homepage/homepage';
import { LoadingProvider } from "./loading/fn_loading";
const { Content } = Layout;

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/HrSystem/Login';

  return (
    <Layout>
      {!isLoginPage && <Sider />}
      <Layout>
        {!isLoginPage && <Header />}
        <Content >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

const App = () => {
  const backendUrl = `http://${window.location.hostname}:4005`;
  axios.defaults.baseURL = backendUrl;

  return (
    <LoadingProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/test_page" element={<Page />} />
            <Route path="/HrSystem/NewManPowerRequest" element={<NewManPowerRequest />} />
            <Route path="/HrSystem/ManPowerRequest" element={<ManPowerRequest />} />
            <Route path="/HrSystem/Login" element={<Login />} />
            <Route path="/HrSystem/Home" element={<Home />} />
          </Routes>
        </AppLayout>
      </Router>
    </LoadingProvider>
  );
};

export default App;