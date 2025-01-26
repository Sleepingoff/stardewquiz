import styled from "styled-components";
import { useCategories } from "../../hooks/useCategories";
import useScore from "../../hooks/useScore";
import {
  getAuth,
  GoogleAuthProvider,
  User,
  signInWithPopup,
} from "firebase/auth";
import Button from "../atoms/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useEffect } from "react";
import Icon from "../molecules/Icon";
import HomeIcon from "../../assets/Home.icon.svg";
const Header = () => {
  const { pathname } = useLocation();

  const { categories } = useCategories();
  const { initializeUserCategories } = useScore();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Sign in with Google
      await signInWithPopup(auth, provider);

      // Navigate to home
      navigate("/");
    } catch (error) {
      // Handle Errors
      const errorMessage = (error as Error).message;
      console.log("Login error:", errorMessage);
    }
  };

  useEffect(() => {
    if (!auth.currentUser) return;
    const user = auth.currentUser;
    const checkUser = async () => {
      const userRef = doc(collection(db, "scores"), user.uid); // Firestore의 `users` 컬렉션 참조
      const result = await getDoc(userRef);
      return !result.exists();
    };

    checkUser().then((res) => {
      if (res) {
        initializeUserCategories(user.uid, categories);
        saveUserToFirestore(user);
      }
    });
  }, [auth]);

  const handleClickConvert = () => {
    if (pathname == "/profile") navigate("/");
    else {
      navigate("/profile");
    }
  };
  const saveUserToFirestore = async (user: User) => {
    if (!user) return;

    try {
      const userRef = doc(collection(db, "users"), user.uid); // Firestore의 `users` 컬렉션 참조
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || "Anonymous",
        isAdmin: false, // 기본적으로 관리자 아님
      });
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
    }
  };
  return (
    <StyledHeader>
      {!auth.currentUser ? (
        <Button onClick={handleGoogleLogin}>LogIn</Button>
      ) : (
        <Icon onClick={handleClickConvert} src={HomeIcon} />
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header``;
