import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './Navbar.module.css';

class Navbar extends Component {
  render() {
    return (
      <div className={classes.Navbar}>
        <Link to={'/'}>Главное меню</Link>
        <div>{this.props.username}</div>
      </div>
    );
  }
}

export default Navbar;
