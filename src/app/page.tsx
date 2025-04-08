"use client";
import { useState } from "react";
import Image from "next/image";
import FetchTodo from "./components/todos";
import AddProductForm from "./components/AddProductForm";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
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
          <AddProductForm />
        </div>
      )}

      {/* Product Listing */}
      <main>
        <FetchTodo searchTerm={searchTerm} />
      </main>
    </div>
  );
}
