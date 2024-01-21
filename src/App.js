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
import RepairApply from "./routes/RepairApply";
import Stayout from "./routes/Stayout";
import FindFillIn from "./routes/FindFillIn";
import MainTemplate from './routes/MainTemplate';
import SignUp from './routes/SignUp';
import Terms from './routes/Terms';
import MyPage from "./routes/MyPage";
import NewPost from "./routes/NewPost";
import RepairHistory from "./routes/RepairHistory";
import RepairHistoryDetail from "./routes/RepairHistoryDetail";
import NoticeList from "./routes/NoticeList";
import NoticeListDetail from "./routes/NoticeListDetail";
import { AccessTokenProvider } from './AccessTokenContext';
import PostView from './routes/PostView';
import DeliveryPostView from './routes/DeliveryPostView';
import ChatRoom from "./routes/ChatRoom";
import MyPostList from "./routes/MyPostList";
import DormGuide from "./routes/DormGuide";
import MyPenalty from "./routes/MyPenalty";
import Penalty from "./routes/Penalty";
import ApplicationTerms from './routes/ApplicationTerms';
import MyUnit from "./routes/MyUnit";
import CleaningHistory from "./routes/CleaningHistory";

function App() {
  return (
    <Router>
      <AccessTokenProvider>
        <Routes>
            <Route path="/" element={<LoggedOut />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/terms' element={<Terms />}/>
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/findid" element={<FindId />}/>
            <Route path="/findpassword" element={<FindPassword />}/>
            <Route path="/:page" element={<MainTemplate />}/>
            <Route path="/announcement/historys" element={<Announcement />}/>
            <Route path="/repairs/apply" element={<RepairApply />}/>
            <Route path="/stayout" element={<Stayout />}/>
            <Route path="/findFillIn" element={<FindFillIn />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/repairs/historys" element={<RepairHistory />}/>
            <Route path="/repairs/historys/detail/:id" element={<RepairHistoryDetail />}/>
            <Route path="/notice/list" element={<NoticeList />}/>
            <Route path="/notice/list/detail/:id" element={<NoticeListDetail />}/>
            <Route path="/post/:postId" element={<PostView />}/>
            <Route path="/delivery/:deliveryId" element={<DeliveryPostView />}/>
            <Route path="/chatRoom/:chatRoomId" element={<ChatRoom />}/>
            <Route path="/user/wrote/:type" element={<MyPostList />}/>
            <Route path="/dormGuide" element={<DormGuide />}/>
            <Route path="/user/penalty" element={<MyPenalty />}/>
            <Route path="/penalty" element={<Penalty />}/>
            <Route path="/appTerms" element={<ApplicationTerms />}/>
            <Route path="/user/unit" element={<MyUnit />}/>
            <Route path="/cleaning" element={<CleaningHistory />}/>
          </Routes>
      </AccessTokenProvider>
  </Router>
  );
}

export default App;
