import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-dark p-3">
      <Link className="text-white me-3" to="/">Home</Link>
      <Link className="text-white me-3" to="/about">About</Link>
      <Link className="text-white" to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;