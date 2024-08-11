import { IProduct } from "@/types/product.types";
import ProductItem from "./product-item";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import React from "react";
import ProductCategoriesNavbar from "./product-categories-navbar";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/proucts.service";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const debouncedSearchParams = useDebounce(location.search, 1000);

  const { data, isLoading } = useQuery<IProduct[]>({
    queryKey: ["products", debouncedSearchParams],
    queryFn: () => productService.fetchProducts(debouncedSearchParams),
  });

  return (
    <>
      <ProductCategoriesNavbar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className=" px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {data?.map((product) => {
          return (
            <React.Fragment key={product._id}>
              <Link to={`/products/${product._id}`}>
                <ProductItem product={product} />
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}

export default ProductList;
