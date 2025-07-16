import React, { useState } from 'react';
import { createProduct } from '../api/productService';
import './ProductForm.css';

const categories = [
    'Bebidas',
    'Aseo',
    'Enlatados',
    'Lácteos',
    'Verduras',
    'Carnes',
    'Granos',
    'Dulces',
];

const suppliers = [
    'Distribuidora El Campesino',
    'Almacenes Mayoristas SAS',
    'Proveedores Antioquia',
    'Bodegas Medellín',
    'Central de Abastos',
];

const ProductForm = () => {
const [product, setProduct] = useState({
    code: '',
    name: '',
    description: '',
    category: '',
    supplier: '',
    salePrice: '',
    unit: '',
    stock: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevenir valores negativos o no válidos
    if ((name === 'salePrice' || name === 'stock') && Number(value) < 0) return;

    setProduct({ ...product, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const preparedProduct = {
        ...product,
        salePrice: parseFloat(product.salePrice),
        stock: parseInt(product.stock),
        };

        await createProduct(preparedProduct);
        alert('✅ Product saved successfully!');
        setProduct({
            code: '',
            name: '',
            description: '',
            category: '',
            supplier: '',
            salePrice: '',
            unit: '',
            stock: '',
        });
    } catch (err) {
        if (
            err.message.includes('code already exists') ||
            err.message.includes('Product code already exists')
        ) {
            alert('❌ The code is already in use. Please choose a different one.');
        } else {
            alert('❌ Error saving product. Please check the data.');
        }
        console.error(err);
    }
};

return (
    <div className="form-background">
        <div className="product-form-container shadow-lg">
        <h2 className="text-center mb-4">📦 Register Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Code */}
            <div className="mb-3">
            <label className="form-label fw-semibold">Code</label>
            <input
                type="text"
                maxLength={20}
                className="form-control rounded-pill shadow-sm"
                name="code"
                value={product.code}
                onChange={handleChange}
                required
            />
            </div>

          {/* Name */}
            <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
                type="text"
                maxLength={50}
                className="form-control rounded-pill shadow-sm"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
            />
            </div>

          {/* Description */}
            <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <input
                type="text"
                maxLength={100}
                className="form-control rounded-pill shadow-sm"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
            />
            </div>

          {/* Category */}
            <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <select
                className="form-control rounded-pill shadow-sm"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
            >
            <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
                ))}
            </select>
            </div>

          {/* Supplier */}
            <div className="mb-3">
            <label className="form-label fw-semibold">Supplier</label>
            <select
                className="form-control rounded-pill shadow-sm"
                name="supplier"
                value={product.supplier}
                onChange={handleChange}
                required
            >
                <option value="">-- Select Supplier --</option>
                {suppliers.map((prov) => (
                <option key={prov} value={prov}>
                    {prov}
                </option>
                ))}
            </select>
            </div>

          {/* Sale Price */}
            <div className="mb-3">
            <label className="form-label fw-semibold">Sale Price</label>
            <input
                type="number"
                min="0"
                step="0.01"
                max="999999"
                className="form-control rounded-pill shadow-sm"
                name="salePrice"
                value={product.salePrice}
                onChange={handleChange}
                required
            />
            </div>

          {/* Unit */}
            <div className="mb-3">
            <label className="form-label fw-semibold">Unit</label>
            <input
                type="text"
                maxLength={15}
                className="form-control rounded-pill shadow-sm"
                name="unit"
                value={product.unit}
                onChange={handleChange}
                required
            />
            </div>

          {/* Stock */}
            <div className="mb-3">
            <label className="form-label fw-semibold">Current Stock</label>
            <input
                type="number"
                min="0"
                max="100000"
                className="form-control rounded-pill shadow-sm"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
            />
            </div>

            <button type="submit" className="btn btn-dark w-100 rounded-pill fw-bold">
            💾 Save Product
            </button>
        </form>
        </div>
    </div>
);
};

export default ProductForm;
