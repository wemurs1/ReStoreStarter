import { useState } from 'react';

function App() {
  const [products, setProducts] = useState([
    { name: 'product1', price: 100.0 },
    { name: 'product2', price: 200.0 },
  ]);

  function addProduct() {
    setProducts((prevstate) => [
      ...prevstate,
      {
        name: 'product' + (prevstate.length + 1),
        price: prevstate.length * 100 + 100,
      },
    ]);
  }

  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add product</button>
    </div>
  );
}

export default App;
