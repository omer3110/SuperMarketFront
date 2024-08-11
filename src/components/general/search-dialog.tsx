// components/search-dialog.tsx
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useProductSearch } from "@/hooks/useProductSearch";
import { IconInput } from "../ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { IProduct } from "@/types/product.types";
import { SetURLSearchParams } from "react-router-dom";
import { Separator } from "../ui/separator";

interface SearchDialogProps {
  setSearchParams: SetURLSearchParams;
  onClose: () => void;
}

function SearchDialog({ setSearchParams, onClose }: SearchDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const { data: searchResults, isLoading } =
    useProductSearch(debouncedSearchTerm);

  function handleNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(ev.target.value);
  }

  function handleSearchSubmit(productId: string) {
    setSearchParams({ id: productId });
    onClose();
  }

  return (
    <div className="flex flex-col gap-4">
      <IconInput
        Icon={Search}
        value={searchTerm}
        onChange={handleNameChange}
        placeholder="Search for items..."
        className="w-full"
        autoFocus
      />
      <div className="max-h-[300px] overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : searchResults && searchResults.length > 0 ? (
          searchResults.map((product: IProduct) => (
            <>
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                onClick={() => handleSearchSubmit(product._id)}
                className="block p-2 hover:bg-foreground/15 cursor-pointer"
              >
                <div className=" grid grid-cols-2 my-4 ">
                  <img src={product.img} alt={product.name} />
                  <p className=" self-center justify-self-start">
                    {product.name}
                  </p>
                  <div className=" hidden sm:grid">hi</div>
                </div>
              </Link>
              <Separator />
            </>
          ))
        ) : searchTerm.length! > 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No results found
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Your search results will appear here!
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchDialog;
