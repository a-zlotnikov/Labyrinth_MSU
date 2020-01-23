import React, {Component} from 'react';
import classes from './Navbar.module.css';

class Navbar extends Component {
  
  isBack = () => {
    return (
      window.history.back()
    );
  };
  
  render() {
    return (
      <div className={classes.Navbar}>
        <div onClick={this.isBack}>Назад</div>
        <div>Иванов Иван</div>
      </div>
    );
  }
}

export default Navbar;
