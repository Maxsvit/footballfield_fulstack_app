import React, { useEffect, useState } from "react";
import userService from "../../services/userService.ts";
import styles from "./UserList.module.css";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      alert("Error loading users");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await userService.deleteUser(id);
      alert("User deleted");
      loadUsers();
    } catch (err) {
      alert("Error deleting user");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User List</h2>
      {users.length === 0 ? (
        <p className={styles.noUsers}>No users found.</p>
      ) : (
        <div className={styles.userList}>
          {users.map((u) => (
            <div key={u.id} className={styles.userCard}>
              <span className={styles.userInfo}>
                <strong>{u.name}</strong> ({u.email}) - {u.role}
              </span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(u.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
