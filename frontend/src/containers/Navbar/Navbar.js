import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './Navbar.module.css';
const Cookies = require('js-cookie');

class Navbar extends Component {
  render() {
    console.log(this.props.options);
    return (
      <div className={classes.Navbar}>
        <Link to={'/'}>Главное меню</Link>
        <div>{this.props.options}
        <Link to={'/'}>Выйти</Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
