import Layout from "../components/templates/Layout";
import Button from "../components/atoms/Button";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/molecules/StatCard";
import useStat from "../hooks/useStat";
import useAdmin from "../hooks/useAdmin";
import styled from "styled-components";

const ProfilePage = () => {
  const user = getAuth();
  const stats = useStat(user.currentUser?.uid);
  const isAdmin = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <Layout>
      <StyledHgroup>
        <div>
          <p>Welcome, Farmer</p>
          <h1>{user.currentUser?.displayName}</h1>
        </div>{" "}
        <Button
          onClick={() => {
            navigate("/new");
          }}
        >
          New Quiz
        </Button>
      </StyledHgroup>
      <StyledSection>
        {stats && <StatCard stats={stats} />}
        <div>
          {" "}
          <Button onClick={handleLogout}>Logout</Button>
          {isAdmin && (
            <Button
              onClick={() => {
                navigate("/admin", {
                  state: isAdmin,
                });
              }}
            >
              Admin
            </Button>
          )}
        </div>
      </StyledSection>
    </Layout>
  );
};

export default ProfilePage;

const StyledHgroup = styled.hgroup`
  display: flex;
  & > :last-child {
    margin: auto;
    margin-right: 0;
  }
  margin: 2rem;
`;

const StyledSection = styled.section`
  & > div {
    margin: auto;
    width: fit-content;
    & > * {
      margin: 0.25rem;
    }
  }
`;
