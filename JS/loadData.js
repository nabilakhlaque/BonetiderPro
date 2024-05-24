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
var prayerTimes;

function loadCitySpecificScript(city) {
         
    if (city) {
        clearExistingScript();

        const scriptSrc = `JS/Data/${capitalize(city)}.js?v=10`;
        const scriptTag = document.createElement('script');
        scriptTag.src = scriptSrc;

        // Set a custom attribute to identify the script as city-specific
        scriptTag.setAttribute('data-city-script', city);

        scriptTag.onload = function() {
            console.log(`Loaded prayer times for ${city} successfully.`);
            // Now you can safely access prayerTimes
            if (typeof prayerTimes != 'undefined' && prayerTimes){
                populatePrayerTimes(prayerTimes);
                displayFormattedDate();
            }
            else{
                console.log("Could not load prayerTimes!");
            }

            // Set an interval to refresh the page every 10 seconds (10000 milliseconds)
            setInterval(refreshPage, 10000);
        };
        scriptTag.onerror = function() {
            console.error('Error loading the script');
        };
        document.head.appendChild(scriptTag);
    } else {
        console.error('No city selected.');
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/;domain=" + window.location.hostname;
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function clearExistingScript() {
    const existingScripts = document.querySelectorAll('script[data-city-script]');
        existingScripts.forEach(script => {
            document.head.removeChild(script);
            script.remove(); // Make sure the element is removed from the DOM
        });
}


document.addEventListener('DOMContentLoaded', function() {
    var cityDropdown = document.getElementById('city');
    var savedCity = getCookie('selectedCity');

    // Check if there's a saved city in cookies and set it as the current value
    if (savedCity) {
        cityDropdown.value = savedCity;
    }
    
    // Load the script for the initial selection (first option in the dropdown)
    loadCitySpecificScript(cityDropdown.value);

    // Add an event listener to handle changes in the dropdown selection
    cityDropdown.addEventListener('change', function() {
        setCookie('selectedCity', this.value, 365); // Save the city in a cookie for 7 days
        loadCitySpecificScript(this.value);
    });
});
