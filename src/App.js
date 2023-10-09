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

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoggedOut />}/>
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/announcement" element={<Announcement />}/>
          <Route path="/repair" element={<Repair />}/>
          <Route path="/stayout" element={<Stayout />}/>
          <Route path="/unit" element={<Unit />}/>
          <Route path="/findFillIn" element={<FindFillIn />} />
        </Routes>
  </Router>
  );
}

export default App;
