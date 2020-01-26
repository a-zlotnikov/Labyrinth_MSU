import React, {Component} from 'react';
import FoundUser from './FoundUser/FoundUser';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'group',
      query: '',
      response: [],
      loading: false,
      error: false,
      authorized: true,
    };
  }

  componentDidMount = async () => {
    await this.searchAll();
  };

  searchAll = async () => {
    let resp = await fetch('/users/search/all', {
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

  changeType = async (e) => {
    if (e.target.value === 'Группа') {
      this.setState({type: 'group'})
    } else if (e.target.value === 'Фамилия') {
      this.setState({type: 'surname'})
    }
    await this.search();
  };

  changeQuery = async (e) => {
      await this.setState({query: e.target.value});
      await this.search();
  };

  search = async () => {
    const {type, query} = this.state;
    let resp = await fetch('/users/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({type, query})
    });
    const res = await resp.json();
    this.setState({loading: true});
    if (res.response) {
      this.setState({loading: false, error: false, response: res.response});
    } else {
      this.setState({loading: false, error: true});
    }
  };

  reset = async () => {
    this.setState({
      type: 'group',
      query: '',
      response: [],
      loading: false,
      error: false,
      authorized: true,
    });
    await this.searchAll();
  };

  render() {
    return (
        <div>
        {this.state.authorized ?
            <div>
              <div><h1>Поиск</h1></div>
              <div>
                <select name="type" onChange={this.changeType}>
                  <option>Группа</option>
                  <option>Фамилия</option>
                </select>
                <input value={this.state.query} onChange={this.changeQuery}/>
                <div onClick={this.reset}>Сбросить</div>
                {this.state.response.length !== 0 ? <div>Скачать результаты в XLSX</div> : <div/>}
              </div>
              <div>
                {this.state.error ?
                    <div><h2>ОШИБКА: Проверьте подключение к базе данных.</h2></div> :
                    <div>
                      {this.state.loading ?
                          <div><h2>Загрузка...</h2></div> :
                          <div>
                            {this.state.response.length !== 0 ?
                                <div>
                                  {this.state.response.map((result) => <FoundUser
                                      id = {result._id}
                                      active = {result.active}
                                      surname = {result.surname}
                                      name = {result.name}
                                      category = {result.category}
                                      username = {result.username}
                                      password = {result.password}
                                      gender = {result.gender}
                                      dob = {result.dob}
                                      hand = {result.hand}
                                      group = {result.group}
                                      year = {result.year}
                                  />)}
                                </div> :
                                <div><h2>По вашему запросу нет результатов</h2></div>
                            }
                          </div>
                      }
                    </div>
                }
              </div>
            </div> :
            <div>
              <h2>Вы не имеете доступа к этому разделу</h2>
            </div>
        }
        </div>
    );
  }
}

export default UserList;
