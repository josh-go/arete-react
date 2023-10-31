import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function AddProduct({product, fetchData}){
	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	// State hooks for values of the products 
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productPrice, setProductPrice] = useState(0);

	const [productIsActive, setProductIsActive] = useState(true);

	function addProduct(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/add-product`, {
		    method: "POST",
		    headers: {
		        "Content-Type": "application/json",
		        "Authorization": `Bearer ${localStorage.getItem("token")}`
		    },
		    body: JSON.stringify({
		        productName: productName,
		        productDescription: productDescription,
		        productPrice: productPrice,
		        productIsActive: productIsActive
		           })
		       })

			    .then(res => res.json())
			    .then(data => {

			        if(data){
			            Swal.fire({
			                icon: "success",
			                title: "Product Added"
			            })

			            navigate("/admin");
			        } else {
			            Swal.fire({
			                icon: "error",
			                title: "Unsuccessful Product Creation",
			                text: data.message
			            })
			        }
			    })

			    setProductName("");
			    setProductDescription("");
			    setProductPrice(0);
			    setProductIsActive(true)


			}
	return(
		(user.isAdmin === true) ?
		<>
		<Container>
		    <h1 className='text-center mt-5'>Add Product</h1>
		    <Form onSubmit={(e) => addProduct(e)} >
		        <Form.Group className='mb-3 mt-3'>
		            <Form.Label>Name:</Form.Label>
		            <Form.Control
		                type="text"
		                placeholder="Enter Product Name"
		                required
		                value={productName}
		                onChange={e => { setProductName(e.target.value) }}
		            />
		        </Form.Group>
		        <Form.Group className='mb-3 mt-3'>
		            <Form.Label>Description:</Form.Label>
		            <Form.Control
		                type="text"
		                placeholder="Enter Product Description"
		                required
		                value={productDescription}
		                onChange={e => { setProductDescription(e.target.value) }}
		            />
		        </Form.Group>
		        <Form.Group className='mb-3 mt-3'>
		            <Form.Label>Price:</Form.Label>
		            <Form.Control
		                type="text"
		                placeholder="Enter Product Price"
		                required
		                value={productPrice}
		                onChange={e => { setProductPrice(parseInt(e.target.value)) }}
		            />
		        </Form.Group>

		        {productIsActive ?
		            <Button variant="primary" type="submit" >Submit</Button>
		            :
		            <Button variant="danger" type="submit" disabled>Submit</Button>
		        } 
		    </Form>
		</Container>
		</>
		:
		<Navigate to="/" />

		)
}