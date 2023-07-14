import axios from "axios";
import { createContext, useState } from "react";

export let cartcontext = createContext();

export function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function deleteItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function updateProduct(productId, count) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count,
      },
      {
        headers,
      }
    );
  }
  function deleteAllProuducts() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    });
  }
  return (
    <cartcontext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        deleteItem,
        updateProduct,
        deleteAllProuducts,
      }}
    >
      {props.children}
    </cartcontext.Provider>
  );
}
