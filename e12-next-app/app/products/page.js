async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Products</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {products.map(p => (
          <a
            key={p.id}
            href={`/products/${p.id}`}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textDecoration: "none",
              color: "black",
              transition: "0.2s",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ height: "150px", objectFit: "contain", margin: "auto" }}
            />
            <h3 style={{ marginTop: "10px", fontSize: "18px" }}>{p.title}</h3>
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>${p.price}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
