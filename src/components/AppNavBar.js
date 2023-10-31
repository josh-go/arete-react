import { useContext} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import {NavLink} from "react-router-dom"
import UserContext from '../UserContext';

export default function AppNavBar(){
	const { user } = useContext(UserContext);

	console.log(user);

	return(
		<Navbar bg="light" expand="lg">
		<Container fluid>
		<Navbar.Brand href="#home">Arete Supply</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav"/>
		<Navbar.Collapse id="basic-navbar-nav">
		<Nav className="ms-auto">
		<Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
		<Nav.Link as={NavLink} to="/products" exact>Catalog</Nav.Link>
		
		{(user.id !== null) ?
				(user.isAdmin) ?
				<>
				<Nav.Link as={NavLink} to="/admin" exact>Admin Dashboard</Nav.Link> 
				<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
				</>
				:
				<>
				{/*<Nav.Link as={NavLink} to="/profile" exact>Profile</Nav.Link>*/}
				<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
				</>
				:
				<>
				<Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
				<Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
				</>
		}
			</Nav>
			</Navbar.Collapse>
			</Container>
			</Navbar>
		)	
}

