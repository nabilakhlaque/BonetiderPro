/**
 * Author: NABIL AKHLAQUE
 * Date: 2024-05-21
 * Description: This script dynamically displays Islamic prayer times and updates the background
 * image based on the current prayer time. It also shows the time left until the next prayer.
 * 
 * License: MIT, GPL
 * 
 * © 2024 NABIL AKHLAQUE. All rights reserved.
 */

let myFormat = 'en-u-ca-islamic-umalqura-nu-latn'; // use islamic-umalqura calendar (most modern)
let myDate   = new Date(Date.now());  // today's date
let hijiriDate   = new Intl.DateTimeFormat(myFormat,{dateStyle:'long'}).format(myDate);


// Function to populate the table with prayer times
function populatePrayerTimes(prayerTimes) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    //Time Left = 1 | Current Prayer Time = 2
    let showTimeLeftOrPrayerTime = 1;

    // Get current month and day
    //const today = new Date(2024,4,20,2,55,0); 
    const today = new Date();

    const currentMonth = (today.getMonth() + 1).toString(); // Months are zero-based in JavaScript
    const currentDay = today.getDate().toString();
    const currentHour = today.getHours();
    const currentMin = today.getMinutes();


    // Find today's prayer times
    const todaysPrayerTimes = prayerTimes.find(time => time.Month === currentMonth && time.Day === currentDay);

    if (todaysPrayerTimes) {
        const row = document.createElement("tr");

        // Define prayer names and corresponding image URLs
        const prayers = [
            { name: "Fajr", image: "Images/1.png" },
            { name: "Shuruk", image: "Images/2.png" },
            { name: "Dhuhr", image: "Images/3.png" },
            { name: "Asr", image: "Images/4.png" },
            { name: "Maghrib", image: "Images/5.png" },
            { name: "Ishaa", image: "Images/6.png" }
        ];

        let nextPrayerName = "";
        let nextPrayerTime = "";
        let nextPrayerDateTime = null;
        const currentTime = (currentHour < 10 ? "0" + currentHour : currentHour) + ":" + (currentMin < 10 ? "0" + currentMin : currentMin);

        // Create table cells for each prayer time
        prayers.forEach(prayer => {
            const cell = document.createElement("td");
            cell.id = prayer.name;
            const icon = document.createElement("img");
            icon.src = prayer.image;
            icon.className = "icon";
            icon.alt = todaysPrayerTimes[prayer.name];
            const prayerName = document.createElement("div");
            prayerName.className = "prayer";
            prayerName.textContent = prayer.name;
            const prayerTime = document.createElement("div");
            prayerTime.className = "time";
            prayerTime.textContent = todaysPrayerTimes[prayer.name];

            
            // Check for the next prayer time (skip Shuruk)
            if (prayer.name !== "Shuruk") {
                // Check for the next prayer time
                const prayerDateTime = new Date();
                const [hours, minutes] = todaysPrayerTimes[prayer.name].split(":");
                prayerDateTime.setHours(hours, minutes, 0);

                if (!nextPrayerName && currentTime < todaysPrayerTimes[prayer.name]) {
                    nextPrayerName = prayer.name;
                    nextPrayerTime = todaysPrayerTimes[prayer.name];
                    nextPrayerDateTime = prayerDateTime;
                }
            }
            // Append elements to the cell
            cell.appendChild(icon);
            cell.appendChild(prayerName);
            cell.appendChild(prayerTime);
            row.appendChild(cell);
        });

        // Append the row to the table
        tableBody.appendChild(row);

        // Update the timeLeft div with the next prayer time
        if (nextPrayerName) {
            const timeLeftMs = nextPrayerDateTime - today;
            const hoursLeft = Math.floor(timeLeftMs / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

            // Add leading zero if hoursLeft or minutesLeft are less than 10
            const formattedHoursLeft = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft;
            const formattedMinutesLeft = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;

            if (showTimeLeftOrPrayerTime == 1){
                document.getElementById("_nextPrayer").innerHTML = `<div id='nextPrayer'>Nästa bön: ${nextPrayerName}</div><div id='timeLeft'>${formattedHoursLeft}:${formattedMinutesLeft}</div>`;
            }
            else if (showTimeLeftOrPrayerTime == 2){
                document.getElementById("_nextPrayer").innerHTML = `<div id='nextPrayer'>Nästa bön: ${nextPrayerName}</div><div id='timeLeft'>${nextPrayerTime}</div>`;
            }
        } 
        else 
        {       
            // Find the first prayer time for the next day
            const nextDayIndex = prayerTimes.findIndex(time => time.Month === currentMonth && time.Day === (parseInt(currentDay) + 1).toString());
            const nextDayPrayerTimes = prayerTimes[nextDayIndex];

            if (nextDayPrayerTimes) {
                const firstPrayerName = "Fajr";
                const firstPrayerTime = nextDayPrayerTimes[firstPrayerName];
                const firstPrayerDateTime = new Date(today);

                firstPrayerDateTime.setDate(today.getDate() + 1);
                const [firstPrayerHours, firstPrayerMinutes] = firstPrayerTime.split(":");
                firstPrayerDateTime.setHours(firstPrayerHours, firstPrayerMinutes, 0);
                
                const timeLeftMs = firstPrayerDateTime - today;
                const hoursLeft = Math.floor(timeLeftMs / (1000 * 60 * 60));
                const minutesLeft = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

                // Add leading zero if hoursLeft or minutesLeft are less than 10
                const formattedHoursLeft = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft;
                const formattedMinutesLeft = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
                
                document.getElementById("_nextPrayer").innerHTML = `<div id='nextPrayer'>Nästa bön: ${firstPrayerName}</div><div id='timeLeft'>${formattedHoursLeft}:${formattedMinutesLeft}</div>`;
            }
        }

        // Set the background based on current prayer times
        setBackground(currentHour, currentMin, todaysPrayerTimes);
    }
}

