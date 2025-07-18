import { Layout } from "antd";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sider from "./SideBar/Sider";
import Header from "./Header/Header";
import NewManPowerRequest from "./Man Power Request/ManPowerRequest";
import RefferenceLetter from "./Refference Letter Request/RefferenceLetter/RefferenceLetter";
import SearchRefferenceLetter from "./Refference Letter Request/SearchRefferenceLetter/SearchRefferenceLetter";
import ManPowerRequest from "./Man Power Request/Search Man Power Request/SearchManPowerRequst";
import Login from "./Login/Login";
import Home from "./Homepage/homepage";
import ReqManPowerList from "./Man Power Request/ManPowerMasterList/ViewManPowerRequest";
import LetterList from "./Refference Letter Request/RefferenceLetterMasterList/RefferenceLetterMasterList";
import SearchEmpcard from "./Employee Card Request/SearchEmpCard/SearchEmpcard";
import NewEmpCard from "./Employee Card Request/New Employee Card/NewEmployeeCard";
import MasterListEmpCard from "./Employee Card Request/Master list Employee Card/MasterListEmployeeCard";
import SearchSafetyShoes from "./Safety Shoes Request/Search Safety Shoes/SearchSafetyShoesRequest";
import PersonMaster from "./Master/Person Master/PersonMaster";
import { LoadingProvider } from "./loading/fn_loading";

const { Content } = Layout;

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/HrSystem/Login";
  return (
    <Layout>
      {!isLoginPage && <Sider />}
      <Layout>
        {!isLoginPage && <Header />}
        <Content>{children}</Content>
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
            {/* <Route path="/HrSystem/SearchEmpcard" element={<SearchEmpcard />} /> */}
            {/* -------------------------------------------login----------------------------------------- */}

            {/* ----------Home------------------ */}
            <Route
              path="/HrSystem/Home"
              element={<ProtectedRoute element={<Home />} />}
            />
            {/* ----------Man Power------------------ */}
            <Route
              path="/HrSystem/ManPowerMasterList/ManPowerRequest"
              element={<ProtectedRoute element={<ReqManPowerList />} />}
            />
            <Route
              path="/HrSystem/ManPowerMasterList"
              element={<ProtectedRoute element={<ManPowerRequest />} />}
            />
            <Route
              path="/HrSystem/HrActionManPowerRequest"
              element={<ProtectedRoute element={<ManPowerRequest />} />}
            />
            <Route
              path="/HrSystem/ApproveManPower"
              element={<ProtectedRoute element={<ManPowerRequest />} />}
            />
            <Route
              path="/HrSystem/ManPowerRequest"
              element={<ProtectedRoute element={<ManPowerRequest />} />}
            />
            <Route
              path="/HrSystem/NewManPowerRequest"
              element={<ProtectedRoute element={<NewManPowerRequest />} />}
            />

            {/* ----------Letter------------------ */}
            <Route
              path="/HrSystem/ApproveReferenceLetter"
              element={<ProtectedRoute element={<SearchRefferenceLetter />} />}
            />
            <Route
              path="/HrSystem/HrActionReferenceLetter"
              element={<ProtectedRoute element={<SearchRefferenceLetter />} />}
            />
            <Route
              path="/HrSystem/ViewReferenceLetterList"
              element={<ProtectedRoute element={<LetterList />} />}
            />
            <Route
              path="/HrSystem/ReferenceLetterMasterList"
              element={<ProtectedRoute element={<SearchRefferenceLetter />} />}
            />
            <Route
              path="/HrSystem/NewReferenceLetter"
              element={<ProtectedRoute element={<RefferenceLetter />} />}
            />

             <Route
              path="/HrSystem/ReferenceLetterReceive"
              element={<ProtectedRoute element={<SearchRefferenceLetter />} />}
            />

            {/* ----------EmpCaard------------------ */}
            <Route
              path="/HrSystem/ApproveEmployeeCard"
              element={<ProtectedRoute element={<SearchEmpcard />} />}
            />
            <Route
              path="/HrSystem/HrActionEmployeeCard"
              element={<ProtectedRoute element={<SearchEmpcard />} />}
            />
            <Route
              path="/HrSystem/EmployeeCardMasterList"
              element={<ProtectedRoute element={<SearchEmpcard />} />}
            />
            <Route
              path="/HrSystem/NewEmployeeCard"
              element={<ProtectedRoute element={<NewEmpCard />} />}
            />
            <Route
              path="/HrSystem/MasterListEmployeeCard"
              element={<ProtectedRoute element={<MasterListEmpCard />} />}
            />

            {/* ----------EmpCaard------------------ */}
             <Route
              path="/HrSystem/SearchSafetyShoes"
              element={<ProtectedRoute element={<SearchSafetyShoes />} />}
            />
             <Route
              path="/HrSystem/Master/PersonMaster"
              element={<ProtectedRoute element={<PersonMaster />} />}
            />
          </Routes>
        </AppLayout>
      </Router>
    </LoadingProvider>
  );
};

export default App;
