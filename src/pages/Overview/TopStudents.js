import { ListGroup, Card } from "react-bootstrap";

const TopStudents = ({ students }) => {
  return (
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
                  <strong className="text-dark fs-5">{student.name}</strong>
                  <span className="text-muted fs-6">Email: {student.email}</span>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default TopStudents;
