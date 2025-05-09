import React from 'react';
import { Layout } from 'antd';
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useLocation,Navigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import Sider from './SideBar/Sider'; 
import Header from './Header/Header'; 
import NewManPowerRequest from './Man Power Request/ManPowerRequest';
import ManPowerRequest from './Man Power Request/Search Man Power Request/SearchManPowerRequst';
import Login from './Login/Login';
import Home from './Homepage/homepage';
import ReqManPowerList from './Man Power Request/ManPowerMasterList/ViewManPowerRequest';
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
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/HrSystem/Login" />;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("username");
  };

  const backendUrl = `http://${window.location.hostname}:4007`;
  axios.defaults.baseURL = backendUrl;

  return (
    <LoadingProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* ------------------------------------------Not Login-------------------------------------- */}
            <Route path="/HrSystem/Login" element={<Login />} />
            {/* <Route path="/HrSystem/Home" element={<Home />} /> */}
            {/* <Route path="/test_page" element={<Page />} /> */}
            {/* <Route path="/HrSystem/NewManPowerRequest" element={<NewManPowerRequest />} /> */}
            {/* <Route path="/HrSystem/ManPowerRequest" element={<ManPowerRequest />} /> */}
            {/* <Route path="/HrSystem/ApproveManPower" element={<ManPowerRequest />} /> */}
            {/* <Route path="/HrSystem/HrActionManPowerRequest" element={<ManPowerRequest />} /> */}
            {/* <Route path="/HrSystem/ManPowerMasterList" element={<ManPowerRequest />} /> */}
            {/* <Route path="/HrSystem/ManPowerMasterList/ManPowerRequest" element={<ReqManPowerList />} /> */}
            {/* -------------------------------------------login----------------------------------------- */}
            <Route path="/HrSystem/ManPowerMasterList/ManPowerRequest"
              element={<ProtectedRoute  element={<ReqManPowerList/>}/>}/>
            <Route path="/HrSystem/ManPowerMasterList"
              element={<ProtectedRoute  element={<ManPowerRequest/>}/>}/>
            <Route path="/HrSystem/HrActionManPowerRequest"
              element={<ProtectedRoute  element={<ManPowerRequest/>}/>}/>
            <Route path="/HrSystem/ApproveManPower"
              element={<ProtectedRoute  element={<ManPowerRequest/>}/>}/>
            <Route path="/HrSystem/ManPowerRequest"
              element={<ProtectedRoute  element={<ManPowerRequest/>}/>}/>
            <Route path="/HrSystem/NewManPowerRequest"
              element={<ProtectedRoute  element={<NewManPowerRequest/>}/>}/>
            <Route path="/HrSystem/Home"
              element={<ProtectedRoute  element={<Home/>}/>}/>
          </Routes>
        </AppLayout>
      </Router>
    </LoadingProvider>
  );
};

export default App;