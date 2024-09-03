import React, { useState, useEffect } from 'react';

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


const containerStyles = {
  marginTop: '20px'
};

const textStyles = {
  fontSize: '1.2rem',
  color: '#666'
};

const errorStyles = {
  color: 'red'
};

const listStyles = {
  listStyleType: 'none',
  padding: '0',
  margin: '0'
};

const itemStyles = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginBottom: '10px',
  transition: 'background-color 0.3s',
  cursor: 'pointer'
};

const hoverItemStyles = {
  backgroundColor: '#f8f9fa'
};

const nameStyles = {
  fontSize: '1.2rem',
  margin: '0'
};

const categoryStyles = {
  fontSize: '1rem',
  color: '#777'
};

const priceStyles = {
  fontSize: '1rem',
  color: '#888'
};

const ProductList = ({ search }) => {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]); // State to hold the full list of products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Apply debounce to search term
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setFullData(result.products || []);
        setData(result.products || []); // Initialize data with the full product list
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      
      const filteredData = fullData.filter(product =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setData(filteredData);
    } else {
      
      setData(fullData);
    }
  }, [debouncedSearch, fullData]);

  return (
    <div style={containerStyles}>
      {loading && <p style={textStyles}>Loading...</p>}
      {error && <p style={{ ...textStyles, ...errorStyles }}>Error: {error}</p>}
      {data.length === 0 && !loading && !error && <p style={textStyles}>No products found</p>}
      <ul style={listStyles}>
        {data.map(product => (
          <li
            key={product.id}
            style={itemStyles}
            onMouseOver={e => e.currentTarget.style.backgroundColor = hoverItemStyles.backgroundColor}
            onMouseOut={e => e.currentTarget.style.backgroundColor = ''}
          >
            <h3 style={nameStyles}>{product.title}</h3>
            <p style={categoryStyles}>Category: {product.category}</p>
            <p style={priceStyles}>${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
