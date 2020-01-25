import React, {Component} from 'react';

class FoundUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  delete = async (e) => { // Удаляется, но карточка висит в результатах
      const id = e.target.parentElement.parentElement.parentElement.id;
      let resp = await fetch('/users/delete', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
      });
      const res = await resp.json();
      this.setState({loading: true});
      if (res.succeed) {
        this.setState({loading: false});
        alert('Пользователь удален')
      } else {
        this.setState({loading: false});
        alert('Произошла ошибка')
      }
  };

  switchStatus = async (e) => {
    const id = e.target.parentElement.parentElement.parentElement.id;
    let resp = await fetch('/users/switch_status', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    });
    const res = await resp.json();
    this.setState({loading: true});
    if (res.succeed) {
      this.setState({loading: false});
      alert('Статус изменен')
    } else {
      this.setState({loading: false});
      alert('Произошла ошибка')
    }
  };

  render() {
    return (
      <div id={this.props.id}>
        <hr/>
        <div>
          <div>{this.props.surname} {this.props.name}</div>
          <div>{this.props.category}
            {this.props.active === false ? <div>отключен</div> : <div/>}
          </div>
          <div>
            {this.props.category === 'Студент' ?
            <div>
            Группа {this.props.group} / {this.props.year} год
            </div> : <div/>}
          </div>
          <br/>
          <div>Идентификатор: {this.props.username}</div>
          <div>Пароль: {this.props.password}</div>
          <div>Пол: {this.props.gender}</div>
          <div>Дата рождения: {this.props.dob}</div>
          <div>Рука: {this.props.hand}</div>
          <br/>
          <div>
            <div>Редактировать</div>
            <div onClick={this.switchStatus}>Отключить</div>
            <div onClick={this.delete}>Удалить</div>
          </div>
        </div>
      </div>
    );
  }
}

export default FoundUser;
