import React, { useState, ChangeEvent, FormEvent } from "react";
import "./style.css";
import LoginIcon from "../../assets/img/icon.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Modal from "react-modal";

interface RegisterModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [username, setUsername] = useState<string>("saomaynguvay@gmail.com");
  const [password, setPassword] = useState<string>("123");
  const [repassword, setRePassword] = useState<string>("123");
  const [mess, setMess] = useState<string>(
    "Let's create your account and matching with your friends"
  );

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (username === "saomaynguvay@gmail.com" && password === "123") {
      onRequestClose();
      setMess("Let's create your account and matching with new friends");
      return;
    }
    setMess("Wrong username or password");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Register Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="auth">
        <div className="auth-content">
          <div className="auth-content-inner">
            <img src={LoginIcon} alt="Login Icon" className="auth-icon" />
            <h1 className="auth-heading">Welcome to Destiny Match</h1>
            <p className="auth-desc">{mess}</p>
            <form className="auth-form" onSubmit={handleRegister}>
              <div className="form-group">
                <div className="form-text-input">
                  <input
                    value={username}
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUsername(e.target.value)
                    }
                  />
                  <MdOutlineMailOutline className="input-icon" />
                </div>
                <div className="form-text-input">
                  <input
                    value={password}
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                  />
                  <CiLock className="input-icon" />
                </div>
                <div className="form-text-input">
                  <input
                    value={repassword}
                    type="password"
                    className="form-input"
                    placeholder="Confirm Password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setRePassword(e.target.value)
                    }
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
};

export default RegisterModal;
