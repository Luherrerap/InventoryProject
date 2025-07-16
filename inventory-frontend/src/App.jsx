import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import InventoryMovementForm from './components/InventoryMovementForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="main-wrapper">
        <Navbar />
        <div className="container py-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<ProductForm />} />
            <Route path="/stock" element={<ProductTable />} />
            <Route path="/movements" element={<InventoryMovementForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <div className="container-fluid">
      <Link className="navbar-brand fw-bold" to="/">🧾 InventoryPro</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/form">Add Product</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/stock">View Stock</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/movements">Movements</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const Home = () => (
  <div className="home-hero">
    <div className="overlay d-flex justify-content-center align-items-center">
      <div className="card p-5 shadow-lg text-center bg-white bg-opacity-75" style={{ maxWidth: '500px' }}>
        <h1 className="mb-4 text-dark fw-bold">📊 Inventory Management</h1>
        <p className="mb-4 text-secondary">
          Manage your inventory efficiently — add new products or check your current stock.
        </p>
        <div className="d-grid gap-3">
          <Link to="/form" className="btn btn-dark btn-lg rounded-pill fw-bold">
            ➕ Add Product
          </Link>
          <Link to="/stock" className="btn btn-secondary btn-lg rounded-pill fw-bold">
            📦 View Stock
          </Link>
          <Link to="/movements" className="btn btn-outline-dark btn-lg rounded-pill fw-bold">
            🔁 Inventory Movements
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default App;
