import React from 'react';
import '../../assets/scss/themes/components/_pop-up-notification.scss';

const NotificationPopUp = ({ textTitle, textContent }) => {
    return (
        <div className="notification-popup-container">
            <div class="notification-popup-glow"></div>
            <div class="notification-popup-border-glow"></div>
            <div class="notification-popup-title">{textTitle}</div>
            <div class="notification-popup-body">{textContent}</div>
            <div class="notification-popup-timeout-bar"></div>
        </div>
    );
};

export default NotificationPopUp;