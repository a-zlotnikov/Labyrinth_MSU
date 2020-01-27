import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './Navbar.module.css';
import {connect} from 'react-redux';
const Cookies = require('js-cookie');

class Navbar extends Component {
  logout = async () => {
    let resp = await fetch('/users/logout', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
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
  };

  render() {
    console.log(this.props.token);
    return (
      <div className={classes.Navbar}>
        <Link to={'/'}>Главное меню</Link>
        <div>{Cookies.get('surname')} {Cookies.get('name')} / {Cookies.get('username')}
        <Link onClick={this.logout} to={'/'}>Выйти</Link>
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
