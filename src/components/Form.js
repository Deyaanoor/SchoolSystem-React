import React from "react";


const InputForm = ({ labelName, placeholderName, ID, typeInput, value, onChange, error }) => {
  return (
    <div className="form-floating mb-2">
      <input 
        type={typeInput} 
        className="form-control" 
        id={ID} 
        placeholder={placeholderName} 
        value={value} 
        onChange={onChange} 
      />
      <label htmlFor={ID}>{labelName}</label>
      {error && <p className="text-danger fs-10">{error}</p>} 
    </div>
  );
}



const Botton = ({ Name, typeInput, coClick }) => {
  return (
    <button
      type={typeInput}
      onClick={coClick}
      className="btn btn-primary w-100 py-2 rounded-3 fw-bold"
    >
      {Name}
    </button>
  );
};

const TeacherSelect = ({ teachers, selectedTeacher, setSelectedTeacher, errorTeacher }) => {
  return (
    <div className="mb-3">
      <label htmlFor="teacher" className="form-label">
        Select Teacher
      </label>
      <select
        id="teacher"
        className="form-select"
        value={selectedTeacher}
        onChange={(e) => setSelectedTeacher(e.target.value)}
      >
        <option value="">Choose a Teacher</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.name}>
            {teacher.name}
          </option>
        ))}
      </select>
      {errorTeacher && <p className="text-danger fs-6">{errorTeacher}</p>}
    </div>
  );
};

export {InputForm, Botton ,TeacherSelect};
