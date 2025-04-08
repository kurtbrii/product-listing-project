"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Generate random stock status
  const stockStatuses = ["In Stock", "Low Stock", "Out of Stock"];
  const stockStatusIndex = Math.floor(Math.random() * stockStatuses.length);
  const stockStatus = stockStatuses[stockStatusIndex];

  // Generate random stock quantity based on status
  let stockQuantity = 0;
  if (stockStatus === "In Stock") {
    stockQuantity = Math.floor(Math.random() * 100) + 20; // 20-119
  } else if (stockStatus === "Low Stock") {
    stockQuantity = Math.floor(Math.random() * 19) + 1; // 1-19
  }

  // Generate random price
  const price = (Math.random() * 100 + 10).toFixed(2);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((json) => {
          setProduct(json);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-20">
          <div className="animate-pulse text-xl">
            Loading product details...
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-xl mb-4">Product not found</div>
            <Button variant="outline" asChild>
              <Link href="/">Back to Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0">
          <Link href="/">
            <span className="mr-2">&larr;</span> Back to Products
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={`https://picsum.photos/id/${Number(id) % 100}/600/600`}
              alt={product.title}
              className="w-40"
            />
          </div>

          <div className="md:w-1/2">
            <CardHeader>
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Category {product.userId}
              </div>
              <CardTitle className="text-3xl">{product.title}</CardTitle>

              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold">${price}</span>
                <span
                  className={`ml-4 px-2 py-1 text-sm rounded ${
                    stockStatus === "In Stock"
                      ? "bg-green-100 text-green-800"
                      : stockStatus === "Low Stock"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stockStatus}
                </span>
              </div>

              {stockQuantity > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                  {stockQuantity} units available
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Product Description
                </h2>
                <CardDescription className="text-gray-600 text-base">
                  {product.body}
                </CardDescription>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Product ID</div>
                    <div>{product.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Category ID</div>
                    <div>{product.userId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Weight</div>
                    <div>{(Math.random() * 2 + 0.5).toFixed(2)} kg</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Dimensions</div>
                    <div>
                      {Math.floor(Math.random() * 10 + 10)} ×
                      {Math.floor(Math.random() * 10 + 10)} ×
                      {Math.floor(Math.random() * 5 + 2)} cm
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="mt-4">
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
