import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './otherPage.module.css';

class OtherPage extends Component {
  render() {
    return (
      <div className={classes.OtherPage}>
        <Link to={'/constructor'}>Конструктор</Link>
        <Link to={'/fields'}>Архив сред</Link>
        <Link to={'/results'}>Архив экспериментов</Link>
      </div>
    );
  }
}

export default OtherPage;