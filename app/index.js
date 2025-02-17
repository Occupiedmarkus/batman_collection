import * as document from "document";
import clock from "clock";

clock.granularity = "minutes"; // seconds, minutes, or hours

const clockLabel = document.getElementById("clock-label");

clock.addEventListener("tick", (evt) => {
  // tick every minute
});

const myAnimation = document.getElementById("myAnimation");
let isAnimating = false; // Track the animation state

// Start the animation initially in a disabled state
myAnimation.animate("disable");

// Toggle animation on touch
document.addEventListener("touchstart", () => {
    if (isAnimating) {
        myAnimation.animate("disable"); // Stop the animation
    } else {
        myAnimation.animate("enable"); // Start the animation
    }
    isAnimating = !isAnimating; // Toggle the state
});