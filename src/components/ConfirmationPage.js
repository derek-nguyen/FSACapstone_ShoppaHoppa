import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ConfirmationPage = ({ user, sessionId }) => {
  const history = useHistory();

  useEffect(() => {
    if (!user || !sessionId) {
      history.push('/confirmation');
    }
  }, [user, sessionId, history]);

  // if (!user || !sessionId) {
  //   return null;
  // }

  return (
    <div className="confirmation-message-container">
      <p className="confirmed-message">Your order is confirmed.</p>
      <p className="thank-you-message">Thank you for shopping with us!</p>
      <p className="confirmation-email-message">Your confirmation email will be sent shortly.</p>
    </div>
  );
};

export default ConfirmationPage;
