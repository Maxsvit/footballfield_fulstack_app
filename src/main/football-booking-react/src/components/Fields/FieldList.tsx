// src/components/Fields/FieldList.tsx
import React, { useEffect, useState } from "react";
import fieldService from "../../services/fieldService.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./FieldList.module.css";

const FieldList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [fields, setFields] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;

  useEffect(() => {
    loadFields();
  }, []);

  const loadFields = async () => {
    try {
      const data = await fieldService.getFields();
      setFields(data);
    } catch (err) {
      alert("Error loading fields");
    }
  };

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedFields = fields.slice(startIndex, endIndex);
  const totalPages = Math.ceil(fields.length / pageSize);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const handleFieldClick = (id: string | number) => {
    navigate(`/fields/${id}`);
  };

  return (
    <div className={styles.container}>
      <h2>{t("fields")}</h2>
      {displayedFields.length === 0 ? (
        <p>{t("noData")}</p>
      ) : (
        <div className={styles.fieldGrid}>
          {displayedFields.map((field, idx) => (
            <div
              key={idx}
              className={styles.fieldCard}
              onClick={() => handleFieldClick(field.id)}
            >
              <img
                src={`http://localhost:8080/${field.photo}`}
                alt={field.name}
                className={styles.fieldImage}
              />
              <div className={styles.fieldInfo}>
                <h3>{field.name}</h3>
                <p>{field.address}</p>
                <p>
                  {t} ${field.rentalCost}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.pagination}>
        <button disabled={currentPage === 0} onClick={handlePrev}>
          {t("previous")}
        </button>
        <span>
          {t("page")} {currentPage + 1} {t("of")} {totalPages}
        </span>
        <button disabled={currentPage >= totalPages - 1} onClick={handleNext}>
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default FieldList;
