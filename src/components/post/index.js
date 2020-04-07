import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as getUsers from '../../actions/usersActions';
import * as getPost from '../../actions/postActions';
import Spinner from '../../tools/Spinner';
import NotFound from '../../tools/NotFound';
import Comment from '../../components/post/Comments';

const { getUserById, OpenClose, getComments } = getPost;

class Post extends Component {
  async componentDidMount() {
    if (!this.props.userReducers.usuarios.length) {
      await this.props.getUsers();
    }

    if (this.props.userReducers.error) {
      return;
    }
    if (
      !(
        'post_key' in
        this.props.userReducers.usuarios[this.props.match.params.key]
      )
    ) {
      this.props.getUserById(this.props.match.params.key);
    }
  }

  setUser = () => {
    const {
      userReducers,
      match: {
        params: { key }
      }
    } = this.props;

    if (userReducers.error) {
      return <NotFound></NotFound>;
    }
    if (!userReducers.usuarios.length || userReducers.cargando) {
      return <Spinner></Spinner>;
    }

    const nombre = userReducers.usuarios[key].name;

    return <h1>Post by {nombre}</h1>;
  };

  setPost = () => {
    const {
      userReducers,
      userReducers: { usuarios },
      postReducer,
      postReducer: { posts },
      match: {
        params: { key }
      }
    } = this.props;
    if (!usuarios.length) return;

    if (userReducers.error) return;

    if (postReducer.cargando) {
      return <Spinner></Spinner>;
    }
    if (postReducer.error) {
      return <NotFound message={postReducer.error} />;
    }
    if (!posts.length) return;
    if (!('post_key' in usuarios[key])) return;

    const { post_key } = usuarios[key];

    return this.showInfo(posts[post_key], post_key);
  };

  showInfo = (posts, post_key) =>
    posts.map((post, commentKey) => {
      return (
        <div
          key={post.id}
          className='post'
          onClick={() =>
            this.showComments(post_key, commentKey, post.comments)
          }>
          <h3 className='post-title'>{post.title}</h3>
          <p className='post-body'>{post.body}</p>
          {!post.open ? <Comment comments={post.comments} /> : ''}
        </div>
      );
    });

  showComments = (post_key, commentKey, comments) => {
    this.props.OpenClose(post_key, commentKey);
    if (!comments.length) {
      this.props.getComments(post_key, commentKey);
    }
  };

  render() {
    return (
      <div>
        {this.setUser()}
        {this.setPost()}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducers, postReducer }) => {
  return {
    userReducers,
    postReducer
  };
};

const mapDispatchtoProps = {
  ...getUsers,
  getUserById,
  OpenClose,
  getComments
};

export default connect(mapStateToProps, mapDispatchtoProps)(Post);
