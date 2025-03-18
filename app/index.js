import * as document from "document";
import * as messaging from "messaging";
import { initializeClock } from "./clock.js";  
import { initializeDate } from "./date.js"; 
import { initializeHR } from "./hrm.js";
import { updateBatteryLevel } from "./battery.js"; 
import { peerSocket } from "messaging";
import { updateWeatherDisplay } from "./weatherDisplay.js"; 
import { checkWristStatus } from "./accelerometer.js";
import { display } from "display";
import { me as device } from "device"; // Import device module

// Declare element references
const batteryEl = document.getElementById('battery-display');
const hrIcon = document.getElementById('hrIcon');
const hrIcon2 = document.getElementById('hrIcon2');
const batman = document.getElementById('batman');
const dateLabel = document.getElementById('date-label');
const hr1 = document.getElementById('hr1');
const hr2 = document.getElementById('hr2');
const hr3 = document.getElementById('hr3');
const block1 = document.getElementById('block1');
const block2 = document.getElementById('block2');
const block3 = document.getElementById('block3');
const block4 = document.getElementById('block4');
const block5 = document.getElementById('block5');

let myElement = document.getElementById("iFrame");

// Listen for incoming messages from the companion
peerSocket.onmessage = (evt) => {
    console.log("Received update."); // Log the entire received message
    updateWeatherDisplay(evt.data); // Pass the received data to the display function
};


messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt && evt.data && evt.data.key === "myColor") {
    myElement.style.fill = evt.data.value;
  }
});

document.addEventListener("DOMContentLoaded", () => {
    checkWristStatus();
  
    // Initialize the clock and date displays
    initializeClock(); // Clock will keep updating
    initializeDate(); // Initialize the date display
    initializeHR();

    // Update battery level display initially and then every minute
    updateBatteryLevel(); // Log the initial battery level
});

// Check if the device supports AOD and if permission is granted
if (display.aodAvailable && device.permissions.granted("access_aod")) {
    display.aodAllowed = true; // Allow AOD

    // Respond to display change events
    display.addEventListener("change", onDisplayChange);
}

function onDisplayChange() {
    if (display.aodAllowed && display.aodEnabled) { // entering or leaving AOD
        
        // Hide elements when AOD is active
        if (display.aodActive) {
            hrIcon2.style.opacity ="1";
            hrIcon2.style.display = 'inline';
            hrIcon.style.display = 'none';
            batman.style.display = 'none';
            dateLabel.style.display = 'inline';
            hr1.style.display = 'none';
            hr2.style.display = 'none';
            hr3.style.display = 'none';
            block1.style.display = 'none';
            block2.style.display = 'none';
            block3.style.display = 'none';
            block4.style.display = 'none';
            block5.style.display = 'none';
        } else {
            // Show them back when AOD is inactive
            hrIcon2.style.display = 'none';
            hrIcon.style.display = 'inline'; 
            batman.style.display = 'inline'; 
            dateLabel.style.display = 'inline'; 
            hr1.style.display = 'inline'; 
            hr2.style.display = 'inline'; 
            hr3.style.display = 'inline'; 
            block1.style.display = 'inline'; 
            block2.style.display = 'inline'; 
            block3.style.display = 'inline'; 
            block4.style.display = 'inline';
            block5.style.display = 'inline';
        }

        displayCommon(!display.aodActive && display.on);
    } else {
        displayCommon(display.on); // Handle regular display change
    }
}

function displayCommon(normal) {
    if (normal) { // Display is turning on or leaving AOD
        // Start heart sensor if needed
        // For example, you could check if a heart rate feature is enabled
    } else { // Display is turning off or entering AOD
        // Stop heart sensor if it was running
    }
}