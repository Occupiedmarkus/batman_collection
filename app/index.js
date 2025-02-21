import * as document from "document";
import clock from "clock";
import { updateHR } from "./heartrate.js"; // Ensure this path is correct
import { initializeDate } from "./clock.js"; // Import the function from clock.js
import { updateBatteryLevel } from "./battery.js"; // Import battery functions

// Initialize date display
initializeDate(); // Call the function to set the date


// Update the display every 15 minutes (for heart rate)
setInterval(() => {
  updateHR();  // Ensure this function is defined in heartrate.js
}, 900000); // 15 minutes in milliseconds

// Update battery level display every minute (adjust as needed)
setInterval(() => {
    updateBatteryLevel(); // Update battery display
}, 60000); // 1 minute in milliseconds

const myAnimation = document.getElementById("myAnimation");
let isAnimating = false; 

// Start the animation initially in a disabled state
if (myAnimation) {
    myAnimation.animate("disable");
}

// Toggle animation on touch
document.addEventListener("touchstart", () => {
    if (isAnimating) {
        myAnimation.animate("disable"); 
    } else {
        myAnimation.animate("enable"); 
    }
    isAnimating = !isAnimating; 
});