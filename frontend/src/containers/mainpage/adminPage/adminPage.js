import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './adminPage.module.css';

class AdminPage extends Component {
  render() {
    return (
      <div className={classes.AdminPage}>
        <Link to={'/registration'}>Регистрация</Link>
        <Link to={'/users'}>Список пользователей</Link>
      </div>
    );
  }
}

export default AdminPage;
