import React, {Component} from 'react';

class StatusButtons extends Component {
  render() {
    return (
        <div className={'constStatusBtnsBox'}>
          <button className={'constStatusBtn wallBtn'} onClick={this.props.cellStatus}>стена</button>
          <button className={'constStatusBtn foodBtn'} onClick={this.props.cellStatus}>кормушка</button>
          <button className={'constStatusBtn fakeFoodBtn'} onClick={this.props.cellStatus}>ложная кормушка</button>
          <button className={'constStatusBtn entryBtn'} onClick={this.props.cellStatus}>вход</button>
          <button className={'constStatusBtn exitBtn'} onClick={this.props.cellStatus}>выход</button>
          <button className={'constStatusBtn pedalBtn'} onClick={this.props.cellStatus}>педаль</button>
        </div>
    );
  }
}
export default StatusButtons;
