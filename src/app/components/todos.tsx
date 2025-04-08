"use client";
// Client component to handle the fetch operation
import { useEffect, useState } from "react";
import Link from "next/link";

interface FetchTodoProps {
  searchTerm: string;
}

function FetchTodo({ searchTerm }: FetchTodoProps) {
  const [todo, setTodo] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        // Limit to first 10 items
        const limitedItems = json.slice(0, 10);
        setTodo(limitedItems);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filter products based on search term
  const filteredProducts = todo.filter((product) => {
    // If search term is empty, show all products
    if (!searchTerm.trim()) return true;

    // Check if search term is a number (potential ID search)
    const isNumeric = /^\d+$/.test(searchTerm);

    if (isNumeric) {
      // If searching for a number, only match exact product IDs
      return product.id.toString() === searchTerm;
    } else {
      // Otherwise search in the title
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product: any) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="block h-full transition-transform hover:scale-105"
          >
            <div className="border p-4 rounded shadow h-full cursor-pointer hover:shadow-md transition-shadow">
              <div className="mb-2">
                <img
                  src={`https://picsum.photos/id/${product.id % 100}/200/200`}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded"
                />
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
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          {todo.length === 0
            ? "Loading products..."
            : `No products found matching "${searchTerm}"`}
        </div>
      )}
    </div>
  );
}

export default FetchTodo;
