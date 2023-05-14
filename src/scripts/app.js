console.info('Hello world');

import { gsap } from "gsap";



//gsap.to("H1", {duration: 2, x: 200} );


//Dark Mode

const darkTheme = document.querySelector(".darkmode");

//Gérer le data-theme du body
darkTheme.addEventListener("click", function(){
    if(document.body.dataset.theme === "dark"){
        light();
        localStorage.setItem("theme", "light");
    } else {
        dark();
        localStorage.setItem("theme", "dark");
    } 
});

//Est ce que l"utilisateur veut un theme dark?
const userDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

//Est ce que l'utilisateur a déjà indiqué une préférence sur notre site?
let theme = localStorage.getItem('theme');
if((!theme && userDark) || (theme === "dark")){
    dark();
} else if(theme === "light"){
    light();
}

//function pour le dark
function dark(){
    document.body.setAttribute("data-theme", "dark");
}
//function pour le light
function light(){
    document.body.setAttribute("data-theme", "light");
}