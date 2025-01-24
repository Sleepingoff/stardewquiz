import { getAuth } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const user = getAuth(); // Google 로그인 사용자 정보

  useEffect(() => {
    const checkAdmin = async () => {
      if (user.currentUser) {
        const userDoc = await getDoc(
          doc(collection(db, "users"), user.currentUser.uid)
        );
        if (userDoc.exists() && userDoc.data().isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };

    checkAdmin();
  }, []);

  return isAdmin;
};

export default useAdmin;
