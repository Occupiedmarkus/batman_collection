import * as document from "document";

const myAnimation = document.getElementById("myAnimation");
let isAnimating = false; // Track the animation state

// Start the animation initially
myAnimation.animate("disable");

// Toggle animation on touch
document.addEventListener("touchstart", () => {
    if (isAnimating) {
        myAnimation.animate("enable"); // Stop the animation
    } else {
        myAnimation.animate("disable"); // Start the animation
    }
    isAnimating = !isAnimating; // Toggle the state
});