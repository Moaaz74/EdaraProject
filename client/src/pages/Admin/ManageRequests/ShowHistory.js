import React,{useState,useEffect} from 'react'
import Sidebar from '../../../component/Sidebar'
import "../../../Style/Product.css"
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from "axios"
import { getAuthUser } from '../../../helper/Storage';
function ShowHistory() {
  const auth = getAuthUser();
  const [Request, setRequest] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  console.log(Request);
  useEffect(() => {
    setRequest({ ...Request, loading: true });
    axios
      .get("http://localhost:3000/requests/showall" ,{
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        
        setRequest({ ...Request, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setRequest({
          ...Request,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [Request.reload]);

  const deleteHistory = (id) => {
    axios
      .delete("http://localhost:3000/warehouse/delete/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setRequest({ ...Request, reload: Request.reload + 1 });
      })
      .catch((err) => {});
  };
  return (
    <div className="warehouse-container">
        <div className='col-2'><Sidebar /></div>
        <div className="warehouse-content col-10 " >
            <div className='header d-flex justify-content-between m-2 '>
                <h1><span style={{color:"orangered",fontSize:"55px"}}>Show</span> History</h1>
                
            </div>
            <Table striped bordered hover>
      <thead>
        <tr>
        <th>SupervisorName</th>
            <th>Quantity</th>
            <th>ProductName</th>
            <th>WarehouseName</th>
            <th>SupervisorEmail</th>
            <th>Approval</th>
            <th colSpan={2} className="text-center">
            Action
            </th>
        </tr>
      </thead>
      <tbody>
      {Request.results.map((request) => (
        <tr>
        <td>{request.name}</td>
                <td>{request.quantity}</td>
                <td>{request.ProductName}</td>
                <td>{request.warehouseName}</td>
                <td>{request.email}</td>
                <td>{request.approval}</td>
                <td className="text-right" style={{width:"5%"}}>
                <Button className="btn btn-danger" onClick={(e) => {
                    deleteHistory(request.id);
                  }}>
                    Delete
                </Button>
                </td>
        </tr>
        ))}
      </tbody>
    </Table>
        </div>
    </div>
  )
}

export default ShowHistory