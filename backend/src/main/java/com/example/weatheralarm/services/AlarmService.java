package com.example.weatheralarm.services;

import com.example.weatheralarm.models.Alarm;
import com.example.weatheralarm.models.Weather;
import com.example.weatheralarm.repositories.AlarmRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
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
        List<Alarm> sortedAlarms = new ArrayList<>();
        List<Alarm> alarms = alarmRepository.findAlarmsByUserId(userId);

        try {
            sortedAlarms.add(alarms.remove(0));
        } catch(Exception e) {
            //
        }

        while(!alarms.isEmpty())
        {
            int left = 0;
            int right = sortedAlarms.size() - 1;
            Alarm item = alarms.remove(0);

            while(left <= right)
            {
                int middle = (left + right) / 2;

                if(item.isBefore(sortedAlarms.get(middle)))
                    right = middle - 1;
                else
                    left = middle + 1;
            }

            sortedAlarms.add(left, item);
        }

        return sortedAlarms;
    }

    public Alarm deleteAlarm(String id)
    {
        return alarmRepository.deleteAlarmById(id)
                .orElse(null);
    }

    public Alarm saveAlarm(Alarm alarm)
    {
        return alarmRepository.save(alarm);
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
