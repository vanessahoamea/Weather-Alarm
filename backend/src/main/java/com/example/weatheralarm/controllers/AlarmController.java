package com.example.weatheralarm.controllers;

import com.example.weatheralarm.models.Alarm;
import com.example.weatheralarm.models.Response;
import com.example.weatheralarm.models.Weather;
import com.example.weatheralarm.services.AuthenticationService;
import com.example.weatheralarm.services.AlarmService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/alarms")
public class AlarmController
{
    private final AuthenticationService authenticationService;
    private final AlarmService alarmService;

    public AlarmController(AuthenticationService authenticationService, AlarmService weatherService)
    {
        this.authenticationService = authenticationService;
        this.alarmService = weatherService;
    }

    @PostMapping
    public Object createAlarm(@RequestBody Alarm alarm, @RequestHeader("Authorization") String bearerToken)
    {
        String userId = checkBearerToken(bearerToken);

        Alarm existingAlarm = alarmService.getAlarm(alarm.getHour(), alarm.getMinutes());
        if(existingAlarm != null)
        {
            return new Response("Alarm already set for this time.", existingAlarm);
        }

        alarm.setUserId(userId);
        alarmService.createAlarm(alarm);

        return alarm;
    }

    @GetMapping
    public List<Alarm> getAlarms(@RequestHeader("Authorization") String bearerToken)
    {
        String userId = checkBearerToken(bearerToken);

        return alarmService.getAllAlarms(userId);
    }

    @GetMapping(path = "/{id}")
    public Alarm getAlarm(@PathVariable String id, @RequestHeader("Authorization") String bearerToken)
    {
        checkBearerToken(bearerToken);

        return alarmService.getAlarm(id);
    }

    @PutMapping(path = "/{id}")
    public Alarm updateAlarm(@RequestBody Alarm alarm, @PathVariable String id, @RequestHeader("Authorization") String bearerToken)
    {
        checkBearerToken(bearerToken);

        Alarm existingAlarm = alarmService.getAlarm(id);
        if(existingAlarm == null)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        existingAlarm.copy(alarm);

        return alarmService.saveAlarm(existingAlarm);
    }

    @DeleteMapping(path = "/{id}")
    public Alarm deleteAlarm(@PathVariable String id, @RequestHeader("Authorization") String bearerToken)
    {
        checkBearerToken(bearerToken);

        Alarm deletedAlarm = alarmService.deleteAlarm(id);
        if(deletedAlarm == null)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return deletedAlarm;
    }

    @GetMapping(path = "/{id}/weather")
    public Weather getAlarmWeather(@PathVariable String id, @RequestHeader("Authorization") String bearerToken)
    {
        System.out.println(id);
        checkBearerToken(bearerToken);

        Alarm alarm = alarmService.getAlarm(id);
        if(alarm == null)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return alarmService.getWeatherData(alarm.getLatitude(), alarm.getLongitude());
    }

    private String checkBearerToken(String bearerToken)
    {
        bearerToken = bearerToken.split("Bearer ")[1];
        String userId = authenticationService.verifyToken(bearerToken);

        if(userId == null)
        {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        return userId;
    }
}
