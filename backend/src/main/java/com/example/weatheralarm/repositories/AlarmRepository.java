package com.example.weatheralarm.repositories;

import com.example.weatheralarm.models.Alarm;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlarmRepository extends MongoRepository<Alarm, String>
{
    Optional<Alarm> findAlarmById(String id);
    Optional<Alarm> findAlarmByHourAndMinutes(int hour, int minutes);
    List<Alarm> findAlarmsByUserId(String userId);
    Optional<Alarm> deleteAlarmById(String id);
}
