package com.example.weatherapp.placeMeteo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/meteo")
@CrossOrigin
public class PlaceMeteoController {
    private final MeteoService meteoService;
    @Autowired
    public PlaceMeteoController(MeteoService meteoService) {
        this.meteoService = meteoService;
    }

   // @GetMapping
    public List<PlaceMeteo> getPlaces(){
        return meteoService.getPlaces();
    }
    @GetMapping("/place/{name}/meteodata")
    public Map<String, Object> makeRequest(@PathVariable String name){
        return meteoService.makeRequest(name);
    }
    @GetMapping("/place/{name}/currentWeather")
    public Map<String, Object> currentWeather(@PathVariable String name){
        return meteoService.currentWeather(name);
    }

    @PostMapping
    public void addPlace(@RequestBody PlaceMeteo placeMeteo){
        meteoService.addPlace(placeMeteo);
    }
    @DeleteMapping(path = "{Id}")
    public  void deletePlace(@PathVariable("Id") Long Id){
        meteoService.deletePlace(Id);
    }
}
