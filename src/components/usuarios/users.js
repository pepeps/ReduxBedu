import React, { Component } from 'react';
import '../../css/index.css';
import { connect } from 'react-redux';
import * as getUsers from '../../actions/usersActions';
import Spinner from '../../tools/Spinner';
import NotFound from '../../tools/NotFound';
import Table from '../Table';

class Users extends Component {
  componentDidMount() {
    if (!this.props.usuarios.length) this.props.getUsers(); // condicional para evitar recargar el componente, se queda en el estado init
  }
  setTable = () => {
    if (this.props.cargando) {
      return <Spinner></Spinner>;
    }

    if (this.props.error) {
      return <NotFound message={this.props.error} />;
    }
    return <Table></Table>;
  };

  render() {
    return <div>{this.setTable()}</div>;
  }
}

const mapStateToProps = reducers => {
  return reducers.userReducers;
};

export default connect(mapStateToProps, getUsers)(Users);
