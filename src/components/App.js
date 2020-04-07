import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './menu/navbar';
import Users from './usuarios/users';
import Task from './task/task';
import Post from './post';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='App'>
        <Route exact path='/' component={Users} />
        <Route exact path='/task' component={Task} />
        <Route exact path='/post/:key' component={Post} />
      </div>
    </BrowserRouter>
  );
};

export default App;
