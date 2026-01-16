import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <p>{item.title}</p>
          <p>{item.price} € × {item.quantity}</p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>X</button>
        </div>
      ))}
      <h3>Total: {total} €</h3>
    </div>
  );
};

export default Cart;
