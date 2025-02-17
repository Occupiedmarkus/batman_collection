import * as document from "document";

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