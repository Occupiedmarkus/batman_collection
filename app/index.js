import * as document from "document";
import clock from "clock";
import { updateHR } from "./heartrate.js"; // Ensure this path is correct
import { initializeDate } from "./clock.js";  // Import the function from clock.js
import { updateBatteryLevel } from "./battery.js"; // Import battery function

// Initialize date display
initializeDate(); // Call the function to set the date
startBatteryMonitoring();

// Update the display every 30 minutes (for heart rate)
setInterval(() => {
  updateHR();  // Ensure this function is defined
}, 900000);

setInterval(() => {
  updateBatteryLevel(); // Update battery display
}, 1000); // Adjust the interval as needed

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
