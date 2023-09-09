import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Announcement from "./routes/Announcement";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/announcement" element={<Announcement />}/>
        </Routes>
  </Router>
  );
}

export default App;
