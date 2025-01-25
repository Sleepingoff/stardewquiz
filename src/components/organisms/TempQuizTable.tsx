import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { Category, TempQuiz } from "../../types";
import TextArea from "../atoms/Textarea";
import Button from "../atoms/Button";
import CustomSelect from "../molecules/Select";
import { useCategories } from "../../hooks/useCategories";
import Img from "../atoms/Img";
import useQuiz from "../../hooks/useQuiz";

const TempQuizTable = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<TempQuiz | null>(null);
  const [language, setLanguage] = useState("ko");
  const { setQuizWithCategoryName } = useQuiz(quiz?.categoryId ?? "");
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const docRef = doc(db, "tempQuiz", quizId!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setQuiz(docSnap.data() as TempQuiz);
        } else {
          console.error("No such quiz found!");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    if (quizId) fetchQuiz();
  }, [quizId]);

  const handleChange = (value: string, name: string) => {
    setQuiz((prev) => prev && { ...prev, [name]: value });
  };

  const saveChanges = async () => {
    if (!quiz) return;
    try {
      const quizRef = doc(collection(db, "tempQuiz"), quizId);
      await updateDoc(quizRef, { ...quiz });
      alert("Quiz updated successfully!");
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };
  const saveQuiz = async () => {
    if (!quiz) return;
    try {
      await setQuizWithCategoryName(quiz);
      alert("Quiz updated successfully!");
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };
  const updateStatus = async (status: "approved" | "rejected") => {
    try {
      const quizRef = doc(collection(db, "tempQuiz"), quizId);
      await updateDoc(quizRef, { status });
      alert(`Quiz ${status} successfully!`);
    } catch (error) {
      console.error("Error updating quiz status:", error);
    }
  };

  const { categories } = useCategories();
  if (!quiz) return <div>Loading...</div>;
  return (
    <div>
      <h1>Edit Quiz</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <CustomSelect
          options={[
            { value: "ko", label: "한국어", defaultValue: language === "ko" },
            { value: "en", label: "영어", defaultValue: language === "en" },
          ]}
          onChange={(value) => setLanguage(value)}
          placeholder="Language"
        />
        <CustomSelect
          options={[
            ...Object.keys(categories).map((key) => ({
              value: key,
              label: categories[key as keyof Category],
              defaultValue: key == quiz.categoryId,
            })),
          ]}
          onChange={(e) => handleChange(e, "categoryId")}
          placeholder="Category"
        />
      </div>
      {quiz.src && <Img src={quiz.src} alt={quiz.alt} />}
      <TextArea
        label="Image Alt"
        getValue={handleChange}
        name="alt"
        defaultValue={quiz.alt}
      />
      <TextArea
        label="Question"
        getValue={handleChange}
        name="quiz"
        defaultValue={quiz.quiz}
      />
      <TextArea
        label="Answer"
        getValue={handleChange}
        name="answer"
        defaultValue={quiz.answer}
      />
      <TextArea
        label="Description"
        getValue={handleChange}
        name="description"
        defaultValue={quiz.description}
      />

      <div style={{ margin: "4px 0" }}>
        <Button onClick={saveQuiz}>검토 완료</Button>{" "}
        <span>사용자에게 퀴즈가 노출됩니다.</span>
      </div>
      <div style={{ margin: "4px 0" }}>
        <Button onClick={saveChanges}>임시 저장</Button>{" "}
        <span>사용자에게 노출되지 않고 임시 저장됩니다.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <span>사용자에게 알려주기</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Button onClick={() => updateStatus("approved")}>승인</Button>
          <Button onClick={() => updateStatus("rejected")}>거절</Button>
        </div>
      </div>
    </div>
  );
};

export default TempQuizTable;
