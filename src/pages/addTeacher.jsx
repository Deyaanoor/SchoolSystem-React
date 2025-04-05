import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTeacher } from "../redux/teachersSlice";
import { InputForm, Botton } from "../components/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

import { fullNameRequired, emailRequired, ageRequired, validEmailError } from "../Constants/constant";

const AddTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorName("");
 

    if (!name) {
      setErrorName(fullNameRequired);
    }
   
    if (!email) {
      setErrorEmail(emailRequired);
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorEmail(validEmailError);
      return;
    }

    dispatch(addNewTeacher({ name, email ,id: Date.now().toString()}));
    
    setName("");
    setEmail("");
   toast.success("Teacher added successfully!");  
    navigate("/home/Teachers");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4 rounded-4 w-50 mt-3 mb-2">
        <h2>Add New teacher</h2>

        <InputForm
          ID={"name Teacher"}
          labelName={"Full Name"}
          placeholderName={"Full Name"}
          typeInput={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errorName && <p className="text-danger fs-6">{errorName}</p>}

        <InputForm
          ID={"email"}
          labelName={"Email"}
          placeholderName={"Email"}
          typeInput={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorEmail && <p className="text-danger fs-6">{errorEmail}</p>}

       

        <Botton
          Name={"Add Teacher"}
          coClick={handleAddTeacher}
          typeInput={"submit"}
        />
      </div>
    </div>
  );
};

export default AddTeacher;
