# Weather Forecaster

This is a simple weather forecaster application that allows users to view the weather forecast for any location. The application is built using ReactJS for the frontend, styled with TailwindCSS, and retrieves weather data using the OpenWeatherMap API.

## Table of Contents
- Features
- Technologies Used 
- Project Structure
- Prerequisites
- Environment Variables
- Usage

## Features
- Search Functionality: Users can search for weather forecasts by entering a city name or location.
- Current Weather: Displays the current weather conditions including temperature, humidity and wind speed.
- 4-Day Forecast: Shows a 4-day weather forecast with details such as temperature and weather conditions for each day.
- Real-time data: Shows the real time forecast of any chosen location
- Responsive Design: The application is optimized for both desktop and mobile devices.

## Technologies Used
- React.js: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for styling.
- Axios: For making HTTP requests to the backend.
- OpenWeatherMap API - Provides weather data for any location.

## Project Structure
The project is organized into two main directories:

- **client/** : Contains the React frontend code.

## Prerequisites
Make sure you have the following installed:

- npm: Ensure it's up to date.

## Environment Variables
The .env file should contain the following environment variables:

- **API_KEY:** Your API connection string.

## Usage
Once the application is running:

- Search: Use the search bar to enter a city name or location. The app will fetch and display the current weather and the 4-day forecast for that location.
- View Forecast: Browse through the forecast to see the weather predictions for the coming days.
