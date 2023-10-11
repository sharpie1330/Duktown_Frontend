import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoggedOut from "./routes/LoggedOut";
import SignIn from "./routes/SignIn";
import Home from "./routes/Home";
import Announcement from "./routes/Announcement";
import Repair from "./routes/Repair";
import Stayout from "./routes/Stayout";
import Unit from "./routes/Unit";
import FindFillIn from "./routes/FindFillIn";
import MainTemplate from './routes/MainTemplate';
import SignUp from './routes/SignUp';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoggedOut />}/>
          <Route path='signup' element={<SignUp />}/>
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/main" element={<MainTemplate />}/>
          <Route path="/announcement" element={<Announcement />}/>
          <Route path="/repair" element={<Repair />}/>
          <Route path="/stayout" element={<Stayout />}/>
          <Route path="/findFillIn" element={<FindFillIn />} />
        </Routes>
  </Router>
  );
}

export default App;
