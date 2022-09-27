// Get from localStorage
let dark = JSON.parse(window.localStorage.getItem('darkSetting'));
let firstRun = 1;

if (dark != null) {
    if (Boolean(dark) && firstRun) {
        makeDark();
        firstRun = 0;
    }
    else if (Boolean(dark) && firstRun)
    {
        makeLight();
        firstRun = 0;
    }
}


/**
 * Function that controls Dark Mode and Colors
 */
function darkMode() {
    //if localStorage is null
    if (dark == null) {
        dark = 1;
        window.localStorage.setItem('darkSetting', JSON.stringify(dark));
        makeDark();
    }
    else {
        if (!dark) {
            makeDark();
        }
        else {
            makeLight();
        }
    }
}

/**
 * Change values to darkMode
 */
function makeDark() {
    document.body.style.background = "black";
    document.getElementById("text").style.color = "white";
    document.getElementById("text-heading").style.color = "white";
    document.getElementById("menu").style.color = "white";
    document.getElementsByClassName("hamburger__inner")[0].style.backgroundColor = "white";
    document.getElementsByClassName("hamburger__inner")[0].classList.toggle("dark");

    // Color of Dots
    COLOR = 1000;

    // Set bool
    dark = 1;
    window.localStorage.setItem('darkSetting', JSON.stringify(dark));
}

/**
 * Change values to lightMode
 */
function makeLight() {
    document.body.style.backgroundColor = "white";
    document.getElementById("text").style.color = "black";
    document.getElementById("text-heading").style.color = "black";
    document.getElementById("menu").style.color = "black";
    document.getElementsByClassName("hamburger__inner")[0].style.backgroundColor = "black";
    document.getElementsByClassName("hamburger__inner")[0].classList.toggle("dark");

    // Color of Dots
    COLOR = 0;

    // Set bool
    dark = 0;
    window.localStorage.setItem('darkSetting', JSON.stringify(dark));
}