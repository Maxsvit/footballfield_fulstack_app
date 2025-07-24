package com.example.football_booking.Service;

import com.example.football_booking.model.Field;
import com.example.football_booking.repository.FieldRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldServiceImpl implements FieldService {

    private final FieldRepository fieldRepository;

    public FieldServiceImpl(FieldRepository fieldRepository) {
        this.fieldRepository = fieldRepository;
    }

    @Override
    public List<Field> getAllFields() {
        return fieldRepository.findAll();
    }

    @Override
    public Field getFieldById(Long id) {
        return fieldRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Field with ID " + id + " not exist"));
    }

    @Override
    public Field createField(Field field) {
        return fieldRepository.save(field);
    }

    @Override
    public Field updateField(Long id, Field field) {
        Field existingField = getFieldById(id);
        existingField.setName(field.getName());
        existingField.setAddress(field.getAddress());
        existingField.setDescription(field.getDescription());
        existingField.setRentalCost(field.getRentalCost());
        existingField.setPhoto(field.getPhoto());
        return fieldRepository.save(existingField);
    }

    @Override
    public void deleteField(Long id) {
        if (!fieldRepository.existsById(id)) {
            throw new RuntimeException("Field with ID " + id + " not exist");
        }
        fieldRepository.deleteById(id);
    }
}
