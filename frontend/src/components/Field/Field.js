import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ADDVALUE, fetchField, CHANGEVALUE} from '../../store/creators/creators';
import './Field.css';
import StatusButtons from '../StatusButtons/StatusButtons';

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wall: false,
      food: false,
      fakeFood: false,
      entry: false,
      exit: false,
      pedal: false,
      lamp: false,
      sound: false,
    };
  }

  componentDidMount() {
    this.props.onClick();
  }

  changeValue = (prevValue) => {
    const getValue = (e) => {
      const x = e.keyCode;
      const letter = String.fromCharCode(x);
      this.props.newValue(prevValue, letter);
    };
    document.onkeydown=getValue
  };


  action = (e) => {
    switch (true) {
      case this.state.wall:
        this.props.action(e.target.id, 'wall');
        break;
      case this.state.food:
        this.props.action(e.target.id, 'food');
        break;
      case this.state.fakeFood:
        this.props.action(e.target.id, 'fakeFood');
        break;
      case this.state.entry:
        this.props.action(e.target.id, 'entry');
        break;
      case this.state.exit:
        this.props.action(e.target.id, 'exit');
        break;
      case this.state.pedal:
        this.props.action(e.target.id, 'pedal');
        break;
      case this.state.lamp:
        this.props.action(e.target.id, 'lamp');
        break;
      case this.state.sound:
        this.props.action(e.target.id, 'sound');
        break;
      default:
        this.changeValue(e.target.id);
        break;
    }
  };

  cellStatus = (e) => {
    const currentState = this.state;
    for (let key in currentState) {
      if (key === e.target.innerText) {
        currentState[key] = !currentState[key];
      }  else {
        currentState[key] = false;
      }
    }
    this.setState(currentState)
  };

  render() {

    return (
        <div className='board'>
          {this.state.wall && <div>WALL</div>}
          {this.state.food && <div>FOOD</div>}
          {this.state.fakeFood && <div>FAKEFOOD</div>}
          {this.state.entry && <div>ENTRY</div>}
          {this.state.exit && <div>EXIT</div>}
          {this.state.pedal && <div>PEDAL</div>}
          {this.state.lamp && <div>LAMP</div>}
          {this.state.sound && <div>SOUND</div>}


          {this.props.constructor && this.props.constructor.map((element, i) => {
            return (
                <div key={`${element} ${i}`}>{element.line.map(component => {
                  let action;
                  switch (true) {
                    case component.wall:
                      action = 'wall comp';
                      break;
                    case component.food:
                      action = 'food comp';
                      break;
                    case component.fakeFood:
                      action = 'fakeFood comp';
                      break;
                    case component.entry:
                      action = 'entry comp';
                      break;
                    case component.exit:
                      action = 'exit comp';
                      break;
                    case component.pedal:
                      action = 'pedal comp';
                      break;
                    case component.lamp:
                      action = 'lamp comp';
                      break;
                    case component.sound:
                      action = 'sound comp';
                      break;
                    default:
                      action = 'comp';
                      break;
                  }

                  return (
                      <span key={component.index}
                            id={component.index}
                            className={action}
                            onClick={this.action}
                      >
                        {component.value ? component.value : component.index}
                      </span>
                  );
                })}
                </div>
            );
          })}
          <div>
            <StatusButtons cellStatus={this.cellStatus} />
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    constructor: state.field.field,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(fetchField());
    },
    action: (index, change) => {
      dispatch(ADDVALUE(index, change));
    },
    newValue: (value, changedValue) => {
      dispatch(CHANGEVALUE(value, changedValue))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
