import React, {Component} from 'react';
import classes from './ResultDetail.module.css';
import Loader from '../../../containers/Loader/Loader';
import moment from 'moment';
import {Link} from 'react-router-dom'

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
    const response = await fetch('/experiment', {
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
        <div className={classes.back}>
          <div>Дата: {this.state.details.date ? this.state.details.date : '-'}</div>
          <div> <Link to={'/results'}>Вернуться назад </Link></div>
        </div>
        <div>Время: {this.state.details.time ? this.state.details.time : '-'}</div>
        <div>Название среды: {this.state.details.env.name ? this.state.details.env.name : '-'}</div>
        <div>Название эксперимента: {this.state.details.expName ? this.state.details.expName : '-'}</div>
        <div>Номер опыта: {this.state.details.expNumber ? this.state.details.expNumber : '-'}</div>
        <div>Имя особи: {this.state.details.animalName ? this.state.details.animalName : '-'}</div>
        <div>Тип эксперимента: {this.state.details.expType ? this.state.details.expType : '-'}</div>
        <div>Количество подкормов: {this.state.details.numberOfReinforcements ? this.state.details.numberOfReinforcements : '-'}</div>
        <hr/>
        <div>Эксперимент проведен</div>
        <div>Фамилия: {this.state.details.user.surname ? this.state.details.user.surname : '-'}</div>
        <div>Имя: {this.state.details.user.name ? this.state.details.user.name : '-'}</div>
        <div>Возраст: {this.state.details.user.dob ? moment().diff(this.state.details.user.dob, 'years') : '-'}</div>
        <div>Пол: {this.state.details.user.gender ? this.state.details.user.gender : '-'}</div>
        <div>Рука: {this.state.details.user.hand ? this.state.details.user.hand : '-'}</div>
        <div>Год: {this.state.details.user.year ? this.state.details.user.year : '-'}</div>
        <div>Группа: {this.state.details.user.group ? this.state.details.user.group : '-'}</div>
        <hr/>
        <table width="100%" cellSpacing="0" border="1">
          <thead>
          <tr style={{textAlign:'center'}}>
            <td>Время</td>
            <td>Действие</td>
          </tr>
          </thead>
          {this.state.details.moves ? this.state.details.moves.map((timeAndDo, index) => {
            return (
              <tbody key={index}>
              <tr style={{textAlign:'center'}}>
                <td>{Object.keys(timeAndDo)}</td>
                <td>{Object.values(timeAndDo)}</td>
              </tr>
              </tbody>);
          }) : null}
        </table>
      </div>
    ) :  (<Loader />);
  }
}

export default ResultDetail;
