package com.example.weatheralarm.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Weather
{
    private String location;
    private String country;
    private Double temperature;
    private String condition;
    private String iconUrl;
    private Double wind;
    private Integer humidity;
    private Double uvIndex;
}
