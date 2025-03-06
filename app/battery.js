import * as document from "document";
import { battery } from "power"; // Import the battery module

// Elements for battery display
let b1 = document.getElementById("block1");
let b2 = document.getElementById("block2");
let b3 = document.getElementById("block3");
let b4 = document.getElementById("block4");
let b5 = document.getElementById("block5");
let svg = document.getElementById("battery-display");

// Variable to store the last reported battery level
let lastBatteryLevel = -1; // Initialize to an invalid value

// Initial call to update the battery level
updateBatteryLevel();

// Add an event listener for battery level changes
battery.onchange = () => {
    updateBatteryLevel();
};

export function updateBatteryLevel() {
    updateSvgTexts("I"); // Set battery indicator 
    const batteryLevel = battery.chargeLevel; // Get the current battery level (0-100)

    const COLORS = {
        critical: "red",
        low: "black",
        medium: "grey",
        high: "white",
        charging: "#39ff14", // Neon Green
    };

    // Log the current battery level
    console.log("Battery level: " + batteryLevel + "%");

    // Check if the battery level has changed by at least 10%
    if (Math.abs(batteryLevel - lastBatteryLevel) >= 10 || lastBatteryLevel === -1) {
        lastBatteryLevel = batteryLevel; // Update the last recorded level

        // Update colors based on battery level
        if (battery.charging) {
            // Set all blocks to green when charging
            setBlockColors(COLORS.charging, COLORS.charging, COLORS.charging, COLORS.charging, COLORS.charging);
        } else if (batteryLevel <= 10) {
            setBlockColors(COLORS.low, COLORS.low, COLORS.critical, COLORS.low, COLORS.low); // Critical level
        } else if (batteryLevel > 10 && batteryLevel <= 19) {
            setBlockColors(COLORS.low, COLORS.low, COLORS.high, COLORS.low, COLORS.low);
        } else if (batteryLevel > 19 && batteryLevel <= 39) {
            setBlockColors(COLORS.low, COLORS.medium, COLORS.high, COLORS.medium, COLORS.low); // Low level
        } else if (batteryLevel > 39 && batteryLevel <= 69) {
            setBlockColors(COLORS.medium, COLORS.medium, COLORS.high, COLORS.medium, COLORS.medium); // Medium level
        } else if (batteryLevel > 69 && batteryLevel <= 89) {
            setBlockColors(COLORS.medium, COLORS.high, COLORS.high, COLORS.high, COLORS.medium); // High level
        } else {
            setBlockColors(COLORS.high, COLORS.high, COLORS.high, COLORS.high, COLORS.high); // Full
        }
    }
};

// Add charging state listener
battery.onchargingchanged = () => {
        // Optionally, reset to a default color when not charging
        updateBatteryLevel();
};

// Helper function to set block colors
function setBlockColors(c1, c2, c3, c4, c5) {
    b1.style.fill = c1;
    b2.style.fill = c2;
    b3.style.fill = c3;
    b4.style.fill = c4;
    b5.style.fill = c5;
}
// Function to update the text of the SVG elements
function updateSvgTexts(text) {
    b1.text = text; // Update text for element 1
    b2.text = text; // Update text for element 2
    b3.text = text; // Update text for element 3
    b4.text = text; // Update text for element 4
    b5.text = text; // Update text for element 5
}

// Initial call to update the battery level
updateBatteryLevel();