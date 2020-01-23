import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navbar.module.css';

class Navbar extends Component {

  render() {
    console.log(this);
    return (
      <div className={classes.Navbar}>
        <NavLink to='/'>Назад</NavLink>
      </div>
    );
  }
}

export default Navbar;
