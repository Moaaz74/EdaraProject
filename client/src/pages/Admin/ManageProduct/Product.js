import React,{useState,useEffect} from 'react'
import Sidebar from '../../../component/Sidebar'
import "../../../Style/Product.css"
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from "axios"
import { getAuthUser } from '../../../helper/Storage';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";

function Product() {
  const auth = getAuthUser();
  let { id } = useParams();
  const [products, setProducts] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const url= "E:\\projectBack\\server\\upload\\";

  useEffect(() => {
    setProducts({ ...products, loading: true });

    axios
      .get("http://localhost:3000/warehouse/getWarehousesProduct/"+ id,{
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setProducts({ ...products, results: resp.data, loading: false, err: null });
        console.log(resp.data);
      })
      .catch((err) => {
        setProducts({
          ...products,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [products.reload]);

  const deleteProduct = (id) => {
    axios
      .delete("http://localhost:3000/product/delete/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setProducts({ ...products, reload: products.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="warehouse-container">
        <div className='col-2'><Sidebar /></div>
        <div className="warehouse-content col-10 " >
            <div className='header d-flex justify-content-between m-2 '>
                <h1><span style={{color:"orangered",fontSize:"55px"}}>Manage</span> Product</h1>
                
            </div>
            <Table striped bordered hover>
      <thead>
        <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {products.results.map((product) => (
        <tr key={product.id}>
          <td style={{width:"8%"}}><img src={product.photo} alt="ProductPhoto" className="product-photo"/></td>
          <td style={{width:"10%"}}>{product.name}</td>
          <td style={{width:"60%"}}>{product.descritption}</td>
          <td style={{width:"8%"}}>{product.stock}</td>
          
          <td>
            <Button className="btn btn-sm btn-danger mx-2" onClick={(e) => {
                    deleteProduct(product.id);
                  }}>Delete</Button>
            <Link to={"/update-product/" + product.id} className="btn btn-sm btn-primary mx-2">Update</Link>
            
          </td>
        </tr>
        ))}
      </tbody>
    </Table>
        </div>
    </div>
  )
}

export default Product