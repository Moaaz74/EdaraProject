import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Sidebar from "../../../component/Sidebar";
import "../../../Style/AddWarehouse.css";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UpdateWarehouse = () => {
  const auth = getAuthUser();
  const navigate = useNavigate();
  let { id } = useParams();
  const [Warehouse, setWarehouse] = useState({
    name: "",
    location: "",
    state: "",
    err: [],
    loading: false,
    reload: false,
    
  });

  const updateWarehouse = (e) => {
    e.preventDefault();
    setWarehouse({ ...Warehouse, loading: true });
    const formData = new FormData();
    formData.append("name", Warehouse.name);
    formData.append("location", Warehouse.location);
    formData.append("state", Warehouse.state);
    axios
      .put("http://localhost:3000/warehouse/update/" + id,formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setWarehouse({
          ...Warehouse,
          loading: false,
          reload: Warehouse.reload + 1,
        });
        navigate("/manageWarehouse")
      })
      .catch((errors) => {
        setWarehouse({
          ...Warehouse,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/warehouse/show/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setWarehouse({
          ...Warehouse,
          name: resp.data.name,
          location: resp.data.location,
          state: resp.data.state,
        });
      })
      .catch((err) => {
        setWarehouse({
          ...Warehouse,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [Warehouse.reload]);
  return (
    <div className="add-container">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="col-10 add-content">
        <Form onSubmit={updateWarehouse} className="add-form">
          <div>
            <h1>
              <span style={{ color: "orangered", fontSize: "55px" }}>
                Update
              </span>{" "}
              Warehouse
            </h1>
          </div>
          <hr style={{ width: "50%" }} />
          {Warehouse.err.map((error, index) => (
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
              value={Warehouse.name}
              onChange={(e) =>
                setWarehouse({ ...Warehouse, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: "20px" }}>Location :</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="text"
              placeholder="Enter Location"
              className="Add-input"
              value={Warehouse.location}
              onChange={(e) =>
                setWarehouse({ ...Warehouse, location: e.target.value })
              }
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            style={{ padding: "10px", width: "70%" }}
            value={Warehouse.state}
            onChange={(e) =>
              setWarehouse({ ...Warehouse, state: e.target.value })
            }
          >
            <option value="active">Active</option>
            <option value="in-active">In-Active</option>
          </Form.Select>

          <Button
            variant="primary"
            type="submit"
            className="btn btn-primary"
            style={{ width: "10%", height: "20%", marginTop: "20px" }}
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateWarehouse;
