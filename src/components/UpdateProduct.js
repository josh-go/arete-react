import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UpdateProduct({product, fetchData}){

	const [productId, setProductId] = useState('');

	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [productPrice, setProductPrice] = useState(0);
	const [productIsActive, setProductIsActive] = useState(true);


	const [showEdit, setShowEdit] = useState(false);

	const openEdit = (productId) => {

		console.log("productId", productId);

		// to still get the actual data from the from
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			// Populate all the input values with product info
			setProductId(data._id);
			setProductName(data.productName);
			setProductDescription(data.productDescription);
			setProductPrice(data.productPrice);
			setProductIsActive(true);
		});

		// Then, open the modal
		setShowEdit(true);

	}

	const closeEdit = () => {
		setShowEdit(false);
		setProductName('');
		setProductDescription('');
		setProductPrice(0);
		setProductIsActive(true);
	}

	// Function to update the product
	const editProduct = (e, productId) => {

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
			method: "PUT",
			headers: {
				'Content-Type': "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
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

			if(data === true){
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Successfully Changed Product Information'
				});

				closeEdit();
				// Trigger the fetchData function from the Products component to render the changes created when updating the course.
				fetchData();
			} else {
				Swal.fire({
					title: "Error!",
					icon: 'error',
					text: 'Please try again'
				});

				closeEdit();
				fetchData();
			}

		})

	}

	return(
				<>
					<Button variant="primary" size="sm" onClick={() => openEdit(product)}>Edit</Button>

					{/*EDIT MODAL*/}
		            <Modal show={showEdit} onHide={closeEdit}>
		                <Form onSubmit={ e => editProduct(e, productId) }>
		                    <Modal.Header closeButton>
		                        <Modal.Title>Edit Product</Modal.Title>
		                    </Modal.Header>
		                    <Modal.Body>    
		                        <Form.Group controlId="productName">
		                            <Form.Label>Name</Form.Label>
		                            <Form.Control 
		                            	type="text" 
		                            	
		                            	value={productName}
		                            	onChange={e => setProductName(e.target.value)}
		                            />
		                        </Form.Group>
		                        <Form.Group controlId="productDescription">
		                            <Form.Label>Description</Form.Label>
		                            <Form.Control 
			                            type="text" 
			                            
			                            value={productDescription}
			                            onChange={e => setProductDescription(e.target.value)}
		                            />
		                        </Form.Group>
		                        <Form.Group controlId="productPrice">
		                            <Form.Label>Price</Form.Label>
		                            <Form.Control 
			                            type="number" 
			                            required
			                            value={productPrice}
			                            onChange={e => setProductPrice(e.target.value)}
		                            />
		                        </Form.Group>
		                    </Modal.Body>
		                    <Modal.Footer>
		                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
		                        <Button variant="success" type="submit">Submit</Button>
		                    </Modal.Footer>
		                </Form>
		            </Modal>

				</>
		)
}