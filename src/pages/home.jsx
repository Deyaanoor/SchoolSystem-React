import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddStudent from "./addStudent";
import AddTeacher from "./addTeacher";
import Teachers from "./teachersPage";
import Students from "./studentsPage";
import { useEffect } from "react";
import Store from "./store";
import {
  FaStore,
  FaHome,
  FaChalkboardTeacher,
  FaUserPlus,
  FaUserTie,
} from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  store,
  dashboard,

  studentLabel,
  addStudent,
  logout,
  addTeacher,
  TeachersLabel,
} from "../Constants/constant";

const Home = () => {
  const role = useSelector((state) => state.user.role);
  
  
  
  return (
    <div className="d-flex">
      <div
        className="sidebar bg-dark text-white"
        style={{
          width: "200px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <h4 className="p-3">{dashboard}</h4>
        <h4 className="p-3">{role}</h4>
        <ul className="list-unstyled flex-grow-1">
          <li className="p-2">
            <Link
              to="/home"
              className="btn btn-outline-primary w-100 d-flex align-items-center"
            >
              <FaStore className="me-2" /> {store}
            </Link>
          </li>

          
            <li className="p-2">
              <Link
                to="/home/students"
                className="btn btn-outline-primary w-100 d-flex align-items-center"
              >
                <FaHome className="me-2" /> {studentLabel}
              </Link>
            </li>
          

          {role === "admin" && (
            <li className="p-2">
              <Link
                to="/home/teachers"
                className="btn btn-outline-primary w-100 d-flex align-items-center"
              >
                <FaChalkboardTeacher className="me-2" /> {TeachersLabel}
              </Link>
            </li>
          )}

          {role === "admin" && (
            <li className="p-2">
              <Link
                to="/home/addStudent"
                className="btn btn-outline-primary w-100 d-flex align-items-center"
              >
                <FaUserPlus className="me-2" /> {addStudent}
              </Link>
            </li>
          )}

          {role === "admin" && (
            <li className="p-2">
              <Link
                to="/home/addTeacher"
                className="btn btn-outline-primary w-100 d-flex align-items-center"
              >
                <FaUserTie className="me-2" /> {addTeacher}
              </Link>
            </li>
          )}
        </ul>

        <div className="p-2 mt-auto">
          <Link to="/" className="btn btn-outline-danger w-100">
            {logout}
          </Link>
        </div>
      </div>

      <div className="container-fluid" style={{ marginLeft: "200px" }}>
        <Routes>
          <Route path="" element={<Store />} />
         
            <Route path="/students" element={<Students />} />
        
          {role === "admin" && <Route path="/teachers" element={<Teachers />} />}
          {role === "admin" && <Route path="/addStudent" element={<AddStudent />} />}
          {role === "admin" && <Route path="/addTeacher" element={<AddTeacher />} />}
        </Routes>
      </div>
    </div>
  );
};

export default Home;
