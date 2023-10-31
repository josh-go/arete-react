import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({product, productIsActive, fetchData}) {

	const archiveToggle = (productId) => {
	  let token = localStorage.getItem("token");

	  fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
	    method: "PUT",
	    headers: {
	      "Content-Type": "application/json",
	      Authorization: `Bearer ${token}`
	    }
	  })
	      .then((res) => res.json())
	      .then((data) => {
	        if (data === true) {
	          Swal.fire({
	            title: 'Success!',
	            icon: "success",
	            text: "Product is Now Unavailable"
	          });
	          fetchData();
	        } else {
	          Swal.fire({
	            title: 'Error!',
	            icon: "error",
	            text: "Please try again"
	          });
	          fetchData()
	        }
	      })
	      .catch((error) => {
	        console.log(error.message);
	      });
	  };
	  	const activateToggle = (productId) => {
	  	  let token = localStorage.getItem("token");

	  	  fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
	  	    method: "PUT",
	  	    headers: {
	  	      "Content-Type": "application/json",
	  	      Authorization: `Bearer ${token}`
	  	    }
	  	  })
	  	    .then((res) => res.json())
	  	    .then((data) => {
	  	      if (data === true) {
	  	        Swal.fire({
	  	          title: 'Success!',
	  	          icon: "success",
	  	          text: "Product is Now Avalable"
	  	        });
	  	        fetchData();
	  	      } else {
	  	        Swal.fire({
	  	          title: 'Error!',
	  	          icon: "error",
	  	          text: "Please try again"
	  	        });
	  	        fetchData()
	  	      }
	  	    })
	  	    .catch((error) => {
	  	      console.log(error.message);
	  	    });

	  	    fetch(`${process.env.REACT_APP_API_URL}/your-endpoint`)
	  	      .then((res) => {
	  	        if (!res.ok) {
	  	          throw new Error(`HTTP error! Status: ${res.status}`);
	  	        }
	  	        return res.json();
	  	      })
	  	      .then((data) => {
	  	        // Handle successful response
	  	      })
	  	      .catch((error) => {
	  	        console.error(error);
	  	      });
	  	  }

	return(
		<>
		  {productIsActive !== false ? 

		  <Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>
		            Archive
		          </Button>
		   : 
		   <Button variant="success" size="sm" onClick={() => activateToggle(product)}>
		            Activate
		          </Button>
		    
		  }
		</>
		)

}