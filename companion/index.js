import { me as companion } from "companion";
import { displayWeather } from "./weather.js"; 
import { peerSocket } from "messaging"; 
import { settingsStorage } from "settings";

// Function to handle weather updates
const handleWeatherUpdate = () => {
    if (companion.permissions.granted("access_location")) {
        console.log("Location permission granted.");
        displayWeather()
    } else {
        console.error("Location permission not granted.");
    }
};

// Message socket opens
peerSocket.onopen = () => {
    console.log("Companion app connected to the watch.");
    handleWeatherUpdate(); // Call to update weather on connection
    restoreSettings(); // Restore all settings when connection is established
};

// Message socket closes
peerSocket.onclose = () => {
    console.log("Companion app disconnected from the watch.");
};

// Optional: Periodically check if the connection is still alive
setInterval(() => {
    if (peerSocket.readyState !== peerSocket.OPEN) {
        console.log("Peer socket is not open. Attempting to reconnect...");
    }
}, 300000); // Check every 5 minutes

// User changes settings
settingsStorage.addEventListener("change", (evt) => {
    let data = {
        key: evt.key,
        value: evt.newValue
    };
    sendVal(data);
});

// Restore any previously saved settings and send to the device
function restoreSettings() {
    for (let index = 0; index < settingsStorage.length; index++) {   
        let key = settingsStorage.key(index);
        if (key) {
            let data = {
                key: key,
                value: settingsStorage.getItem(key)
            };
            sendVal(data);
        }
    }
}

// Send data to device using Messaging API
function sendVal(data) {
    if (peerSocket.readyState === peerSocket.OPEN) {
        peerSocket.send(data);
    } else {
        console.log("No peerSocket connection");
    }
}
