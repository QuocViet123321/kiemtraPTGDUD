import React, { useEffect, useState } from "react";
import data from "../data";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    setProducts(data);
  }, []);

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const newId = Date.now(); // id đơn giản
    const productToAdd = {
      id: newId,
      name: newProduct.name,
      price: parseInt(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
    };

    setProducts([...products, productToAdd]);

    // reset form
    setNewProduct({ name: "", price: "", category: "", stock: "" });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Danh sách sản phẩm</h1>

      {/* Form thêm sản phẩm */}
      <div className="bg-gray-100 p-4 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm mới</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Giá"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            placeholder="Danh mục"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            placeholder="Tồn kho"
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-1"><strong>Giá:</strong> {product.price.toLocaleString()}đ</p>
            <p className="text-gray-700 mb-1"><strong>Danh mục:</strong> {product.category}</p>
            <p className="text-gray-700 mb-4"><strong>Tồn kho:</strong> {product.stock}</p>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Xoá
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
