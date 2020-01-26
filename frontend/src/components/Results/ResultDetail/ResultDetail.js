import React, {Component} from 'react';
import classes from './ResultDetail.module.css';

class ResultDetail extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      details: '',
      loading: true,
    };
  }
  
  componentDidMount = async () => {
    this.setState({loading: true});
    const id = this.props.match.params.id;
    const response = await fetch('/results', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id}),
    });
    const result = await response.json();
    this.setState({details: result[0], loading: false});
  };
  
  render() {
    return !this.state.loading ? (
      <div className={classes.ResultDetail}>
        <hr/>
        <p>Дата: {this.state.details.data}</p>
        <p>Время: {this.state.details.time}</p>
        <p>Название среды: {this.state.details.nameEnvironment}</p>
        <p>Название эксперимента: {this.state.details.nameExperiment}</p>
        <p>Номер опыта: {this.state.details.numberExperiment}</p>
        <p>Имя особи: {this.state.details.nameIndividual}</p>
        <hr/>
        <p>Эксперимент проведен</p>
        <p>Фамилия: {this.state.details.surname}</p>
        <p>Имя: {this.state.details.name}</p>
        <p>Возраст: {this.state.details.age}</p>
        <p>Пол: {this.state.details.gender}</p>
        <p>Рука: {this.state.details.hand}</p>
        <p>Год: {this.state.details.year}</p>
        <p>Группа: {this.state.details.group}</p>
        <hr/>
        <table width="100%" cellSpacing="0" border="1">
          <thead>
          <tr style={{textAlign:'center'}}>
            <td>Время</td>
            <td>Действие</td>
          </tr>
          </thead>
          {this.state.details.result.map((timeAndDo, index) => {
            return (
              <tbody key={index}>
              <tr style={{textAlign:'center'}}>
                <td>{Object.keys(timeAndDo)}</td>
                <td>{Object.values(timeAndDo)}</td>
              </tr>
              </tbody>);
          })}
        </table>
      </div>
    ) : (<div>Loading...</div>);
  }
}

export default ResultDetail;
