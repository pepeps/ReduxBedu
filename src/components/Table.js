import React from 'react';
import { connect } from 'react-redux';
import '../css/iconeye.css';
import { Link } from 'react-router-dom';

const Table = props => {
  const insertRows = () => {
    return props.usuarios.map((user, key) => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.website}</td>
          <td>
            <Link to={`/post/${key}`}>
              <div className='eye-solid2 icon'></div>
            </Link>
          </td>
        </tr>
      );
    });
  };
  return (
    <table className='tabla'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Enlace</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>{insertRows()}</tbody>
    </table>
  );
};

const mapStateToProps = reducers => {
  return reducers.userReducers;
};
export default connect(mapStateToProps)(Table);
