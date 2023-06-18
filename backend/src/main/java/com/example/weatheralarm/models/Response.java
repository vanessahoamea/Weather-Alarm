package com.example.weatheralarm.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Response
{
    private String message;
    private Object data;
}