// Function to set the background image based on the current prayer times
function setBackground(hour, min, todaysPrayerTimes) {
    // Add leading zero if hoursLeft or minutesLeft are less than 10
    const formattedHours = hour < 10 ? `0${hour}` : hour;
    const formattedMinutes = min < 10 ? `0${min}` : min;

    const currentTime = `${formattedHours}:${formattedMinutes}`;
    let currentPrayer = "";

    if (currentTime >= todaysPrayerTimes["Fajr"] && currentTime < todaysPrayerTimes["Shuruk"]) {
        currentPrayer = "Fajr";
        document.body.style.background = "url('Images/pink.png') no-repeat center center fixed";
    } else if (currentTime >= todaysPrayerTimes["Shuruk"] && currentTime < todaysPrayerTimes["Dhuhr"]) {
        currentPrayer = "Shuruk";
        document.body.style.background = "url('Images/blue.png') no-repeat center center fixed";
    } else if (currentTime >= todaysPrayerTimes["Dhuhr"] && currentTime < todaysPrayerTimes["Asr"]) {
        currentPrayer = "Dhuhr";
        document.body.style.background = "url('Images/blue.png') no-repeat center center fixed";
    } else if (currentTime >= todaysPrayerTimes["Asr"] && currentTime < todaysPrayerTimes["Maghrib"]) {
        currentPrayer = "Asr";
        document.body.style.background = "url('Images/blue.png') no-repeat center center fixed";
    } else if (currentTime >= todaysPrayerTimes["Maghrib"] && currentTime < todaysPrayerTimes["Ishaa"]) {
        currentPrayer = "Maghrib";
        document.body.style.background = "url('Images/orange.png') no-repeat center center fixed";
    } else if (currentTime >= todaysPrayerTimes["Ishaa"]) {
        currentPrayer = "Ishaa";
        document.body.style.background = "url('Images/purple.png') no-repeat center center fixed";
    } else if (currentTime >= '00:00' && currentTime < todaysPrayerTimes["Shuruk"]) {
        currentPrayer = "Ishaa";
        document.body.style.background = "url('Images/purple.png') no-repeat center center fixed";
    } else {
        document.body.style.background = "url('Images/Blue.png') no-repeat center center fixed";
    }


    // Update the div content with the current prayer name
    if (currentPrayer != ''){
        const currentPrayerDiv = document.getElementById(currentPrayer);
        if (currentPrayerDiv) {
            currentPrayerDiv.classList.add("currentPrayerTiming");
        }
    }  
}

// Function to refresh the page every minute
function refreshPage() {
    populatePrayerTimes(prayerTimes);
    displayFormattedDate();
}

// Function to display the formatted date
function displayFormattedDate() {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('sv-SE', options);

    document.getElementById("todaysDate").textContent = formattedDate;
    document.getElementById("hijriDate").textContent = hijiriDate;
}
