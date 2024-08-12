// import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useLiveCart } from "@/providers/live-cart-provider";
import { useNavigate } from "react-router-dom";

function LiveCartPage() {
  // const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  const { liveCart, changeProductMark, closeLive } = useLiveCart();
  // const { liveCart, changeProductMark, changeProductQuantity } = useLiveCart();

  return (
    <div className=" p-6 max-w-600 mx-auto">
      <h1 className=" text-3xl mb-8 ">Todo Cart </h1>
      <ul className=" flex flex-col ">
        {liveCart?.todoCart.map((product) => (
          <li className=" px-4" key={product.productId}>
            <div className=" py-4 flex gap-4 items-center">
              <div>
                <Checkbox
                  onClick={() => changeProductMark(product.productId)}
                  checked={!product.isActive}
                />
              </div>
              <div className=" w-full flex justify-between">
                <p
                  className={`${
                    !product.isActive
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {product.productName}
                </p>{" "}
                <p className=" min-w-10 text-right">x {product.quantity}</p>
              </div>
            </div>
            <Separator />
          </li>
        ))}
      </ul>
      <div className=" my-4 flex justify-between">
        <Button
          className=" bg-red-600"
          onClick={() => {
            closeLive();
            navigate("/");
          }}
        >
          Close Live{" "}
        </Button>
        <Button>Add New Product + </Button>
      </div>
    </div>
  );
}

export default LiveCartPage;
