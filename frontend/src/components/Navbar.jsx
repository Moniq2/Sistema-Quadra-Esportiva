import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-md px-6">

      <div className="flex-1">

        <Link
          to="/admin"
          className="flex items-center"
        >
          <img
            src="/logo-sistema-quadra2.png"
            alt="TMJ"
            className="h-10"
          />
        </Link>

      </div>

      <div className="flex-none">

        <ul className="menu menu-horizontal px-1">

          <li>
            <Link to="/admin">
              Início
            </Link>
          </li>

          <li>
            <Link to="/admin/jogadores">
              Jogadores
            </Link>
          </li>

          <li>
            <Link to="/admin/quadras">
              Quadras
            </Link>
          </li>

          <li>
            <Link to="/admin/reservas">
              Reservas
            </Link>
          </li>

        </ul>

      </div>

    </nav>
  );
}

export default Navbar;