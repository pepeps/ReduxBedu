import React from 'react';
import Spinner from '../../tools/Spinner';
import NotFound from '../../tools/NotFound';
import { connect } from 'react-redux';

const Comment = props => {
  if (props.com_cargando && !props.comments.length) {
    return <Spinner></Spinner>;
  }
  if (props.com_error) {
    return <NotFound message={props.com_error} />;
  }

  const setComments = () => {
    console.log(props.comments);
    return props.comments.map(comment => (
      <li key={comment.id}>
        <b>
          <u>{comment.email}</u>
        </b>
        <br />
        {comment.body}
      </li>
    ));
  };

  return <ul>{setComments(props)}</ul>;
};

const msp = ({ postReducer }) => {
  return postReducer;
};
export default connect(msp)(Comment);
