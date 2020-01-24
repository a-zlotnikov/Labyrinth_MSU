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

      const x = e.key;
      const regex = /[\u0400-\u04FF]+/g;
      const match = regex.exec(x);
      if(x==='Backspace'){
        this.props.newValue(prevValue, null);
      } else if(match){
        this.props.newValue(prevValue, x);
      }
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
    let translate;
    switch (e.target.innerText){
      case 'стена':
        translate = 'wall';
        break;
      case 'кормушка':
        translate = 'food';
        break;
      case 'ложная кормушка':
        translate = 'fakeFood';
        break;
      case 'вход':
        translate = 'entry';
        break;
      case 'выход':
        translate = 'exit';
        break;
      case 'педаль':
        translate = 'pedal';
        break;
      case 'лампочка':
        translate = 'lamp';
        break;
      case 'звук':
        translate = 'sound';
        break;
    }

    // console.log(translate);

    const currentState = this.state;
    for (let key in currentState) {
      if (key === translate) {
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
          {this.state.wall && <div>Стена</div>}
          {this.state.food && <div>Кормушка</div>}
          {this.state.fakeFood && <div>Ложная кормушка</div>}
          {this.state.entry && <div>Вход</div>}
          {this.state.exit && <div>Выход</div>}
          {this.state.pedal && <div>Педаль</div>}
          {this.state.lamp && <div>Лампочка</div>}
          {this.state.sound && <div>Звук</div>}

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
                        {component.value ? <b>{component.value}</b> : component.index}
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
