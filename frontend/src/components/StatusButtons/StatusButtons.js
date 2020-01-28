import React, {Component} from 'react';

class StatusButtons extends Component {
  render() {
    return (
        <div className={this.props.class}>
          {this.props.wall ?
              <button className={'constStatusBtn activeWall'}
                      onClick={this.props.cellStatus}>стена</button> :
              <button className={'constStatusBtn wallBtn'}
                      onClick={this.props.cellStatus}>стена</button>}
          {this.props.food ?
              <button className={'constStatusBtn activeFood'}
                      onClick={this.props.cellStatus}>кормушка</button> :
              <button className={'constStatusBtn foodBtn'}
                      onClick={this.props.cellStatus}>кормушка</button>}
          {this.props.fakeFood ?
              <button className={'constStatusBtn activeFakeFood'}
                      onClick={this.props.cellStatus}>ложная кормушка</button> :
              <button className={'constStatusBtn fakeFoodBtn'}
                      onClick={this.props.cellStatus}>ложная кормушка</button>}
          {this.props.entry ?
              <button className={'constStatusBtn activeEntry'}
                      onClick={this.props.cellStatus}>вход</button> :
              <button className={'constStatusBtn entryBtn'}
                      onClick={this.props.cellStatus}>вход</button>}
          {this.props.exit ?
              <button className={'constStatusBtn activeExit'}
                      onClick={this.props.cellStatus}>выход</button> :
              <button className={'constStatusBtn exitBtn'}
                      onClick={this.props.cellStatus}>выход</button>}
          {this.props.pedal ?
              <button className={'constStatusBtn activePedal'}
                      onClick={this.props.cellStatus}>педаль</button> :
              <button className={'constStatusBtn pedalBtn'}
                      onClick={this.props.cellStatus}>педаль</button>}
        </div>
    );
  }
}

export default StatusButtons;
