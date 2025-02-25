import * as document from "document";
import { initializeClock } from "./clock.js";  
import { initializeDate } from "./date.js"; 
import { initializeHR }from "./hrm.js";
import { updateBatteryLevel } from "./battery.js"; 

document.addEventListener("DOMContentLoaded", () => {
    // Initialize the clock and date displays
    initializeClock(); // Initialize the clock display
    initializeDate(); // Initialize the date display
    intervalFunction(); // Initialize heart rate monitoring
    initializeHR();
    // Update battery level display initially and then every minute
    updateBatteryLevel(); // Log the initial battery level
});