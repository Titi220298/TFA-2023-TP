console.info('Hello world');

import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


//gsap.to("H1", {duration: 2, x: 200} );



function configureAnimation(textContainerId, textListId, textIds, duration, reversed) {
    const textContainer = document.querySelector(textContainerId);
    const textList = document.querySelector(textListId);
    const texts = textList.querySelectorAll(textIds);
  
    // Calcul de la largeur totale du texte
    let totalWidth = Array.from(texts).reduce((width, text) => width + text.offsetWidth, 0);
    totalWidth -= textContainer.offsetWidth;
  
    // Configuration de l'animation
    const animation = gsap.timeline({ repeat: -1, paused: true });
    animation.to(textList, { x: -totalWidth, duration, ease: 'none', reversed })
  
    // Lancement de l'animation
    animation.play();
  
    // Gestion des événements de survol
    texts.forEach((text) => {
      text.addEventListener('mouseenter', () => {
        animation.pause(); // Pause l'animation lorsque l'élément est survolé
      });
  
      text.addEventListener('mouseleave', () => {
        animation.play(); // Relance l'animation lorsque la souris quitte l'élément
      });
    });
  
    // Défilement circulaire des éléments qui sortent de l'écran
    animation.eventCallback('onUpdate', () => {
      const containerWidth = textContainer.offsetWidth;
      const listWidth = textList.offsetWidth;
      const offsetLeft = textList.offsetLeft;
  
      if (offsetLeft < containerWidth - listWidth) {
        const lastText = textList.querySelector(textIds + ':last-child');
        const lastTextWidth = lastText.offsetWidth;
        const offsetCorrection = containerWidth + lastTextWidth;
        const newPosition = offsetLeft + offsetCorrection;
  
        gsap.set(textList, { x: newPosition }); // Ajuster la position de l'élément sortant
      }
    });
  }
  
  // Appel de la fonction pour chaque liste de texte
  configureAnimation('#text-container', '#text-list', '#li', 60, false);
  configureAnimation('#text-container1', '#text-list1', '#li1', 20, true);
  configureAnimation('#text-container2', '#text-list2', '#li2', 30, true);
  configureAnimation('#text-container3', '#text-list3', '#li3', 30, true);
  configureAnimation('#text-container4', '#text-list4', '#li4', 20, true);
  configureAnimation('#text-container5', '#text-list5', '#li5', 60, false);
  

// Sélectionner tous les éléments avec la classe "cards"
const cards = document.querySelectorAll('.cards');

// Parcourir toutes les cartes et attacher les écouteurs d'événement
cards.forEach(card => {
  const open = card.querySelector('.container-probleme');
  const back = card.querySelector('.container-back');

  open.addEventListener('click', () => {
    back.classList.remove('hidden');
  });

  back.addEventListener('click', () => {
    back.classList.add('hidden');
  });
});



//video

var playPauseButton = document.querySelector('#play-pause-button');
var muteButton = document.querySelector('#mute-button');
var video = document.querySelector('#my-video');
var volumeInput = document.querySelector('#volume-slider'); // Ajout de l'élément d'entrée de volume
var videoContainer = document.querySelector('.video-container');
var controls = document.querySelector('.controls');
var timeoutId;

playPauseButton.addEventListener('click', function() {
  togglePlayPause();
});

muteButton.addEventListener('click', function() {
  toggleMute();
});

volumeInput.addEventListener('input', function() { // Ajout de l'écouteur d'événement pour les changements de valeur
  updateVolume();
});

videoContainer.addEventListener('mousemove', function() {
  showControls();
  resetTimeout();
});

videoContainer.addEventListener('mouseout', function(event) {
  if (!isMouseOverControls(event)) {
    hideControls();
  }
});

controls.addEventListener('mouseenter', function() {
  resetTimeout();
});

controls.addEventListener('mouseleave', function() {
  hideControls();
});

function togglePlayPause() {
  if (video.paused) {
    video.play();
    playPauseButton.classList.remove('play');
    playPauseButton.classList.add('pause');
  } else {
    video.pause();
    playPauseButton.classList.remove('pause');
    playPauseButton.classList.add('play');
  }
}

function toggleMute() {
  if (video.muted) {
    video.muted = false;
    muteButton.classList.remove('unmute');
    muteButton.classList.add('mute');
  } else {
    video.muted = true;
    muteButton.classList.remove('mute');
    muteButton.classList.add('unmute');
  }
}

function updateVolume() { // Fonction pour mettre à jour le volume de la vidéo
  var volume = volumeInput.value;
  video.volume = volume;
}

function showControls() {
  controls.style.display = 'flex';
}

function hideControls() {
  controls.style.display = 'none';
}

function resetTimeout() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function() {
    hideControls();
  }, 1000);
}

function isMouseOverControls(event) {
  var controlsRect = controls.getBoundingClientRect();
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  return (
    mouseX >= controlsRect.left &&
    mouseX <= controlsRect.right &&
    mouseY >= controlsRect.top &&
    mouseY <= controlsRect.bottom
  );
}

// GSAP ScrollTrigger

ScrollTrigger.create({
  trigger: videoContainer,
  start: "top-=120px botton", // Détecte lorsque le haut du conteneur vidéo atteint le bas de la fenêtre
  markers: true,
  onEnter: function() {
    video.play();
  },
});





















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