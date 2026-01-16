export const metadata = {
  title: "The Fake Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ background: "green", padding: "20px" }}>
          <a href="/" style={{ marginRight: "20px", color: "white" }}>Home</a>
          <a href="/products" style={{ marginRight: "20px", color: "white" }}>Products</a>
          <a href="/about" style={{ color: "white" }}>About</a>
        </nav>
        <div style={{ padding: "50px" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
