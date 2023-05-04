import React ,{useState,useEffect} from 'react'
import Sidebar from '../../../component/Sidebar'
import "../../../Style/Product.css"
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from "axios"
import { getAuthUser } from '../../../helper/Storage';
function Supervisor() {
  const auth = getAuthUser();
  const [Supervisor, setSupervisor] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  console.log(Supervisor);
  useEffect(() => {
    setSupervisor({ ...Supervisor, loading: true });
    axios
      .get("http://localhost:3000/supervisor/showall" ,{
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        
        setSupervisor({ ...Supervisor, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setSupervisor({
          ...Supervisor,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [Supervisor.reload]);

  const deleteSupervisor = (id) => {
    axios
      .delete("http://localhost:3000/admin/deletesupervisor/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setSupervisor({ ...Supervisor, reload: Supervisor.reload + 1 });
      })
      .catch((err) => {});
  };
  return (
    <div className="warehouse-container">
        <div className='col-2'><Sidebar /></div>
        <div className="warehouse-content col-10 " >
            <div className='header d-flex justify-content-between m-2 '>
            <h1><span style={{color:"orangered",fontSize:"55px"}}>Manage</span> Supervisor</h1>
                <Link to={"/add-supervisor"} className='btn btn-success'>Add Supervisor</Link>
            </div>
            <Table striped bordered hover>
      <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {/*{Supervisor.results.map((supervisor) => (
        <tr key={supervisor.id}>
          <td style={{width:"15%"}}>Mohamed</td>
          <td style={{width:"23%"}}>Mark@gmail.com</td>
          <td style={{width:"15%"}}>************</td>
          <td style={{width:"20%"}}>01098316432</td>
          <td style={{width:"10%"}}>Active</td>
          
          <td>
            <button className="btn btn-sm btn-danger mx-2">Delete</button>
            <Link to={"/update-supervisor/"} className="btn btn-sm btn-primary mx-2">Update</Link>
            
          </td>
        </tr>
      ))}*/}
      {Supervisor.results.map((supervisor) => (
        <tr key={supervisor.id}>
          <td style={{width:"15%"}}>{supervisor.name}</td>
          <td style={{width:"15%"}}>{supervisor.email}</td>
          
          <td style={{width:"15%"}}>{supervisor.phone}</td>
          <td style={{width:"10%"}}>{supervisor.state}</td>
          
          <td style={{width:"30%"}}> 
            <button className="btn btn-sm btn-danger mx-2" onClick={(e) => {
                    deleteSupervisor(supervisor.id);
                  }}>Delete</button>
            <Link to={"/update-supervisor/"+supervisor.id} className="btn btn-sm btn-primary mx-2">Update</Link>
            
          </td>
        </tr>
        ))}
      </tbody>
    </Table>
        </div>
    </div>
  )
  
}

export default Supervisor