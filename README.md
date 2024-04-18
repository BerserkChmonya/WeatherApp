# WeatherApp

## Description
WeatherApp is a web application that provides weather forecasts. It uses the Open-Meteo API to fetch weather data based on latitude and longitude.

## Technologies Used
- Java
- JavaScript
- React
- Spring Boot
- Maven
- MySQL

## Setup and Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Run `mvn clean install` to build the project.
4. Start the application with `mvn spring-boot:run`.
5. Navigate to the front directory.
6. Install the dependencies with `npm install`.
7. Start the application with `npm start`.

## Database Setup and Usage

This application uses MySQL for data storage. Follow these steps to set up and use the database:

1. Install MySQL if you haven't already. You can download it from [here](https://dev.mysql.com/downloads/mysql/).
2. Create a new database for the application.
3. Update the `application.properties` file in the `src/main/resources` directory with your MySQL credentials and database name. It should look something like this:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## Usage
Once the application front-end is running, you can access it at `http://localhost:3000` and back-end at `http://localhost:8000`.
For editing cities, you can go to src/main/resources/places.txt and add or remove cities and their latitude, longitude and time offset.
