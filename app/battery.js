import * as document from "document";
import { battery } from "power"; // Import the power module to access battery info

// Get all block elements
const blocks = [
    document.getElementById("block1"),
    document.getElementById("block2"),
    document.getElementById("block3"),
    document.getElementById("block4"),
    document.getElementById("block5"),
];

// Log blocks to check for undefined elements
blocks.forEach((block, index) => {
    if (!block) {
        console.error(`block${index + 1} is undefined.`);
    }
});

// Function to update the battery display
function updateBatteryDisplay(batteryLevel) {
    // Ensure blocks are defined
    if (!blocks.every(block => block)) {
        console.error("One or more battery block elements are not found.");
        return; // Exit the function if any block is undefined
    }

    // Remove 'active' class from all blocks, ensuring the block exists
    blocks.forEach(block => {
        if (block) {
            block.classList.remove('active');
        } else {
            console.error("Attempted to remove 'active' from an undefined block.");
        }
    });

    // Calculate the number of active blocks based on battery level
    const activeBlocks = Math.ceil(batteryLevel / 20); 
    for (let i = 0; i < activeBlocks; i++) {
        if (blocks[i]) { // Check if the block exists before adding 'active'
            blocks[i].classList.add('active');
        } else {
            console.error(`block${i + 1} is undefined when trying to add 'active'.`);
        }
    }

    // Log the battery level and active block count for debugging
    console.log("Battery Level: " + batteryLevel + "%, Active Blocks: " + activeBlocks);
}

// Function to check and display the current battery level
export function updateBatteryLevel() {
    const batteryLevel = battery.chargeLevel; // Get the current battery charge level (0-100)
    console.log("Current battery level: " + batteryLevel + "%"); // Log the battery level
    updateBatteryDisplay(batteryLevel); // Update the display
}

// Update battery level on startup
updateBatteryLevel();