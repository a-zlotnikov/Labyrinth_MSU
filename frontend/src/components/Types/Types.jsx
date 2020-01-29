import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Types.css';
import classes from '../Results/Results.module.css';
import CurrentType from '../Types/CurrentType/CurrentType';
const Cookies = require('js-cookie');

// TODO: Редактирование второй раз (висит предыдущий стэйт), ограничение нэйма при редактировании

class Types extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      sending: false,
      saved: null,
      failed: false,
      response: null,
      loading: false,
    };
  }

  fetchTypes = async () => {
    let resp = await fetch('/types', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    const res = await resp.json();
    this.setState({loading: true});
    if (res.response) {
      this.setState({loading: false, error: false, response: res.response});
    } else {
      this.setState({loading: false, error: true});
    }
  };

  componentDidMount = async () => {
    await this.fetchTypes();
  };

  save = async () => {
    this.setState({sending: false, saved: null, failed: false});
    const {name, description} = this.state;
    let resp = await fetch('/types/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, description}),
    });
    const res = await resp.json();
    this.setState({sending: true});
    if (res.succeeded) {
      this.setState({sending: false, saved: true});
    } else {
      this.setState({sending: false, failed: true});
    }
  };

  changeName = (e) => {
    // if (e.target.value.match(/[0-9]/)) {
    //   this.setState({name: ''});
    // }
    this.setState({name: e.target.value.toUpperCase()});
  };

  changeDescription = (e) => {
    this.setState({description: e.target.value});
  };

  render() {
    return (
      <div>
        <h1>Типы экспериментов</h1>
        {Cookies.get('category') === 'Преподаватель' ?
            <div>
              <h2>Создать новый</h2>
              <div>
                <input className={'regInput regTextEdit'}
                       name="name"
                       value={this.state.name}
                       placeholder="имя"
                       maxLength="3"
                       onChange={this.changeName}
                />
                <input className={'regInput regTextEdit'}
                       name="description"
                       value={this.state.description}
                       placeholder="описание"
                       onChange={this.changeDescription}/>
              </div>
              <div className={'regButton'}
                   onClick={this.save}>сохранить
              </div>
              <hr/>
            </div> : null
        }
        {this.state.response ?
            <div>
              <h2>Все типы экспериментов</h2>
                <div className={classes.Results}>
                  <table>
                    <thead>
                    <tr>
                      <th>Имя</th>
                      <th>Описание</th>
                      <th colSpan="2">
                        Опции
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.response.map((result) =>
                        <CurrentType 
                        id={result._id}
                        name={result.name}
                        description={result.description}
                        />,
                    )}
                    </tbody>
                  </table>
              </div>
            </div> :
            <div>
              <h2>Нет записей</h2>
            </div>
        }
      </div>
    );
  }
}

export default Types;
