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
    updateWeatherDisplay(evt); // Call the function to update the display
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