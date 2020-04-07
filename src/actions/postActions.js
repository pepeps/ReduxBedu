import axios from 'axios';
import {
  GET_POST,
  GET_USERS,
  CARGANDO,
  ERROR,
  COM_ERROR,
  COM_CARGANDO,
  COM_SET
} from '../types/usertypes';

export const getUserById = id => async (dispatch, getState) => {
  dispatch({
    type: CARGANDO
  });

  const { usuarios } = getState().userReducers;
  const { posts } = getState().postReducer;
  const userId = usuarios[id].id;
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    const newResponse = response.data.map(post => ({
      ...post,
      comments: [],
      open: true
    }));
    const updated_post = [...posts, newResponse];
    dispatch({
      type: GET_POST,
      payload: updated_post
    });
    const post_key = updated_post.length - 1;
    const update_users = [...usuarios];
    update_users[id] = {
      ...usuarios[id],
      post_key
    };
    dispatch({
      type: GET_USERS,
      payload: update_users
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'Post are not available'
    });
  }
};

export const OpenClose = (post_key, commentKey) => (dispatch, getState) => {
  const { posts } = getState().postReducer;
  const selectPost = posts[post_key][commentKey];

  const updatePost = {
    ...selectPost,
    open: !selectPost.open
  };
  const updated_posts = [...posts];
  updated_posts[post_key] = [...posts[post_key]];
  updated_posts[post_key][commentKey] = updatePost;
  dispatch({
    type: GET_POST,
    payload: updated_posts
  });
};

export const getComments = (post_key, commentKey) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: COM_CARGANDO
  });

  const { posts } = getState().postReducer;
  const selectPost = posts[post_key][commentKey];

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${selectPost.id}`
    );
    const updatePost = {
      ...selectPost,
      comments: response.data
    };
    const updated_posts = [...posts]; // inmutabilidad
    updated_posts[post_key] = [...posts[post_key]];
    updated_posts[post_key][commentKey] = updatePost;
    dispatch({
      type: COM_SET,
      payload: updated_posts
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: COM_ERROR,
      payload: 'comments are not available'
    });
  }
};
