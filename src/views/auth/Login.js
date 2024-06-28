import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import logoDark from '../../assets/images/logo-dark.png';
import Breadcrumb from '../../layouts/AdminLayout/Breadcrumb';
import NotificationPopUp from '../../components/Card/NotificationPopUp';
import SvgIcons from '../../components/Button/SvgIcons';
import GoogleAuthentication from '../../components/Button/GoogleAuthentication';

const Login = () => {
  //Declare
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notificationTimeout, setNotificationTimeout] = useState(null); // Added state for timeout
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the notification timeout when component unmounts
    return () => {
      clearTimeout(notificationTimeout);
    };
  }, [notificationTimeout]);

  //On Submit Handle Method
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email address
    if (!isValidEmail(email)) {
      showNotification('VALIDATION', 'Invalid email address!');
      return;
    }
    if (password.trim() === '') {
      // Password is empty
      showNotification('VALIDATION', 'Cannot set empty Password!');
      return;
    }

    //Fetch
    try {
      const response = await fetch('https://destiny-match.azurewebsites.net/api/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        window.localStorage.setItem('jwt-token', data.token);
        navigate('/home');

        // Reset the form fields
        setEmail('');
        setPassword('');
      } else {
        const error = await response.text();

        // Handle the error accordingly
        showNotification('RESULT', error.message);
      }
    } catch (error) {
      console.log('Error:', error);

      // Handle any network or other errors
      showNotification('ERROR', 'An error occurred while creating the account. Please try again later.');
    }
  };

  //Supporter Methods
  const isValidEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const showNotification = (title, message) => {
    setNotificationTitle(title);
    setNotificationMessage(message);

    clearTimeout(notificationTimeout);
    const timeout = setTimeout(() => {
      setNotificationTitle('');
      setNotificationMessage('');
    }, 3500);
    setNotificationTimeout(timeout);
  };
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        {notificationMessage && <NotificationPopUp textTitle={notificationTitle} textContent={notificationMessage} />}

        <div className="auth-content text-center">
          <Card className="borderless">
            <Row className="align-items-center text-center">
              <Col>
                <Card.Body>
                  <img src={logoDark} alt="" className="img-fluid mb-4" />
                  <h4 className="mb-3 f-w-400">Login</h4>

                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="input-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="btn"
                      style={{
                        position: 'absolute',
                        right: '0px',
                        border: 'none',
                        zIndex: '500'
                      }}
                    >
                      {showPassword ? <SvgIcons name="eye-slash" /> : <SvgIcons name="eye" />}
                    </button>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>
                    Sign In
                  </button>

                  <p className="mb-2" style={{ display: 'flex', justifyContent: 'center' }}>
                    <GoogleAuthentication />
                  </p>

                  <p className="mb-0 text-muted">
                    Don’t have an account?{' '}
                    <NavLink to="/register" className="f-w-400">
                      Register
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
