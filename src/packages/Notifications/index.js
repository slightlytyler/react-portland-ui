import React, { PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';

const Notifications = props => (
  <div className="pui--notifications">
    <NotificationSystem
      {...props}
      ref={props.onMount}
      style={false}
    />
  </div>
);

Notifications.propTypes = {
  onMount: PropTypes.func.isRequired,
};

export default Notifications;
