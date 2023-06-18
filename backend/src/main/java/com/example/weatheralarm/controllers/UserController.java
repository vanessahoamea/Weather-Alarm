package com.example.weatheralarm.controllers;

import com.example.weatheralarm.models.Response;
import com.example.weatheralarm.models.User;
import com.example.weatheralarm.services.AuthenticationService;
import com.example.weatheralarm.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UserController
{
    private final UserService userService;
    private final AuthenticationService authenticationService;

    public UserController(UserService userService, AuthenticationService authenticationService)
    {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public User signup(@RequestBody User user)
    {
        User existingUser = this.userService.getUser(user.getEmail());
        if(existingUser != null)
        {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        String hashedPassword;
        try {
            hashedPassword = authenticationService.hashPassword(user.getPassword());
        }
        catch(Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        user.setPassword(hashedPassword);
        userService.createUser(user);

        return user;
    }

    @PostMapping("/login")
    public Response login(@RequestBody User user)
    {
        User existingUser = this.userService.getUser(user.getEmail());
        if(existingUser == null)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        try {
            if(!authenticationService.verifyPassword(user.getPassword(), existingUser.getPassword()))
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        catch(Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        String jwt = authenticationService.generateToken(existingUser);
        return new Response("Signed in successfully.", jwt);
    }

    @GetMapping
    public String test(@RequestHeader("Authorization") String bearerToken)
    {
        bearerToken = bearerToken.split("Bearer ")[1];
        return authenticationService.verifyToken(bearerToken);
    }
}
