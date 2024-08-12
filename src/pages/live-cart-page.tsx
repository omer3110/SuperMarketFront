// import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useLiveCart } from "@/providers/live-cart-provider";

function LiveCartPage() {
  // const { loggedInUser } = useAuth();
  const { liveCart, changeProductMark } = useLiveCart();
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
      <div className=" my-4">
        <Button>Add New Product + </Button>
      </div>
    </div>
  );
}

export default LiveCartPage;
