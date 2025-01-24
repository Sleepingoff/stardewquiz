import styled from "styled-components";
import { Category } from "../../types";
import { Link } from "react-router-dom";

const Nav = ({ categories }: { categories: Category }) => {
  return (
    <StyledNav>
      <ul>
        {Object.keys(categories).map((category) => (
          <li key={category}>
            <Link to={`/quiz/${category}`}>
              {categories[category as keyof Category]}
            </Link>
          </li>
        ))}
      </ul>
    </StyledNav>
  );
};

export default Nav;

const StyledNav = styled.nav``;
