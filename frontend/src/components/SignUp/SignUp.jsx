import React, {Component} from 'react';
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
      gender: 'Мужской',
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
    this.generateUsername();
    this.generatePassword();
  }

  changeValue = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  generateUsername = () => {
    function getRandomLetter() {
      let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      return letters[(Math.floor(Math.random() * ((letters.length - 1) + 1)))];
    }
    const generatedUsername = moment().format('YYYYMM') + getRandomLetter() + getRandomLetter() + (Math.floor(Math.random() * (999 - 100 + 1)) + 100);
    this.setState({username: generatedUsername});
  };

  generatePassword = () => {
    const generatedPassword = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    this.setState({password: generatedPassword});
  };

  signUp = async() => {
    const {active, username, password, category, surname, name, gender, dob, hand, group, year} = this.state;
    let body;
    if (this.state.category === 'Студент') {
      body = {active, username, password, category, surname, name, gender, dob, hand, group, year}
    } else {
      body = {active, username, password, category, surname, name, gender, dob, hand}
    }
    let resp = await fetch('/users/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });
    const res = await resp.json();
    this.setState({sending: true});
    if (res.succeeded) {
      this.setState({sending: false});
      this.setState({created: true});
    } else {
      this.setState({sending: false});
      this.setState({failed: true})
    }
  };

  resetForm = () => {
    this.setState({
      username: '',
      password: '',
      category: 'Студент',
      surname: null,
      name: null,
      gender: 'Мужской',
      dob: null,
      hand: 'Правша',
      group: null,
      year: moment().format('YYYY'),
      created: false,
      failed: false,
      sending: false,
    });
    this.generateUsername();
    this.generatePassword();
  };

  render() {
    return (
        <div className={'container'}>
        {Cookies.get('category') === 'Преподаватель' ?
              <div>
                <div><h1>Создание пользователя</h1></div>

                {this.state.created ?
                    <div>
                      <div><h2>Пользователь успешно создан</h2></div>
                      <div onClick={this.resetForm}>Создать еще</div>
                      <div>Вернуться в меню</div>
                    </div> :
                    <div>
                      <div>
                        <div>Идентификатор</div>
                        <div><input name="username" value={this.state.username} onChange={this.changeValue}/><div className={'button'} onClick={this.generateUsername}>сгенерировать</div></div>
                      </div>

                      <div>
                        <div>Пароль</div>
                        <div><input name="password" value={this.state.password} onChange={this.changeValue}/><div className={'button'} onClick={this.generatePassword}>новый пароль</div></div>
                      </div>

                      <div>
                        <div>Категория</div>
                        <div>
                          <select name="category" onChange={this.changeValue}>
                            <option>Студент</option>
                            <option>Дипломник</option>
                            <option>Преподаватель</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div>Фамилия</div>
                        <div><input name="surname" onChange={this.changeValue}/></div>
                      </div>

                      <div>
                        <div>Имя</div>
                        <div><input name="name" onChange={this.changeValue}/></div>
                      </div>

                      <div>
                        <div>Пол</div>
                        <div>
                          <select name="gender" onChange={this.changeValue}>
                            <option>Мужской</option>
                            <option>Женский</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div>Дата рождения</div>
                        <div><input name="dob" onChange={this.changeValue} type="date"/></div>
                      </div>

                      <div>
                        <div>Левша/Правша</div>
                        <div>
                          <select name="hand" onChange={this.changeValue}>
                            <option>Правша</option>
                            <option>Левша</option>
                          </select>
                        </div>
                      </div>

                      {this.state.category === 'Студент' ?
                          <div>

                            <div>
                              <div>Группа</div>
                              <div><input name="group" onChange={this.changeValue}/></div>
                            </div>

                            <div>
                              <div>Год</div>
                              <div><input name="year" value={this.state.year} onChange={this.changeValue}/></div>
                            </div>

                          </div> : <div/>
                      }

                      <div className={'longButton'} onClick={this.signUp}>Добавить нового пользователя</div>

                      {this.state.sending ? <div>Подождите...</div> : <div/>}

                      {this.state.failed ?
                          <div>
                            При создании пользователя произошла ошибка.<br/>Проверьте корректность введенных данных и подключение к базе данных.
                          </div> : <div/>
                      }
                    </div>
                }
              </div> :
              <div>
                <div><h2>Вы не авторизованы для создания новых пользователей</h2></div>
              </div>
        }
        </div>
    );
  }
}

export default SignUp;
