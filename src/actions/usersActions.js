import axios from 'axios';
import { GET_USERS, CARGANDO, ERROR } from '../types/usertypes';

export const getUsers = () => async dispatch => {
  dispatch({
    type: CARGANDO
  });
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    dispatch({
      type: GET_USERS,
      payload: response.data
    });
  } catch (error) {
    console.log(error, 'URL fallo');
    dispatch({
      type: ERROR,
      payload: error.message
    });
  }
};
