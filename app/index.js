import * as document from "document";
import * as messaging from "messaging";
import { initializeClock } from "./clock.js";  
import { initializeDate } from "./date.js"; 
import { initializeHR } from "./hrm.js";
import { updateBatteryLevel } from "./battery.js"; 
import { peerSocket } from "messaging";
import { updateWeatherDisplay } from "./weatherDisplay.js"; 
import { checkWristStatus } from "./accelerometer.js";
import { aodDisplay } from "./aod.js"
import * as fs from "fs";

import { me as device } from "device"; // Import device module
let myElement = document.getElementById("iFrame");

// Apply saved color on startup
try {
    if (fs.existsSync("color.txt")) {
        const savedColor = fs.readFileSync("color.txt", "utf-8");
        myElement.style.fill = savedColor;
    }
} catch (error) {
    console.log("Error reading color file:", error);
}

// Listen for incoming messages from the companion
peerSocket.addEventListener("message", (evt) => {
    if (evt && evt.data) {
        console.log("Pwr changed")
        // Filter and handle messages based on the key
        if (evt.data.key === "myColor") {
            // Handle color update
            myElement.style.fill = evt.data.value;
            // Save the color to file
            try {
                fs.writeFileSync("color.txt", evt.data.value, "utf-8");
            } catch (error) {
                console.log("Error saving color file:", error);
            }
        } else {
            // Handle other types of messages (e.g., weather updates)
            updateWeatherDisplay(evt.data);
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    aodDisplay();
    checkWristStatus();
  
    // Initialize the clock and date displays
    initializeClock(); // Clock will keep updating
    initializeDate(); // Initialize the date display
    initializeHR();

    // Update battery level display initially and then every minute
    updateBatteryLevel(); // Log the initial battery level
});
