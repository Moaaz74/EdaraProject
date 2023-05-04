import React, { useEffect, useState } from "react";
import "../../../Style/ShowDetail.css";
import BarProduct from "../BarProduct";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function ShowDetail() {
  let { id }= useParams ;
  const [product,setProduct]=useState({
    loading:true,
    err:null,
    results:null,
    
  });
  useEffect(() => {
    setProduct({...product,loading:true});
    axios.get("http://localhost:3000/product/show/" + id)
    .then((resp) =>{
      console.log(resp);
      setProduct({...product, results: resp.data, loading:false});

    }).catch( (err) =>{
      setProduct({...product,err: "something wrong",loading:false});

    });
  }, []);
  return (
    <div className="detail-container">
      <div className="col-2">
      <BarProduct /></div>
      {
        product.loading === true &&(
          <Spinner animation="border" role="status" className="text-center">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )
      }
      {
      product.loading ===false && product.err == null &&(
        <div className="containt d-flex col-10" style={{ marginLeft: "150px" }}>
        <div className="row d-flex">
          <div className="col-4" style={{ marginLeft: "105px" }}>
            <img
              src={product.results.photo}
              alt=""
              className="detailPhoto"
            />
          </div>
          <div className="col-6 Detail-info">
            <h3>{product.results.name}</h3>
            <p>
              {product.results.descritption}
            </p>
            <h3>Stock: {product.results.stock}</h3>
          </div>
        </div>
      </div>
      )}
      {
      product.loading ===false && product.err != null &&(
        <Alert  variant="danger" className='p-2' style={{width:"70%",height:"50px",margin:"auto"}}>
          {product.err}
        </Alert>
      )}
    </div>
  );
}

export default ShowDetail;
