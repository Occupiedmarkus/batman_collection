import { me as companion } from "companion";
import { displayWeather } from "./weather.js"; 
import { peerSocket } from "messaging"; 
import { settingsStorage } from "settings";

let KEY_COLOR = "myColor";

// Function to handle weather updates
const handleWeatherUpdate = () => {
    if (companion.permissions.granted("access_location")) {
        console.log("Location permission granted.");
        displayWeather()
    } else {
        console.error("Location permission not granted.");
    }
};

// Listen for peerSocket connection changes
peerSocket.onopen = () => {
    console.log("Companion app connected to the watch.");
    handleWeatherUpdate(); // Call to update weather on connection
    
    // Send the saved color when connection is established
    sendValue(KEY_COLOR, settingsStorage.getItem(KEY_COLOR));
};

peerSocket.onclose = () => {
    console.log("Companion app disconnected from the watch.");
};

// Optional: Periodically check if the connection is still alive
setInterval(() => {
    if (peerSocket.readyState !== peerSocket.OPEN) {
        console.log("Peer socket is not open. Attempting to reconnect...");
    }
}, 300000); // Check every 5 minutes

// Settings management for color picking
settingsStorage.addEventListener("change", (evt) => {
    sendValue(evt.key, evt.newValue);
});

// Check for settings changed while the companion was not running
if (companion.launchReasons.settingsChanged) {
    sendValue(KEY_COLOR, settingsStorage.getItem(KEY_COLOR));
}

// Function to send value to the device
function sendValue(key, val) {
    if (val) {
        sendSettingData({
            key: key,
            value: JSON.parse(val)
        });
    }
}

// Function to send setting data
function sendSettingData(data) {
    // Use peerSocket instead of messaging
    if (peerSocket.readyState === peerSocket.OPEN) {
        peerSocket.send(data);
    } else {
        console.log("No peerSocket connection");
    }
}
