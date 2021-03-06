import React, {Component} from 'react';
import classes from './EnvironmentList.module.css';
const Cookies = require('js-cookie');


class EnvironmentList extends Component {
  render() {
    return (
      <div className={classes.EnvironmentList}>
        <div className={classes.title}>{this.props.name}</div>

        <div
          className={classes.menu}
          onClick={this.props.onStartEx.bind(this,
            {id: this.props._id, name:this.props.name, field: this.props.field})}>Начать
          эксперимент
        </div>
        {Cookies.get('category') === 'Преподаватель' ?
        <div
          className={classes.menu}
          onClick={this.props.onDelete.bind(this, this.props._id)}>Удалить
        </div> : null}
      </div>
    );
  }
}

export default EnvironmentList;
