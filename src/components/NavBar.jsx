import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar({ navLinks, userId }) {
  const location = useLocation();
  const path = location.pathname;

  console.log("path", path);

  return (
    <div class="nav">
      <div class="nav__header">
        <div class="nav__header__title material-symbol">admin_panel_settings</div>
      </div>
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
      <Link className="link" to={`/logout`} class="nav__footer">
        <div class="nav-link">
          <div class="nav-link__icon material-symbol">logout</div>
        </div>
      </Link>
    </div>
  );
}

export default NavBar;
