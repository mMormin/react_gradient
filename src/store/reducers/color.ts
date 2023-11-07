import { AnyAction } from '@reduxjs/toolkit';
import { AppState } from '../../@types';

const initialState: AppState = {
  firstColor: '#F0F',
  lastColor: '#0F0',
  direction: '90deg',
  nbColors: 0,
};

// Le reducer est une fonction de traduction -> Il traduit une intention (action) en nouvelle donnée
function colorReducer(
  state = initialState,
  action: AnyAction = { type: '@@INIT' }
): AppState {
  switch (action.type) {
    case 'CHANGE_FIRST_COLOR':
      return {
        // Les '...' permette de déverser toutes les propriétés de l'objet 'state' dans le nouvel objet crée par la function
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

    case 'CHANGE_DIRECTION_TO_270':
      return {
        ...state,
        direction: '270deg',
      };
  
    case 'CHANGE_DIRECTION_TO_90':
      return {
        ...state,
        direction: '90deg',
      };

    case 'CHANGE_ALL_COLORS':
      return {
        ...state,
        firstColor: action.payload.firstRandomColor,
        lastColor: action.payload.secondRandomColor,
        nbColors: state.nbColors + 2,
      };

    default:
      return state;
  }
}

export default colorReducer;
