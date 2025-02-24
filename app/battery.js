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
  const batteryLevel = battery.chargeLevel; // Get the current battery level (0-100)
  console.log("Battery level: " + batteryLevel + "%");

  // Reset opacity for all blocks
  blocks.forEach(block => {
    if (block) {
      block.setAttribute("opacity", "1"); // Set each block to full opacity
    }
  });

  // Adjust opacity based on battery level
  if (batteryLevel <= 20) {
    blocks[1]?.setAttribute("opacity", "0"); // Hide block 2
    blocks[2]?.setAttribute("opacity", "0"); // Hide block 3
    blocks[3]?.setAttribute("opacity", "0"); // Hide block 4
    blocks[4]?.setAttribute("opacity", "0"); // Hide block 5
  } else if (batteryLevel <= 40) {
    blocks[2]?.setAttribute("opacity", "0"); // Hide block 3
    blocks[3]?.setAttribute("opacity", "0"); // Hide block 4
    blocks[4]?.setAttribute("opacity", "0"); // Hide block 5
  } else if (batteryLevel <= 60) {
    blocks[3]?.setAttribute("opacity", "0"); // Hide block 4
    blocks[4]?.setAttribute("opacity", "0"); // Hide block 5
  } else if (batteryLevel <= 80) {
    blocks[4]?.setAttribute("opacity", "0"); // Hide block 5
  }
}