import React, { useState } from "react";
import { InputForm, Botton } from "../components/Form";
import { Link, useNavigate } from "react-router-dom";
import { dontHaveAccount ,signInTitle, signUpTitle,emailRequired,passwordRequired,signUpError} from "../Constants/constant";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
const SignIn = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [errorEmail, setErrorEmail] = useState(""); 
  const [errorPassword, setErrorPassword] = useState(""); 
  const [generalError, setGeneralError] = useState(""); 
  
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault(); 
    setErrorEmail(""); 
    setErrorPassword("");
    setGeneralError("");

    
    if (!email) {
      setErrorEmail(emailRequired);
    }
    if (!password) {
      setErrorPassword(passwordRequired);
    }

    
    if (email && password) {
      try {
        const result = await dispatch(loginUser(email, password));
        
        if (result.success) {
          
          navigate("/home");  
        } else {
          alert(result.message);
        } 
       
      } catch (err) {
        setGeneralError({signUpError});
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4 rounded-4 w-50 mt-3 mb-2 ">
        <h2 className="text-center mb-4 fw-bold">Sign In</h2>
        <form onSubmit={handleSignIn}> 
        <h6>{generalError}</h6>
          <InputForm
            ID="email"
            labelName="Email"
            placeholderName="Email"
            typeInput="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            error={errorEmail} 
          />
          <InputForm
            ID="password"
            labelName="Password"
            placeholderName="Password"
            typeInput="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            error={errorPassword} 
          />
          <Botton Name={signInTitle} coClick={handleSignIn} typeInput="submit" /> 
        </form>
        <p className="text-center mt-3 text-muted">
          {dontHaveAccount} <Link to="/signUp" className="text-decoration-none">{signUpTitle}</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
