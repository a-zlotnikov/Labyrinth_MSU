import React, {Component} from 'react';

class StatusButtons extends Component {
  render() {
    return (
        <div>
          <button onClick={this.props.cellStatus}>wall</button>
          <button onClick={this.props.cellStatus}>food</button>
          <button onClick={this.props.cellStatus}>fakeFood</button>
          <button onClick={this.props.cellStatus}>entry</button>
          <button onClick={this.props.cellStatus}>exit</button>
          <button onClick={this.props.cellStatus}>pedal</button>
          <button onClick={this.props.cellStatus}>lamp</button>
          <button onClick={this.props.cellStatus}>sound</button>
        </div>
    );
  }
}
export default StatusButtons;
