import * as document from "document";
import clock from "clock";
import { updateDisplay } from "./heartrate.js"; // Ensure this path is correct
import { initializeDate } from "./clock.js";  // Import the function from clock.js


// Initialize date display
initializeDate(); // Call the function to set the date

// Update the display every second (for heart rate)
setInterval(() => {
  console.log("Calling updateDisplay...");
  updateDisplay();  // Ensure this function is defined
}, 1000);

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
