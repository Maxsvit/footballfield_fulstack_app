import React, { useEffect, useState } from "react";
import userService from "../../services/userService.ts";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";
import { useTranslation } from "react-i18next";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>({
    name: "",
    email: "",
    password: "",
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const data = await userService.getCurrentUser();
      setUser(data);
    } catch (err) {
      alert("Error loading user data");
      navigate("/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userService.updateUser(user.id, user);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("data")}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.updateButton}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
