import { peerSocket } from "messaging"; // Import messaging for communication
import { me as companion } from "companion";
import weather from "weather"; // Ensure this is the correct import for the weather API
// Removed the import for updateWeatherDisplay as per your note

export function displayWeather() {
    if (companion.permissions.granted("access_location")) {
        console.log("Location permission granted.");
        
        weather.getWeatherData() // Ensure this function is defined in the weather module
            .then(data => {
                if (data.locations.length > 0) {
                    const currentWeather = data.locations[0].currentWeather; // Fixed syntax error here
                    const temp = Math.floor(currentWeather.temperature);
                    const cond = findWeatherConditionName(Conditions, currentWeather.weatherCondition); // Use currentWeather directly
                    const loc = data.locations[0].name;
                    const uni = data.temperatureUnit; // Make sure to capture the unit

                    const weatherUpdate = {
                        temp,
                        cond,
                        loc,
                        uni
                    };

                    console.log("Weather data fetched:", weatherUpdate);
                    
                    // Send the weather data to the app to update the UI
                    peerSocket.send({ type: "updateWeather", data: weatherUpdate });
                } else {
                    console.error("No locations found in weather data.");
                }
            })
            .catch(ex => {
                console.error("Error fetching weather data:", ex);
            });
    } else {
        console.error("Location permission not granted.");
    }
}

// Function to map weather condition codes to names
function findWeatherConditionName(WeatherCondition, conditionCode) {
    for (const condition of Object.keys(WeatherCondition)) {
        if (conditionCode === WeatherCondition[condition]) {
            return condition;
        }
    }
    return "Unknown"; // Return "Unknown" if the condition code is not found
}