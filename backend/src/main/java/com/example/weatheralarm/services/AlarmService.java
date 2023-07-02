package com.example.weatheralarm.services;

import com.example.weatheralarm.models.Alarm;
import com.example.weatheralarm.models.Weather;
import com.example.weatheralarm.repositories.AlarmRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class AlarmService
{
    private final AlarmRepository alarmRepository;
    private final Dotenv dotenv = Dotenv.load();

    public AlarmService(AlarmRepository alarmRepository)
    {
        this.alarmRepository = alarmRepository;
    }

    public void createAlarm(Alarm alarm)
    {
        alarmRepository.insert(alarm);
    }

    public Alarm getAlarm(String id)
    {
        return alarmRepository.findAlarmById(id)
                .orElse(null);
    }

    public Alarm getAlarm(int hour, int minutes)
    {
        return alarmRepository.findAlarmByHourAndMinutes(hour, minutes)
                .orElse(null);
    }

    public List<Alarm> getAllAlarms(String userId)
    {
        return alarmRepository.findAlarmsByUserId(userId);
    }

    public Alarm deleteAlarm(String id)
    {
        return alarmRepository.deleteAlarmById(id)
                .orElse(null);
    }

    public Weather getWeatherData(float latitude, float longitude)
    {
        RestTemplate restTemplate = new RestTemplate();

        Map response = restTemplate.getForObject(
                dotenv.get("WEATHER_API_URL") +
                        "?key=" + dotenv.get("WEATHER_API_KEY") +
                        "&q=" + latitude + "," + longitude,
                Map.class);

        Map<String, String> location = (Map) response.get("location");
        Map<String, Object> current = (Map) response.get("current");
        Map<String, String> condition = (Map) current.get("condition");

        return new Weather(
                location.get("name"),
                location.get("country"),
                (Double) current.get("temp_c"),
                condition.get("text"),
                "https://" + condition.get("icon").split("//")[1],
                (Double) current.get("wind_kph"),
                (Integer) current.get("humidity"),
                (Double) current.get("uv")
        );
    }
}
