import { useNavigate } from "react-router-dom";
import AuthTemp from "../components/templates/AuthTemp";
import Button from "../components/atoms/Button.tsx";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const AuthPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const auth = await getAuth(); // Ensure auth is initialized
      const provider = new GoogleAuthProvider();
      // Sign in with Google
      await signInWithPopup(auth, provider);

      // Navigate to home
      navigate("/");
    } catch (error) {
      // Handle Errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Login error:", errorCode, errorMessage);
    }
  };
  return (
    <AuthTemp>
      <h1>Login With Google</h1>
      <Button onClick={handleGoogleLogin}>Google Login</Button>
    </AuthTemp>
  );
};

export default AuthPage;
