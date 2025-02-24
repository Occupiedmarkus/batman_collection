import * as document from "document";
import clock from "clock";

// Set clock granularity to minutes for real-time updates
clock.granularity = "minutes"; 

const clockLabel = document.getElementById("clock-label");
const dateLabel = document.getElementById("date-label"); // Move this declaration up

// Update time every tick
clock.addEventListener("tick", (evt) => {
  clockLabel.text = evt.date.toTimeString().slice(0, -7);
});

// Function to get the ordinal suffix for a given date
export function getOrdinalSuffix(date) {
    if (date > 3 && date < 21) return 'TH'; // Special case for 11th to 13th
    switch (date % 10) {
        case 1: return 'ST';
        case 2: return 'ND';
        case 3: return 'RD';
        default: return 'TH';
    }
}

// Initialize date display
export function initializeDate() {
    // Define arrays for day and month names
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const now = new Date(); // Get current date and time

    // Get the day, date, month, and year
    const dayName = days[now.getDay()]; // Day name (0-6)
    const date = now.getDate(); // Date (1-31)
    const monthName = months[now.getMonth()]; // Month name (0-11)
    const year = now.getFullYear().toString().slice(-2); // Last two digits of year

    // Get the ordinal suffix
    const suffix = getOrdinalSuffix(date);

    // Construct the formatted date string
    const formattedDate = `${dayName} ${date} ${suffix} ${monthName} ${year}`;

    // Set the date label
    dateLabel.text = formattedDate; // Set the date label text
}