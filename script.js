const options = { timeZone: "Australia/Sydney" };
const sydneyDate = new Intl.DateTimeFormat("en-US", options).format(new Date());
const currentDate = new Date(sydneyDate);
const dayNumber = currentDate.getDay();

// Change semester start dates here
const october = new Date("2024-09-16T00:00:00+11:00");

// Calculate the number of days since the start of the semester
const daysSinceStart = Math.floor((currentDate - october) / (1000 * 60 * 60 * 24));

// Define the total number of days in the Intensive October Teahing Period
const lastDay = new Date("2024-10-27T23:59:00+11:00");
const totalDays = Math.floor((lastDay - october) / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include the last day

let message1;

// Check which semester it is
if (currentDate < october) { // If current date is before start of Semester 2
    message1 = "before the start of the Intensive October Teaching Period.";
} else if (currentDate > lastDay) { // If current date is after the end of the Intensive October Teaching Period
    message1 = "after the end of the Intensive October Teaching Period.";
} else { // If current date is during the Intensive October Teaching Period
    const dayX = daysSinceStart + 1; // Adding 1 because daysSinceStart is zero-based
    message1 = `day ${dayX} of ${totalDays} of the Intensive October Teaching Period`;
}

document.getElementById("week-display").innerHTML = message1; // [N.B: if you want to change the text preceding the counter, do so here]

// Optionally display/update progress bar
const updateProgressBar = () => {
    const progressCircle = document.getElementById('progress-circle');
    const percentage = document.getElementById('percentage');

    // Calculate the number of days since the start of the semester
    const daysSinceStart = Math.floor((currentDate - october) / (1000 * 60 * 60 * 24)) + 1;

    // Calculate progress percentage, treating NaN as 100% and negative numbers as 0%
    const progressPercentage = Math.min(Math.max((daysSinceStart / totalDays) * 100, 0), 100);

    const dashArray = Math.PI * 2 * 45;
    const dashOffset = dashArray - (dashArray * progressPercentage) / 100;

    progressCircle.style.strokeDasharray = dashArray;
    progressCircle.style.strokeDashoffset = dashOffset;
    percentage.textContent = `${progressPercentage.toFixed(0)}%`;
};

updateProgressBar(); // Update the progress bar on page load