import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar({ navLinks, userId }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div class="nav">
      <div class="nav__wrapper">
        <ul class="nav-links">
          <div className="nav-logo"></div>
          {navLinks.map((link, index) => (
            <li key={index} className={`nav-link ${link.path.indexOf(path) !== -1 ? "selected" : ""}`} title={link.title}>
              <Link className="link" to={link.path[0]}>
                <div class="nav-link__icon material-symbol">{link.icon}</div>
                <div class="nav-link__text">{link.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
