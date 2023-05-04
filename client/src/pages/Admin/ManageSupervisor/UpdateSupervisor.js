import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Sidebar from "../../../component/Sidebar";
import "../../../Style/AddWarehouse.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function UpdateSupervisor() {
  const auth = getAuthUser();
  const navigate = useNavigate();
  let { id } = useParams();
  const [Supervisor, setSupervisor] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    err: [],
    loading: false,
    reload: false,
  });

  const updateSupervisor = (e) => {
    e.preventDefault();
    setSupervisor({ ...Supervisor, loading: true });
    const formData = new FormData();
    formData.append("name", Supervisor.name);
    formData.append("email", Supervisor.email);
    formData.append("phone", Supervisor.phone);
    formData.append("state", Supervisor.state);
    axios
      .put("http://localhost:3000/admin/updatesupervisor/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setSupervisor({
          ...Supervisor,
          loading: false,
          reload: Supervisor.reload + 1,
        });
        navigate("/manageSupervisor");
      })
      .catch((errors) => {
        setSupervisor({
          ...Supervisor,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/supervisor/getsupervisor/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setSupervisor({
          ...Supervisor,
          name: resp.data[0].name,
          email: resp.data[0].email,
          
          phone: resp.data[0].phone,
          state: resp.data[0].state,
        });
      })
      .catch((err) => {
        setSupervisor({
          ...Supervisor,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [Supervisor.reload]);
  return (
    <div className="add-container">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="col-10 add-content">
        <Form className="add-form" onSubmit={updateSupervisor}>
          <div>
            <h1>
              <span style={{ color: "orangered", fontSize: "55px" }}>
                Update
              </span>{" "}
              Supervisor
            </h1>
          </div>
          <hr style={{ width: "50%" }} />
          {Supervisor.err.map((error, index) => (
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
              value={Supervisor.name}
              onChange={(e) =>
                setSupervisor({ ...Supervisor, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: "20px" }}>Email :</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="email"
              placeholder="Enter Email"
              className="Add-input"
              value={Supervisor.email}
              onChange={(e) =>
                setSupervisor({ ...Supervisor, email: e.target.value })}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label style={{ fontSize: "20px" }}>Phone :</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="text"
              placeholder="Enter Number"
              className="Add-input"
              value={Supervisor.phone}
              onChange={(e) =>
                setSupervisor({ ...Supervisor, phone: e.target.value })}
            />
          </Form.Group>

          <Form.Select
            aria-label="Default select example"
            style={{ padding: "10px", width: "70%" }}
          >
            <option value="1">Active</option>
            <option value="2">In-Active</option>
          </Form.Select>

          <Button
            variant="primary"
            type="submit"
            className="btn btn-primary"
            style={{
              width: "10%",
              height: "20%",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdateSupervisor;
