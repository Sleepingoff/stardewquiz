import Layout from "../components/templates/Layout";
import Button from "../components/atoms/Button";
import { getAuth, signOut } from "firebase/auth";
import Img from "../components/atoms/Img";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/molecules/StatCard";
import useStat from "../hooks/useStat";
import useAdmin from "../hooks/useAdmin";

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
      <h1>Welcome, {user.currentUser?.displayName}</h1>
      <Img src={user.currentUser?.photoURL ?? ""} alt="Profile" />
      <p>Email: {user.currentUser?.email}</p>
      {stats && <StatCard stats={stats} />}
      <Button onClick={handleLogout}>Logout</Button>
      <Button
        onClick={() => {
          navigate("/new");
        }}
      >
        New Quiz
      </Button>
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
    </Layout>
  );
};

export default ProfilePage;
