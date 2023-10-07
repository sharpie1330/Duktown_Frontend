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

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoggedOut />}/>
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/announcement" element={<Announcement />}/>
        </Routes>
  </Router>
  );
}

export default App;
