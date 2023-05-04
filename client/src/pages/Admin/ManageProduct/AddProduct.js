import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Sidebar from "../../../component/Sidebar";
import "../../../Style/AddWarehouse.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
import { Button } from "react-bootstrap";
import { useNavigate,useParams } from "react-router-dom";

function AddProduct() {
  const auth = getAuthUser();
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    stock: "",
    err: [],
    loading: false,
  });

  const photo = useRef(null);

  const addProduct = (e) => {
    e.preventDefault();

    setProduct({ ...product, loading: true });
    console.log(photo.current.files[0]);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("stock", product.stock);
    if (photo.current.files && photo.current.files[0]) {
      formData.append("photo", photo.current.files[0]);
    }
    axios
      .post("http://localhost:3000/product/add/"+ id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setProduct({
          name: "",
          description: "",
          stock: "",
          err: null,
          loading: false,
          
        });
        navigate("/manageProduct/"+id);
        photo.current.value = null;
      })
      .catch((errors) => {
        setProduct({
          ...product,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  return (
    <div className="add-container">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="col-10 add-content">
        <Form className="add-form" onSubmit={addProduct}>
          <div>
            <h1>
              <span style={{ color: "orangered", fontSize: "55px" }}>Add</span>{" "}
              Product
            </h1>
          </div>
          <hr style={{ width: "50%" }} />
          {product.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label style={{ fontSize: "20px" }}>Name:</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label style={{ fontSize: "20px" }}>Description:</Form.Label>
            <textarea
              className="form-control"
              placeholder="Description"
              rows={5}
              style={{ width: "70%" }}
              value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label style={{ fontSize: "20px" }}>Stock :</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="number"
              placeholder="Enter Stock"
              className="form-control"
              value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhoto">
            <input
              type="file"
              className="form-control"
              style={{ padding: "10px", width: "70%" }}
              ref={photo} 
              
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="btn btn-primary"
            style={{ width: "10%", height: "20%", marginBottom: "20px" }}
          >
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddProduct;
