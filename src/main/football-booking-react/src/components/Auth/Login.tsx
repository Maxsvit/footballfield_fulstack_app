import React, { useState } from "react";
import authService from "../../services/authService.ts";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await authService.login({ email, password });
      navigate("/fields");
    } catch (err) {
      alert("Incorect email or password,try again");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
        <p className={styles.redirectText}>
          Don't have an account?&nbsp;
          <span onClick={() => navigate("/register")} className={styles.link}>
            Register here
          </span>
        </p>
        <p className={styles.redirectText}>
          Don't want to register or login?&nbsp;
          <span onClick={() => navigate("/")} className={styles.link}>
            Go back
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
