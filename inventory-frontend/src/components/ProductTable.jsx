import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortAsc, setSortAsc] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

useEffect(() => {
    axios.get('http://localhost:8080/products')
        .then(res => setProducts(res.data))
        .catch(err => console.error(err));
}, []);

    const handleSort = (field) => {
    if (sortField === field) {
        setSortAsc(!sortAsc);
    } else {
        setSortField(field);
        setSortAsc(true);
    }
};

    const filteredProducts = products
    .filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) =>
        categoryFilter ? p.category === categoryFilter : true
    )
    .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
        return 0;
    });

    const categories = [...new Set(products.map(p => p.category))];

    return (
    <div className="container mt-4">
        <h2 className="text-center mb-4 text-white">📦 Inventory Stock</h2>

      {/* Filtros */}
    <div className="d-flex justify-content-between mb-3">
        <input
            type="text"
            placeholder="🔍 Search by name or code"
            className="form-control w-50 me-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
            className="form-select w-25"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
        >
            <option value="">All Categories</option>
            {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
        ))}
        </select>
    </div>

      {/* Tabla */}
        <table className="table table-hover shadow-sm">
        <thead className="table-light">
        <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('code')}>Code</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('name')}>Name</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('category')}>Category</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('stock')}>Stock</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('salePrice')}>Price</th>
            <th>Details</th>
        </tr>
        </thead>
        <tbody>
            {filteredProducts.map(prod => (
            <tr key={prod.code} className={prod.stock < 10 ? 'table-warning' : ''}>
            <td>{prod.code}</td>
            <td>{prod.name}</td>
            <td>{prod.category}</td>
            <td>{prod.stock}</td>
            <td>${prod.salePrice.toFixed(2)}</td>
            <td>
                <button
                    className="btn btn-outline-info btn-sm"
                    onClick={() => setSelectedProduct(prod)}
                >
                    🔍 View
                </button>
                </td>
            </tr>
        ))}
        {filteredProducts.length === 0 && (
            <tr>
                <td colSpan="6" className="text-center text-muted">
                    No products found.
                </td>
            </tr>
        )}
        </tbody>
    </table>

      {/* Modal para detalles */}
        <Modal show={selectedProduct !== null} onHide={() => setSelectedProduct(null)}>
        <Modal.Header closeButton>
        <Modal.Title>🧾 Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedProduct && (
            <ul className="list-group">
                <li className="list-group-item"><strong>Code:</strong> {selectedProduct.code}</li>
                <li className="list-group-item"><strong>Name:</strong> {selectedProduct.name}</li>
                <li className="list-group-item"><strong>Description:</strong> {selectedProduct.description}</li>
                <li className="list-group-item"><strong>Category:</strong> {selectedProduct.category}</li>
                <li className="list-group-item"><strong>Supplier:</strong> {selectedProduct.supplier}</li>
                <li className="list-group-item"><strong>Unit:</strong> {selectedProduct.unit}</li>
                <li className="list-group-item"><strong>Stock:</strong> {selectedProduct.stock}</li>
                <li className="list-group-item"><strong>Price:</strong> ${selectedProduct.salePrice.toFixed(2)}</li>
            </ul>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedProduct(null)}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
    </div>
    );
};

export default ProductTable;
