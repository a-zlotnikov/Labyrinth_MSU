import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './SignUp.css';

const moment = require('moment');
const Cookies = require('js-cookie');

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      username: '',
      password: '',
      category: 'Студент',
      surname: null,
      name: null,
      gender: 'Женский',
      dob: null,
      hand: 'Правша',
      group: null,
      year: moment().format('YYYY'),
      created: false,
      failed: false,
      sending: false,
    };
  }

  componentDidMount() {
    this.generatePassword();
  }

  changeValue = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  generatePassword = () => {
    const generatedPassword = Math.floor(
        Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    this.setState({password: generatedPassword});
  };

  signUp = async () => {
    const {active, username, password, category, surname, name, gender, dob, hand, group, year} = this.state;
    let body;
    if (this.state.category === 'Студент') {
      body = {
        active,
        username,
        password,
        category,
        surname,
        name,
        gender,
        dob,
        hand,
        group,
        year,
      };
    } else {
      body = {
        active,
        username,
        password,
        category,
        surname,
        name,
        gender,
        dob,
        hand,
      };
    }
    let resp = await fetch('/users/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });
    const res = await resp.json();
    this.setState({sending: true});
    if (res.succeeded) {
      this.setState({sending: false});
      this.setState({created: true});
    } else {
      this.setState({sending: false});
      this.setState({failed: true});
    }
  };

  resetForm = () => {
    this.setState({
      username: '',
      password: '',
      category: 'Студент',
      surname: null,
      name: null,
      gender: 'Женский',
      dob: null,
      hand: 'Правша',
      group: null,
      year: moment().format('YYYY'),
      created: false,
      failed: false,
      sending: false,
    });
    this.generatePassword();
  };

  render() {
    return (
        <div className={'regContainer'}>
          {Cookies.get('category') === 'Преподаватель' ?
              <div>
                <div><h1>Создание пользователя</h1></div>
                {this.state.created ?
                    <div>
                      <div><h2>Пользователь успешно создан</h2></div>
                      <div className={'regText'} onClick={this.resetForm}>Создать еще</div>
                      <Link className={'regText'} to={'/'}>Вернуться в меню</Link>
                    </div> :
                    <div>
                      <div className={'regAttributesBox'}>
                        <div>
                          <div>
                            <div className={'regAttribute'}>Идентификатор:</div>
                            <div><input className={'regInput regTextEdit'}
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.changeValue}/></div>
                          </div>
                          <div>
                            <div className={'regAttribute'}>Пароль:</div>
                            <div><input className={'regInput regTextEdit'}
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.changeValue}/>
                              <div className={'regButton'}
                                   onClick={this.generatePassword}>новый пароль
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className={'regAttribute'}>Категория:</div>
                            <div>
                              <select className={'regTextEdit'} name="category"
                                      onChange={this.changeValue}>
                                <option>Студент</option>
                                <option>Дипломник</option>
                                <option>Преподаватель</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <div className={'regAttribute'}>Фамилия:</div>
                            <div><input className={'regInput regTextEdit'}
                                        name="surname"
                                        onChange={this.changeValue}/>
                            </div>
                          </div>

                          <div>
                            <div className={'regAttribute'}>Имя:</div>
                            <div><input className={'regInput regTextEdit'}
                                        name="name"
                                        onChange={this.changeValue}/>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div className={'regAttribute'}>Пол:</div>
                            <div>
                              <select className={'regTextEdit'} name="gender"
                                      onChange={this.changeValue}>
                                <option>Женский</option>
                                <option>Мужской</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <div className={'regAttribute'}>Дата рождения:</div>
                            <div><input className={'regInput regTextEdit'}
                                        name="dob" onChange={this.changeValue}
                                        type="date"/></div>
                          </div>

                          <div>
                            <div className={'regAttribute'}>Левша/Правша:</div>
                            <div>
                              <select className={'regTextEdit'} name="hand"
                                      onChange={this.changeValue}>
                                <option>Правша</option>
                                <option>Левша</option>
                              </select>
                            </div>
                          </div>

                          {this.state.category === 'Студент' ?
                              <div>

                                <div>
                                  <div className={'regAttribute'}>Группа:</div>
                                  <div><input className={'regInput regTextEdit'}
                                              name="group"
                                              onChange={this.changeValue}/>
                                  </div>
                                </div>

                                <div>
                                  <div className={'regAttribute'}>Год:</div>
                                  <div><input className={'regInput regTextEdit'}
                                              name="year"
                                              value={this.state.year}
                                              onChange={this.changeValue}/>
                                  </div>
                                </div>

                              </div> : <div/>
                          }
                        </div>

                      </div>


                      < div className={'addUserButton'}
                            onClick={this.signUp}>Добавить пользователя
                      </div>

                      {this.state.sending ? <div>Подождите...</div> : <div/>}

                      {this.state.failed ?
                          <div>
                            При создании пользователя произошла ошибка.<br/>Проверьте
                            корректность введенных данных и подключение к базе
                            данных.
                          </div> : <div/>
                      }
                    </div>
                }
              </div>
              :
              <div>
                <div><h2>Вы не авторизованы для создания новых
                  пользователей</h2></div>
              </div>
          }
        </div>
    );
  }
}

export default SignUp;
