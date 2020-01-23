import React, {Component} from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      category: 'Студент',
      surname: null,
      name: null,
      gender: 'Мужской',
      dob: null,
      hand: 'Левша',
      group: null,
      year: null,
    };
  }

  componentDidMount() {
    this.generateUsername();
    this.generatePassword();
  }

  changeValue = (e) => {
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state);
  };

  generateUsername = (e) => {

    const generatedUsername = Date.now();
    this.setState({username: generatedUsername});
  };

  generatePassword = () => {
    const generatedPassword = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    this.setState({password: generatedPassword});
  };

  signUp = async() => {
    let resp = await fetch('/users/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...this.state})
    });

    const res = await resp.json();
    console.log(res);
    if (res.succeeded) {
      console.log('>>> Registration OK');
    } else {
      alert('Try again')
    }
    await console.log(res);
  };

  render() {
    return (
      <div>
        <div><h1>Создание пользователя</h1></div>

        <div>
          <div>Идентификатор</div>
          <div><input name="username" value={this.state.username} onChange={this.changeValue}/><div onClick={this.generateUsername}>сгенерировать</div></div>
        </div>

        <div>
          <div>Пароль</div>
          <div><input name="password" value={this.state.password} onChange={this.changeValue}/><div onClick={this.generatePassword}>новый пароль</div></div>
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
              <option>Левша</option>
              <option>Правша</option>
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
                <div><input name="year" onChange={this.changeValue}/></div>
              </div>

            </div> : <div/>
        }

        <div onClick={this.signUp}>Добавить нового пользователя</div>

      </div>
    );
  }
}

export default SignUp;
