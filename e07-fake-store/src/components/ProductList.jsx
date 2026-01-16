import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import { addToCart } from "../features/cartSlice";
import { FaCartPlus } from "react-icons/fa"; // 🛒 import cart icon

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading products...</p>;

  return (
    <div className="products">
      <h2>Products</h2>
      <div className="grid">
        {items.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.title} />
            <h4>{p.title}</h4>
            <p>{p.price} €</p>
            <button
              className="add-btn"
              onClick={() => dispatch(addToCart(p))}
              title="Add to Cart"
            >
              <FaCartPlus size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
