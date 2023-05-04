import React, { useEffect, useState } from 'react'
import "../../Style/SuperHome.css"
import BarProduct from './BarProduct';
import ProductCard from './Product/ProductCard';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useNavigate,useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";

function SuperHome() {
  
  const auth = getAuthUser();
  const navigate = useNavigate();
  const [products,setProducts]=useState({
    loading:true,
    err:null,
    results:[],
    reload:0
  });
  useEffect(() => {
    const Id = auth.WarehouseId;
    console.log(Id);
    console.log(auth.token);
    setProducts({...products,loading:true});
    axios.get("http://localhost:3000/product/showall/"+ Id,{
      headers: {
        token: auth.token,
      },
    })
    .then((resp) =>{
      console.log(resp);
      setProducts({...products, results: resp.data, loading:false});
      console.log(resp.data[0]);
    }).catch( (err) =>{
      setProducts({...products,err: "something wrong",loading:false});

    });
  }, [products.reload]);
  
  return (
  <div className="SuperHome ">
    <div className="col-2">
    <BarProduct />
    </div>
    {
        products.loading === true &&(
          <Spinner animation="border" role="status" className="text-center">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )
      }
    
      
    {
      products.loading ===false && products.err == null &&(
       
        <div  className="col-10 d-flex flex-lg-wrap" style={{height:"110px"}}>
           {
          products.results.map((product)=>(
            <ProductCard 
            photo={product.photo}
            name={product.name}
            descritption={product.descritption}
            stock={product.stock}
            
            id={product.id}
            />
          ))
        }
          
    </div>
      )
    }
      {
      products.loading ===false && products.err != null &&(
        <Alert  variant="danger" className='p-2' style={{width:"70%",height:"50px",margin:"auto"}}>
          {products.err}
        </Alert>
      )}
  </div>
  )
}

export default SuperHome