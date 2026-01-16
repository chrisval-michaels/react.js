

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetail({ params }) {

  const { id } = await params;     
  const product = await getProduct(id);

  return (
    <div style={{ padding: "20px" }}>
      <h1>The Product page</h1>

      <img
        src={product.image}
        alt={product.title}
        style={{ width: "300px", marginBottom: "20px" }}
      />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> {product.price} €
      </p>
      <p>
        <strong>Rating:</strong> {product.rating?.rate} ⭐ (
        {product.rating?.count} reviews)
      </p>

      <a href="/products" style={{ color: "blue" }}>
        Back
      </a>
    </div>
  );
}
