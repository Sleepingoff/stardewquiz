import { useEffect, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { TempQuiz } from "../../types";
import TranslationRow from "./TransLationTable";

const TempQuizTable = () => {
  const [tempQuiz, setTempQuiz] = useState<TempQuiz[]>([]);
  const [language, setLanguage] = useState("ko"); // 언어
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
  const updateQuizStatus = async (
    id: string,
    quiz: TempQuiz,
    status: "approved" | "rejected"
  ) => {
    try {
      const quizRef = doc(collection(db, "tempQuiz"), id);
      await updateDoc(quizRef, { status });
      if (status == "approved") {
        await saveOriginal(quiz);
      }
      alert(
        `Quiz ${status === "approved" ? "approved" : "rejected"} successfully!`
      );
    } catch (error) {
      console.error("Error updating quiz status:", error);
    }
  };

  const saveOriginal = async (quiz: TempQuiz) => {
    const quizRef = doc(collection(db, "quiz"), language);
    try {
      await updateDoc(quizRef, {
        [quiz.categoryId]: arrayUnion({
          quiz: quiz.quiz, // 번역된 퀴즈 텍스트
          answer: quiz.answer, // 정답
          description: quiz.description || "", // 설명 (optional)
          src: quiz.src ?? "",
          alt: quiz.alt ?? "",
        }),
      });
      alert("번역이 quiz 데이터베이스에 저장되었습니다!");
    } catch (error) {
      console.error("Error saving to quiz database:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tempQuiz"), (snapshot) => {
      const quiz = snapshot.docs.map((doc) => ({
        ...(doc.data() as TempQuiz),
      }));
      setTempQuiz(quiz);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>User</th>
            <th>Lang</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        {tempQuiz.map((quiz) => (
          <tbody key={quiz.id}>
            <tr>
              <td>{quiz.categoryId}</td>
              <td>{quiz.user}</td>
              <td>
                <select
                  name="언어"
                  id=""
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                  value={language}
                >
                  <option value="en">en</option>
                  <option value="ko">ko</option>
                </select>
              </td>
              <td>{quiz.quiz}</td>
              <td>{quiz.answer}</td>
              <td>{quiz.description}</td>
              <td>
                {quiz.src && (
                  <img
                    src={quiz.src}
                    alt={quiz.alt}
                    style={{ width: "50px" }}
                  />
                )}
              </td>
              <td>
                {quiz.status === "approved" ? (
                  <span>Approved</span>
                ) : quiz.status === "rejected" ? (
                  <span>Rejected</span>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        updateQuizStatus(quiz.id, quiz, "approved")
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateQuizStatus(quiz.id, quiz, "rejected")
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
            <TranslationRow quiz={quiz} lang={language == "ko" ? "en" : "ko"} />
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default TempQuizTable;
