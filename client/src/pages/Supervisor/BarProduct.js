import React from 'react'
import '../../Style/BarProduct.css'
import { Link } from "react-router-dom";
import RequestPageIcon from '@mui/icons-material/RequestPage';
import LogoutIcon from '@mui/icons-material/Logout';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { getAuthUser,removeAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
function BarProduct() {
  const auth = getAuthUser();
  const ID = auth.id;
  const navigate = useNavigate();
  const id = auth.WarehouseId;
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };
  return (
    <div className='start2'>
      <h3>Edara
      <hr></hr>
      </h3>
      <ul>
            <li>
              <Link className="active menu " to={"/supervisor/" + id} >
              <div className='icon'><ProductionQuantityLimitsIcon /></div>
              <span>Product</span>
              </Link>
            </li>
            <li>
              <Link className="active menu " to={"/show/" + ID} >
              <div className='icon'><RequestPageIcon /></div>
              <span>Requests</span>
              </Link>
            </li>
            <li>
              <Link className="active delete"  to="/" onClick={Logout}>
              <div className='icon'><LogoutIcon /></div>
              <span>LogOut</span>
              </Link>
            </li>
      </ul>
    </div>
  )
}

export default BarProduct;
