import "./style.css";
import { FaFacebookF, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FooterIcon from "../../../assets/img/icon.png";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="main-content">
          <div className="row">
            <div className="column">
              <img src={FooterIcon} alt="" className="footer-icon" />
              <p className="desc">
                Discover your campus connection! Join our community of students.
                Your match is just a click away!
              </p>
              <div className="socials">
                <FaFacebookF className="icon" />
                <FaInstagram className="icon" />
                <FaLinkedin className="icon" />
                <FaXTwitter className="icon" />
              </div>
            </div>
            <div className="column">
              <h3 className="title">Legal</h3>
              <ul className="list">
                <li>
                  <a href="#!">Privacy</a>
                </li>
                <li>
                  <a href="#!">Policy</a>
                </li>
                <li>
                  <a href="#!">Terms</a>
                </li>
                <li>
                  <a href="#!">Cookie Policy</a>
                </li>
              </ul>
            </div>
            <div className="column">
              <h3 className="title">Careers</h3>
              <ul className="list">
                <li>
                  <a href="">Careers Portal</a>
                </li>
                <li>
                  <a href="">Tech Blog</a>
                </li>
              </ul>
            </div>
            <div className="column">
              <h3 className="title">Address</h3>
              <ul className="list">
                <li>
                  <a href="">
                    <strong>Location:</strong> 27 Division St, New York, NY
                    10002, USA
                  </a>
                </li>
                <li>
                  <a href="">Email: email@gmail.com</a>
                </li>
                <li>
                  <a href="">
                    <strong>Phone:</strong> + 000 1234 567 890
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>Copyright ©2024 webdesign.gdn All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}
