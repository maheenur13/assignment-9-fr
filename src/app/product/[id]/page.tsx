"use client";

import { useGetSingleProductsQuery } from "@/redux/api/productApi";
import { Col, Rate, Row, Spin, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { FC } from "react";
import IncrementDecrement from "@/components/Cart/IncrementDecrement";
import { useSelector } from "react-redux";
import { getCartState } from "@/redux/cart/cart.slice";
import { handleAddToCart } from "@/redux/cart/cart.action";
import { CartItemType } from "@/interfaces/common";
import CartPage from "@/components/Cart";

type PropsType = {
  params: { id: string };
  searchParams: any;
};

const ProductDetails: FC<PropsType> = (props) => {
  const { id } = props.params;
  const { data, isLoading } = useGetSingleProductsQuery(id);
  const { cartItems } = useSelector(getCartState);
  const currentItem =
    data && [...cartItems].find((item) => item.id === data.product.id);

  return (
    <div className="p-4 mx-48" style={{ height: "100vh" }}>
      {isLoading && (
        <div className="text-center p-20">
          <Spin />
        </div>
      )}
      {data && (
        <div className=" p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Row>
            <Col span={21}>
              <div className="mb-3">
                <Image
                  className="rounded-lg"
                  src={data?.product?.image}
                  width={350}
                  height={450}
                  alt="Product Details"
                />
              </div>
            </Col>
            <Col span={3} className="text-right">
              <Tag className="" color="#e09021">
                {data.product.category}
              </Tag>
              <div className="my-3 text-right  flex justify-end">
                {currentItem ? (
                  <IncrementDecrement product={data.product} />
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(data.product as CartItemType);
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </Col>
            <Col span={24}>
              <h2 className=" w-full my-3  text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {data.product.title}
              </h2>
            </Col>
            <Col span={6}>
              <h6 className="text-2xl mb-3 font-bold text-gray-900 dark:text-white">
                {data.product.price} USD
              </h6>
            </Col>
            <Col span={18} className="text-right">
              <Rate disabled defaultValue={data.product.rating.rate} />
            </Col>
            <Col span={24}>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Description
              </h1>
              <p className="text-lg font-thin tracking-tight text-gray-900 dark:text-white">
                {data.product.description}
              </p>
            </Col>
          </Row>
        </div>
      )}
      <CartPage />
    </div>
  );
};

export default ProductDetails;
