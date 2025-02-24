// index.js
import * as document from "document";
import clock from "clock";
import { initializeHR } from "./heartrate.js";  
import { initializeDate } from "./clock.js"; 
import { updateBatteryLevel } from "./battery.js"; 

document.addEventListener("DOMContentLoaded", () => {
    initializeDate(); 
    initializeHR(); 

    // Update battery level display initially and then every minute
    updateBatteryLevel(); // This should log the battery level
    setInterval(() => {
        try {
            updateBatteryLevel();
        } catch (error) {
            console.error("Error updating battery level:", error);
        }
    }, 60000); // 1 minute in milliseconds
});