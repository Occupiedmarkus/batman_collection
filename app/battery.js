import * as document from "document";
import { battery } from "power"; // Import the battery module

// Elements for battery display
let b1 = document.getElementById("block1");
let b2 = document.getElementById("block2");
let b3 = document.getElementById("block3");
let b4 = document.getElementById("block4");
let b5 = document.getElementById("block5");
let svg = document.getElementById("battery-display")

// Variable to store the last reported battery level
let lastBatteryLevel = -1; // Initialize to an invalid value

// Initial call to update the battery level
updateBatteryLevel();

// Add an event listener for battery level changes
battery.onchange = () => {
    updateBatteryLevel();
};
// Function to update battery level display
export function updateBatteryLevel() {
    
    updateSvgTexts("I"); // Call the function 
    const batteryLevel = battery.chargeLevel; // Get the current battery level (0-100)
    
    // Log the current battery level
    console.log("Battery level: " + batteryLevel + "%");

    // Check if the battery level has changed by at least 10%
    if (Math.abs(batteryLevel - lastBatteryLevel) >= 10 || lastBatteryLevel === -1) {
        lastBatteryLevel = batteryLevel; // Update the last recorded level

        // Adjust color based on battery level
        if (batteryLevel <= 20) {
            b1.style.fill = "black";
            b2.style.fill = "black";
            b3.style.fill = "black";
            b4.style.fill = "black";
            b5.style.fill = "red"; // Critical level
        } else if (batteryLevel <= 40) {
            b1.style.fill = "black";
            b2.style.fill = "black";
            b3.style.fill = "black";
            b4.style.fill = "black";
            b5.style.fill = "red"; // Low level
        } else if (batteryLevel <= 60) {
            b1.style.fill = "black";
            b2.style.fill = "black";
            b3.style.fill = "black";
            b4.style.fill = "white"; // Medium level
            b5.style.fill = "white"; // Clear previous
        } else if (batteryLevel <= 80) {
            b1.style.fill = "black";
            b2.style.fill = "black";
            b3.style.fill = "white"; // High level
            b4.style.fill = "white"; // Clear previous
            b5.style.fill = "white"; // Clear previous
        } else {
            b1.style.fill = "white"; // Full
            b2.style.fill = "white"; // Clear previous
            b3.style.fill = "white"; // Clear previous
            b4.style.fill = "white"; // Clear previous
            b5.style.fill = "white"; // Clear previous
        }
    }
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

// Add an event listener for battery level changes
battery.onchange = () => {
    updateBatteryLevel();
};