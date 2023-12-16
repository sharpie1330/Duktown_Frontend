import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoggedOut from "./routes/LoggedOut";
import SignIn from "./routes/SignIn";
import FindId from './routes/FindId';
import FindPassword from './routes/FindPassword';
import Announcement from "./routes/Announcement";
import Repair from "./routes/Repair";
import Stayout from "./routes/Stayout";
import Unit from "./routes/Unit";
import FindFillIn from "./routes/FindFillIn";
import MainTemplate from './routes/MainTemplate';
import SignUp from './routes/SignUp';
import MyPage from "./routes/MyPage";
import NewPost from "./routes/NewPost";
import RepairHistory from "./routes/RepairHistory";
import RepairHistoryDetail from "./routes/RepairHistoryDetail";

import { AccessTokenProvider } from './AccessTokenContext';

function App() {
  return (
    <Router>
      <AccessTokenProvider>
        <Routes>
            <Route path="/" element={<LoggedOut />}/>
            <Route path='signup' element={<SignUp />}/>
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/findid" element={<FindId />}/>
            <Route path="/findpassword" element={<FindPassword />}/>
            <Route path="/main" element={<MainTemplate />}/>
            <Route path="/announcement" element={<Announcement />}/>
            <Route path="/repairs" element={<Repair />}/>
            <Route path="/stayout" element={<Stayout />}/>
            <Route path="/findFillIn" element={<FindFillIn />} />
            <Route path="/unit" element={<Unit />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/repairs/historys" element={<RepairHistory />}/>
            <Route path="/repairs/historys/detail/:id" element={<RepairHistoryDetail />}/>
          </Routes>
      </AccessTokenProvider>
  </Router>
  );
}

export default App;
