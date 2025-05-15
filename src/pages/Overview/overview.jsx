import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/studentsSlice";
import { fetchTeachers } from "../../redux/teachersSlice";
import { fetch10Products } from "../../redux/storeSlice";

// Importing individual section components
import TopStudents from "./TopStudents";
import TopTeachers from "./TopTeachers";
import TopProducts from "./TopProducts";

import "./overviewStyle.css";

const Overview = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const teachers = useSelector((state) => state.teachers.teachers);
  const topProducts = useSelector((state) => state.products.topProducts);

  useEffect(() => {
    dispatch(fetchStudents({ reset: true }));
    dispatch(fetchTeachers({ reset: true }));
    dispatch(fetch10Products());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center g-4">
        <h1 className="text-center mb-2 text-primary fw-bold">Overview</h1>
        
        {students?.length > 0 && (
          <div className="col-md-4">
            <TopStudents students={students} />
          </div>
        )}

        {teachers?.length > 0 && (
          <div className="col-md-4">
            <TopTeachers teachers={teachers} />
          </div>
        )}
      </div>

      {topProducts?.length > 0 && (
        <div className="row justify-content-center mt-4 mb-5 g-4">
          <div className="col-md-8">
            <TopProducts topProducts={topProducts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
