import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { InputForm } from "../components/Form"; 

const AddProductModal = ({ show, handleClose, handleSubmit }) => {
    const [editedData, setEditedData] = useState({
      name: "",
      price: "",
      imageUrl: "" 
    });
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      if (!editedData.name || !editedData.price || !editedData.imageUrl) {
        alert("Please fill all the fields.");
        return;
      }
  
      try {
        const productData = {
          name: editedData.name,
          price: parseFloat(editedData.price),
          imageUrl: editedData.imageUrl 
        };
  
        handleSubmit(productData);  
  console.log(productData);
        
        setEditedData({
          name: "",
          price: "",
          imageUrl: "" 
        });
        handleClose(); 
  
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error.");
      }
    };
    const handleFormClose = () => {
      setEditedData({
        name: "",
        price: "",
        imageUrl: "" 
      });
      handleClose();
    }
  
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Add New Product</Modal.Title>
        </Modal.Header>
  
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <InputForm
                labelName="Product Name"
                placeholderName="Enter product name"
                typeInput="text"
                value={editedData.name}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              />
            </Form.Group>
  
            <Form.Group className="mb-3">
            <InputForm
  labelName="Price"
  placeholderName="Enter price"
  typeInput="number"
  value={editedData.price}
  onChange={(e) => setEditedData({ ...editedData, price: parseFloat(e.target.value) || "" })}
/>

            </Form.Group>
  
            <Form.Group className="mb-3">
              <InputForm
                labelName="Image URL"
                placeholderName="Enter image URL"
                typeInput="text"
                value={editedData.imageUrl}
                onChange={(e) => setEditedData({ ...editedData, imageUrl: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={handleFormClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };
  
  export default AddProductModal;