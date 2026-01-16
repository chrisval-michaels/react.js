import "./App.css";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <ProductList />
        <Cart />
      </div>
    </div>
  );
}

export default App;
