import React, {Component} from 'react';
import classes from './ResultDetail.module.css';
import Loader from '../../../containers/Loader/Loader';

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
        <p>Дата: {this.state.details.date ? this.state.details.date : '-'}</p>
        <p>Время: {this.state.details.time ? this.state.details.time : '-'}</p>
        <p>Название среды: {this.state.details.env.name ? this.state.details.env.name : '-'}</p>
        <p>Название эксперимента: {this.state.details.expName ? this.state.details.expName : '-'}</p>
        <p>Номер опыта: {this.state.details.expNumber ? this.state.details.expNumber : '-'}</p>
        <p>Имя особи: {this.state.details.animalName ? this.state.details.animalName : '-'}</p>
        <p>Тип эксперимента: {this.state.details.expType ? this.state.details.expType : '-'}</p>
        <hr/>
        <p>Эксперимент проведен</p>
        <p>Фамилия: {this.state.details.user.surname ? this.state.details.user.surname : '-'}</p>
        <p>Имя: {this.state.details.user.name ? this.state.details.user.name : '-'}</p>
        <p>Возраст: {this.state.details.user.age ? this.state.details.user.age : '-'}</p>
        <p>Пол: {this.state.details.user.gender ? this.state.details.user.gender : '-'}</p>
        <p>Рука: {this.state.details.user.hand ? this.state.details.user.hand : '-'}</p>
        <p>Год: {this.state.details.user.year ? this.state.details.user.year : '-'}</p>
        <p>Группа: {this.state.details.user.group ? this.state.details.user.group : '-'}</p>
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
