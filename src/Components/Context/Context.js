import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartcontext = createContext();

export function CartContextProvider(props) {
  const [cartId, setcartId] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  async function getCart() {
    let response = await getLoggedUserCart();
    if (response.status === 200) {
      setcartId(response.data.data._id);
      setnumOfCartItems(response.data.numOfCartItems);
    }
  }

  useEffect(() => {
    getCart();
  }, []);
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
  // 642e5663fc6ec80008fc40bf
  function onlinePayment(cartId, shappingart) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shappingart,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <cartcontext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        deleteItem,
        updateProduct,
        deleteAllProuducts,
        onlinePayment,
        setnumOfCartItems,
        cartId,
        numOfCartItems,
      }}
    >
      {props.children}
    </cartcontext.Provider>
  );
}
