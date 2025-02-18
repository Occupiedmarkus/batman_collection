import * as document from "document";
import clock from "clock";
import { updateDisplay } from "./heartrate.js"; // Ensure this path is correct

// Set clock granularity to seconds for real-time updates
clock.granularity = "minutes"; 

const clockLabel = document.getElementById("clock-label");
const dateLabel = document.getElementById("date-label"); 

// Update time every tick
clock.addEventListener("tick", (evt) => {
  clockLabel.text = evt.date.toTimeString().slice(0, -7);
});

// Set the date only once
const now = new Date();
dateLabel.text = now.toDateString(0,-4); // Initialize date display


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