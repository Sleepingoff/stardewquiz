import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase.config";

const NewQuizPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    categoryId: "",
    quiz: "",
    answer: "",
    description: "",
    src: "",
    alt: "",
  });

  const [error, setError] = useState("");

  const handleChange: ChangeEventHandler = (e) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { categoryId, quiz, answer, description, src } = formData;
    if (!categoryId || !quiz || !answer || !description) {
      setError("모든 필드를 입력해주세요.");
      return false;
    }

    if (src && !src.startsWith("https://stardewvalleywiki.com/")) {
      setError("이미지 URL은 Stardew Valley Wiki에서 가져온 주소여야 합니다.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!user) {
      console.error("사용자가 인증되지 않았습니다.");
      return setError("로그인 후 다시 시도해주세요.");
    }
    const newQuiz = {
      ...formData,
      userId: user.uid,
      createdAt: Timestamp.now(),
    };

    try {
      const docRef = doc(
        collection(db, "tempQuiz"),
        `${user.uid}-${Date.now()}`
      );
      console.log(docRef);
      await setDoc(docRef, newQuiz);
      navigate("/profile"); // Redirect to profile or another page after submission
    } catch (error) {
      console.log(error);
      setError("퀴즈 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="new-quiz-page">
      <h1>퀴즈 등록</h1>
      <form onSubmit={handleSubmit}>
        <label>
          카테고리:
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">선택하세요</option>
            <option value="farming">농사</option>
            <option value="fishing">낚시</option>
            <option value="mining">채굴</option>
            <option value="crafting">제작</option>
          </select>
        </label>

        <label>
          퀴즈:
          <input
            type="text"
            name="quiz"
            value={formData.quiz}
            onChange={handleChange}
            placeholder="퀴즈 내용을 입력하세요"
          />
        </label>

        <label>
          정답:
          <input
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="정답을 입력하세요"
          />
        </label>

        <label>
          설명:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="퀴즈에 대한 설명을 입력하세요"
          />
        </label>

        <label>
          이미지 URL:
          <input
            type="text"
            name="imgSrc"
            value={formData.src}
            onChange={handleChange}
            placeholder="이미지 URL을 입력하세요 (Stardew Valley Wiki)"
          />
        </label>

        <label>
          이미지 대체 텍스트:
          <input
            type="text"
            name="imgAlt"
            value={formData.alt}
            onChange={handleChange}
            placeholder="이미지 설명을 입력하세요"
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit">퀴즈 등록</button>
      </form>
    </div>
  );
};

export default NewQuizPage;
