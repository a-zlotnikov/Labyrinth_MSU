import React, {Component} from 'react';

class FoundUser extends Component {
  constructor(props) {
    super(props);
    this.state = { // Це хардкод
      surname: 'Лёзов',
      name: 'Валя',
      category: 'Преподаватель',
      username: '12345',
      password: 'mypass',
      gender: 'Мужской',
      dob: '2015-01-01',
      hand: 'Правша',
      group: '101',
      year: '2020',
    };
  }
  render() {
    return (
      <div>
        <hr/>
        <div>
          <div>{this.props.surname} {this.props.name}</div>
          <div>{this.props.category}</div>
          <div>Группа {this.props.group} / {this.props.year} год</div>
          <br/>
          <div>Идентификатор: {this.props.username}</div>
          <div>Пароль: {this.props.password}</div>
          <div>Пол: {this.props.gender}</div>
          <div>Дата рождения: {this.props.dob}</div>
          <div>Рука: {this.props.hand}</div>
          <br/>
          <div>
            <div>Редактировать</div>
            <div>Отключить</div>
            <div>Удалить</div>
          </div>
        </div>
      </div>
    );
  }
}

export default FoundUser;
