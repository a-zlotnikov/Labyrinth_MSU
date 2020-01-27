import React, {Component} from 'react';
import {withRouter} from 'react-router';
import lodash from 'lodash';
// import {Resizable, ResizableBox} from 'react-resizable';
import classes from './Results.module.css';
import Loader from '../../containers/Loader/Loader';
import {saveAs} from 'file-saver';

// const FileSaver = require('file-saver');

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
    console.log(this.state.results)
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
  
  onSaveTxt = async id => {
    const response = await fetch('/results', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id}),
    });
    const results = await response.json();
    const {
      data, time, nameEnvironment, nameExperiment,
      numberExperiment, typeExperiment, surname, name, age, gender, hand, year,
      group, numberOfReinforcements,
    } = results['0'];
      let timeLine = [];
    
    results['0'].result.map(
      (elem) => timeLine.push(`${Object.keys(elem)}:${Object.values(elem)}\n`));
    
    const elemFile = [
      `${data}\n`,
      `${time}\n`,
      `${nameEnvironment}\n`,
      `${nameExperiment}\n`,
      `${numberExperiment}\n`,
      `${typeExperiment}\n`,
      `${surname}\n`,
      `${name}\n`,
      `${age}\n`,
      `${gender}\n`,
      `${hand}\n`,
      `${year}\n`,
      `${group}\n`,
      `${numberOfReinforcements}\n`
      ];
    
    const newFile = [...elemFile, ...timeLine];
    const blob = await new Blob(newFile, {type: 'text/plain;charset=utf-8'});
    await saveAs(blob, `${results['0'].nameEnvironment}_${results['0'].nameEnvironment}`);
  };
  
  onSaveXls = async id => {
    // console.log(id)
  }
  
  onDelete = async id => {
    if (this.props.options.category === 'Преподаватель') {
      
      const response = await fetch('/results', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id}),
      });
      const results = await response.json();
      this.setState({
        results,
      });
    }
    
  };
  
  render() {
    
    const cls = [classes.Option];
    const any = [classes.Option, classes.enable];
    
    if (this.props.options.category === 'Преподаватель') {
      cls.push(classes.enable);
    } else {
      cls.push(classes.disable);
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
                <th onClick={this.onSort.bind(this, 'data')}>Дата</th>
                <th onClick={this.onSort.bind(this, 'typeExperiment')}>Тип эксперемента</th>
                <th onClick={this.onSort.bind(this, 'username')}>Идентификатор пользователя</th>
  
                <th onClick={this.onSort.bind(this, 'nameEnvironment')}>Название
                  эксперимента
                </th>
                <th onClick={this.onSort.bind(this, 'numberExperiment')}>Номер
                  опыта
                </th>
                <th onClick={this.onSort.bind(this, 'nameIndividual')}>Имя
                  особи
                </th>
                <th colSpan="4">
                  Опции
                </th>
              </tr>
              </thead>
              <tbody>
              {this.state.results.map((result, index) =>
                <tr key={index} name={result._id}
                >
                  <td>{result.data}</td>
                  <td>{result.typeExperiment}</td>
                  <td>{result.username}</td>
                  <td>{result.nameEnvironment}</td>
                  <td>{result.numberExperiment}</td>
                  <td>{result.nameIndividual}</td>
                  <td
                    className={any.join(' ')}
                    onClick={() => this.props.history.push(
                      '/results/' + result._id)}
                  >Смотреть
                  </td>
                  <td
                    className={any.join(' ')}
                    onClick={this.onSaveTxt.bind(this, result._id)}>Скачать txt
                  </td>
                  <td
                    className={any.join(' ')}
                    onClick={this.onSaveXls.bind(this, result._id)}>Скачать xls
                  </td>
                  <td
                    className={cls.join(' ')}
                    onClick={this.onDelete.bind(this, result._id)}
                  >Удалить
                  </td>
                </tr>,
              )}
              </tbody>
            </table>
          </div>
        </div>
        {/*<ResizableBox*/}
        {/*  width={200}*/}
        {/*  height={200}*/}
        {/*  draggableOpts={{...}}*/}
        {/*  minConstraints={[100, 100]} maxConstraints={[300, 300]}>*/}
        {/*  <span>Contents</span>*/}
        {/*</ResizableBox>*/}
      </div>
    ) : (<Loader/>);
  }
}

export default withRouter(Results);