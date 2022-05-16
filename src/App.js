import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes, Route ,useRoutes} from "react-router-dom";
import Login from './registration/Login';
import OnboardName from './onboard/OnboardName'
import Dashboard from './Dashboard/Dashboard'
import ViewPronouncation from './view/ViewPronouncation'

function App() {
  return (
    <BrowserRouter>
    <Routes >
      <Route path="/" element={<Login/>}>
      </Route>
      <Route path="/onboard" element={<OnboardName/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/view/:empId" element={<ViewPronouncation/>}/>
      {/* <Route path="/register" element={<Registration/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path="/pronouncation/:country/:name" element={<Pronouncation/>}/> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
