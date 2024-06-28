import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import googleConfig from '../../config/googleAuth.json';

const GoogleAuthentication = () => {
  const navigate = useNavigate();
  const handleSuccess = async (GoogleResponse) => {
    try {
      const googleToken = GoogleResponse.credential;

      // Make an API call to send google token
      const response = await fetch('https://destiny-match.azurewebsites.net/api/accounts/google-authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: googleToken,
          platform: 'web'
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwt-token', data.token);
        navigate('/dashboard');
      } else {
        const errorResult = await response.text();
        console.log('There is an error while fetch api /google-authentication: ', errorResult);
      }
    } catch (fetchError) {
      console.log('There is an error while connect to our server: ', fetchError);
    }
  };

  const handleError = () => {
    console.log('Error during Google login!');
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={googleConfig.web.client_id}>
        <GoogleLogin text="continue_with" onSuccess={handleSuccess} onError={handleError} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuthentication;
