import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaExclamationTriangle, FaUserTimes } from "react-icons/fa";
import {
  deleteConfirmationTeacher,
  no,
  yesDelete,
  areYouSure,
  deleteConfirmationStudent,
} from "../Constants/constant";

const DeleteModal = ({ show, handleClose, handleDelete, type }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <FaExclamationTriangle style={{ fontSize: "24px" }} /> {areYouSure}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <FaUserTimes style={{ fontSize: "50px", color: "#dc3545" }} />
        <p className="mt-3">
          {type === "Students"
            ? deleteConfirmationStudent
            : deleteConfirmationTeacher}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {no}
        </Button>

        <Button variant="danger" onClick={handleDelete}>
          {yesDelete}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
