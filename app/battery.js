import * as document from "document";
import { battery } from "power"; // Import the power module to access battery info

const batteryImage = document.getElementById("battery-image"); // The image element in your UI

// Function to update the battery display
function updateBatteryDisplay(batteryLevel) {
    let blocks = Math.ceil(batteryLevel / 25); // Calculate the number of blocks

    // Create a string of battery blocks based on the battery level
    let batteryBlocks = "";
    for (let i = 0; i < 5; i++) {
        batteryBlocks += i < blocks ? "▮" : "▯"; // Full block for filled, empty block for unfilled
    }

    // Log the battery level and block count for debugging
    console.log("Battery Level: " + batteryLevel + "%, Blocks: " + blocks);

    // Update the battery image or text element
    if (batteryImage) {
        batteryImage.text = batteryBlocks; // Update the display with the battery blocks
    }
}

// Function to check and display the current battery level
export function updateBatteryLevel() {
    const batteryLevel = battery.chargeLevel; // Get the current battery charge level (0-100)
    console.log("Current battery level: " + batteryLevel + "%"); // Log the battery level
    updateBatteryDisplay(batteryLevel); // Update the display
}

// Start monitoring the battery level immediately
updateBatteryLevel(); // Update battery level on startup