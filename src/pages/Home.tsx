import { getAuth } from "firebase/auth";
import Layout from "../components/templates/Layout";

const Home = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return <Layout>welcome {user?.displayName}</Layout>;
};

export default Home;
