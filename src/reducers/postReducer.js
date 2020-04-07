import {
  GET_POST,
  CARGANDO,
  ERROR,
  COM_ERROR,
  COM_CARGANDO,
  COM_SET
} from '../types/usertypes';

const INITIAL_STATE = {
  posts: [],
  cargando: false,
  error: '',
  com_cargando: false,
  com_error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POST:
      return { ...state, posts: action.payload, cargando: false, error: '' };

    case CARGANDO:
      return { ...state, cargando: true };

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

    case COM_SET:
      return {
        ...state,
        posts: action.payload,
        com_cargando: false,
        com_error: ''
      };
    case COM_CARGANDO:
      return { ...state, com_cargando: true };

    case COM_ERROR:
      return { ...state, com_error: action.payload, com_cargando: false };
    default:
      return state;
  }
};
