import * as document from "document";
import { battery } from "power"; // Import the power module to access battery info

const batteryImage = document.getElementById("battery-image"); // The image element in your UI
const batteryLabel = document.getElementById("battery-label"); // Ensure this ID matches your UI
const batteryLevel = battery.chargeLevel; // Get the battery charge level (0-100)

// Function to update the battery display
export function updateBatteryDisplay(batteryLevel) {
    let blocks = 0; // Initialize block count

    // Determine the number of blocks based on battery level
    if (batteryLevel >= 5) {
        blocks = Math.ceil(batteryLevel / 20); // Use Math.ceil for levels above 5%
    }
    
    // Create a string of battery blocks based on the battery level
    let batteryBlocks = "";
    for (let i = 0; i < 5; i++) {
        batteryBlocks += i < blocks ? "▮" : "▯"; // Full block for filled, empty block for unfilled
    }

    // Update the battery image or text element
    batteryImage.text = batteryBlocks; // Update the display with the battery blocks
}

// Function to check and display the current battery level
export function updateBatteryLevel() {
    console.log("Battery Level: " + batteryLevel + "%"); // Log the battery level
    updateBatteryDisplay(batteryLevel); // Update the display
    batteryLabel.text = batteryLevel + "%"; // Update the label with the current battery percentage
}

// Declare an event handler that will be called every time the battery level changes
battery.onreading = function() {
    console.log("Battery Level: " + batteryLevel + "%"); 
    updateBatteryLevel(); // Call the function to update battery level display
}



// Start monitoring the battery level
function startBatteryMonitoring() {
    console.log("Detecting battery level..."+ batteryLevel + "%");
    battery.start(); // Start the battery monitoring
}
