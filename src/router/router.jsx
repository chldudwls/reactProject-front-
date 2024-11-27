import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/login/RegisterPage";
import FindIdPage from "../pages/login/find/FindIdPage";
import FindPassPage from "../pages/login/find/FindPassPage";
import NewPassPage from "../pages/login/find/NewPassPage";
import TermsPage from "../pages/login/TermsPage";

import ProjectPage from "../pages/app/project/ProjectPage";
import MessagePage from "../pages/app/message/MessagePage";
import IdViewPage from "../pages/login/find/IdViewPage";

import CalendarPage from "../pages/app/calendar/CalendarPage";
import FilePage from "../pages/app/file/FilePage";
import PagePage from "../pages/app/page/Pagepage";
import AppHome from "../pages/app/AppHomePage";

//라우팅 정의
const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },

  { path: "/user/login", element: <LoginPage /> },
  { path: "/user/terms", element: <TermsPage /> },
  { path: "/user/register", element: <RegisterPage /> },
  { path: "/user/findId", element: <FindIdPage /> },
  { path: "/user/findPass", element: <FindPassPage /> },
  { path: "/user/find/idView", element: <IdViewPage /> },
  { path: "/user/find/newPass", element: <NewPassPage /> },

  // App Home
  { path: "/app/home", element: <AppHome /> },

  { path: "/app/message", element: <MessagePage /> },
  { path: "/app/project", element: <ProjectPage /> },
  { path: "/app/calendar", element: <CalendarPage /> },
  { path: "/app/file", element: <FilePage /> },
  { path: "/app/page", element: <PagePage /> },
]);

// 라우터 내보내기
export default router;
