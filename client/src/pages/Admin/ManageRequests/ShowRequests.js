import React, { useState, useEffect } from "react";
import Sidebar from "../../../component/Sidebar";
import "../../../Style/Product.css";
import Table from "react-bootstrap/Table";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
import { Button } from "react-bootstrap";

function ShowRequests() {
  const auth = getAuthUser();
  const navigate = useNavigate();
  const [Requests, setRequests] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  console.log(Requests);
  useEffect(() => {
    setRequests({ ...Requests, loading: true });
    axios
      .get("http://localhost:3000/requests/showPendingRequests", {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setRequests({
          ...Requests,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setRequests({
          ...Requests,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [Requests.reload]);
  const handleAgreeClick = async (id) => {
    try {
      const answer = "Agree";
      await axios.put(
        `http://localhost:3000/requests/update/${id}?answer=${answer}`,
        {},
        {
          headers: {
            token: auth.token,
          },
        }
      );
      //navigate("/showHistory");
      window.location.reload(true);

    } catch (err) {
      console.log(err);
    }
  };

  const handleDisAgreeClick = async (id) => {
    try {
      const answer = "Disagree";
      await axios.put(
        `http://localhost:3000/requests/update/${id}?answer=${answer}`,
        {},
        {
          headers: {
            token: auth.token,
          },
        }
      );
      //navigate(-1);
        window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <div className="warehouse-container">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="warehouse-content col-10 ">
        <div className="header d-flex justify-content-between m-2 ">
          <h1>
            Show
            <span style={{ color: "orangered", fontSize: "55px" }}>
              Pending
            </span>{" "}
            Requests
          </h1>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SupervisorName</th>
              <th>Quantity</th>
              <th>ProductName</th>
              <th>WarehouseName</th>

              <th colSpan={2} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Requests.results.map((request) => (
              <tr>
                <td>{request.name}</td>
                <td style={{ width: "10%" }}>{request.quantity}</td>
                <td style={{ width: "15%" }}>{request.ProductName}</td>
                <td style={{ width: "15%" }}>{request.warehouseName}</td>
                <td style={{ width: "13%" }}>{request.name}</td>
                <td className="text-right" style={{ width: "17%" }}>
                  <Button
                    className="btn btn-success mx-2"
                    onClick={() => handleAgreeClick(request.id)}
                  >
                    Agree
                  </Button>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleDisAgreeClick(request.id)}
                  >
                    Disagree
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ShowRequests;
