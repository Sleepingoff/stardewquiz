import { useEffect, useState } from "react";
import Layout from "../components/templates/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { TempQuiz } from "../types";
import { db } from "../firebase.config";
import Box from "../components/atoms/Box";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [tempQuiz, setTempQuiz] = useState<TempQuiz[]>([]);
  useEffect(() => {
    const fetchTempQuizzes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tempQuiz"));
        const quiz = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as TempQuiz),
        }));
        setTempQuiz(quiz);
      } catch (error) {
        console.error("Error fetching tempQuiz:", error);
      }
    };

    fetchTempQuizzes();
  }, []);
  useEffect(() => {
    if (!state) {
      alert("관리자 권한이 없습니다."); // 경고 메시지
      navigate("/profile");
    }
  }, []);

  return (
    <Layout>
      <ul>
        {tempQuiz.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/admin/${quiz.id}`}>
              {quiz.status}
              <Box style={{ fontSize: ".75rem" }}>
                {" "}
                <StyledP>{quiz.quiz}</StyledP>{" "}
              </Box>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default AdminPage;

const StyledP = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
