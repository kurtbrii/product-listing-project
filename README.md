# Product Inventory Dashboard

A responsive web application for managing product inventory, built with Next.js, Tailwind CSS, and shadcn/ui components.

## Features

- Product listing with search functionality
- Product detail pages
- Add new products with form validation
- Responsive design for mobile and desktop
- Modern UI using shadcn/ui components

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kurtbrii/product-listing-project
   cd product_listing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## How It Works

- **Product Listing**: The homepage displays all products with search functionality to filter by title or ID.
- **Product Details**: Click on any product to view detailed information on a dedicated page.
- **Add Product**: Click the "Add New Product" button to display a form where you can add new products to the inventory.
- **Data Source**: The application uses the JSONPlaceholder API to fetch mock product data.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (utilizing Radix UI primitives)
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React useState for local state management

## shadcn/ui Integration

This project uses several shadcn/ui components for a consistent and accessible UI:

- **Button**: Used for actions throughout the app
- **Card**: For displaying product information
- **Form components**: Form, FormField, FormItem, FormLabel, etc.
- **Label**: For form labels
- **Input**: For text input fields

The shadcn/ui components are configured in `components.json` and follow the project's theming system defined in the Tailwind configuration.

## License

MIT 