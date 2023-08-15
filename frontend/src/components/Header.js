import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header({ email }) {
  const location = useLocation();

  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  return (
    <header className="header">
      <div className="header__logo" />
      <ul className="header__navigation">
        {location.pathname === "/" && (
          <li>
            <p className="header__email">{email}</p>
          </li>
        )}
        {location.pathname === "/" && (
          <li>
            <button onClick={signOut} className="header__button">
              Выйти
            </button>
          </li>
        )}
        {location.pathname === "/signup" && (
          <li>
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          </li>
        )}
        {location.pathname === "/signin" && (
          <li>
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
