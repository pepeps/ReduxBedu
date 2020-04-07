import { GET_USERS, CARGANDO, ERROR } from '../types/usertypes';

const INITIAL_STATE = {
  usuarios: [],
  cargando: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, usuarios: action.payload, cargando: false, error: '' };

    case CARGANDO:
      return { ...state, cargando: true };

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

    default:
      return state;
  }
};
