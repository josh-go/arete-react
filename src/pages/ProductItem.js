import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductItem() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const isAdmin = user.isAdmin;

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [orderTotalAmount, setOrderTotalAmount] = useState(0);


  const [count, setCount] = useState(0);
  const [stock, setStock] = useState(20);

  const order = (productId, count) => {
  	const productQuantity = count;
  	const orderTotalAmount = productPrice * count;


    const orderData = {
      productId: productId,
      productQuantity: count,
      orderTotalAmount: productPrice * count,
    };



fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  body: JSON.stringify(orderData),
})
  .then((res) => {
    console.log('Response from server:', res);
    return res.json();
  })
  .then((data) => {
    console.log('Data received from server:', data);
    if (data.message === 'Order Successful') {
      Swal.fire({
        title: 'Order Successful',
        icon: 'success',
        text: 'You have successfully ordered this product.',
      });
      navigate('/products');
      setProductQuantity(productQuantity);
      setOrderTotalAmount(orderTotalAmount);
    } else {
      Swal.fire({
        title: 'Something went wrong',
        icon: 'error',
        text: 'Please try again.',
      });
    }
  })
  .catch((error) => {
    console.error('Error submitting order:', error);
  });
}


  function orderMore() {
    if (stock > 0) {
      setCount(count + 1);
      setStock(stock - 1);
    } else {
      Swal.fire({
        title: 'Order Full',
        icon: 'error',
        text: 'Order is full. Please try other products.',
      });
    }
  }

  function orderLess() {
    if (count > 0) {
      setCount(count - 1);
      setStock(stock + 1);
    } else {
      Swal.fire({
        title: 'Order Empty',
        icon: 'error',
        text: 'Order is empty. Please indicate the number of items in your order.',
      });
    }
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductName(data.productName);
        setProductDescription(data.productDescription);
        setProductPrice(data.productPrice);
      });
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header bg="dark" as="h2" className="text-center">
              {productName}
            </Card.Header>
            <Card.Body>
              <Card.Title>Description:</Card.Title>
              <Card.Text>{productDescription}</Card.Text>
              <Card.Title>Price:</Card.Title>
              <Card.Text>PhP {productPrice}</Card.Text>
              {!isAdmin ? (
                user.id !== null ? (
                  <>
                    <Container>
                      <Row md={3}>
                        <Button variant="dark" className="text-center text-light" onClick={orderLess}>
                          -
                        </Button>
                        <Card.Text>{count}</Card.Text>
                        <Button variant="dark" className="text-center text-light" onClick={orderMore}>
                          +
                        </Button>
                      </Row>
                      <Row>
                        <Button variant="primary" onClick={() => order(productId, count)}>
                          Order
                        </Button>
                      </Row>
                      <Card.Title>Total Price:</Card.Title>
                      <Card.Text>PhP {productPrice * count}</Card.Text>
                    </Container>
                  </>
                ) : (
                  <Link className="btn btn-danger btn-block" to="/login">
                    Log in to Order
                  </Link>
                )
              ) : (
                <>
                  <Container>
                    <Row md={3}>
                      <Button variant="dark" className="text-center text-light" onClick={orderMore} disabled>
                        +
                      </Button>
                      <Card.Text>Not available</Card.Text>
                      <Button variant="dark" className="text-center text-light" onClick={orderLess} disabled>
                        -
                      </Button>
                    </Row>
                    <Row>
                      <Link className="btn btn-danger btn-block" to="/products">
                        Go back
                      </Link>
                    </Row>
                  </Container>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

