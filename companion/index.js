// companion/index.js
import { me as companion } from "companion";
import { displayWeather } from "./weather.js"; // Importing from weather.js

// Check for location permissions and display weather
if (companion.permissions.granted("access_location")) {
    console.log("Location permission granted.");
    displayWeather(); // Call the displayWeather function
} else {
    console.error("Location permission not granted.");
}