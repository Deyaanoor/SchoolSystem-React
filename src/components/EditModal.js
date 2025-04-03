import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { getStudentById } from "../firebase/studentService";
import { getTeacherById } from "../firebase/teacherService";
import { getProductById } from "../firebase/storeService";

import { useSelector } from "react-redux";

import { InputForm, TeacherSelect } from "../components/Form";
import {
  cancel,
  saveChanges,
  pleaseFillAllFields,
} from "../Constants/constant";

const EditModal = ({ entityType, entityId, onClose, onSave, fields }) => {
  const [entityData, setEntityData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const teachers = useSelector((state) => state.teachers.teachers);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (entityType === "Students") {
        const data = await getStudentById(entityId);
        setEntityData(data);
        setEditedData(data);
      } else if (entityType === "Teachers") {
        const data = await getTeacherById(entityId);
        setEntityData(data);
        setEditedData(data);
      } else if (entityType === "Products") {
        const data = await getProductById(entityId);
        setEntityData(data);
        setEditedData(data);
      }
      setLoading(false);
    };

    if (entityId) fetchData();
  }, [entityId, entityType]);

  const handleUpdate = async () => {
    setError("");

    if (fields.some((field) => !editedData[field.id])) {
      setError(pleaseFillAllFields);
      return;
    }

    onSave(entityId, editedData);
    onClose();
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Modal show={entityId !== null} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {entityType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-warning">{error}</div>}

        {entityData && (
          <Form>
            {fields.map((field) => (
              <InputForm
                key={field.id}
                ID={field.id}
                labelName={field.label}
                placeholderName={field.placeholder}
                typeInput={field.type}
                value={editedData[field.id] || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, [field.id]: e.target.value })
                }
              />
            ))}

            {entityType === "Students" && (
              <TeacherSelect
                teachers={teachers}
                selectedTeacher={editedData.teacher || ""}
                setSelectedTeacher={(value) =>
                  setEditedData({ ...editedData, teacher: value })
                }
                errorTeacher={error}
              />
            )}
            {entityType === "Products" && (
              <div className="card text-center shadow-sm p-3 mb-3">
                <img
                  src={editedData.imageUrl}
                  alt="Student"
                  className="card-img-top mx-auto d-block w-50"
                />
                <div className="card-body">
                  <h5 className="card-title">{editedData.name}</h5>
                </div>
              </div>
            )}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {cancel}
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          {saveChanges}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
