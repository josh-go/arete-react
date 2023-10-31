import { useEffect, useState, useContext } from 'react';
import { Container, Table, Tab, Tabs } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import UpdateProduct from '../components/UpdateProduct';
import ArchiveProduct from '../components/ArchiveProduct';
import AddProduct from '../components/AddProduct';
import AdminProfile from '../components/AdminProfile'; // Import the correct component

export default function AdminDashboard({ productsData }) {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/getproducts`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });

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
    user.isAdmin === true ? (
      <>
        <Tabs
          defaultActiveKey="dashboard"
          id="justify-tab-products"
          className="mb-3"
          justify
        >
          <Tab eventKey="new-product" title="New Products">
            <AddProduct fetchData={fetchData} />
          </Tab>
          <Tab eventKey="dashboard" title="Dashboard">
            <Container>
              <h1 className="text-center my-4">Admin Dashboard</h1>
              <Table striped bordered hover responsive>
                <thead>
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.productName}</td>
                      <td>{product.productDescription}</td>
                      <td>{product.productPrice}</td>
                      <td className={product.productIsActive ? 'text-success' : 'text-danger'}>
                        {product.productIsActive ? 'Available' : 'Unavailable'}
                      </td>
                      <td>
                        <UpdateProduct product={product._id} fetchData={fetchData} />
                      </td>
                      <td>
                        <ArchiveProduct product={product._id} productIsActive={product.productIsActive} fetchData={fetchData} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </Tab>
          <Tab eventKey="admin-profile" title="Profiles">
            <AdminProfile fetchData={fetchData} /> {/* Use the correct component here */}
          </Tab>
        </Tabs>
      </>
    ) : (
      <Navigate to="/" />
    )
  );
}
