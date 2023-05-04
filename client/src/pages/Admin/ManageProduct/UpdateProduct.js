import React,{useState,useEffect,useRef} from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Sidebar from "../../../component/Sidebar";
import "../../../Style/AddWarehouse.css";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UpdateProduct() {
  let { id } = useParams();
  const auth = getAuthUser();
  const navigate = useNavigate();
  const [Product, setProduct] = useState({
    name: "",
    description: "",
    stock: "",
    photo: null,
    err: [],
    loading: false,
    reload: false,
    success: null,
  });
  const image = useRef(null);

  const updateProduct = (e) => {
    e.preventDefault();

    setProduct({ ...Product, loading: true });
    
    const formData = new FormData();
    formData.append("name", Product.name);
    formData.append("description", Product.description);
    formData.append("stock", Product.stock);

    axios
      .put("http://localhost:3000/product/update/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setProduct({
          ...Product,
          loading: false,
          success: "movie updated successfully !",
          reload: Product.reload + 1,
        });
        navigate(-1);
      })
      .catch((errors) => {
        setProduct({
          ...Product,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/product/show/" + id,{
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setProduct({
          ...Product,
          name: resp.data[0].name,
          description: resp.data[0].descritption,
          stock: resp.data[0].stock
        });
      })
      .catch((err) => {
        setProduct({
          ...Product,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [Product.reload]);
  return (
    <div className="add-container">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="col-10 add-content">
        <Form className="add-form" onSubmit={updateProduct}>
          <div>
            <h1>
              <span style={{ color: "orangered", fontSize: "55px" }}>
                Update
              </span>{" "}
              Product
            </h1>
          </div>
          <hr style={{ width: "100%" }} />
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: "20px" }}>Name:</Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="text"
              placeholder="Enter Name"
              className="Add-input"
              value={Product.name}
            onChange={(e) =>
              setProduct({ ...Product, name: e.target.value })
            }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label style={{ fontSize: "20px" }}>Description:</Form.Label>
            <textarea
              className="form-control"
              placeholder="Description"
              rows={5}
              style={{ width: "70%" }}
              value={Product.description}
            onChange={(e) => setProduct({ ...Product, description: e.target.value })}
            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label style={{ fontSize: "20px" }}>
              Stock :
            </Form.Label>
            <Form.Control
              style={{ padding: "10px", width: "70%" }}
              type="stock"
              placeholder="Enter stock"
              className="Add-input"
              value={Product.stock}
            onChange={(e) =>
              setProduct({ ...Product, stock: e.target.value })
            }
            />
          </Form.Group>

          
          <Button
            variant="primary"
            type="submit"
            className="btn btn-primary"
            style={{ width: "10%", height: "20%", marginTop: "20px" }}
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProduct;
