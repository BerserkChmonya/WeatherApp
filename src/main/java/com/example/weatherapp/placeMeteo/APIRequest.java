package com.example.weatherapp.placeMeteo;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

public class APIRequest {
    private final double latitude;
    private final double longitude;
    private String requestUrl = null;

    public APIRequest(double latitude, double longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }

    private void makeRequestUrl(){
        String apiUrl = "https://api.open-meteo.com/v1/forecast";
        requestUrl = String.format("%s?latitude=%f&longitude=%f&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m",
                apiUrl, latitude, longitude);
    }

    public Map<String, Object> makeRequest(){
        HttpURLConnection connection = null;
        try{
            //make request format url
            makeRequestUrl();
            //Create an HTTP connection
            URL url = new URL(requestUrl);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            //Read API response
            InputStream inputStream = connection.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder responseBuilder = new StringBuilder();
            String line;
            while((line = reader.readLine()) != null){
                responseBuilder.append(line);
            }
            reader.close();
            String jsonResponse = responseBuilder.toString();

            //Process JSON Response
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonResponse);
            //convert json node to map
            Map<String, Object> jsonMap = objectMapper.convertValue(jsonNode, Map.class);

            connection.disconnect();

            return jsonMap;

        } catch (Exception e){
            e.printStackTrace();
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}

