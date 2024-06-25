import React from 'react';
import googleAPI from '../../config/googleAuth.json';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuthentication = () => {
  const handleSuccess = (credentialResponse) => {
    // Extract the user's email from the credentialResponse object
    const userEmail = credentialResponse.profileObj.email;

    // Make an API call to send the user's email information
    fetch('https://localhost:7215/api/accounts/google-authentication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error(error);
      });
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={googleAPI.web.client_id}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuthentication;