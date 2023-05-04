import React,{useEffect,useState} from 'react'
import Sidebar from '../../../component/Sidebar'
import "../../../Style/Warehouse.css"
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from "axios"
import { getAuthUser } from '../../../helper/Storage';
function Warehouse() {
  const auth = getAuthUser();
  const [Warehouses, setWarehouses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  console.log(Warehouses);
  useEffect(() => {
    setWarehouses({ ...Warehouses, loading: true });
    axios
      .get("http://localhost:3000/warehouse/showall" ,{
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        
        setWarehouses({ ...Warehouses, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setWarehouses({
          ...Warehouses,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [Warehouses.reload]);

  const deleteWarehouse = (id) => {
    axios
      .delete("http://localhost:3000/warehouse/delete/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setWarehouses({ ...Warehouses, reload: Warehouses.reload + 1 });
      })
      .catch((err) => {});
  };
  return (
    <div className="warehouse-container">
        <div className='col-2'><Sidebar /></div>
        <div className="warehouse-content col-10 " >
            <div className='header d-flex justify-content-between m-2 '>
                <h1><span style={{color:"orangered",fontSize:"55px"}}>Manage</span> Warehouse</h1>
                <Link to={"/add"} className='btn btn-success'>Add Warehouse</Link>
            </div>
            <Table striped bordered hover>
      <thead>
        <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {Warehouses.results.map((warehouse) => (
        <tr key={warehouse.id}>
          <td style={{width:"18%"}}><Link className="WareName" to={"/manageProduct/"+ warehouse.id}>{warehouse.name}</Link></td>
          <td style={{width:"20%"}}>{warehouse.location}</td>
          <td style={{width:"25%"}}>{warehouse.email}</td>
          <td>{warehouse.state}</td>
          
          <td>
            <button className="btn btn-sm btn-danger mx-2" onClick={(e) => {
                    deleteWarehouse(warehouse.id);
                  }}>Delete</button>
            <Link to={"/update/"+ warehouse.id} className="btn btn-sm btn-primary mx-2">Update</Link>
            <Link to={"/add-product/" + warehouse.id} className='btn btn-success'>Add Product</Link>
            
          </td>
        </tr>
        ))}
      </tbody>
    </Table>
        </div>
    </div>
  )
}

export default Warehouse