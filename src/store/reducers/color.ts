import { AnyAction } from '@reduxjs/toolkit';
import { AppState } from '../../@types';

const initialState: AppState = {
  firstColor: '#F0F',
  lastColor: '#0F0',
  direction: '90deg',
  nbColors: 0,
};

// Le reducer est une fonction de traduction
// Il va traduire une intention (action) en nouvelle donnée
function colorReducer(
  state = initialState,
  action: AnyAction = { type: '@@INIT' }
): AppState {
  // En fonction de l'action / intention réaliser
  // Je vais retourner les données modifiées
  switch (action.type) {
    case 'CHANGE_FIRST_COLOR':
      return {
        // les ... me permette de déverser toutes les propriétés de l'objet state
        // dans le nouvel objet
        ...state,
        firstColor: action.payload,
        nbColors: state.nbColors + 1,
      };

    case 'CHANGE_LAST_COLOR':
      return {
        ...state,
        lastColor: action.payload,
        nbColors: state.nbColors + 1,
      };

    default:
      return state;
  }
}

export default colorReducer;
