import axios from 'axios';

const API_URL = 'http://localhost:8080/products';

/**
 * @param {Object} product - Producto a registrar
 */
export const createProduct = async (product) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (error) {
    
    if (
        error.response &&
        error.response.status === 400 &&
        typeof error.response.data === 'string' &&
        error.response.data.includes('code already exists')
    ) {
        throw new Error('❌ The product code already exists.');
    }

    throw new Error('❌ Could not save product. Check your data or server.');
    }
};



export const getAllProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

/**

 * @param {string} code - Código a verificar
 */
export const checkCodeExists = async (code) => {
    const products = await getAllProducts();
    return products.some((p) => p.code === code);
};


export const getProducts = async () => {
    const response = await axios.get('http://localhost:8080/products');
    return response.data;
};
