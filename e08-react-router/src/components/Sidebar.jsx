import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaPhone, FaInfoCircle, FaTasks } from "react-icons/fa";

function Sidebar() {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Services", path: "/services", icon: <FaTasks /> },
    { name: "Contact", path: "/contact", icon: <FaPhone /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Dashboard</div>

      <nav className="sidebar-menu">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${pathname === item.path ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
