import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AdminUser({user, userIsAdmin, fetchData}) {

	const adminAddToggle = (userId) => {
	  let token = localStorage.getItem("token");

	  fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/add`, {
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
	            text: "User is now an admin"
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
	  	const adminRemoveToggle = (userId) => {
	  	  let token = localStorage.getItem("token");

	  	  fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/remove`, {
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
	  	          text: "User is no longer an admin"
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
		  {userIsAdmin !== false ? 

		  <Button variant="danger" size="sm" onClick={() => adminAddToggle(user)}>
		            Add Admin
		          </Button>
		   : 
		   <Button variant="success" size="sm" onClick={() => adminRemoveToggle(user)}>
		           Remove Admin
		          </Button>
		    
		  }
		</>
		)

}