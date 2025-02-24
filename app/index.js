import * as document from "document";
import clock from "clock";
import { updateHR } from "./heartrate.js"; 
import { initializeDate } from "./clock.js"; 
import { updateBatteryLevel } from "./battery.js"; 

// Initialize date display
initializeDate(); 

// Update the display every 15 minutes for heart rate
setInterval(() => {
  try {
    updateHR();
  } catch (error) {
    console.error("Error updating heart rate:", error);
  }
}, 900000); // 15 minutes in milliseconds

// Update battery level display every minute
setInterval(() => {
  try {
    updateBatteryLevel();
  } catch (error) {
    console.error("Error updating battery level:", error);
  }
}, 60000); // 1 minute in milliseconds

const myAnimation = document.getElementById("myAnimation");

// Start the animation initially in an enabled state
if (myAnimation) {
    myAnimation.animate("enable");
}

// Toggle animation on touch
document.addEventListener("touchstart", () => {
    if (myAnimation) {
        myAnimation.animate("disable"); // Stop the animation
    }
});