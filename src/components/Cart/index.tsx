"use client";

import {
  cartOpenHandler,
  handleClearCart,
  handleGetTotal,
} from "@/redux/cart/cart.action";
import { getCartState } from "@/redux/cart/cart.slice";
import { Avatar, Divider, Drawer, List } from "antd";
import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import IncrementDecrement from "./IncrementDecrement";

type PropsType = {
  title?: string;
};

const CartPage: FC<PropsType> = ({ title = "Cart" }) => {
  const { isCartOpen, cartItems, grandTotal } = useSelector(getCartState);

  const onClose = () => {
    cartOpenHandler(false);
  };

  useEffect(() => {
    handleGetTotal();
  }, [cartItems]);

  return (
    <Drawer
      title={title}
      placement={"right"}
      width={600}
      onClose={onClose}
      open={isCartOpen}
    >
      {cartItems.length > 0 && (
        <div className="text-right">
          <button
            disabled={cartItems.length < 1}
            onClick={(e) => {
              handleClearCart();
            }}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-sm text-sm px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Clear cart
          </button>
        </div>
      )}
      <Divider />
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[<IncrementDecrement product={item} key="product" />]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={<h6>{item.title}</h6>}
              description={
                <p className="text-justify pr-3 product-description">
                  {item.description}
                </p>
              }
            />
            <div>Total: {item.price * item.quantity}</div>
          </List.Item>
        )}
      />
      <Divider />
      <h4>Total: {grandTotal}</h4>
    </Drawer>
  );
};

export default memo(CartPage);
