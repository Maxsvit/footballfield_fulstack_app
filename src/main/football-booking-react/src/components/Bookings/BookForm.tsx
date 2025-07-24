import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService.ts";
import fieldService from "../../services/fieldService.ts";
import styles from "./BookForm.module.css";

const BookForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [fieldName, setFieldName] = useState<string>("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState<number | "">("");

  useEffect(() => {
    if (id) {
      loadFieldName();
    }
  }, [id]);

  const loadFieldName = async () => {
    try {
      const field = await fieldService.getFieldById(Number(id));
      setFieldName(field.name);
    } catch (error) {
      alert("Error loading field information.");
      navigate("/fields");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id) return;

    const bookingData = {
      fieldId: Number(id),
      date,
      startTime,
      duration: Number(duration),
    };

    try {
      await bookingService.createBooking(bookingData);
      alert("Booking successful!");
      navigate("/bookings");
    } catch (error) {
      alert("Error creating booking.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>
          {fieldName ? `Book Field: ${fieldName}` : "Loading..."}
        </h2>
        <div className={styles.formGroup}>
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startTime">Start Time:</label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            id="duration"
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookForm;
