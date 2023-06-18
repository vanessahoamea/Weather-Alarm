package com.example.weatheralarm.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class User
{
    @Id
    private String id;
    @Indexed(unique = true)
    private String email;
    private String password;

    public User(String email, String password)
    {
        this.email = email;
        this.password = password;
    }
}
