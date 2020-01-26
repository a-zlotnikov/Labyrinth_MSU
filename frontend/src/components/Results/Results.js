import React, {Component} from 'react';
import {withRouter} from 'react-router';
import lodash from 'lodash';
import classes from './Results.module.css';

class Results extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      results: '',
      sort: 'asc',
      sortField: 'pp',
      row: null,
      find: '',
    };
  }
  
  componentDidMount = async () => {
    const response = await fetch('/results');
    const results = await response.json();
    this.setState({
      results,
    });
    console.log(this.props.options)
  };
  
  
  onFinder = (e) => {
    this.setState({
      find: e.target.value,
    });
  };
  
  onSort = sortField => {
    const cloneData = this.state.results;
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
    const orderedData = lodash.orderBy(cloneData, sortField, sortType);
    this.setState({
      results: orderedData,
      sort: sortType,
      sortField,
    });
  };
  
  onDelete = async id => {
    if (this.props.options === 'Преподаватель') {
    
    const response = await fetch('/results', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    });
    const results = await response.json();
    this.setState({
      results
    });    }
  
  };
  
  render() {
    
    const cls = [classes.Option];
    const any = [classes.Option, classes.enable];
    
    if (this.props.options === 'Преподаватель') {
      cls.push(classes.enable)
    } else {
      cls.push(classes.disable)
    }
    
    return this.state.results ? (
      <div>
        <div className={classes.Header}>
          <div><img src="/img/logo.png" alt=""/></div>
        </div>
        <div className={classes.LayoutRes}>
          <div>
            <input type="text" value={this.state.find}
                   onChange={this.onFinder}/>
          </div>
          <div className={classes.Results}>
            <table>
              <thead>
              <tr>
                <th onClick={this.onSort.bind(this, 'pp')}>№ п/п</th>
                <th onClick={this.onSort.bind(this, 'data')}>Дата</th>
                <th onClick={this.onSort.bind(this, 'nameEnvironment')}>Название
                  эксперимента
                </th>
                <th onClick={this.onSort.bind(this, 'numberExperiment')}>Номер
                  опыта
                </th>
                <th onClick={this.onSort.bind(this, 'nameIndividual')}>Имя
                  особи
                </th>
                <th colSpan="3">
                  Опции
                </th>
              </tr>
              </thead>
              <tbody>
              {this.state.results.map((result, index) =>
                <tr key={index} name={result._id}
                    >
                  <td>{index + 1}</td>
                  <td>{result.data}</td>
                  <td>{result.nameEnvironment}</td>
                  <td>{result.numberExperiment}</td>
                  <td>{result.nameIndividual}</td>
                  <td className={any.join(' ')} onClick={() => this.props.history.push(
                    '/results/' + result._id)}>Смотреть</td>
                  <td className={any.join(' ')}>Скачать</td>
                  <td className={cls.join(' ')} onClick={this.onDelete.bind(this, result._id)}>Удалить</td>
                </tr>  ,
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : <div>Loading...</div>;
  }
}

export default withRouter(Results);