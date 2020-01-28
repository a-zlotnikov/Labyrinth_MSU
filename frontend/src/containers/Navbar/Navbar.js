import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './Navbar.module.css';
import {connect} from 'react-redux';
const Cookies = require('js-cookie');

class Navbar extends Component {
  logout = async () => {
    await fetch('/users/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      // body: {}
    });
    Cookies.remove('user_id');
    Cookies.remove('username');
    Cookies.remove('category');
    Cookies.remove('surname');
    Cookies.remove('name');
    Cookies.remove('gender');
    Cookies.remove('dob');
    Cookies.remove('hand');
    Cookies.remove('group');
    Cookies.remove('year');
    this.props.logout();
  };

  render() {
    console.log(this.props.token);
    return (
      <div className={classes.Navbar}>
        <Link class={'textNav'} to={'/'}>Главное меню</Link>
        <div className={'textNav'}>{Cookies.get('surname')} {Cookies.get('name')} / {Cookies.get('username')}
        <Link className={'textNav'} onClick={this.logout} to={'/'}>Выйти</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    token: store.token
  }
}

export default connect(mapStateToProps)(Navbar)
