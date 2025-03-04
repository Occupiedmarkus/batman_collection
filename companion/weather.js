import { me as companion } from "companion";
import weather from "weather";
import { peerSocket } from "messaging"; // Import messaging for communication

export function displayWeather() {
    if (companion.permissions.granted("access_location")) {
        weather.getWeatherData()
            .then(data => {
                if (data.locations.length > 0) {
                    const currentWeather = data.locations[0].currentWeather;
                    const temperature = Math.floor(currentWeather.temperature);
                    const condition = currentWeather.weatherCondition;
                    const locationName = data.locations[0].name;

                    // Create a message object to send to the app
                    const weatherUpdate = {
                        temperature,
                        locationName
                    };

                    // Send the weather data to the app
                    if (peerSocket.readyState === peerSocket.OPEN) {
                        peerSocket.send(weatherUpdate);
                    }
                }
            })
            .catch(ex => {
                console.error("Error fetching weather data:", ex);
            });
    } else {
        console.error("Location permission not granted.");
    }
}