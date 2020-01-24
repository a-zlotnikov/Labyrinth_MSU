import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './mainpage.module.css';

class Mainpage extends Component {
  render() {
    return (
      <div>
        <div className={classes.ImgLogo}>
          <img src="/img/logo.png" alt=""/>
        </div>
        <div className={classes.Mainpage}>
          <div>
            <Link to={'/constructor'}>Конструктор</Link>
            <Link to={'/fields'}>Архив сред</Link>
            <Link to={'/results'}>Архив экспериментов</Link>
            <Link to={'/registration'}>Регистрация</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Mainpage;
