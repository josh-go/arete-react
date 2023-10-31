import React, { useEffect, useState, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import AdminUser from './AdminUser';

export default function AdminProfile() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isAdmin] = useState(false); // You can use this for specific logic related to isAdmin
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details/all`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
  .then((data) => {
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error('API response is not an array of users:', data);
    }
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
  });

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th colSpan="1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((userData) => (
            <tr key={userData._id}>
              <td>{userData.username}</td>
              <td>{userData.email}</td>
              <td className={userData.isAdmin ? 'text-success' : 'text-danger'}>
                {userData.isAdmin ? 'Administrator' : 'User'}
              </td>
              <td>
                <AdminUser user={userData._id} userIsAdmin={userData.isAdmin} fetchData={fetchData} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}



