import { peerSocket } from "messaging";
import { me as companion } from "companion";
import weather from "weather";
import WeatherCondition from './weatherConditions.js';

let queuedUpdates = []; // Array to hold updates until the socket is open

function findWeatherConditionName(WeatherCondition, conditionCode) {
    for (const code in WeatherCondition) {
        if (parseInt(code) === conditionCode) {
            return WeatherCondition[code]; // Return the name corresponding to the code
        }
    }
    return "Unknown"; // Return "Unknown" if the code is not found
}

export function displayWeather() {
    if (companion.permissions.granted("access_location")) {
        weather.getWeatherData()
            .then((data) => {
                console.log("Weather data received:", data); // Log the entire data object

                let weatherUpdate = {
                    temp: null,
                    code: "Unknown",
                    cond: "Unknown",
                    loc: "Unknown",
                    uni: "C" // Default unit
                };

                if (data.locations.length > 0) {
                    const currentWeather = data.locations[0].currentWeather;

                    

                    const conditionCode = currentWeather.weatherCondition;
                    const conditionName = findWeatherConditionName(WeatherCondition, conditionCode);

                    // Log the raw condition code and the corresponding name
                    console.log("Condition code:", conditionCode);

                    weatherUpdate.cond = conditionName; // Set the descriptive name
                    weatherUpdate.temp = Math.floor(currentWeather.temperature);
                    weatherUpdate.loc = data.locations[0].name;
                    weatherUpdate.uni = data.temperatureUnit;
                    weatherUpdate.code = conditionCode;

                    console.log("Weather fetched.");
                } else {
                    console.error("No locations found in weather data.");
                }

                sendUpdate(weatherUpdate); // Attempt to send the update
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                if (error.stack) {
                    console.error("Error stack:", error.stack);
                }
                sendUpdate({
                    temp: null,
                    code: "Error retrieving data",
                    cond: "Error retrieving data",
                    loc: "Unknown",
                    uni: "C"
                });
            });
    } else {
        console.error("Location permission not granted.");
        sendUpdate({
            temp: null,
            code: "Permission denied",
            cond: "Permission denied",
            loc: "Unknown",
            uni: "C"
        });
    }
}

function sendUpdate(weatherUpdate) {
    if (peerSocket.readyState === peerSocket.OPEN) {
        peerSocket.send(weatherUpdate);
    } else {
        console.error("Peer socket is not open. Queuing update.");
        queuedUpdates.push(weatherUpdate); // Queue the update
    }
}

// Handle socket open event to send queued updates
peerSocket.onopen = () => {
    console.log("Peer socket is open. Sending queued updates.");
    while (queuedUpdates.length > 0) {
        const update = queuedUpdates.shift(); // Get the first queued update
        peerSocket.send(update); // Send it
    }
};