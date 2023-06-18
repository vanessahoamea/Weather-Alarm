package com.example.weatheralarm.services;

import com.example.weatheralarm.models.User;
import com.example.weatheralarm.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public void createUser(User user)
    {
        userRepository.insert(user);
    }

    public User getUser(String email)
    {
        return userRepository.findUserByEmail(email)
                .orElse(null);
    }
}
