// == Imports
import store from './store';
import { randomHexColor, generateSpanColor } from './utils/color';
import { AppState } from './@types';

import './styles/index.scss';

// Pour récupérer les données stocker dans mon store, je vais faire un store.getState()
console.log(store.getState());

// == State
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

// == Initialisation
renderNbColors();
renderGradient();
renderColors();

// store.subscribe permet de s'abonner à un changement de state
// A chaque fois qu'une donnée stocker dans mon store va être modifier, je pourrais exécuter une fonction
store.subscribe(() => {
  // A chaque fois que mes données change, je met à jour mon interface
  renderNbColors();
  renderGradient();
  renderColors();
});

// == Controls
document.getElementById('randAll')!.addEventListener('click', () => {
  // data
  state.nbColors += 2;
  state.firstColor = randomHexColor();
  state.lastColor = randomHexColor();
});

document.getElementById('randFirst')!.addEventListener('click', () => {
  // Je vais emettre, je vais dispatch une action / intention à tous les reducers
  // La convention de redux veut que l'action soit un objet avec une propriété `type`
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
  // data
  // TODO: Faire le changement de direction à gauche
  // Modifier dans le store redux la direction pour mettre à 270deg
  // state.direction = '270deg';
});

document.getElementById('toRight')!.addEventListener('click', () => {
  // data
  // TODO: Faire le changement de direction à droite
  // Modifier dans le store redux la direction pour mettre à 90deg
  // state.direction = '90deg';
});
