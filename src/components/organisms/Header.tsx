import styled from "styled-components";
import Nav from "../molecules/Nav";
import { useCategories } from "../../hooks/useCategories";
import useScore from "../../hooks/useScore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const { categories, loading, error } = useCategories();
  const { initializeUserCategories } = useScore();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // 사용자가 로그인했을 때 초기화 함수 호출
      initializeUserCategories(user.uid, categories);
    }
  });
  return (
    <StyledHeader>
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
