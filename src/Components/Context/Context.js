import { createContext, useState } from "react";

export let cartcontext = createContext();

export function CartContextProvider(props) {
  let [counter, setCounter] = useState(0);
  function changeCounter() {
    setCounter(counter + 1);
  }
  return (
    <cartcontext.Provider value={{ counter, changeCounter }}>
      {props.children}
    </cartcontext.Provider>
  );
}
