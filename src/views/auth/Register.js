import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import logoDark from '../../assets/images/logo-dark.png';
import Breadcrumb from '../../layouts/AdminLayout/Breadcrumb';
import NotificationPopUp from '../../components/Card/NotificationPopUp';
import SvgIcons from '../../components/Button/SvgIcons';
import GoogleAuthentication from '../../components/Button/GoogleAuthentication';

//===================================================================================================
//Main Method With View Page
const Register = () => {
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
      showNotification('VALIDATION', 'Invalid email address!', false);
      return;
    }
    if (password.trim() === '') {
      // Password is empty
      showNotification('VALIDATION', 'Cannot set empty Password!', false);
      return;
    }

    //Fetch
    try {
      const response = await fetch('https://localhost:7215/api/accounts/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        console.log('Account created successfully');
        showNotification('RESULT', 'Account created successfully.', true);

        // Reset the form fields
        setEmail('');
        setPassword('');
      } else {
        const error = await response.text();

        // Handle the error accordingly
        showNotification('RESULT', error.message, false);
      }
    } catch (error) {
      console.log('Error:', error);

      // Handle any network or other errors
      showNotification('ERROR', 'An error occurred while creating the account. Please try again later.', false);
    }
  };

  //Supporter Methods
  const isValidEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const showNotification = (title, message, isSuccess) => {
    setNotificationTitle(title);
    setNotificationMessage(message);

    clearTimeout(notificationTimeout);
    const timeout = setTimeout(() => {
      setNotificationTitle('');
      setNotificationMessage('');

      if (isSuccess) { navigate('/login') };
    }, 3500);
    setNotificationTimeout(timeout);
  };

  //UI View Page
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">

        {notificationMessage &&
          <NotificationPopUp textTitle={notificationTitle} textContent={notificationMessage} />}

        <div className="auth-content text-center">
          <Card className="borderless">
            <Row className="align-items-center text-center">
              <Col>
                <Card.Body className="card-body">
                  <img src={logoDark} alt="" className="img-fluid mb-4" />
                  <h4 className="mb-3 f-w-400">Register</h4>

                  <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="user123@example.com"
                      value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="input-group mb-4">
                    <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="abc123..."
                      value={password} onChange={(e) => setPassword(e.target.value)} />
                      
                    <button type="button" onClick={toggleShowPassword}  className="btn" style={{
                      position: 'absolute',
                      right: '0px',
                      border: 'none',
                      zIndex: '500'
                    }}>
                      {showPassword ? <SvgIcons name='eye-slash'/> :<SvgIcons name='eye'/>}
                    </button>
                  </div>

                  <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" defaultChecked={false} />
                    <label className="custom-control-label mx-2" htmlFor="customCheck1">
                      Send me the <Link to="#"> Newsletter</Link> weekly.
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Sign up</button>

                  <p className="mb-2">
                    <GoogleAuthentication/>
                  </p>

                  <p className="mb-2">
                    Already have an account?{' '}
                    <NavLink to="/login" className="f-w-400">
                      Login
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

export default Register;
