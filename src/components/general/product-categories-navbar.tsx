import { SetURLSearchParams } from "react-router-dom";
import ProductCategoryDropdown from "./product-category-dropdown";
import { IconInput } from "../ui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import SearchResultsDropdown from "./search-results-dropdown";
import { useProductSearch } from "@/hooks/useProductSearch";

interface ProductCategoriesNavbarProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

function ProductCategoriesNavbar(props: ProductCategoriesNavbarProps) {
  const { searchParams, setSearchParams } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: searchResults, isLoading } =
    useProductSearch(debouncedSearchTerm);

  function handleNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    setSearchTerm(value);
  }
  function handleSearchSubmit(productId: string) {
    setSearchParams({ id: productId });
    setIsSearchFocused(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className="sticky top-[72.5px] py-2 z-40 w-full border-border/40 bg-background  shadow-md dark:border-b dark:border-b-primary">
      <div className="flex justify-between h-12 max-w-screen-2xl items-center px-6">
        <div className="flex gap-5  text-sm lg:gap-6">
          <ProductCategoryDropdown
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <div className=" relative w-44 ">
            <IconInput
              Icon={Search}
              value={searchTerm}
              onFocus={() => setIsSearchFocused(true)}
              onChange={handleNameChange}
              placeholder="Search for items..."
              className=" w-4/5"
            />
            {isSearchFocused && (
              <SearchResultsDropdown
                results={searchResults}
                isLoading={isLoading}
                onSelect={handleSearchSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCategoriesNavbar;
