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
    <div className="flex gap-2 p-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product: any) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="w-[calc(50%-0.25rem)] sm:w-[calc(33.333%-0.5rem)] lg:w-[calc(20%-0.5rem)] transition-transform hover:scale-105"
          >
            <Card className="w-12 border shadow-sm">
              <div className="w-12 h-12 overflow-hidden">
                <img
                  src={`https://picsum.photos/id/${product.id % 100}/200/200`}
                  alt={product.title}
                  className=" object-cover"
                />
              </div>
              <CardHeader className="p-2 pb-0 space-y-0">
                <CardTitle className="text-xs text-blue-500">
                  {product.id}
                </CardTitle>
                <CardDescription className="text-[10px] text-gray-500">
                  Category ID: {product.userId}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-1">
                <h3 className="text-xs font-medium line-clamp-1">
                  {product.title}
                </h3>
                <p className="mt-0.5 text-[10px] text-gray-700 line-clamp-1">
                  {product.body}
                </p>
              </CardContent>
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
