import React, {Component} from 'react';
import classes from './Navbar.module.css';

class Navbar extends Component {
  render() {
    return (
      <div className={classes.Navbar}>
        <div>Туда</div>
        <div>Home</div>
        <div>Сюда</div>
      </div>
    );
  }
}

export default Navbar;
