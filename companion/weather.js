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

                    weatherUpdate.cond = conditionName;
                    console.log("Code:" + conditionCode + "- Condition:" + conditionName + ".");
                    weatherUpdate.temp = Math.floor(currentWeather.temperature);
                    weatherUpdate.loc = data.locations[0].name;
                    weatherUpdate.uni = data.temperatureUnit;
                    weatherUpdate.code = conditionCode;

                    console.log("Weather fetched.");
                } else {
                    console.error("No locations found in weather data.");
                    handleError("LocationUnavailableError");
                }

                sendUpdate(weatherUpdate); // Attempt to send the update
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                if (error instanceof LocationUnavailableError) {
                    handleError("LocationUnavailableError");
                } else if (error instanceof WeatherServiceUnavailableError) {
                    handleError("WeatherServiceUnavailableError");
                } else if (error instanceof NetworkUnreachableError) {
                    handleError("NetworkUnreachableError");
                } else {
                    handleError("Error retrieving data");
                }
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

function handleError(errorType) {
    const errorMessages = {
        "LocationUnavailableError": {
            temp: null,
            code: "Location unavailable",
            cond: "Location unavailable",
            loc: "Unknown",
            uni: "C"
        },
        "WeatherServiceUnavailableError": {
            temp: null,
            code: "Weather service unavailable",
            cond: "Weather service unavailable",
            loc: "Unknown",
            uni: "C"
        },
        "NetworkUnreachableError": {
            temp: null,
            code: "Network unreachable",
            cond: "Network unreachable",
            loc: "Unknown",
            uni: "C"
        },
        "QuotaExceededError": {
            temp: null,
            code: "Quota exceeded",
            cond: "Quota exceeded",
            loc: "Unknown",
            uni: "C"
        },
        "default": {
            temp: null,
            code: "Unknown error",
            cond: "Unknown error",
            loc: "Unknown",
            uni: "C"
        }
    };

    const message = errorMessages[errorType] || errorMessages["default"];
    sendUpdate(message);
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