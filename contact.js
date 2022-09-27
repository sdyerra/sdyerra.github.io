let dark = JSON.parse(window.localStorage.getItem('darkSetting'));
console.log(document.getElementsByClassName("back"));
if (dark) {
    document.body.style.background = "black";
    document.getElementsByClassName("back_top")[0].classList.toggle('dark');
    document.getElementsByClassName("back_bottom")[0].classList.toggle('dark');
}