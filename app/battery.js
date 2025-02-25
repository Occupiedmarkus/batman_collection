import * as document from "document";
import { battery } from "power"; // Import the battery module

const blocks = [
  document.getElementById("block1"),
  document.getElementById("block2"),
  document.getElementById("block3"),
  document.getElementById("block4"),
  document.getElementById("block5")
];

// Function to update battery level display
export function updateBatteryLevel() {
console.log("Updating battery level...");
const batteryLevel = battery.chargeLevel; // Get the current battery level (0-100)
  if (batteryLevel !== undefined) {
      console.log("Battery level: " + batteryLevel + "%");
  } else {
      console.log("Battery level is undefined. Check battery module.");
  }

  // Reset color for all blocks
  blocks.forEach(block => {
    if (block) {
      block.setAttribute("fill", "white"); // Set each block to white (or original color)
    }
  });

  // Adjust color based on battery level
  if (batteryLevel <= 20) {
    blocks[1]?.setAttribute("fill", "black"); // Change block 2 to black
    blocks[2]?.setAttribute("fill", "black"); // Change block 3 to black
    blocks[3]?.setAttribute("fill", "black"); // Change block 4 to black
    blocks[4]?.setAttribute("fill", "black"); // Change block 5 to black
  } else if (batteryLevel <= 40) {
    blocks[2]?.setAttribute("fill", "black"); // Change block 3 to black
    blocks[3]?.setAttribute("fill", "black"); // Change block 4 to black
    blocks[4]?.setAttribute("fill", "black"); // Change block 5 to black
  } else if (batteryLevel <= 60) {
    blocks[3]?.setAttribute("fill", "black"); // Change block 4 to black
    blocks[4]?.setAttribute("fill", "black"); // Change block 5 to black
  } else if (batteryLevel <= 80) {
    blocks[4]?.setAttribute("fill", "black"); // Change block 5 to black
  }
}