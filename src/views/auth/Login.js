import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import logoDark from '../../assets/images/logo-dark.png';
import Breadcrumb from '../../layouts/AdminLayout/Breadcrumb';

import { CopyToClipboard } from 'react-copy-to-clipboard';

const Login = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content text-center">
          <Card className="borderless">
            <Card.Body>
              <img src={logoDark} alt="" className="img-fluid mb-4" />
              <form>
                <div className="input-group mb-3">
                  <input type="email" className="form-control" placeholder="Email address" />
                </div>
                <div className="input-group mb-4">
                  <input type="password" className="form-control" placeholder="Password" />
                </div>
              </form>
              <p className="mb-0 text-muted">
                Don’t have an account?{' '}
                <NavLink to="/register" className="f-w-400">
                  Signup
                </NavLink>
              </p>
              <Alert variant="primary" className="text-start mt-3">
                Username:
                <CopyToClipboard text="saomaynguvay">
                  <Button variant="outline-primary mx-2 mb-2" as={Link} to="#" className="badge">
                    {' '}
                    <i className="fa fa-user me-1" /> saomaynguvay{' '}
                  </Button>
                </CopyToClipboard>
                <br />
                Password:
                <CopyToClipboard text="123456">
                  <Button variant="outline-primary mx-2" as={Link} to="#" className="badge">
                    {' '}
                    <i className="fa fa-lock me-1" /> 123456{' '}
                  </Button>
                </CopyToClipboard>
              </Alert>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
