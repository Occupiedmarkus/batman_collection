import weather from "weather";
import { peerSocket } from "messaging"; // Import messaging for communication
import { me as companion } from "companion";
import weather from "weather"; // Ensure this is the correct import for the weather API

export function displayWeather() {
    if (companion.permissions.granted("access_location")) {
        weather.getWeatherData()
            .then(data => {
                if (data.locations.length > 0) {
                    const currentWeather = data.locations[0].currentWeather;
                    const temperature = Math.floor(currentWeather.temperature);
                    const condition = currentWeather.weatherCondition;
                    const locationName = data.locations[0].name;
                    const loc = data.locations[0].name;

                    const weatherUpdate = {
                        temperature,
                        locationName
                        uni
                    };

                    console.log("Weather data fetched:", weatherUpdate);
                    
                    // Send the weather data to the app to update the UI
                }
            })
            .catch(ex => {
                console.error("Error fetching weather data:", ex);
            });
    } else {
        console.error("Location permission not granted.");
    }
}

}