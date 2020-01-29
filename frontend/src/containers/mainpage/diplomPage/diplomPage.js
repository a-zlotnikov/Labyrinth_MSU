import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './diplomPage.module.css';

class diplomPage extends Component {
  render() {
    return (
      <div className={classes.diplomPage}>
        <Link to={'/constructor'}>Конструктор</Link>
      </div>
    );
  }
}

export default diplomPage;
