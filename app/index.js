import * as document from "document";
import { initializeClock } from "./clock.js";  
import { initializeDate } from "./date.js"; 
import { initializeHR } from "./heartrate.js";  
import { updateBatteryLevel } from "./battery.js"; 

document.addEventListener("DOMContentLoaded", () => {
    // Initialize the clock and date displays
    initializeClock(); // Initialize the clock display
    initializeDate(); // Initialize the date display
    initializeHR(); // Initialize heart rate monitoring

    // Update battery level display initially and then every minute
    updateBatteryLevel(); // Log the initial battery level
    setInterval(() => {
        try {
            updateBatteryLevel(); // Update battery level every minute
        } catch (error) {
            console.error("Error updating battery level:", error);
        }
    }, 60000); // 1 minute in milliseconds
});