import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar({ navLinks, userId }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="nav">
      <div className="nav__header">
        <div className="nav__header__title material-symbol">admin_panel_settings</div>
      </div>
      <div className="nav__wrapper">
        <ul className="nav-links">
          <div className="nav-logo"></div>
          {navLinks.map((link, index) => (
            <li key={index} className={`nav-link ${link.path.indexOf(path) !== -1 ? "selected" : ""}`} title={link.title}>
              <Link className="link" to={link.path[0]}>
                <div className="nav-link__icon material-symbol">{link.icon}</div>
                <div className="nav-link__text">{link.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link className="link nav__footer" to={`/logout`}>
        <div className="nav-link">
          <div className="nav-link__icon material-symbol">logout</div>
        </div>
      </Link>
    </div>
  );
}

export default NavBar;
