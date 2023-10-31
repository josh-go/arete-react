import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({adminData}) {
	console.log(adminData);
	const {adminTitle, adminContent, adminDestination, adminLabel} = adminData;


	return(
			<Row>
				<Col className="p-5 text-center">
					<h1>{adminTitle}</h1>
					<p>{adminContent}</p>
					<Link className="btn btn-primary" to={adminDestination} >{adminLabel}</Link>
				</Col>
			</Row>
		)
}