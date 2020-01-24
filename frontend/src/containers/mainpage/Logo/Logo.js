import React, {Component} from 'react';
import classes from './Logo.module.css';

class Logo extends Component {
  render() {
    return (
      <div className={classes.Logo}>
        <img src="/img/logo.png" alt=""/>
      </div>
    );
  }
}

export default Logo;
