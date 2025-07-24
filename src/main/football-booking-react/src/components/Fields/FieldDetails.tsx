import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import fieldService from "../../services/fieldService.ts";
import styles from "./FieldDetails.module.css";

const FieldDetails: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [field, setField] = useState<any>(null);

  useEffect(() => {
    loadField();
  }, []);

  const loadField = async () => {
    try {
      const data = await fieldService.getFieldById(Number(id));
      setField(data);
    } catch (err) {
      alert("Error loading field details");
      navigate("/");
    }
  };
  const handleBookNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/fields/${id}/book`);
    }
  };

  if (!field) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h2>{field.name}</h2>
      <img
        src={`http://localhost:8080/${field.photo}`}
        alt={field.name}
        className={styles.image}
      />
      <p>
        <strong>{t("description")}:</strong> {field.description}
      </p>
      <p>
        <strong>{t("adress")}:</strong> {field.address}
      </p>
      <p>
        <strong>{t("cost")}:</strong> ${field.rentalCost}
      </p>
      <button onClick={handleBookNow} className={styles.bookingButton}>
        {t("booknow")}
      </button>
    </div>
  );
};

export default FieldDetails;
