package com.example.football_booking.Service;

import com.example.football_booking.model.Field;

import java.util.List;

public interface FieldService {
    List<Field> getAllFields();
    Field getFieldById(Long id);
    Field createField(Field field);
    Field updateField(Long id, Field field);
    void deleteField(Long id);
}
