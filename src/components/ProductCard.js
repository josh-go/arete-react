import {Row, Col, Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

export default function ProductCard({ productProp, userProp }) {
 
  const { _id, productName, productDescription, productPrice } = productProp;
  const { isAdmin } = userProp;



	return(
		<Row className= "mt-3 mb-3">
			<Col xs={12} md={4}>
				<Card>
					<Card.Body>
						<Card.Title>{productName}</Card.Title>
						<Card.Subtitle>Description</Card.Subtitle>
						<Card.Text>{productDescription}</Card.Text>
						<Card.Subtitle>Price</Card.Subtitle>
						<Card.Text>{productPrice}</Card.Text>
						{!isAdmin ?
						<Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
						:
						<Button variant="danger" disabled>Details</Button>
					}
					</Card.Body>
				</Card>
			</Col>
		</Row>
		)
}

ProductCard.propTypes = {
  productProp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productDescription: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
  }).isRequired,
  userProp: PropTypes.shape({
    isAdmin: PropTypes.bool.isRequired,
  }).isRequired,
};