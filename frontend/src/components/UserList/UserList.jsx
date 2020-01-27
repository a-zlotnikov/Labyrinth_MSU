import React, {Component} from 'react';
import FoundUser from './FoundUser/FoundUser';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import './UserList.css';
const Cookies = require('js-cookie');

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'group',
      query: '',
      response: [],
      loading: false,
      error: false,
      category: Cookies.get('category'),
    };
  }

  componentDidMount = async () => {
    await this.searchAll();
  };

  exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(this.state.response); // Надо изменить формат данных (ключи по-русски и пр.)
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, 'search_results' + fileExtension);
  };

  // exportToXLS = () => {
  //   const fileType = 'application/vnd.ms-excel';
  //   const fileExtension = '.xls';
  //   const ws = XLS.utils.json_to_sheet(this.state.response); // Надо изменить формат данных (ключи по-русски и пр.)
  //   const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //   const excelBuffer = XLS.write(wb, { bookType: 'xls', type: 'array' });
  //   const data = new Blob([excelBuffer], {type: fileType});
  //   FileSaver.saveAs(data, 'search_results' + fileExtension);
  // };

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
    } else if (e.target.value === 'Категория') {
      this.setState({type: 'category'})
    } else if (e.target.value === 'Год') {
      this.setState({type: 'year'})
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
        <div className={'container'}>
        {this.state.category === 'Преподаватель' ?

            <div>
              <div className={'title'}><h1>Поиск</h1></div>
              <div>
                <select className={'selector'} name="type" onChange={this.changeType}>
                  <option>Группа</option>
                  <option>Фамилия</option>
                  <option>Год</option> // TODO: не пашет
                  <option>Категория</option> // TODO: сделать
                </select>
                {this.state.type === "group" ? <input className={'topInput'} value={this.state.query} onChange={this.changeQuery} placeholder={'введите номер группы'}/> :
                    this.state.type === "surname" ?
                    <input className={'topInput'} value={this.state.query} onChange={this.changeQuery} placeholder={'введите фамилию'}/>:
                        this.state.type === "category" ?
                            <input className={'topInput'} value={this.state.query} onChange={this.changeQuery} placeholder={'введите тип пользователя'}/>:

                            this.state.type === "year" ? <input className={'topInput'} value={this.state.query} onChange={this.changeQuery} placeholder={'введите год'}/>:
                            null
                }
                <div className={'btnRow'}>
                  <div className={'button'} onClick={this.reset}>Сбросить</div>
                  {this.state.response.length !== 0 ? <div className={'button'} onClick={this.exportToExcel}>Скачать результаты поиска в *.xlsx</div> : <div/>}
                </div>
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
