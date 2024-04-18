package com.example.weatherapp.placeMeteo;

import jakarta.persistence.*;

@Entity
@Table
public class PlaceMeteo {
    @Id
    @SequenceGenerator(
            name = "place_sequence",
            sequenceName = "place_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "place_sequence"
    )
    private Long Id;
    private String name;
    private double latitude;
    private double longitude;

    public PlaceMeteo() { }
    public PlaceMeteo(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }
    public void setPos(double latitude, double longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }
    public double getLatitude(){
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

}
