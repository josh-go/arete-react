import { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import UserContext from '../UserContext';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/getactiveproducts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard productProp={product} userProp={user} key={product._id} />
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </>
  );
}
