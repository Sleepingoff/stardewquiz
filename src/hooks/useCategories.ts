import { Category } from "./../types/index";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useLanguage } from "../context/LanguageContext";
import { db } from "../firebase.config";
export const useCategories = () => {
  const { language } = useLanguage(); // 현재 언어 가져오기
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return data[language];
        });
        setCategories(categoriesData[0]);
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
