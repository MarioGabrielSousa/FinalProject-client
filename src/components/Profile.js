import React from 'react';

function Profile(loggedInUser) {
    return (
      <div className="profile-page">
        <h2>{loggedInUser.username} Status</h2>
        <p>Current Weight</p>
        <p>Previous Weight</p>
      

      <h2>Account Settings</h2>
      <p>Change your password</p>
      </div>
    );
  }

export default Profile;