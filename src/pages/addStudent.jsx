import React, { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { addNewStudent } from "../redux/studentsSlice";
import { InputForm, Botton, TeacherSelect } from "../components/Form";
import { useNavigate } from "react-router-dom";
import {
  fullNameRequired,
  emailRequired,
  ageRequired,
  validEmailError,
  teacherRequired
} from "../Constants/constant";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(""); 
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const [errorTeacher, setErrorTeacher] = useState(""); 
  const teachers = useSelector((state) => state.teachers.teachers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorName("");
    setErrorAge("");
    setErrorTeacher("");

    if (!name) {
      setErrorName(fullNameRequired);
    }
    if (!age) {
      setErrorAge(ageRequired);
    }
    if (!email) {
      setErrorEmail(emailRequired);
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorEmail(validEmailError);
      return;
    }
    if (!selectedTeacher) {
      setErrorTeacher(teacherRequired); 
    }

     dispatch(addNewStudent({ name, email, age: Number(age), teacher: selectedTeacher }));
    
    setName("");
    setEmail("");
    setAge("");
    setSelectedTeacher(""); 
    navigate("/home");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4 rounded-4 w-50 mt-3 mb-2">
        <h2>Add New Student</h2>

        <InputForm
          ID={"name"}
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

        <InputForm
          ID={"age"}
          labelName={"Age"}
          placeholderName={"Age"}
          typeInput={"number"}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {errorAge && <p className="text-danger fs-6">{errorAge}</p>}

        <TeacherSelect
          teachers={teachers}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
          errorTeacher={errorTeacher}
        />

        <Botton
          Name={"Add Student"}
          coClick={handleAddStudent}
          typeInput={"submit"}
        />
      </div>
    </div>
  );
};

export default AddStudent;
