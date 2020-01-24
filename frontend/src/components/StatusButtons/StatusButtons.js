import React, {Component} from 'react';

class StatusButtons extends Component {
  render() {
    return (
        <div>
          <button onClick={this.props.cellStatus}>стена</button>
          <button onClick={this.props.cellStatus}>кормушка</button>
          <button onClick={this.props.cellStatus}>ложная кормушка</button>
          <button onClick={this.props.cellStatus}>вход</button>
          <button onClick={this.props.cellStatus}>выход</button>
          <button onClick={this.props.cellStatus}>педаль</button>
          <button onClick={this.props.cellStatus}>лампочка</button>
          <button onClick={this.props.cellStatus}>звук</button>
        </div>
    );
  }
}
export default StatusButtons;
