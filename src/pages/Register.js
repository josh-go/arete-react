import { useState, useEffect,  useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import {Navigate} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2'


export default function Register() {
		const {user}= useContext(UserContext)

		const [username, setUsername] = useState("");
		const [email, setEmail] = useState("");
		const [password, setPassword] = useState("");
		const [confirmPassword, setConfirmPassword] = useState("");

		const [isActive, setIsActive] = useState(true);

		console.log(username);
		console.log(email);
		console.log(password);

		function registerUser(e) {

			e.preventDefault();

			fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({

					username: username,
					email: email,
					password:password

					})
				})
				.then(res => res.json())
				.then(data => {
					console.log(data);

					if(data){

						setUsername("");
						setEmail("");
						setPassword("");
						setConfirmPassword("");

						Swal.fire({
							title: "Registration Successful",
							icon: "success",
							text: "Thank for registering to Arete Supply."
						})
					} else{
						Swal.fire({
							title: "Registration Failed",
							icon: "error",
							text: "Please try again later."
						})
					}
				})
			}

			useEffect(() => {
				if(
					(username !== "" &&
					email !== "" &&
					password !== "" &&
					confirmPassword !== "") &&
					(password === confirmPassword)
					){
			setIsActive(true);
			} else {
			setIsActive(false);
			}

		}, [username, email, password, confirmPassword]);

	return((user.id == null) ?
		<>
		<Form onSubmit={(e) => registerUser(e)}>
			<Form.Group>
				<Form.Label>Username:</Form.Label>
				<Form.Control 
					type="text" 
					placeholder="Enter Username" 
					required
					value={username}
					onChange={e => {setUsername(e.target.value)}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Email:</Form.Label>
				<Form.Control 
					type="email" 
					placeholder="Enter Email" 
					required 
					value={email}
					onChange={e => {setEmail(e.target.value)}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Enter Password." 
					required 
					value={password}
					onChange={e => {setPassword(e.target.value)}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Confirm Password:</Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Confirm Password." 
					required 
					value={confirmPassword}
					onChange={e => {setConfirmPassword(e.target.value)}}
				/>
			</Form.Group>

			{ isActive ?
				<Button variant="primary" type="submit" >Submit</Button>
				:
				<Button variant="danger" type="submit" disabled>Submit</Button>

			}
		</Form>
		</>
		:
		<Navigate to='/login' />
		)
}
