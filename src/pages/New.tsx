import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import CustomSelect from "../components/molecules/Select";
import { useCategories } from "../hooks/useCategories";
import { Category, Option } from "../types";
import Input from "../components/atoms/Textarea";
import Button from "../components/atoms/Button";
import Layout from "../components/templates/Layout";

const NewQuizPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    id: "",
    categoryId: "",
    quiz: "",
    answer: "",
    description: "",
    src: "",
    alt: "",
  });

  const [error, setError] = useState("");

  const handleChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { categoryId, quiz, answer, description, src } = formData;
    if (!categoryId || !quiz || !answer || !description) {
      setError("Category, Quiz, Answer or Description is Empty");
      return false;
    }

    if (src && !src.startsWith("https://stardewvalleywiki.com/")) {
      setError("URL should start with https://stardewvalleywiki.com/");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!user) {
      console.error("no users");
      return setError("please try again after login");
    }
    const id = `${user.uid}-${Date.now()}`;
    const newQuiz = {
      ...formData,
      user: user.email,
      id,
      userId: user.uid,
      createdAt: Timestamp.now(),
    };

    try {
      const docRef = doc(collection(db, "tempQuiz"), id);
      await setDoc(docRef, newQuiz);
      navigate("/profile"); // Redirect to profile or another page after submission
    } catch (error) {
      console.log(error);
      setError("error occurs when saving quiz.");
    }
  };

  const { categories } = useCategories();
  const options: Option[] = [
    ...Object.keys(categories).map((key) => ({
      value: key,
      label: categories[key as keyof Category],
    })),
  ];
  return (
    <Layout>
      <h1>New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <CustomSelect
          options={options}
          onChange={(e) => handleChange(e, "categoryId")}
          placeholder="Select Category"
          localKey="selectedCategory"
        />

        <Input
          label="Quiz"
          name="quiz"
          getValue={handleChange}
          placeholder="퀴즈 내용을 입력하세요"
        />
        <Input
          label="Answer"
          name="answer"
          getValue={handleChange}
          placeholder="정답을 입력하세요"
        />
        <Input
          label="Description"
          name="description"
          getValue={handleChange}
          placeholder="퀴즈에 대한 설명을 입력하세요"
        />

        <Input
          label="Image URL"
          name="src"
          getValue={handleChange}
          placeholder="이미지 URL을 입력하세요 (Stardew Valley Wiki)"
        />

        <Input
          label="Image description"
          name="alt"
          getValue={handleChange}
          placeholder="이미지 설명을 입력하세요"
        />

        {error && <p className="error">{error}</p>}

        <Button type="submit">퀴즈 등록</Button>
      </form>
    </Layout>
  );
};

export default NewQuizPage;
