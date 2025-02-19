// battery.js
import * as document from "document";
import { battery } from "power"; // Import the power module to access battery info

const batteryImage = document.getElementById("battery-image"); // The image element in your UI

// Function to update the battery display
export function updateBatteryDisplay(batteryLevel) {
    // Calculate the number of blocks to display
    const blocks = Math.floor(batteryLevel / 20);
    
    // Create a string of battery blocks based on the battery level
    let batteryBlocks = "";
    for (let i = 0; i < 5; i++) {
        batteryBlocks += i < blocks ? "▮" : "▯"; // Full block for filled, empty block for unfilled
    }

    // Update the battery image or text element
    batteryImage.text = batteryBlocks; // Assuming you have a text element; update as needed
}

// Function to check and display the current battery level
export function updateBatteryLevel() {
    const batteryLevel = battery.chargeLevel; // Get the battery charge level (0-100)
    console.log("Battery Level: " + batteryLevel + "%"); // Log the battery level
    updateBatteryDisplay(batteryLevel); // Update the display
}