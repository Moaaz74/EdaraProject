import React from "react";
import "../Style/bar copy.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getAuthUser,removeAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
function Sidebar() {
    const auth = getAuthUser();
  const navigate = useNavigate();
  const id = auth.WarehouseId;
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };
  return (
    <div className="start2">
    <h3>
        Edara
        <hr></hr>
    </h3>

    <ul>
        <li>
        <Link className="active " to="/home">
            <div className="icon">
            <HomeIcon />
            </div>
            <span>Home</span>
        </Link>
        </li>
        <li>
        <Link className="active menu " to={"/manageWarehouse"}>
            <div className="icon">
            <RequestPageIcon />
            </div>
            <span>Warehouse</span>
        </Link>
        </li>
        <li>
        <Link className="active " to={"/manageSupervisor"}>
            <div className="icon">
            <SupervisorAccountIcon />
            </div>
            <span>Supervisor</span>
        </Link>
        </li>
        <li>
        <Link className="active menu ">
            <div className="icon">
            <RequestPageIcon />
            </div>
            <span>
            Requests
            <div style={{ display: "inline" }}>
                <ChevronRightIcon style={{ position: "absolute" }} />
            </div>
            </span>
            <div class="dropdown-content">
            <Link to="/showRequests">Check Requests</Link>
            <Link to="/showHistory">Show Requests History</Link>
            </div>
        </Link>
        </li>
        <li>
        <Link className="active delete " to="/" onClick={Logout}>
            <div className="icon">
            <LogoutIcon />
            </div>
            <span>LogOut</span>
        </Link>
        </li>
    </ul>
    </div>
  );
}

export default Sidebar;
