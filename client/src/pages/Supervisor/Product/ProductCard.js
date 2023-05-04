import '../../../Style/ProductCard.css'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useParams,useNavigate } from "react-router-dom";
const ProductCard = (props) => {
  let { id } = useParams();
    return ( 
        <Card style={{ width: '290px' }}>
      <Card.Img variant="top" src={props.photo} />
      <Card.Body className='text-center'>
        <Card.Title >{props.name}</Card.Title>
        <Card.Text>
          {props.descritption}
        </Card.Text>
        <Link to={"/request/"+props.id} className="btn btn-danger mx-4">Request</Link>
      </Card.Body>
    </Card>
     );
}
 
export default ProductCard;