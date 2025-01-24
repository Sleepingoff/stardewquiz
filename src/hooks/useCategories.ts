import { Category } from "./../types/index";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { useLanguage } from "../context/LanguageContext";
import { db } from "../firebase.config";
export const useCategories = () => {
  const { language } = useLanguage(); // 현재 언어 가져오기
  const [categories, setCategories] = useState<Category>({
    fishing: "낚시",
    farming: "농사",
    mining: "광산",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const docRef = doc(collection(db, "categories"), language);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // 데이터 가져오기
          const data = docSnap.data() as Category;
          setCategories(data);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [language]); // 언어가 변경될 때마다 다시 fetch

  return { categories, loading, error };
};
