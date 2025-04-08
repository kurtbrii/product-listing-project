"use client";
// Client component to handle the fetch operation
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    <div className="flex flex-wrap gap-5 p-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product: any) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="w-[260px] transition-transform hover:scale-105"
          >
            <Card className="bg-white overflow-hidden border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-start p-4">
                <div className="w-12 h-12 overflow-hidden flex-shrink-0 mr-3 rounded-lg bg-blue-50">
                  <img
                    src={`https://picsum.photos/id/${product.id % 100}/100/100`}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-blue-600 font-bold uppercase text-sm tracking-tight mb-1 truncate">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1">
                    product-{product.id}@example.com
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {(product.id * 10000000000).toString().substring(0, 10)}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))
      ) : (
        <div className="w-full text-center py-4">
          {todo.length === 0
            ? "Loading products..."
            : `No products found matching "${searchTerm}"`}
        </div>
      )}
    </div>
  );
}

export default FetchTodo;
