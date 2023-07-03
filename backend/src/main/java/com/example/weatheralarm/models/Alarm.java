package com.example.weatheralarm.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Alarm
{
    @Id
    private String id;
    private String userId;
    private String title;
    private float latitude;
    private float longitude;
    private int hour;
    private int minutes;

    public Alarm(String title, float latitude, float longitude, int hour, int minutes)
    {
        this.title = title;
        this.latitude = latitude;
        this.longitude = longitude;
        this.hour = hour;
        this.minutes = minutes;
    }

    public boolean isBefore(Alarm alarm)
    {
        LocalTime time1 = LocalTime.of(this.getHour(), this.getMinutes());
        LocalTime time2 = LocalTime.of(alarm.getHour(), alarm.getMinutes());

        return time1.isBefore(time2);
    }
}
