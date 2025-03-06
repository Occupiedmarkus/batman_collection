import { me as companion } from "companion";
import { displayWeather } from "./weather.js"; // Importing from weather.js
import { peerSocket } from "messaging";

// Function to handle reconnection and weather updates
const handleReconnection = () => {
    if (companion.permissions.granted("access_location")) {
        console.log("Location permission granted.");
        displayWeather(); // Call the displayWeather function to update weather
    } else {
        console.error("Location permission not granted.");
    }
};

// Listen for peerSocket connection changes
peerSocket.onopen = () => {
    console.log("Companion app connected to the watch.");
    handleReconnection(); // Call to update weather on connection
};

peerSocket.onclose = () => {
    console.log("Companion app disconnected from the watch.");
};

// Optional: Periodically check if the connection is still alive
setInterval(() => {
    if (peerSocket.readyState !== peerSocket.OPEN) {
        console.log("Peer socket is not open. Attempting to reconnect...");
        // You can implement logic here to handle reconnection attempts if needed
    }
}, 300000); // Check every 5 seconds