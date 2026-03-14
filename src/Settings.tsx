import { useState, useEffect } from "react";
import Navbar from "./pages/Navbar2";
import { getProfile, updatePassword } from "./api/auth";
import './Settings.css'

function Settings() {

  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const profile = await getProfile();

      setEmail(profile.email);

    } catch {

      setMessage("Failed to load profile");

    }

  };

  const handleUpdate = async () => {

    setMessage("");

    try {

      await updatePassword({
        currentPassword,
        newPassword,
        confirmPassword
      });

      setMessage("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err: any) {

      setMessage(err.message);

    }

  };

  return (
    <div>

      <Navbar />

      <div className="settings-container">

        <div className="settings-card">

          <div className="settings-header">
            SETTINGS
          </div>

          <div className="settings-body">

            <h3>Account Settings</h3>
            <p>Update your password</p>

            <label>Email</label>
            <input
              type="email"
              value={email}
              disabled
            />

            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e)=>setCurrentPassword(e.target.value)}
            />

            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />

            {message && (
              <p className="settings-message">{message}</p>
            )}

            <button
              className="confirm-btn"
              onClick={handleUpdate}
            >
              Confirm Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;