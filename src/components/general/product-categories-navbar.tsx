import { Link } from "react-router-dom";

function ProductCategoriesNavbar() {
  // Example categories; replace with your dynamic categories
  const categories = [
    "Milk and Eggs",
    "Fruits and Vegetables",
    "Bakery",
    "Meat and Fish",
  ];

  return (
    <div className="sticky py-2 z-40 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md dark:border-b dark:border-b-primary">
      <div className="flex justify-between h-12 max-w-screen-2xl items-center px-6">
        <nav className="flex gap-4 text-sm lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              className="hover:underline decoration-primary"
              to={`/products?category=${category}`}
            >
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default ProductCategoriesNavbar;
