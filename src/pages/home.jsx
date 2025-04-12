import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Overview from "./overview";
import AddStudent from "./addStudent";
import AddTeacher from "./addTeacher";
import Teachers from "./teachersPage";
import Students from "./studentsPage";
import ContactForm from "./ContactUs";
import Store from "./store";
import {
  FaStore,
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserPlus,
  FaUserTie,
  FaEnvelope,
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
  overview,
  contactUs,
} from "../Constants/constant";

const Home = () => {
  const role = useSelector((state) => state.user.role);

  return (
    <div className="d-flex">
      <div
        className="sidebar bg-dark text-white"
        style={{
          width: "230px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          overflowY: "auto",
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
              <FaHome className="me-2" /> {overview}
            </Link>
          </li>

          <li className="p-2">
            <Link
              to="/home/contactUs"
              className="btn btn-outline-primary w-100 d-flex align-items-center"
            >
              <FaEnvelope className="me-2" /> {contactUs}
            </Link>
          </li>
          <li className="p-2">
            <Link
              to="/home/store"
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
              <FaUserGraduate className="me-2" /> {studentLabel}
            </Link>
          </li>

          {(role === "admin" || role === "teacher") && (
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

      <div className="container-fluid" style={{ marginLeft: "230px" }}>
        <Routes>
          <Route path="" element={<Overview />} />
          <Route path="/store" element={<Store />} />
          <Route path="/students" element={<Students />} />
          <Route path="/contactUs" element={<ContactForm />} />

          {(role === "admin" || role === "teacher") && (
            <Route path="/teachers" element={<Teachers />} />
          )}
          {role === "admin" && (
            <Route path="/addStudent" element={<AddStudent />} />
          )}
          {role === "admin" && (
            <Route path="/addTeacher" element={<AddTeacher />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default Home;
