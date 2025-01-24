import { useState } from "react";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { TempQuiz } from "../../types";
import { db } from "../../firebase.config";

const TranslationRow = ({ quiz, lang }: { quiz: TempQuiz; lang: string }) => {
  const [original, setOriginal] = useState(quiz.quiz); // 원문
  const [answer, setAnswer] = useState(quiz.answer); // 원문
  const [desc, setDesc] = useState(quiz.description);
  const [alt, setAlt] = useState(quiz.alt);
  const [language, setLanguage] = useState(lang); // 언어

  // Firestore에 저장
  const saveTranslation = async () => {
    if (!original.trim()) {
      alert("번역된 텍스트를 입력해주세요!");
      return;
    }

    const quizRef = doc(collection(db, "quiz"), language);
    try {
      await updateDoc(quizRef, {
        [quiz.categoryId]: arrayUnion({
          quiz: original, // 번역된 퀴즈 텍스트
          answer: answer, // 정답
          description: quiz.description || "", // 설명 (optional)
          src: quiz.src ?? "",
          alt: alt ?? "",
        }),
      });
      alert("번역이 quiz 데이터베이스에 저장되었습니다!");
    } catch (error) {
      console.error("Error saving to quiz database:", error);
    }
  };

  return (
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
        >
          <option value="en">en</option>
          <option value="ko">ko</option>
        </select>
      </td>
      <td>
        <textarea
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
        />
      </td>
      <td>
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </td>
      <td>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="번역문을 입력하세요"
        />
      </td>
      <td>
        <textarea
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="번역문을 입력하세요"
        />
      </td>
      <td>
        <button onClick={saveTranslation}>번역 저장</button>
      </td>
    </tr>
  );
};

export default TranslationRow;
