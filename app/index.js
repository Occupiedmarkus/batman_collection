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
import { me } from "appbit"; // Fix the import

const SETTINGS_FILE = "settings.json";
const SETTINGS_TYPE = "json";

let settings = loadSettings();
let myElement = document.getElementById("iFrame");

function loadSettings() {
    try {
        return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    } catch (ex) {
        return {
            myColor: "#fe0000" // Default color
        };
    }
}

// Save settings when app unloads
me.addEventListener("unload", saveSettings); // Use 'me' instead of 'device'
function saveSettings() {
    fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

// Apply saved color on startup
if (settings.myColor) {
    myElement.style.fill = settings.myColor;
}

// Listen for incoming messages from the companion
peerSocket.addEventListener("message", (evt) => {
    if (evt && evt.data) {
        // Handle other types of messages (e.g., weather updates)
        updateWeatherDisplay(evt.data);
        console.log("weather updated")
        // Filter and handle messages based on the key
        if (evt.data.key === "myColor") {
            // Handle color update
            console.log("Pwr changed")
            settings.myColor = JSON.parse(evt.data.value);
            myElement.style.fill = settings.myColor;
            saveSettings(); // Save the updated settings
        } else {

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
