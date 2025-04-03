import { useState } from "react";
import { signUp } from "../firebase/authService";
import { Link, useNavigate } from "react-router-dom";
import { InputForm, Botton } from "../components/Form";
import { createAcaunt ,signUpTitle,alreadyHaveAccount,fullNameRequired,emailRequired,passwordRequired,signUpError} from "../Constants/constant";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorPassword("");
    setErrorName("");
    setGeneralError("");

    if (!name) {
      setErrorName(fullNameRequired);
    }
    if (!email) {
      setErrorEmail(emailRequired);
    }
    if (!password) {
      setErrorPassword(passwordRequired);
    }

    if (name && email && password) {
      try {
        await signUp(email, password);
        navigate("/");
      } catch (err) {
        setGeneralError(signUpError);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4 rounded-4 w-50 mt-3 mb-2">
        <h2 className="text-center mb-4 fw-bold">{createAcaunt}</h2>
        <form onSubmit={handleSignUp}>
          <InputForm
            ID={"name"}
            labelName={"Full Name"}
            placeholderName={"Full Name"}
            typeInput={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errorName} 
          />
         

          <InputForm
            ID={"email"}
            labelName={"Email"}
            placeholderName={"Email"}
            typeInput={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errorEmail} 
          />
         

          <InputForm
            ID={"password"}
            labelName={"Password"}
            placeholderName={"Password"}
            typeInput={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errorPassword} 
          />
          

          {generalError && <p className="text-danger fs-6">{generalError}</p>}

          <Botton
            Name={signUpTitle}
            coClick={handleSignUp}
            typeInput={"submit"}
          />
        </form>
        <p className="text-center mt-3 text-muted">
        {alreadyHaveAccount}{" "}
          <Link to="/" className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
