import { peerSocket } from "messaging";
import { me as companion } from "companion";
import weather from "weather";

// Define or import the WeatherCondition mapping
const WeatherCondition = {
    0: "Clear",
    1: "Partly Cloudy",
    2: "Cloudy",
    3: "Overcast",
    4: "Fog",
    5: "Rain",
    6: "Snow",
    32: "Windy",
    // Add other conditions as necessary
};

let queuedUpdates = []; // Array to hold updates until the socket is open

export function displayWeather() {
    if (companion.permissions.granted("access_location")) {
        weather.getWeatherData()
            .then((data) => {
                console.log("Weather received:", data);

                let weatherUpdate = {
                    temp: null,
                    cond: "Unknown",
                    loc: "Unknown",
                    uni: "C" // Default unit
                };

                if (data.locations.length > 0) {
                    const currentWeather = data.locations[0].currentWeather;
                    weatherUpdate.cond = findWeatherConditionName(WeatherCondition, currentWeather.weatherCondition);
                    weatherUpdate.temp = Math.floor(currentWeather.temperature);
                    weatherUpdate.loc = data.locations[0].name;
                    weatherUpdate.uni = data.temperatureUnit;

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
                    cond: "Error retrieving data",
                    loc: "Unknown",
                    uni: "C"
                });
            });
    } else {
        console.error("Location permission not granted.");
        sendUpdate({
            temp: null,
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

// Function to map weather condition codes to names
function findWeatherConditionName(WeatherCondition, conditionCode) {
    return WeatherCondition[conditionCode] || "Unknown"; // Use the mapping for conditions
}