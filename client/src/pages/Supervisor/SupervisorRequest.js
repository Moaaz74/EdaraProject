import React,{useState,useEffect} from 'react'
import BarProduct from './BarProduct';
import "../../Style/SuperRequest.css"
import axios from "axios"
import { getAuthUser } from '../../helper/Storage';
import { useParams,useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
function SupervisorRequest() {
  const auth = getAuthUser();
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState({
    quantity: "",
    err: [],
    loading: false,
  });

  

  const addProduct = (e) => {
    e.preventDefault();

    setProduct({ ...product, loading: true });
    const formData = new FormData();
    formData.append("quantity", product.quantity);
    
    axios
      .post("http://localhost:3000/requests/create/"+ id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setProduct({
          quantity: "",
          
          err: null,
          loading: false,
          
        });
        navigate(-1);
        
      })
      .catch((errors) => {
        setProduct({
          ...product,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  return (
    <div className="super">
        <BarProduct />
        <div className='addBody'>
            <form onSubmit={addProduct}>
            <h1 ><span style={{color:"orangered",fontSize:"55px"}}>Send</span> Request</h1>
        <label htmlFor="Quantity" className="label">Quantity</label>
        <input
          id="Quantity"
          type="number"
          name="Quantity"
          className="input"
          value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
        />
        <div style={{marginTop:"30px"}}>
        <Button type="submit" className='AddButton'>Send</Button>
        
      </div>
        </form>
        
        </div>
        </div>
  )
}

export default SupervisorRequest