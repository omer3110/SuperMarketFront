import { SetURLSearchParams } from "react-router-dom";
import ProductCategoryDropdown from "./product-category-dropdown";

interface ProductCategoriesNavbarProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

function ProductCategoriesNavbar(props: ProductCategoriesNavbarProps) {
  const { searchParams, setSearchParams } = props;

  return (
    <div className="sticky top-[73px] py-2 z-40 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md dark:border-b dark:border-b-primary">
      <div className="flex justify-between h-12 max-w-screen-2xl items-center px-6">
        <nav className="flex gap-4 text-sm lg:gap-6">
          <ProductCategoryDropdown
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </nav>
      </div>
    </div>
  );
}

export default ProductCategoriesNavbar;
