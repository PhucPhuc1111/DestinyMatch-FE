import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import logoDark from '../../assets/images/logo-dark.png';
import Breadcrumb from '../../layouts/AdminLayout/Breadcrumb';

//===================================================================================================
//Main Method With View Page
const Register = () => {

  //Declare
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  //On Submit Handle Method
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email address
    if (!isValidEmail(email)) {
      setErrorMessage('Invalid email address!');
      return;
    }
    if (password.trim() === '') {
      // Password is empty
      setErrorMessage('Cannot set empty Password!');
      return;
    }

    //Fetch
    try {
      const response = await fetch('https://localhost:7215/api/accounts/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Account created successfully');
        alert('Account created successfully');
        // Reset the form fields
        setEmail('');
        setPassword('');
        setErrorMessage('');

      } else {
        const error = await response.text();
        console.log('Account creation failed:', error);

        // Handle the error accordingly
        setErrorMessage(error.message);
      }
    } catch (error) {
      console.log('Error:', error);

      // Handle any network or other errors
      setErrorMessage('An error occurred while creating the account. Please try again later.');
    }
  };

  //Supporter Methods
  const isValidEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //UI View Page
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
      
        <div className="auth-content text-center">
          <Card className="borderless">
            <Row className="align-items-center text-center">
              <Col>
                <Card.Body className="card-body">
                  <img src={logoDark} alt="" className="img-fluid mb-4" />
                  <h4 className="mb-3 f-w-400">Register</h4>

                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <input required type="email" className="form-control" placeholder="user123@example.com"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="input-group mb-4">
                      <input required type={showPassword ? 'text' : 'password'} className="form-control" placeholder="abc123..."
                        value={password} onChange={(e) => setPassword(e.target.value)} />

                      <button type="button" onClick={toggleShowPassword}>
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>

                    <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" defaultChecked={false} />
                      <label className="custom-control-label mx-2" htmlFor="customCheck1">
                        Send me the <Link to="#"> Newsletter</Link> weekly.
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>
                  </form>
                  {errorMessage && <div>{errorMessage}</div>}

                  <p className="mb-2">
                    Already have an account?{' '}
                    <NavLink to="/login" className="f-w-400">
                      Signin
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