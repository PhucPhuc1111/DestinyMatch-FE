import React, { useState } from "react";
import "./style.css";
import LoginModal from "../../../pages/Login/Login";
import myImage from "../../../assets/img/icon.png";

interface NavbarItem {
  title: string;
  path: string;
  id: number;
  src: string;
}

const Header: React.FC = () => {
  // Login Component variables
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  // Header variable
  const Navbar: NavbarItem[] = [
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

  const [isActive, setIsActive] = useState<string>("Home");

  const handleNavClick = (item: string) => {
    setIsActive(item);
  };

  function handleOpenLogin() {
    openModal();
    setRegister(false);
  }

  function handleOpenRegister() {
    setModalIsOpen(true);
    setRegister(true);
  }

  return (
    <header className="header fixed">
      <div className="main-content">
        <div className="body">
          <img src={myImage} alt="Logo" className="logo-header" />
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
            <a className="loginbtn" onClick={handleOpenLogin}>
              Login
            </a>
            <LoginModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              register={register}
              OpenRegister={handleOpenRegister}
            />
            <a className="btn" onClick={handleOpenRegister}>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
