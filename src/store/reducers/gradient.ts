import { AnyAction } from '@reduxjs/toolkit';
import { AppState } from '../../@types';

const initialState: AppState = {
  firstColor: '#F0F',
  lastColor: '#0F0',
  direction: '90deg',
  nbColors: 0,
};

function gradientReducer(
  state = initialState,
  action: AnyAction = { type: '@@INIT' }
): AppState {
  switch (action.type) {
    case 'CHANGE_TO_LEFT_GRADIENT':
      return {
        ...state,
        direction: '270deg',
      };

    case 'CHANGE_TO_RIGHT_GRADIENT':
      return {
        ...state,
        direction: '90deg',
      };

    default:
      return state;
  }
}

export default gradientReducer;
