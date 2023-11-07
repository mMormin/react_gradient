import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './reducers/color';

const store = configureStore({
  // A la création du store
  // Redux va exécuter chaque reducer avec l'action "@@INIT"
  reducer: {
    color: colorReducer,
  },
});

export default store;
