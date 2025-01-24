import { useEffect } from "react";
import TempQuizTable from "../components/organisms/TempQuizTable";
import Layout from "../components/templates/Layout";
import { useLocation, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      alert("관리자 권한이 없습니다."); // 경고 메시지
      navigate("/profile");
    }
  }, []);

  return (
    <Layout>
      <TempQuizTable />
    </Layout>
  );
};

export default AdminPage;
