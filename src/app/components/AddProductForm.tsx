"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const [errors, setErrors] = useState<{
    title?: string;
    body?: string;
    userId?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: {
      title?: string;
      body?: string;
      userId?: string;
    } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product name is required";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Product description is required";
    }

    if (!formData.userId.trim()) {
      newErrors.userId = "Category ID is required";
    } else if (isNaN(Number(formData.userId))) {
      newErrors.userId = "Category ID must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title: formData.title,
            body: formData.body,
            userId: parseInt(formData.userId),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      console.log("Success:", data);

      // Reset form
      setFormData({
        title: "",
        body: "",
        userId: "",
      });

      // Show success message
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-200">
          Product added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product name"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category ID*
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.userId ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter category ID (number)"
          />
          {errors.userId && (
            <p className="mt-1 text-sm text-red-500">{errors.userId}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Description*
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={4}
            className={`w-full p-2 border rounded ${
              errors.body ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product description"
          />
          {errors.body && (
            <p className="mt-1 text-sm text-red-500">{errors.body}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 text-white rounded text-lg font-medium ${
            isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
