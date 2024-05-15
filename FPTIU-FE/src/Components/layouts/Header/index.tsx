import { useState } from "react";
import "./style.css";
import { FaHandHoldingHeart } from "react-icons/fa";

export default function Header() {
  const Navbar = [
    {
      title: "Home",
      path: "/",
      id: 0,
      src: "/",
    },
    {
      title: "Product",
      path: "/product",
      id: 1,
      src: "/",
    },
    {
      title: "Policy",
      path: "/policy",
      id: 2,
      src: "/",
    },
  ];
  const [isActive, setIsActive] = useState("Home");
  const handleNavClick = (item: string) => {
    setIsActive(item);
  };
  return (
    <main>
      <header className="header fixed">
        <div className="main-content">
          <div className="body">
            <FaHandHoldingHeart
              className="logo"
              style={{ fontSize: "35px", marginRight: "15px" }}
            />
            <nav className="nav">
              <ul>
                {Navbar.map((item) => (
                  <li
                    key={item.id}
                    className={isActive === item.title ? "active" : ""}
                  >
                    <a href="#!" onClick={() => handleNavClick(item.title)}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="action">
              <a href="#!" className="loginbtn">
                Login
              </a>
              <a href="#!" className="btn">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
