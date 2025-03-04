import * as document from "document";
import { initializeClock } from "./clock.js";  
import { initializeDate } from "./date.js"; 
import { initializeHR } from "./hrm.js";
import { updateBatteryLevel } from "./battery.js"; 
import { peerSocket } from "messaging";
import { updateWeatherDisplay } from "./weatherDisplay.js"; // Import the function
import { checkWristStatus } from "./accelerometer.js";

// Listen for incoming messages from the companion
peerSocket.onmessage = (evt) => {
    console.log("Received update."); // Log the entire received message
    // Directly use evt.data since we're sending just the weatherUpdate
    updateWeatherDisplay(evt.data); // Pass the received data to the display function
};

document.addEventListener("DOMContentLoaded", () => {
    checkWristStatus();
  
    // Initialize the clock and date displays
    initializeClock(); // Initialize the clock display
    initializeDate(); // Initialize the date display
    initializeHR();

    // Update battery level display initially and then every minute
    updateBatteryLevel(); // Log the initial battery level
});