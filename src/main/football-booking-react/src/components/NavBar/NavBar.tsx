import React from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService.ts";
import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  const loggedIn = authService.isLoggedIn();
  const isAdmin = authService.isAdmin();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <span className={styles.logoText}>Football Fields</span>
        </Link>
      </div>
      <div className={styles.links}>
        <Link to="/fields" className={styles.link}>
          Fields
        </Link>
        {loggedIn && (
          <>
            <Link to="/bookings" className={styles.link}>
              Bookings
            </Link>
            {isAdmin && (
              <Link to="/users" className={styles.link}>
                Users
              </Link>
            )}
            <Link to="/profile" className={styles.link}>
              Your Info
            </Link>
          </>
        )}
      </div>
      <div className={styles.auth}>
        {loggedIn ? (
          <button
            onClick={() => {
              authService.logout();
              window.location.href = "/login";
            }}
            className={`${styles.button} ${styles.logoutButton}`}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className={styles.button}>
              Login
            </Link>
            <Link to="/register" className={styles.button}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
