package com.example.weatherapp.placeMeteo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;

@Service
public class MeteoService {
    private final MeteoRepository meteoRepository;
    @Autowired
    public MeteoService(MeteoRepository meteoRepository){
        this.meteoRepository = meteoRepository;
    }
    public List<PlaceMeteo> getPlaces(){
        return meteoRepository.findAll();
    }
    public void addPlace(PlaceMeteo place){
        Optional<PlaceMeteo> placeByName = meteoRepository.findPlaceByName(place.getName());
        if(placeByName.isPresent()){
            throw new IllegalStateException("name taken");
        }
        meteoRepository.save(place);
    }

    public void deletePlace(Long Id){
        if(!meteoRepository.existsById(Id)){
            throw  new IllegalStateException("student with id" + Id + " does not exist");
        }
        meteoRepository.deleteById(Id);
    }

    public Map<String, Object> makeRequest(String name){
        Optional<PlaceMeteo> optionalPlace = meteoRepository.findPlaceByName(name);
        if(optionalPlace.isPresent()) {
            PlaceMeteo place = optionalPlace.get();
            return new APIRequest(place.getLatitude(), place.getLongitude()).makeRequest();
        }
        else {
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("There is not selected city!", -1);
            return data;
        }
    }

    public Map<String, Object> currentWeather(String name){
        Map<String, Object> meteodata = this.makeRequest(name);
        Map<String, Object> currentData = new HashMap<>();
        Map<String, Object> hourlyData = (Map<String, Object>) meteodata.get("hourly"); // Corrected this line
        List<String> timeList = (List<String>) hourlyData.get("time");
        List<Double> temp = (List<Double>) hourlyData.get("temperature_2m");
        List<Integer> hum = (List<Integer>) hourlyData.get("relative_humidity_2m");
        List<Double> precipitation = (List<Double>) hourlyData.get("precipitation");
        List<Double> wind = (List<Double>) hourlyData.get("wind_speed_10m");

        int index = timeList.indexOf("2024-02-10T09:00");
        currentData.put("temperature_2m", temp.get(index));
        currentData.put("relative_humidity_2m", hum.get(index));
        currentData.put("precipitation", precipitation.get(index));
        currentData.put("wind_speed_10m", wind.get(index));

        return currentData;
    }
}
