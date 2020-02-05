import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AUTHSUCCESS} from '../../store/creators/creators';
import './SignIn.css';
import Logo from '../../containers/mainpage/Logo/Logo';
const Cookies = require('js-cookie');

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      logged_in: null,
    }
  };

  refreshUsernameField = (e) => {
    this.setState({username: e.target.value})
  };

  refreshPasswordField = (e) => {
    this.setState({password: e.target.value})
  };

  signIn = async() => {
    let resp = await fetch('/users/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...this.state})
    });

    const res = await resp.json();
    if (res.user && res.cookie) {
      const {_id, username, category, surname, name, gender, dob, hand, group, year} = res.user;

      Cookies.set('user_id', _id);
      Cookies.set('username', username);
      Cookies.set('category', category);
      Cookies.set('surname', surname);
      Cookies.set('name', name);
      Cookies.set('gender', gender);
      Cookies.set('dob', dob);
      Cookies.set('hand', hand);
      Cookies.set('group', group);
      Cookies.set('year', year);

      this.props.handler();
    } else {
      alert('Пароль введён неверно') /// !!!
    }
  };

  render() {
    return (
      <div className={'logContainer'}>
        <Logo/>
        <h2>Behavior tracking</h2>
        <h1 className={'logTitle'}>Вход в систему</h1>
        <br/>
        <div>
          <input className={'logInput'} onChange={this.refreshUsernameField} placeholder="Идентификатор пользователя"/>
        </div>
        <br/>
        <div>
          <input className={'logInput'} onChange={this.refreshPasswordField} placeholder="Пароль" type="password"/>
        </div>
        {this.state.logged_in === false ? <div>Проверьте логин и пароль</div> : <div/>}
        <br/>
        <div className={'logButton'} onClick={this.signIn}>Войти</div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    token: store.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authSuccess: (token) => {
      dispatch(AUTHSUCCESS(token))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
