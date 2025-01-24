import { useEffect } from "react";
import Layout from "../components/templates/Layout";
import useAuth from "../hooks/useAuth";
import { redirect } from "react-router-dom";
import Button from "../components/atoms/Button";
import { getAuth, signOut } from "firebase/auth";

const ProfilePage = () => {
  const user = useAuth();
  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        redirect("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <Layout>
      welcome {user?.displayName}
      <Button onClick={handleLogout}>Logout</Button>
    </Layout>
  );
};

export default ProfilePage;
