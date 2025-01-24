import styled from "styled-components";
import { Category } from "../../types";
import { Link } from "react-router-dom";

const Nav = ({ categories }: { categories: Category[] }) => {
  return (
    <StyledNav>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/quiz/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </StyledNav>
  );
};

export default Nav;

const StyledNav = styled.nav``;
