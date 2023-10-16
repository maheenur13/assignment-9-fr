import { CartItemType, IProduct } from "@/interfaces/common";
import {
  handleAddToCart,
  handleReduceQuantity,
  handleRemoveFromCart,
} from "@/redux/cart/cart.action";
import { getCartState } from "@/redux/cart/cart.slice";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { FC, memo } from "react";
import { useSelector } from "react-redux";

type PropsType = {
  product: IProduct;
  small?: boolean;
  hideCount?: boolean;
  deleteBtn?: boolean;
};

const IncAndDec: FC<PropsType> = ({
  product,
  small = false,
  hideCount = false,
  deleteBtn = false,
}) => {
  const { cartItems } = useSelector(getCartState);
  const currentQuantity = [...cartItems].find(
    (el) => el.id === product.id
  )?.quantity;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ maxWidth: "135px" }}
      className="flex justify-between align-middle inc-dec-wrapper bg-blue-300 py-2 px-2"
    >
      <button
        className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-3   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        style={small ? { height: "26px", padding: "0 8px" } : {}}
        onClick={(e) => {
          e.stopPropagation();
          handleReduceQuantity(product as CartItemType);
        }}
      >
        <MinusOutlined style={{ fontSize: small ? "8px" : "10px" }} />
      </button>
      {!hideCount && (
        <span
          className="mx-3 text-white"
          style={{ fontSize: small ? "12px" : "16px" }}
        >
          {currentQuantity}
        </span>
      )}
      {hideCount && <div className="mx-1" />}
      <button
        className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-3   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        style={small ? { height: "26px", padding: "0 10px" } : {}}
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart(product as CartItemType);
        }}
      >
        <PlusOutlined style={{ fontSize: small ? "8px" : "10px" }} />
      </button>
      {hideCount && <div className="mx-1" />}
      {deleteBtn && (
        <button
          className="flex justify-center align-middle"
          style={small ? { height: "26px", padding: "0 8px" } : {}}
          onClick={() => handleRemoveFromCart(product as CartItemType)}
        >
          <DeleteOutlined style={{ fontSize: small ? "8px" : "10px" }} />
        </button>
      )}
    </div>
  );
};

export default memo(IncAndDec);
