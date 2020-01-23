import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './mainpage.module.css';

class Mainpage extends Component {
  render() {
    return (
      <div className={classes.Mainpage}>
        <div>
          <Link to={'/constructor'}>Конструктор</Link>
          <Link to={'/fields'}>Архив сред</Link>
          <Link to={'/results'}>Результаты эксперемента</Link>
        </div>
      </div>
    );
  }
}

export default Mainpage;
