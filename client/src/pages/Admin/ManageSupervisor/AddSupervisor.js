import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Sidebar from "../../../component/Sidebar";
import "../../../Style/AddWarehouse.css";
import { getAuthUser } from "../../../helper/Storage";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function AddSupervisor() {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const [supervisor, setSupervisor] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
    phone: "",
    state: "",
    loading: false,
    err: [],
  });

  const AddSupervisor = (e) => {
    e.preventDefault();
    setSupervisor({ ...supervisor, loading: true, err: [] });
    axios
      .post(
        "http://localhost:3000/supervisor/create",
        {
          name: supervisor.name,
          location: supervisor.location,
          email: supervisor.email,
          password: supervisor.password,
          phone: supervisor.phone,
          state: supervisor.state,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((resp) => {
        setSupervisor({ ...supervisor, loading: false, err: [] });
        navigate("/manageSupervisor")
        
      })
      .catch((errors) => {
        setSupervisor({
          ...supervisor,
          loading: false,
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
        <Form className="add-form" onSubmit={AddSupervisor}>
          <div>
            <h1>
              <span style={{ color: "orangered", fontSize: "55px" }}>Add</span>{" "}
              supervisor
            </h1>
          </div>
          <hr style={{ width: "50%" }} />
          {supervisor.err.map((error, index) => (
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
              className="Add-input"
              value={supervisor.name}
              onChange={(e) => setSupervisor({ ...supervisor, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: "20px" }}>Email :</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="email"
              placeholder="Enter Email"
              className="Add-input"
              value={supervisor.email}
              onChange={(e) => setSupervisor({ ...supervisor, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontSize: "20px" }}>Password :</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="password"
              placeholder="Enter Password"
              className="Add-input"
              value={supervisor.password}
              onChange={(e) => setSupervisor({ ...supervisor, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label style={{ fontSize: "20px" }}>Phone :</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="text"
              placeholder="Enter Number"
              className="Add-input"
              value={supervisor.phone}
              onChange={(e) => setSupervisor({ ...supervisor, phone: e.target.value })}
            />
          </Form.Group>

          <Form.Select
  style={{ padding: "10px", width: "70%" }}
  value={supervisor.state}
  required
  onChange={(e) => setSupervisor({ ...supervisor, state: e.target.value })}
>
  <option value="">Select status</option>
  <option value="active">Active</option>
  <option value="in-active">In-Active</option>
</Form.Select>

          <Button
            variant="primary"
            type="submit"
            className="btn btn-primary"
            style={{
              width: "10%",
              height: "20%",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddSupervisor;
