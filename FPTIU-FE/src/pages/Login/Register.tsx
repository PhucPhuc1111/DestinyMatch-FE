import "./style.css";
import LoginIcon from "../../assets/img/icon.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import Modal from "react-modal";

export default function RegisterModal({ isOpen, onRequestClose }) {
  const [username, setUsername] = useState("saomaynguvay@gmail.com");
  const [password, setPassword] = useState("123");
  const [repassword, setRePassword] = useState("123");
  const [mess, setMess] = useState(
    "Let's create your account and matching with your friends"
  );

  function handleRegister(e) {
    e.preventDefault();
    if (username === "saomaynguvay@gmail.com" && password === "123") {
      onRequestClose();
      setMess("Let's create your account and matching with new friends");
      return;
    }
    setMess("Wrong username or password");
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="auth">
        <div className="auth-content">
          <div className="auth-content-inner">
            <img src={LoginIcon} alt="" className="auth-icon" />
            <h1 className="auth-heading">Welcome to Destiny Match</h1>
            <p className="auth-desc">{mess}</p>
            <form action="" className="auth-form" onSubmit={handleRegister}>
              <div className="form-group">
                <div className="form-text-input">
                  <input
                    value={username}
                    type="email"
                    name=""
                    id=""
                    className="form-input"
                    placeholder="Email"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <MdOutlineMailOutline className="input-icon" />
                </div>
                <div className="form-text-input">
                  <input
                    value={password}
                    type="password"
                    name=""
                    id=""
                    className="form-input"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <CiLock className="input-icon" />
                </div>
                <div className="form-text-input">
                  <input
                    value={repassword}
                    type="password"
                    name=""
                    id=""
                    className="form-input"
                    placeholder="Confirm Password"
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                  <CiLock className="input-icon" />
                </div>
              </div>
              <button className="auth-btn-group">Register</button>
            </form>
            <button className="auth-btn-group">
              <FcGoogle className="auth-btn-icon" /> Login with Google
            </button>
            <button className="auth-btn-group">
              <FaFacebook className="auth-btn-icon" /> Login with Facebook
            </button>
            <div className="form-group form-group-inline">
              <span className="form-checkbox-label">
                you don't have account ?
              </span>
              <a href="" className="auth-link">
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
