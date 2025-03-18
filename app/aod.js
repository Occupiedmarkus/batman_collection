import { display } from "display";
import { initializeClock } from "./clock";
import { peerSocket } from "messaging"; // Import the messaging module

export function aodDisplay() {
    if (display.aodAvailable && me.permissions.granted("access_aod")) {
        display.aodAllowed = true;

        display.addEventListener("change", () => {
            if (display.aodActive) {
                initializeClock();
                // Set the separator color based on the selected color
                setSeparatorColor();
            } else {
                // Optionally reset the separator color or hide elements
            }
        });
    }
}

// Function to set the separator color
function setSeparatorColor() {
    // Assuming you have a reference to the separator element
    const separator = document.querySelector('image[href="separator.png"]');
    
    peerSocket.addEventListener("message", (evt) => {
        if (evt.data && evt.data.key === "myColor") {
            separator.fill = evt.data.value; // Set the separator color
        }
    });
}