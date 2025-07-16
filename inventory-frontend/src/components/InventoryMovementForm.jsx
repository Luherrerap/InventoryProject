import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Collapse } from 'react-bootstrap';

const InventoryMovementForm = () => {
  const [movement, setMovement] = useState({
    productCode: '',
    type: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    comments: '',
  });

  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // Para expandir comentarios

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error loading products:', err));

    axios.get('http://localhost:8080/movements')
      .then(res => setHistory(res.data.reverse()))
      .catch(err => console.error('Error loading movements:', err));
  }, []);

  const handleChange = (e) => {
    setMovement({ ...movement, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!movement.productCode || !movement.type || movement.quantity <= 0) {
      alert('Please fill out required fields correctly');
      return;
    }

    try {
      await axios.post('http://localhost:8080/movements', {
        ...movement,
        quantity: parseInt(movement.quantity),
      });

      alert('✅ Movement recorded');
      setMovement({
        productCode: '',
        type: '',
        quantity: '',
        date: new Date().toISOString().split('T')[0],
        comments: '',
      });

      const updated = await axios.get('http://localhost:8080/movements');
      setHistory(updated.data.reverse());

    } catch (err) {
      console.error(err);
      alert('❌ Error saving movement');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-white mb-4">📥 Inventory Movement</h2>

      <form onSubmit={handleSubmit} className="border rounded p-4 bg-light shadow">
        <div className="mb-3">
          <label className="form-label">Product</label>
          <select
            className="form-select"
            name="productCode"
            value={movement.productCode}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Product --</option>
            {products.map((prod) => (
              <option key={prod.code} value={prod.code}>
                {prod.name} ({prod.code})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Movement Type</label>
          <select
            className="form-select"
            name="type"
            value={movement.type}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="entrada">Entrada</option>
            <option value="ajuste_positivo">Ajuste Positivo</option>
            <option value="ajuste_negativo">Ajuste Negativo</option>
            <option value="devolucion">Devolución</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            min="1"
            className="form-control"
            name="quantity"
            value={movement.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={movement.date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Comments</label>
          <textarea
            className="form-control"
            name="comments"
            value={movement.comments}
            onChange={handleChange}
            rows="2"
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 fw-bold">
          💾 Save Movement
        </button>
      </form>

      {/* Historial */}
      <div className="mt-5">
        <h4 className="text-center text-white mb-4">📄 Movement History</h4>
        {history.length === 0 ? (
          <p className="text-muted">No records yet.</p>
        ) : (
          <table className="table table-striped mt-3">
            <thead className="table-secondary">
              <tr>
                <th>Product</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((mov, i) => (
                <React.Fragment key={i}>
                  <tr>
                    <td>{mov.productCode}</td>
                    <td className={
                      mov.type === 'entrada' || mov.type === 'ajuste_positivo' || mov.type === 'devolucion'
                        ? 'text-success fw-semibold'
                        : 'text-danger fw-semibold'
                    }>
                      {mov.type.replace('_', ' ')}
                    </td>
                    <td>{mov.quantity}</td>
                    <td>{new Date(mov.date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      >
                        🔍 View Comment
                      </button>
                    </td>
                  </tr>
                  {openIndex === i && (
                    <tr>
                      <td colSpan="5" className="bg-light text-secondary">
                        <strong>Comment:</strong>{' '}
                        {mov.comments?.trim()
                          ? mov.comments
                          : <em>No comment provided</em>}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InventoryMovementForm;

