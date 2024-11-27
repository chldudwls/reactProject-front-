import MessageAside from "../../../components/app/message/MessageAside";
import MessageBox from "../../../components/app/message/MessageBox";
import { useSidebar } from "../../../hooks/app/useSidebar";
import AppLayout from "../../../layouts/app/AppLayout";
import "../../../styles/App/message/Message.scss";
import "../../../styles/App/message/MessageAside.scss";

export default function Message() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

  return (
    <AppLayout onToggleSidebar={toggleSidebar}>
      <MessageAside />
      <MessageBox />
    </AppLayout>
  );
}