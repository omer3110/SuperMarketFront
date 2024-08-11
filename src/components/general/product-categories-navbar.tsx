import { SetURLSearchParams } from "react-router-dom";
import ProductCategoryDropdown from "./product-category-dropdown";
import { IconInput } from "../ui/input";
import { Search } from "lucide-react";

interface ProductCategoriesNavbarProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

function ProductCategoriesNavbar(props: ProductCategoriesNavbarProps) {
  const { searchParams, setSearchParams } = props;
  const name = searchParams.get("name") || "";

  function handleNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    searchParams.set("name", value);
    if (!value) {
      searchParams.delete("name");
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="sticky top-[72.5px] py-2 z-40 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md dark:border-b dark:border-b-primary">
      <div className="flex justify-between h-12 max-w-screen-2xl items-center px-6">
        <div className="flex gap-5  text-sm lg:gap-6">
          <ProductCategoryDropdown
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <div className=" relative">
            <IconInput Icon={Search} value={name} onChange={handleNameChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCategoriesNavbar;
