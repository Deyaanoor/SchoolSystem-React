import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addNewProduct, editProduct } from "../../redux/storeSlice";
import AddProductModal from "../../components/AddProductModal";
import EditModal from "../../components/EditModal";
import "./storeStyle.css";
import useRoles from "../../hooks/useRoles"; 

const fields =[
  {
    id: "name",
    label: "Full Name",
    placeholder: "Enter full name",
    type: "text",
  },
  {
    id: "price",
    label: "Price",
    placeholder: "Enter price",
    type: "number",
  },
  {
    id: "imageUrl",
    label: "URL Image",
    placeholder: "Enter URL Image",
    type: "text",
  },
]
const Store = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const hasMore = useSelector((state) => state.products.hasMore);
  const lastDoc = useSelector((state) => state.products.lastDoc);
  const { isAdmin, isTeacher } = useRoles();

  const observer = useRef();
  useEffect(() => {
    dispatch(fetchProducts({ reset: true }));
  }, [dispatch]);

  const lastteacherRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current instanceof IntersectionObserver) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchProducts({ lastDoc, reset: false }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, lastDoc, dispatch]
  );

  const handleShow = () => setShowModal(true);

  const handleSubmit = (productData) => {
    dispatch(addNewProduct(productData));
    setShowModal(false);
  };

  const handleProductSave = (id, updatedData) => {
    dispatch(editProduct({ id, updatedData }));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Our Store</h1>

      <div className="text-center mb-4">
        {(isTeacher || isAdmin) && (
          <Button
            variant="success"
            onClick={handleShow}
            className="rounded-pill px-4 py-2"
          >
            Add New Product
          </Button>
        )}
      </div>

      {loading && (
        <div className="text-center mb-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <div className="row">
        {products.map((product, index) => (
          <div
          onClick={() => setSelectedProductId(product.id)}
          key={product.id}
          ref={index === products.length - 1 ? lastteacherRef : null}
          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        >
          <div className="card h-100 shadow hover-effect w-100">
            <img
              src={product.imageUrl}
              className="card-img-top"
              alt={product.name}
              style={{ height: "150px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text text-success fw-bold">
                ${product.price}
              </p>
            </div>
          </div>
        </div>
        
        ))}
      </div>

      <AddProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
      />

      {(isTeacher|| isAdmin) && (
        <EditModal
          entityType="Products"
          entityId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
          onSave={handleProductSave}
          fields={fields}
        />
      )}
    </div>
  );
};

export default Store;
