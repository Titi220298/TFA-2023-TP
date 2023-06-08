console.info('Hello world');

import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


//gsap.to("H1", {duration: 2, x: 200} );

//burger

const burger = document.querySelector(".container-nav__burger");
const croix = document.querySelector(".container-nav__croix");
const list = document.querySelector(".container-nav__list");

burger.addEventListener('click', () => {
  burger.classList.add("hidden");
  croix.classList.remove('hidden');
  list.classList.remove('hidden-nav');
});

croix.addEventListener('click', () => {
  burger.classList.remove("hidden");
  croix.classList.add('hidden');
  list.classList.add('hidden-nav');
});

//interview lien

const body = document.querySelector("body");
const inter = document.querySelector("#inter");
const retour = document.querySelector("#retour-lien");
const lien = document.querySelector(".container-inter-lien");
const footerinter = document.querySelector("#footer-inter");

inter.addEventListener('click', () => {
  lien.classList.remove("hidden");
  body.classList.add('noscroll');
});

retour.addEventListener('click', () => {
  lien.classList.add("hidden");
  body.classList.remove('noscroll');
});

footerinter.addEventListener('click', () => {
  lien.classList.remove("hidden");
  body.classList.add('noscroll');
});

retour.addEventListener('click', () => {
  lien.classList.add("hidden");
  body.classList.remove('noscroll');
});

//guide d'entretien

const guideb = document.querySelector("#guide");
const retourguide = document.querySelector("#retour-guide");
const guide = document.querySelector(".container-guide");
const guidefooter = document.querySelector("#footer-guide");

guideb.addEventListener('click', () => {
  guide.classList.remove("hidden");
  body.classList.add('noscroll');
});

retourguide.addEventListener('click', () => {
  guide.classList.add("hidden");
  body.classList.remove('noscroll');
});

guidefooter.addEventListener('click', () => {
  guide.classList.remove("hidden");
  body.classList.add('noscroll');
});

retourguide.addEventListener('click', () => {
  guide.classList.add("hidden");
  body.classList.remove('noscroll');
});

//button table

const buttonsondage = document.querySelector("#sondage-button");
const table = document.querySelector(".container-table");
const retoursondage = document.querySelector("#table-retour");
const footersondage = document.querySelector("#footer-sondage");

buttonsondage.addEventListener('click', () => {
  table.classList.remove("hidden");
  body.classList.add('noscroll');
});

retoursondage.addEventListener('click', () => {
  table.classList.add("hidden");
  body.classList.remove('noscroll');
});

footersondage.addEventListener('click', () => {
  table.classList.remove("hidden");
  body.classList.add('noscroll');
});

retoursondage.addEventListener('click', () => {
  table.classList.add("hidden");
  body.classList.remove('noscroll');
});

//observeur

document.addEventListener("DOMContentLoaded", function() {
  const navItems = document.querySelectorAll('.container-nav__list .text-nav a');
  const sections = Array.from(navItems, item => document.querySelector(item.getAttribute('href')));

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          const navItem = document.querySelector(`.container-nav__list .text-nav a[href="#${id}"]`).parentNode;
          if (entry.isIntersecting) {
              navItem.classList.add('active');
          } else {
              navItem.classList.remove('active');
          }
      });
  }, { threshold: 0.20 }); // 0.1 signifie que la classe 'active' sera appliquée lorsque 10% de la section sont visibles

  sections.forEach(section => {
      observer.observe(section);
  });
});

document.querySelectorAll('.container-nav__list a').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    let target = document.querySelector(this.getAttribute('href'));
    let targetPosition = target.getBoundingClientRect().top;
    window.scrollTo({
      top: targetPosition + window.scrollY - 100,  // 80px au-dessus de la section cible
      behavior: 'smooth'
    });
  });
});

//ma vison

const vision = document.querySelector("#vision");
const reponse = document.querySelector(".container__reponse");
let compteur = 0;

