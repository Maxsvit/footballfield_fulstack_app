import React, { useEffect, useState } from "react";
import bookingService from "../../services/bookingService.ts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./BookingList.module.css";

const BookingList: React.FC = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getAll();
      setBookings(data);
    } catch (err) {
      alert("Error loading bookings");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await bookingService.deleteBooking(id);
      alert("Booking deleted");
      loadBookings();
    } catch (err) {
      alert("Error deleting booking");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/bookings/edit/${id}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{t("bookings")}</h2>
      {bookings.length === 0 ? (
        <p className={styles.noData}>No bookings found.</p>
      ) : (
        <div className={styles.list}>
          {bookings.map((b) => (
            <div key={b.id} className={styles.card}>
              <div className={styles.info}>
                <p>
                  <strong>Field:</strong> {b.field?.name}
                </p>
                <p>
                  <strong>Date:</strong> {b.date}
                </p>
                <p>
                  <strong>Time:</strong> {b.startTime}
                </p>
                <p>
                  <strong>Duration:</strong> {b.duration} min
                </p>
                <p>
                  <strong>Status:</strong> {b.status}
                </p>
              </div>
              <div className={styles.actions}>
                <button
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={() => handleDelete(b.id)}
                >
                  Delete
                </button>
                <button
                  className={`${styles.button} ${styles.editButton}`}
                  onClick={() => handleEdit(b.id)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
