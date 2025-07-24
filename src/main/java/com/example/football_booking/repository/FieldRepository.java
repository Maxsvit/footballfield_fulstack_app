package com.example.football_booking.repository;

import com.example.football_booking.model.Field;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FieldRepository  extends JpaRepository<Field, Long> {

}
