import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService.ts";
import fieldService from "../../services/fieldService.ts";
import authService from "../../services/authService.ts";
import styles from "./EditBookingForm.module.css";

const EditBookingForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [fields, setFields] = useState<any[]>([]);
  const [booking, setBooking] = useState<any>({
    fieldId: "",
    date: "",
    startTime: "",
    duration: "",
    status: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await loadFields();
      await loadBooking();
      checkUserRole();
    };
    initialize();
  }, []);

  const checkUserRole = () => {
    const adminRole = authService.isAdmin();
    setIsAdmin(adminRole);
  };

  const loadFields = async () => {
    try {
      const data = await fieldService.getFields();
      setFields(data);
    } catch (err) {
      alert("Error loading fields");
    }
  };

  const loadBooking = async () => {
    try {
      const data = await bookingService.getById(Number(id));
      console.log("Booking details from backend:", data);
      setBooking({
        fieldId: data.field.id,
        date: data.date,
        startTime: data.startTime,
        duration: data.duration,
        status: data.status,
      });
    } catch (err: any) {
      console.error("loadBooking error:", err);
      alert("Error loading booking details");
      navigate("/bookings");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookingService.updateBooking(Number(id), booking);
      alert("Booking updated successfully!");
      navigate("/bookings");
    } catch (err) {
      alert("Error updating booking");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Booking</h2>
      <form onSubmit={handleSubmit}>
        {/* Field */}
        <div>
          <label htmlFor="fieldId">Field</label>
          <select
            id="fieldId"
            name="fieldId"
            value={booking.fieldId}
            onChange={handleChange}
          >
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={booking.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Start Time */}
        <div>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={booking.startTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration">Duration (hours)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={booking.duration}
            onChange={handleChange}
            required
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status">Status</label>
          {isAdmin ? (
            <select
              id="status"
              name="status"
              value={booking.status || "PENDING"}
              onChange={handleChange}
            >
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELED">Canceled</option>
            </select>
          ) : (
            <input
              type="text"
              id="status"
              name="status"
              value={booking.status}
              className={styles.readOnlyInput}
              readOnly
            />
          )}
        </div>

        <button type="submit" className={styles.button}>
          Update Booking
        </button>
      </form>
    </div>
  );
};

export default EditBookingForm;
