import React, {Component} from 'react';

class StatusButtons extends Component {
  render() {
    return (
        <div className={this.props.class}>
          {this.props.wall ?
              <button className={'activeWall' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>стена</button> :
              <button className={'wallBtn' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>стена</button>}
          {this.props.food ?
              <button className={'activeFood' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>кормушка</button> :
              <button className={'foodBtn' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>кормушка</button>}
          {this.props.fakeFood ?
              <button className={'activeFakeFood' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>ложная кормушка</button> :
              <button className={'fakeFoodBtn' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>ложная кормушка</button>}
          {this.props.entry ?
              <button className={'activeEntry' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>вход</button> :
              <button className={'entryBtn' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>вход</button>}
          {this.props.exit ?
              <button className={'activeExit' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>выход</button> :
              <button className={'exitBtn' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>выход</button>}
          {this.props.pedal ?
              <button className={'activePedal' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>педаль</button> :
              <button className={'pedalBtn' + ' ' + this.props.btnClass}
                      onClick={this.props.cellStatus}>педаль</button>}
        </div>
    );
  }
}

export default StatusButtons;
