import { IProduct } from "@/types/product.types";
import ProductItem from "./product-item";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import ProductCategoriesNavbar from "./product-categories-navbar";

const data: IProduct[] = [
  {
    _id: "1",
    name: "Milk in Carton 3% Fat",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 7.11 },
      { brandName: "Yohananof", price: 7.1 },
      { brandName: "Rami Levy", price: 3.5 },
    ],
  },
  {
    _id: "2",
    name: "Pasteurized Milk 1% in Carton",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 6.7 },
      { brandName: "Yohananof", price: 6.7 },
      { brandName: "Rami Levy", price: 6.7 },
    ],
  },
  {
    _id: "3",
    name: "Soy Milk in Carton 3% Fat",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 7.11 },
      { brandName: "Yohananof", price: 10.5 },
      { brandName: "Rami Levy", price: 11.9 },
    ],
  },
  {
    _id: "4",
    name: "Oat Pudding",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 6.9 },
      { brandName: "Yohananof", price: 12.5 },
      { brandName: "Rami Levy", price: 14.7 },
    ],
  },
  {
    _id: "5",
    name: "Emek Sliced Yellow Cheese 28%",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 32.5 },
      { brandName: "Yohananof", price: 24.9 },
      { brandName: "Rami Levy", price: 25.7 },
    ],
  },
  {
    _id: "6",
    name: "Eggs M Shufersal",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 12.89 },
      { brandName: "Yohananof", price: 12.89 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "7",
    name: "Eggs L Shufersal",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 13.97 },
      { brandName: "Yohananof", price: 13.97 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "8",
    name: "Soft White Cheese 9% Fat",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 5.9 },
      { brandName: "Yohananof", price: 5.68 },
      { brandName: "Rami Levy", price: 5.3 },
    ],
  },
  {
    _id: "9",
    name: "Tnuva Cottage Cheese 5%",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 5.9 },
      { brandName: "Yohananof", price: 5.9 },
      { brandName: "Rami Levy", price: 5.9 },
    ],
  },
  {
    _id: "10",
    name: "Milky Chocolate Flavored Pudding",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 2.9 },
      { brandName: "Yohananof", price: 2.9 },
      { brandName: "Rami Levy", price: 12.7 },
    ],
  },
  {
    _id: "11",
    name: "Pro Yogurt Protein Vanilla 0% Fat",
    category: "Milk and Eggs",
    prices: [
      { brandName: "Shufersal", price: 6.4 },
      { brandName: "Yohananof", price: 5.9 },
      { brandName: "Rami Levy", price: 5.02 },
    ],
  },
  {
    _id: "12",
    name: "Tomato - Israeli Produce",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 9.9 },
      { brandName: "Yohananof", price: 6.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "13",
    name: "Cucumber - Israeli Produce",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 9.9 },
      { brandName: "Yohananof", price: 6.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "14",
    name: "Dry Onion - Israeli Produce",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 7.9 },
      { brandName: "Yohananof", price: 4.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "15",
    name: "Organic Watermelon",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 40.05 },
      { brandName: "Yohananof", price: 3.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "16",
    name: "Hot Pepper - Israeli Produce",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 11.9 },
      { brandName: "Yohananof", price: 9.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "17",
    name: "Organic Melon",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 29.8 },
      { brandName: "Yohananof", price: 3.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "18",
    name: "Lemon - Israeli Produce",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 11.9 },
      { brandName: "Yohananof", price: 6.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "19",
    name: "Organic Potato",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 9.9 },
      { brandName: "Yohananof", price: 5.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "20",
    name: "Pink Lady Apple - Israeli Produce",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 18.9 },
      { brandName: "Yohananof", price: 10.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "21",
    name: "Organic Lettuce",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 7.9 },
      { brandName: "Yohananof", price: 5.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "22",
    name: "Cherry Tomato - Individual",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 10.9 },
      { brandName: "Yohananof", price: 19.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "23",
    name: "Organic Garlic Pack",
    category: "Fruits and Vegetables",
    prices: [
      { brandName: "Shufersal", price: 16.9 },
      { brandName: "Yohananof", price: 13.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "24",
    name: "Whole Wheat Bread - Bakery",
    category: "Bakery",
    prices: [
      { brandName: "Shufersal", price: 12.4 },
      { brandName: "Yohananof", price: 8.9 },
      { brandName: "Rami Levy", price: 12.4 },
    ],
  },
  {
    _id: "25",
    name: "Baguette - Bakery",
    category: "Bakery",
    prices: [
      { brandName: "Shufersal", price: 4.9 },
      { brandName: "Yohananof", price: 4.9 },
      { brandName: "Rami Levy", price: 5.3 },
    ],
  },
  {
    _id: "26",
    name: "Crispy Baguette - Bakery",
    category: "Bakery",
    prices: [
      { brandName: "Shufersal", price: 4.9 },
      { brandName: "Yohananof", price: 4.9 },
      { brandName: "Rami Levy", price: 5.3 },
    ],
  },
  {
    _id: "27",
    name: "Matzah - Passover",
    category: "Bakery",
    prices: [
      { brandName: "Shufersal", price: 24.9 },
      { brandName: "Yohananof", price: 23.9 },
      { brandName: "Rami Levy", price: 23.9 },
    ],
  },
  {
    _id: "28",
    name: "Mini Croissant",
    category: "Bakery",
    prices: [
      { brandName: "Shufersal", price: 14.5 },
      { brandName: "Yohananof", price: 12.9 },
      { brandName: "Rami Levy", price: 13.5 },
    ],
  },
  {
    _id: "29",
    name: "Whole Grain Bread - Bakery",
    category: "Bakery",
    prices: [
      { brandName: "Shufersal", price: 12.9 },
      { brandName: "Yohananof", price: 8.9 },
      { brandName: "Rami Levy", price: 8.9 },
    ],
  },
  {
    _id: "30",
    name: "Soft White Cheese 5%",
    category: "Bakery",
    prices: [
      { brandName: "Shufersal", price: 6.9 },
      { brandName: "Yohananof", price: 5.68 },
      { brandName: "Rami Levy", price: 5.3 },
    ],
  },
  {
    _id: "31",
    name: "Romaine Lettuce - Produce",
    category: "Bakery",
    prices: [
      { brandName: "Shufersal", price: 11.9 },
      { brandName: "Yohananof", price: 5.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "32",
    name: "Red Pepper - Israeli Produce",
    category: "Bakery",
    prices: [
      { brandName: "Shufersal", price: 14.9 },
      { brandName: "Yohananof", price: 6.9 },
      { brandName: "Rami Levy", price: "N/A" },
    ],
  },
  {
    _id: "33",
    name: "Chicken Breast Fillets",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 55.5 },
      { brandName: "Yohananof", price: 49.9 },
      { brandName: "Rami Levy", price: 48.9 },
    ],
  },
  {
    _id: "34",
    name: "Ground Beef",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 63.9 },
      { brandName: "Yohananof", price: 56.9 },
      { brandName: "Rami Levy", price: 58.5 },
    ],
  },
  {
    _id: "35",
    name: "Whole Salmon",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 79.9 },
      { brandName: "Yohananof", price: 72.5 },
      { brandName: "Rami Levy", price: 71.9 },
    ],
  },
  {
    _id: "36",
    name: "Frozen Shrimp",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 119.9 },
      { brandName: "Yohananof", price: 109.9 },
      { brandName: "Rami Levy", price: 112.5 },
    ],
  },
  {
    _id: "37",
    name: "Chicken Liver",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 49.9 },
      { brandName: "Yohananof", price: 44.9 },
      { brandName: "Rami Levy", price: 47.9 },
    ],
  },
  {
    _id: "38",
    name: "Turkey Breast",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 56.5 },
      { brandName: "Yohananof", price: 52.9 },
      { brandName: "Rami Levy", price: 54.9 },
    ],
  },
  {
    _id: "39",
    name: "Cod Fish Fillets",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 74.9 },
      { brandName: "Yohananof", price: 69.9 },
      { brandName: "Rami Levy", price: 71.5 },
    ],
  },
  {
    _id: "40",
    name: "Sliced Ham",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 29.9 },
      { brandName: "Yohananof", price: 25.9 },
      { brandName: "Rami Levy", price: 27.5 },
    ],
  },
  {
    _id: "41",
    name: "Pork Chops",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 78.9 },
      { brandName: "Yohananof", price: 71.9 },
      { brandName: "Rami Levy", price: 74.5 },
    ],
  },
  {
    _id: "42",
    name: "Beef Steaks",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 89.9 },
      { brandName: "Yohananof", price: 84.5 },
      { brandName: "Rami Levy", price: 86.9 },
    ],
  },
  {
    _id: "43",
    name: "Whole Chicken",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 45.5 },
      { brandName: "Yohananof", price: 41.9 },
      { brandName: "Rami Levy", price: 43.5 },
    ],
  },
  {
    _id: "44",
    name: "Chicken Thighs",
    category: "Meat and Fish",
    prices: [
      { brandName: "Shufersal", price: 49.9 },
      { brandName: "Yohananof", price: 44.5 },
      { brandName: "Rami Levy", price: 46.9 },
    ],
  },
];

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <ProductCategoriesNavbar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className=" px-6 py-8 grid grid-cols-1 gap-4">
        {data.map((product) => {
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
