import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "../../Style/login.css"
import axios from "axios";
import { setAuthUser } from "../../helper/Storage";
import { useNavigate,useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
function Login() {
  const navigate = useNavigate();
  const auth = getAuthUser();
  //let { WarehouseId } = useParams();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    console.log(login);
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://localhost:3000/Auth/login", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp.data);
        const id = auth.WarehouseId
        
        resp.data.type =="admin"?navigate("/home"):navigate("/supervisor/"+ id);
        
      })
      .catch((errors) => {
        
        
        setLogin({
          ...login,
          loading: false,
          err: errors.response.data.errors,
          
        });
      });
  };
  return (
    <div style={{width:"100%",backgroundColor:"#f6f5f1",height:"100vh",position:"relative"}}>
      <Form onSubmit={LoginFun} style={{padding:"80px",backgroundColor:"white",borderRadius:"14px",width:"50%",margin:"5rem 0 5rem 25%",position:"absolute"}}>
      <div>
      <h1 style={{marginBottom:"20px"}}>Login</h1>
      </div>
      
      {login.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}
      
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label style={{fontSize:"20px"}}>Email address :</Form.Label>
        <Form.Control style={{padding:"10px"}} type="email" placeholder="Enter email" className="input" required
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{fontSize:"20px"}}>Password :</Form.Label>
        <Form.Control  style={{padding:"10px"}} type="password" placeholder="Password" className="input" required
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}/>
      </Form.Group>

      <Button variant="primary" type="submit" style={{width:"40%",height:"20%",marginLeft:"30%"}} disabled={login.loading === true}>
        Login
      </Button>
    </Form>
    </div>
  )
}

export default Login