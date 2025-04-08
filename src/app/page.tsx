"use client";
import { useState } from "react";
import Image from "next/image";
import FetchTodo from "./components/todos";
import AddProductForm from "./components/AddProductForm";
import Link from "next/link";

// Define product type
interface Product {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(true);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  // Function to handle adding a new product
  const handleAddProduct = (product: Product) => {
    setNewProducts([product, ...newProducts]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Product Inventory Dashboard
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search bar */}
          <form onSubmit={handleSubmit} className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search by title or ID"
              className="border p-2 rounded-l w-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            >
              Search
            </button>
          </form>

          {/* Add Product Button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            {showAddForm ? "Hide Form" : "Add New Product"}
          </button>
        </div>
      </header>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="mb-10 relative z-10 bg-white">
          <AddProductForm onAddProduct={handleAddProduct} />
        </div>
      )}

      {/* Newly Added Products Section */}
      {newProducts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Newly Added Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block h-full transition-transform hover:scale-105"
              >
                <div className="border p-4 rounded shadow h-full bg-green-50 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="mb-2">
                    <img
                      src={`https://picsum.photos/id/${
                        product.id % 100
                      }/200/200`}
                      alt={product.title}
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>
                  <div className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold mb-2">
                    Newly Added
                  </div>
                  <h3 className="font-bold">Product ID: {product.id}</h3>
                  <h3 className="text-sm text-gray-500">
                    Category ID: {product.userId}
                  </h3>
                  <h3 className="text-lg font-semibold mt-2 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {product.body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Existing Products */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Product Catalog</h2>
        <FetchTodo searchTerm={searchTerm} />
      </div>
    </div>
  );
}
