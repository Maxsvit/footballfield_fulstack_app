package com.example.football_booking.Service;

import com.example.football_booking.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    User getAuthenticatedUser();

}
