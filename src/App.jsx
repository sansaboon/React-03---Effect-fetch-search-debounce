import React, { useState } from "react";
import ProductList from "./ProductList";

const appStyles = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  textAlign: 'center'
};

const titleStyles = {
  fontSize: '2rem',
  color: '#333'
};

const inputStyles = {
  width: '100%',
  maxWidth: '400px',
  padding: '10px',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginTop: '10px',
  boxSizing: 'border-box'
};

const App = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div style={appStyles}>
      <h1 style={titleStyles}>Product Search</h1>
      <input
        type="text"
        style={inputStyles}
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
      />
      <ProductList search={search} />
    </div>
  );
}

export default App;
