import React  from 'react'
import '../../Style/AdminHome.css'
import SecurityIcon from '@mui/icons-material/Security';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import GradeIcon from '@mui/icons-material/Grade';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Sidebar from '../../component/Sidebar';
import CampaignIcon from '@mui/icons-material/Campaign';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../../2003822.png"
import img2 from "../../microsoft-teams-study-room-virtual-background-zwz72nuegwf4mlmz.jpg"
import  { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
function Page() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
  <div className='parent'>
  <Sidebar />
    <div className='content'>
    
    <Breadcrumb  >
      <Breadcrumb.Item href="/src/pages/Admin/AdminHome.js" style={{margin:"0px"}}>Home</Breadcrumb.Item>
      
    </Breadcrumb>
    <Carousel >
      <Carousel.Item style={{height:"300px"}}>
        <img
          className="d-block w-100"
          src={img2}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 style={{color:"white",fontSize:"40px"}}>Edara Management</h3>
          <p style={{color:"white",fontSize:"20px"}}>If there's no way...Create it</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:"300px"}}>
        <img
          className="d-block w-100"
          src={img1}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 style={{color:"white",fontSize:"40px"}}>Edara Management</h3>
          <p style={{color:"white",fontSize:"20px"}}>If there's no way...Create it</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      <div style={{display:"flex",width:"100%",height:"200px" }}>
      <div className="card">
        <div className="container">
        <h1 >Warehouse <div style={{marginLeft:"30%",marginTop:"10px" ,display:"inline",color:"darkblue"}}><WarehouseRoundedIcon style={{fontSize:"35px"}}/></div></h1> 
        <p style={{color:"#0066ff",fontSize:"25px"}}> Warehouse</p> 
        </div>
      </div>
      <div className="card">
        <div className="container">
        <h1 >Products <div style={{marginLeft:"40%",marginTop:"10px" ,display:"inline",color:"grey"}}><ProductionQuantityLimitsIcon style={{fontSize:"35px"}}/></div></h1> 
        <p style={{color:"#0066ff",fontSize:"25px"}}> products</p> 
        </div>
      </div>
      <div className="card">
        <div className="container">
        <h1 >Supervisor <div style={{marginLeft:"30%",marginTop:"10px" ,display:"inline", color:"green"}}><SupervisorAccountIcon style={{fontSize:"35px"}}/></div></h1> 
        <p style={{color:"#0066ff",fontSize:"25px"}}>Supervisor </p> 
        </div>
      </div>
      </div>
      <div style={{width:"70%" ,marginLeft:"20px",marginTop:"20px" ,backgroundColor:"white", padding:"20px",height:"32%",paddingTop:"20PX"}}>
        <h2 className="heading">User Rating <GradeIcon style={{marginLeft:"10px",color:"yellow"}}/>
        <GradeIcon style={{color:"yellow"}}/>
        <GradeIcon style={{color:"yellow"}}/>
        <GradeIcon style={{color:"yellow"}}/>
        <GradeIcon /></h2>
        
      <p>4.1 average based on 254 reviews.</p>


<div className="row">
  <div className="side">
    <div>5 star</div>
  </div>
  <div className="middle">
    <div className="bar-container">
      <div className="bar-5"></div>
    </div>
  </div>
  <div className="side right">
    <div>150</div>
  </div>
  <div className="side">
    <div>4 star</div>
  </div>
  <div className="middle">
    <div className="bar-container">
      <div className="bar-4"></div>
    </div>
  </div>
  <div className="side right">
    <div>63</div>
  </div>
  <div className="side">
    <div>3 star</div>
  </div>
  <div className="middle">
    <div className="bar-container">
      <div className="bar-3"></div>
    </div>
  </div>
  <div className="side right">
    <div>15</div>
  </div>
  <div className="side">
    <div>2 star</div>
  </div>
  <div className="middle">
    <div className="bar-container">
      <div className="bar-2"></div>
    </div>
  </div>
  <div class="side right">
    <div>6</div>
  </div>
  <div className="side">
    <div>1 star</div>
  </div>
  <div className="middle">
    <div className="bar-container">
      <div className="bar-1"></div>
    </div>
  </div>
  <div className="side right">
    <div>20</div>
  </div>
</div>
  </div>
  <div >
    <h1 style={{fontFamily:"cursive",textAlign:"center",marginTop:"100px"}}>We Provide <b>Best Services</b></h1>
    <div style={{display:"flex",width:"100%",height:"230px" }}>
      <div className="card2">
        <div className="container2">
        <h1 style={{textAlign:"center",fontFamily:"monospace",fontSize:"30px",marginTop:"15px"}} >Security </h1> 
        <div style={{marginLeft:"40%",marginTop:"25px" ,color:"rgba(0, 0, 255, 0.943)"}}><SecurityIcon style={{fontSize:"80px"}}/></div>
        </div>
        <Button variant="primary" onClick={handleShow} style={{marginLeft:"40%",marginTop:"20px"}}>
        Read more
      </Button>

      <Offcanvas show={show} onHide={handleClose} style={{backgroundColor:"#f6f5f1"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{color:"orangered",fontSize:"25px"}}>Security</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        When you use our services, you’re trusting us with your information. We understand this is a big responsibility and work hard to protect your information and put you in control
        </Offcanvas.Body>
      </Offcanvas>
      </div>
      <div className="card2">
        <div className="container2">
        <h1 style={{textAlign:"center",fontFamily:"monospace",fontSize:"30px",marginTop:"15px"}} >Marketing </h1> 
        <div style={{marginLeft:"40%",marginTop:"25px" ,color:"grey",}}><CampaignIcon style={{fontSize:"80px"}}/></div>
        </div>
        <Button variant="primary" onClick={handleShow1} style={{marginLeft:"40%",marginTop:"20px"}}>
        Read more
      </Button>

      <Offcanvas show={show1} onHide={handleClose1} style={{backgroundColor:"#f6f5f1"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{color:"orangered",fontSize:"25px"}}>Marketing</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{color:"grey"}}>
        Marketing as a discipline involves all the actions a company undertakes to draw in customers and maintain relationships with them. Networking with potential or past clients is part of the work too, and may include writing thank you emails, playing golf with prospective clients, returning calls and emails quickly, and meeting with clients for coffee or a meal.

      Our Role, We seeks to match a company's products and services to customers who want access to those products. Matching products to customers ultimately ensures profitability.
        </Offcanvas.Body>
      </Offcanvas>
      </div>
      <div className="card2">
        <div className="container2">
        <h1 style={{textAlign:"center",fontFamily:"monospace",fontSize:"30px",marginTop:"15px"}} >Quality </h1> 
        <div style={{marginLeft:"40%",marginTop:"25px" ,color:"black"}}><CameraEnhanceIcon style={{fontSize:"80px"}}/></div>   
        <Button variant="primary" onClick={handleShow2} style={{marginLeft:"40%",marginTop:"20px"}}>
        Read more
      </Button>

      <Offcanvas show={show2} onHide={handleClose2} style={{backgroundColor:"#f6f5f1"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{color:"orangered",fontSize:"25px"}}>Quality</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        Most bloggers and website designers understand how difficult it can be to attract visitors to a website. In fact, most websites have just moments to attract potential readers. Several factors contribute to how well a website attracts its readers,
        We will help u to provide them.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
      </div>
      </div>
      </div>
  </div>
  </div>
  
  
 

)

}


export default Page;