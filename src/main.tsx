import store from './store';
import { randomHexColor, generateSpanColor } from './utils/color';
import { AppState } from './@types';

import './styles/index.scss';

// Pour récupérer les données stocker dans mon store
console.log(store.getState());

// INIT STATE
const state: AppState = {
  firstColor: '#e367a4',
  lastColor: '#48b1f3',
  direction: '90deg',
  nbColors: 0,
};

// == Rendu dans le DOM
function renderNbColors() {
  const { nbColors } = store.getState().color;

  /*
    le `!` indique à TS que l'élément ne sera jamais `null`
    (à utiliser avec précaution)
  */
  document.querySelector('.nbColors')!.textContent = `
    ${nbColors} couleur(s) générée(s)
  `;
}
function renderGradient() {
  const { direction, firstColor, lastColor } = store.getState().color;

  /*
    par défaut, `document.querySelector` retourne un type `Element`
    qui n'a pas de propriété `style` ;
    on spécifie qu'il s'agit d'un `HTMLElement` qui l'a.
  */
  document.querySelector<HTMLElement>('.gradient')!.style.background = `
    linear-gradient(${direction},${firstColor},${lastColor})
  `;
}
function renderColors() {
  const { firstColor, lastColor } = store.getState().color;

  const firstSpan = generateSpanColor(firstColor);
  const lastSpan = generateSpanColor(lastColor);

  const result = `${firstSpan} - ${lastSpan}`;

  document.querySelector('.colors')!.innerHTML = result;
}

// APP INIT
renderNbColors();
renderGradient();
renderColors();

// STORE INIT (store.subscribe permet de s'abonner à un changement de state)
// A chaque fois qu'une donnée stocker dans mon store va être modifier, je pourrais exécuter une fonction
store.subscribe(() => {
  // A chaque fois que mes données change, je met à jour mon interface
  renderNbColors();
  renderGradient();
  renderColors();
});

// EVENTS LISTERNERS
// Emettre === dispatch une action / intention à tous les reducers
// La convention de redux veut que l'action soit un objet avec une propriété `type`
document.getElementById('randAll')!.addEventListener('click', () => {
  store.dispatch({
    type: 'CHANGE_ALL_COLORS',
    payload: {
      firstRandomColor: randomHexColor(),
      secondRandomColor: randomHexColor(),
    },
  });
});

document.getElementById('randFirst')!.addEventListener('click', () => {
  store.dispatch({
    type: 'CHANGE_FIRST_COLOR',
    payload: randomHexColor(),
  });
});

document.getElementById('randLast')!.addEventListener('click', () => {
  store.dispatch({
    type: 'CHANGE_LAST_COLOR',
    payload: randomHexColor(),
  });
});

document.getElementById('toLeft')!.addEventListener('click', () => {
  store.dispatch({
    type: 'CHANGE_DIRECTION_TO_270',
  });
});

document.getElementById('toRight')!.addEventListener('click', () => {
  store.dispatch({
    type: 'CHANGE_DIRECTION_TO_90',
  });
});

document.getElementById('rotateGradientAdd')!.addEventListener('click', () => {
  store.dispatch({
    type: 'ROTATE_GRADIENT_INCREMENT_45',
  });
});

document
  .getElementById('rotateGradientRemove')!
  .addEventListener('click', () => {
    store.dispatch({
      type: 'ROTATE_GRADIENT_DECREMENT_45',
    });
  });
