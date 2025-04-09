import { ListGroup, Card, Carousel } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/studentsSlice";
import { fetchTeachers } from "../redux/teachersSlice";
import { fetch10Products } from "../redux/storeSlice";

import "../overviewStyle.css";

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
        {/* Students */}
        <div className="col-md-4">
          <Card className="h-100 shadow border-0 rounded-3">
            <Card.Body>
              <Card.Title className="text-center mb-4 text-primary fw-bold">
                Top 3 Students
              </Card.Title>
              <ListGroup variant="flush">
                {students.slice(0, 3).map((student, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center border-0 mb-3 bg-light shadow-sm rounded-3"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex flex-column">
                        <strong className="text-dark fs-5">
                          {student.name}
                        </strong>
                        <span className="text-muted fs-6">
                          Email: {student.email}
                        </span>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>

        {/* Teachers */}
        <div className="col-md-4">
          <Card className="h-100 shadow border-0 rounded-3">
            <Card.Body>
              <Card.Title className="text-center mb-4 text-primary fw-bold">
                Top 3 Teachers
              </Card.Title>
              <ListGroup variant="flush">
                {teachers.slice(0, 3).map((teacher, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center border-0 mb-3 bg-light shadow-sm rounded-3"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex flex-column">
                        <strong className="text-dark fs-5">
                          {teacher.name}
                        </strong>
                        <span className="text-muted fs-6">
                          Email: {teacher.email}
                        </span>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row justify-content-center mt-4 mb-5 g-4">
        <div className="col-md-8">
          <Card className="shadow-lg rounded">
            <Card.Body>
              <Card.Title className="text-center mb-4 text-primary fw-bold">
                Top 10 Expensive Products
              </Card.Title>
              <Carousel interval={3000} controls indicators>
                {topProducts.map((product, index) => (
                  <Carousel.Item key={index}>
                    <Card className="shadow-sm rounded">
                      <div className="overflow-hidden rounded">
                        <img
                          className="d-block w-100"
                          src={product.imageUrl}
                          alt={product.name}
                          style={{
                            height: "250px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <Card.Body className="text-center">
                        <Card.Title className="h5 text-dark fw-bold">
                          {product.name}
                        </Card.Title>
                        <Card.Text className="text-muted mb-5">
                          ${product.price}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
