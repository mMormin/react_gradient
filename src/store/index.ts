import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './reducers/color';

const store = configureStore({
  // A la création du store -> Redux éxécute chaque reducer avec l'action "@@INIT"
  reducer: {
    color: colorReducer,
  },
});

export default store;
