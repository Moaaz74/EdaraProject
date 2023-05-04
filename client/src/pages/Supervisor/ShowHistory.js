import React,{useState,useEffect} from 'react'
import BarProduct from '../Supervisor/BarProduct'
import "../../Style/BarProduct.css"
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from "axios"
import { useParams } from "react-router-dom";
import { getAuthUser } from '../../helper/Storage';
function ShowSupervisorRequests() {
  const auth = getAuthUser();
  const ID =auth.id;
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
      .get("http://localhost:3000/requests/show/"+ID ,{
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

  
  return (
    <div className="warehouse-container">
        <div className='col-2'><BarProduct /></div>
        <div className="warehouse-content col-10 " >
            <div className='header d-flex justify-content-between m-2 '>
                <h1><span style={{color:"orangered",fontSize:"55px"}}>Show</span> Requests</h1>
                
            </div>
            <Table striped bordered hover>
      <thead>
        <tr>
            <th>ProductName</th>
            <th>Quantity</th>
            <th>Approval</th>
        </tr>
      </thead>
      <tbody>
      {Request.results.map((request) => (
        <tr>
        
                <td>{request.name}</td>
                <td>{request.quantity}</td>
                <td>{request.approval}</td>
                
        </tr>
        ))}
      </tbody>
    </Table>
        </div>
    </div>
  )
}

export default ShowSupervisorRequests