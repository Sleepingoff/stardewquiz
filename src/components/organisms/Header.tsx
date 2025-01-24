import styled from "styled-components";
import Nav from "../molecules/Nav";
import { useCategories } from "../../hooks/useCategories";
import useScore from "../../hooks/useScore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Button from "../atoms/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const user = getAuth();

  const { pathname } = useLocation();

  const { categories, loading, error } = useCategories();
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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // 사용자가 로그인했을 때 초기화 함수 호출
      initializeUserCategories(user.uid, categories);
    }
  });

  const handleClickConvert = () => {
    if (pathname == "/profile") navigate("/");
    else {
      navigate("/profile");
    }
  };

  return (
    <StyledHeader>
      {!user ? (
        <Button onClick={handleGoogleLogin}>LogIn</Button>
      ) : (
        <Button onClick={handleClickConvert}>
          {pathname == "/profile" ? "Home" : "My"}
        </Button>
      )}
      {error ? (
        <p>잠시 후 다시 시도해주세요!</p>
      ) : (
        <div>{!loading && <Nav categories={categories} />}</div>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header``;
