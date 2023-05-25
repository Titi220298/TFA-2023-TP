console.info('Hello world');

import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


//gsap.to("H1", {duration: 2, x: 200} );



// Sélection du conteneur du texte
const textContainer = document.getElementById('text-container');
const textList = document.getElementById('text-list');
const texts = textList.getElementsByClassName('list__el');

// Calcul de la largeur totale du texte
let totalWidth = 0;
for (let i = 0; i < texts.length; i++) {
  totalWidth += texts[i].offsetWidth;
}

totalWidth -= textContainer.offsetWidth;

// Configuration de l'animation
const animation = gsap.timeline({ repeat: -1, paused: true});
animation.to(textList, { x: -totalWidth, duration: 10, ease: 'none'})
         .to(textList, { x: 0, duration: 0 });

// Lancement de l'animation
animation.play();














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