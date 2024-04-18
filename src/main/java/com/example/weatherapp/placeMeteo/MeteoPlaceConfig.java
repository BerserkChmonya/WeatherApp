package com.example.weatherapp.placeMeteo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class MeteoPlaceConfig {
    @Bean
    CommandLineRunner commandLineRunner(MeteoRepository repository){
        return args -> {
            List<PlaceMeteo> places = readPlaceFromFile("static/places.txt");
            repository.saveAll(places);
        };
    }

    private List<PlaceMeteo> readPlaceFromFile(String filename) throws IOException{
        List<PlaceMeteo> places = new ArrayList<>();
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(filename);
        if(inputStream != null) {
            try(BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    String[] parts = line.split(",");
                    if (parts.length >= 3) {
                        String name = parts[0].trim();
                        double latitude = Double.parseDouble(parts[1].trim());
                        double longitude = Double.parseDouble(parts[2].trim());
                        PlaceMeteo place = new PlaceMeteo(name);
                        place.setPos(latitude, longitude);
                        places.add(place);
                    }
                }
            }
        }

        return places;
    }
}