vision.addEventListener('click', () => {
  compteur++;
  if (compteur % 2 !== 0) {  // Si le compteur est impair
    reponse.classList.remove("hidden");
    vision.innerHTML = 'Réduire';
  } else {  // Si le compteur est pair
    reponse.classList.add("hidden");
    vision.innerHTML = 'Ma vision';
  }
});








//element défilant

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
  

//cards

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
  start: "top-=150px top", // Détecte lorsque le haut du conteneur vidéo atteint le bas de la fenêtre
  end: "bottom top",
  markers: true,
  onEnter: function() {
    video.play();
    playPauseButton.classList.remove('play');
    playPauseButton.classList.add('pause');
  },
  onLeave: function() {
    video.pause();
    playPauseButton.classList.remove('pause');
    playPauseButton.classList.add('play');
  }
});





















//Dark Mode

const darkTheme = document.querySelector(".darkmode");
if(darkTheme){
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
}





//table

// Sélection des boutons
let buttons = document.querySelectorAll('.container-table__button button');

// Sélection des éléments div contenant des questions et réponses
let questions = document.querySelectorAll('.question .cell');
let answers = document.querySelectorAll('.reponse-table .cell');

// fonction pour nettoyer les classes
function resetAll() {
    buttons.forEach(button => {
        button.classList.remove('active-table');
    });

    questions.forEach(question => {
        question.classList.remove('hidden');
    });

    answers.forEach(answer => {
        answer.classList.remove('hidden');
    });
}

// fonction pour appliquer les classes
function applyClasses(id) {
    questions.forEach(question => {
        if (!question.classList.contains(id)) {
            question.classList.add('hidden');
        }
    });

    answers.forEach(answer => {
        if (!answer.classList.contains(id)) {
            answer.classList.add('hidden');
        }
    });
}

// Ajout des écouteurs d'événements
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        resetAll();
        e.target.classList.add('active-table');
        applyClasses(e.target.id);
    });
});


// reponse button


window.onload = function () {
  var buttons = document.querySelectorAll('.button-details');
  
  // Active le bouton 'button-détails1' par défaut au chargement de la page
  var defaultButton = document.getElementById('button-détails1');
  defaultButton.classList.add('active-réponse');
  
  for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
          // Si le bouton cliqué est déjà actif, ne fait rien
          if (this.classList.contains('active-réponse')) {
              return;
          }

          // Retire la classe 'active-réponse' de tous les boutons
          buttons.forEach(button => {
              button.classList.remove('active-réponse');
          });

          // Ajoute la classe 'active-réponse' au bouton cliqué
          this.classList.add('active-réponse');

          // Récupère le numéro du bouton cliqué à partir de l'id du bouton
          var buttonNumber = this.id.split('button-détails')[1];

          // Cache toutes les div en ajoutant 'reponse-table--hidden'
          var allDivs = document.querySelectorAll('.reponse-table');
          for (let j = 0; j < allDivs.length; j++) {
              allDivs[j].classList.add('reponse-table--hidden');
          }

          // Affiche la div correspondante en retirant 'reponse-table--hidden'
          var divToShow = document.getElementById(buttonNumber);
          divToShow.classList.remove('reponse-table--hidden');
      });
  }
};


//emoji cursor

const cursorElement = document.querySelector("#cursor");
            const thumbElement = document.querySelector("#cursor-thumb");

            cursorElement.addEventListener("mouseenter", function() {
                thumbElement.classList.add("animate-in");
                thumbElement.classList.remove("animate-out");
                thumbElement.style.display = "block";
            });

            cursorElement.addEventListener("mouseleave", function() {
                thumbElement.classList.remove("animate-in");
                thumbElement.classList.add("animate-out");
                setTimeout(() => {
                    thumbElement.style.display = "none";
                }, 200); // duration of the animation
            });

            document.addEventListener("mousemove", function(event) {
                thumbElement.style.left = event.pageX + 'px';
                thumbElement.style.top = event.pageY + 'px';
});





