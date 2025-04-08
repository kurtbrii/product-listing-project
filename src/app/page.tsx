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
  const [showAddForm, setShowAddForm] = useState(false);
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Product Inventory Dashboard
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
          {/* Search bar */}
          <form onSubmit={handleSubmit} className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search by title or ID"
              className="border border-gray-200 p-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Search
            </button>
          </form>

          {/* Add Product Button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
          >
            {showAddForm ? "Hide Form" : "Add New Product"}
          </button>
        </div>
      </header>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="mb-10 p-5 relative z-10 bg-white rounded-xl shadow-sm border border-gray-100">
          <AddProductForm onAddProduct={handleAddProduct} />
        </div>
      )}

      {/* Newly Added Products Section */}
      {newProducts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-6 bg-green-500 rounded-full mr-2"></span>
            Newly Added Products
          </h2>
          <div className="flex flex-wrap gap-5">
            {newProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="w-[260px] transition-transform hover:scale-105"
              >
                <div className="border border-green-100 p-4 rounded-xl shadow-sm h-full bg-green-50 hover:shadow-md transition-all duration-200">
                  <div className="mb-2 h-32 overflow-hidden rounded-lg">
                    <img
                      src={`https://picsum.photos/id/${
                        product.id % 100
                      }/200/200`}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold mb-2">
                    Newly Added
                  </div>
                  <h3 className="font-bold text-sm text-blue-600">
                    ID: {product.id}
                  </h3>
                  <h3 className="text-xs text-gray-500">
                    Category: {product.userId}
                  </h3>
                  <h3 className="text-sm font-semibold mt-2 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 line-clamp-2">
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
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <span className="w-2 h-6 bg-blue-500 rounded-full mr-2"></span>
          Product Catalog
        </h2>
        <FetchTodo searchTerm={searchTerm} />
      </div>
    </div>
  );
}
