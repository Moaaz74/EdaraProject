import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Sidebar from "../../../component/Sidebar";
import "../../../Style/AddWarehouse.css";
import { getAuthUser } from "../../../helper/Storage";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddWarehouse() {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const [warehouse, setWarehouse] = useState({
    name: "",
    location: "",
    email: "",
    state: "",
    loading: false,
    err: [],
  });

  const addWarehouse = (e) => {
    e.preventDefault();
    setWarehouse({ ...warehouse, loading: true, err: [] });
    axios
      .post("http://localhost:3000/warehouse/create", {
        name: warehouse.name,
        location: warehouse.location,
        email: warehouse.email,
        state: warehouse.state,
      },{
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setWarehouse({ ...warehouse, loading: false, err: [] });
        navigate("/manageWarehouse")
        
      })
      .catch((errors) => {
        setWarehouse({
          ...warehouse,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };
  /*const auth = getAuthUser();
  const [formData, setFormData] = useState({});
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/warehouse/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',token: auth.token },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }*/

  /*const auth = getAuthUser();
  const [warehouse, setWarehouse] = useState({
    name: "",
    location: "",
    email: "",
    state: "",
    err: [],
    loading: false,
    success: null,
  });

  const createWarehouse = (e) => {
    e.preventDefault();

    setWarehouse({ ...warehouse, loading: true });

    const formData = new FormData();
    formData.append("name", warehouse.name);
    formData.append("location", warehouse.location);
    formData.append("email", warehouse.email);
    formData.append("state", warehouse.state);

    axios
      .post("http://localhost:3000/warehouse/create", formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setWarehouse({
          name: "",
          location: "",
          email: "",
          state: "",
          err: null,
          loading: false,
          success: "Movie Created Successfully !",
        });
      })
      .catch((err) => {
        setWarehouse({
          ...warehouse,
          loading: false,
          success: null,
          err: "Something wrong",
        });
      });
  };*/
  return (
    <div className="add-container">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="col-10 add-content">
        <Form className="add-form" onSubmit={addWarehouse}>
          <div>
            <h1>
              <span style={{ color: "orangered", fontSize: "55px" }}>Add</span>{" "}
              Warehouse
            </h1>
          </div>
          <hr style={{ width: "50%" }} />
          {/*formData.err && (
        <Alert variant="danger" className="p-2" style={{width:"70%"}}>
          {error.err}
        </Alert>
          )*/}

      {/*formData.success && (
        <Alert variant="success" className="p-2" style={{width:"70%"}}>
          {formData.success}
        </Alert>
      )*/}
      {warehouse.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: "20px" }}>Name:</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="text"
              placeholder="Enter Name"
              className="Add-input"
              value={warehouse.name}
              onChange={(e) => setWarehouse({ ...warehouse, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: "20px" }}>Location :</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="text"
              placeholder="Enter Location"
              className="Add-input"
              value={warehouse.location}
              onChange={(e) => setWarehouse({ ...warehouse, location: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: "20px" }}>
              Email address :
            </Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="email"
              placeholder="Enter email"
              className="Add-input"
              value={warehouse.email}
              onChange={(e) => setWarehouse({ ...warehouse, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: "20px" }}>
              State :
            </Form.Label>
            {/*<Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="text"
              placeholder="Enter email"
              className="Add-input"
              value={warehouse.state}
              onChange={(e) => setWarehouse({ ...warehouse, state: e.target.value })}
      />*/}
      <Form.Select
  style={{ padding: "10px", width: "70%" }}
  value={warehouse.state}
  required
  onChange={(e) => setWarehouse({ ...warehouse, state: e.target.value })}
>
  <option value="">Select status</option>
  <option value="active">Active</option>
  <option value="in-active">In-Active</option>
</Form.Select>
          </Form.Group>

          {/*<Form.Select
            aria-label=" select example"
            style={{ padding: "10px", width: "70%" }}
            value={warehouse.state}
            required
            onChange={(e) =>
              setWarehouse({ ...warehouse, state: e.target.value })
            }
          >
           
            <option value="active">Active</option>
            <option value="in-active" >In-Active</option>
          </Form.Select>*/}
          
          <Button
            variant="primary"
            type="submit"
            className="btn btn-primary"
            style={{ width: "10%", height: "20%", marginTop: "20px" }}
          >
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddWarehouse;
