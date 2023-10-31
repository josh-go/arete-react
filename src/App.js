// Main component of the site

import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import './App.css';

// Import the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import React Router DOM
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

// Import React Bootstrap
import {Container} from 'react-bootstrap'

// Pages
import AppNavBar from './components/AppNavBar'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Error from './pages/Error'
import ProductCatalog from './pages/ProductCatalog'
import ProductItem from './pages/ProductItem'

function App() {
 const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

 const unsetUser = () => {
   localStorage.clear();
 }

 useEffect(() => {
   console.log(user);
   console.log(localStorage);

   fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
     headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`
     }
   })
   .then(res => res.json())
   .then(data => {
     console.log(data);

         if(typeof data._id !== "undefined"){

           setUser({
             id: data._id,
             isAdmin: data.isAdmin
           })
         } else {

           setUser({
             id: null,
             isAdmin: null
           })
         }

       })

     });


  return (
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <Container>
          <AppNavBar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:productId" element={<ProductItem />} />          

          <Route path="*" element={<Error />} />
          </Routes>
          </Container>
        </Router>
      </UserProvider>
    );
};

export default App;
