import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './Navbar.module.css';
const Cookies = require('js-cookie');

class Navbar extends Component {
  render() {
    return (
      <div className={classes.Navbar}>
        <Link to={'/'}>Главное меню</Link>
        <div>{Cookies.get('surname')} {Cookies.get('name')} / {/*{this.props.options.category} /*/} {/*{this.props.options.group ?*/} {/*this.props.options.group : null}*/}
        </div>
      </div>
    );
  }
}

export default Navbar;
