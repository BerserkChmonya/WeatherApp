package com.example.weatherapp.placeMeteo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MeteoRepository extends JpaRepository<PlaceMeteo, Long> {
    @Query("SELECT s FROM PlaceMeteo s WHERE s.name = ?1")
    Optional<PlaceMeteo> findPlaceByName(String name);
}
