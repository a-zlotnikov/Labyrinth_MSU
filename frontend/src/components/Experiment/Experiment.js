import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CHANGECOMP, expField, NEWVALUE, STARTPOS} from '../../store/creators/creators';
import '../Field/Field.css';
import StatusButtons from '../StatusButtons/StatusButtons';

class Experiment extends Component {
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
      changeStatus: false,
      startPosition: false,
    };
  }

  componentDidMount() {
    this.props.fullField(this.props.match.params.id);
  }

  changeValue = (prevValue) => {
    const getValue = (e) => {

      const x = e.key;
      const regex = /[\u0400-\u04FF0-9]+/g;
      const match = regex.exec(x);
      if (x === 'Backspace') {
        this.props.newValue(prevValue, null);
      } else if (match) {
        this.props.newValue(prevValue, x);
        this.setState({changeStatus: !this.state.changeStatus});
      }
    };
    document.onkeydown = getValue;
  };

  action = (e) => {
    switch (true) {
      case this.state.wall:
        this.props.newComp(e.target.id, 'wall');
        break;
      case this.state.food:
        this.props.newComp(e.target.id, 'food');
        break;
      case this.state.fakeFood:
        this.props.newComp(e.target.id, 'fakeFood');
        break;
      case this.state.entry:
        this.props.newComp(e.target.id, 'entry');
        break;
      case this.state.exit:
        this.props.newComp(e.target.id, 'exit');
        break;
      case this.state.pedal:
        this.props.newComp(e.target.id, 'pedal');
        break;
      case this.state.lamp:
        this.props.newComp(e.target.id, 'lamp');
        break;
      case this.state.sound:
        this.props.newComp(e.target.id, 'sound');
        break;
      case this.state.startPosition:
        this.props.startPos(e.target.id);
        break;
      default:
        this.changeValue(e.target.id);
        break;
    }
    this.setState({changeStatus: !this.state.changeStatus});
  };

  cellStatusExp = (e) => {
    let translate;
    switch (e.target.innerText) {
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
      case 'стартовая позиция':
        translate = 'startPosition';
        break;
    }

    const currentState = this.state;
    for (let key in currentState) {
      if (key === translate) {
        currentState[key] = !currentState[key];
      } else {
        currentState[key] = false;
      }
    }
    this.setState(currentState);
  };

  // startExp = () => {
  //   const getValue = (e) => {
  //
  //     const x = e.key;
  //     const regex = /[\u0400-\u04FF0-9]+/g;
  //     const match = regex.exec(x);
  //     if (x === 'Backspace') {
  //       this.props.newValue(prevValue, null);
  //     } else if (match) {
  //       this.props.newValue(prevValue, x);
  //       this.setState({changeStatus: !this.state.changeStatus})
  //     }
  //   };
  //   document.onkeydown = getValue;
  // };

  render() {
    console.log(this.props.expField);
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

          {/*{this.props.expField._id && this.props.expField._id}*/}
          {this.props.expField.env &&
          this.props.expField.env.field.line.map((element, i) => {
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
                    case component.start:
                      action = 'start comp';
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
                        {component.value ?
                            <b>{component.value}</b> :
                            component.index}
                      </span>
                  );
                })}
                </div>
            );
          })}
          <div>
            <StatusButtons cellStatus={this.cellStatusExp}/>
          </div>
          <div>
            <button onClick={this.cellStatusExp}>стартовая позиция</button>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expField: state.expField.expField,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fullField: (id) => {
      dispatch(expField(id));
    },
    newComp: (index, newComp) => {
      dispatch(CHANGECOMP(index, newComp));
    },
    newValue: (value, newValue) => {
      dispatch(NEWVALUE(value, newValue));
    },
    startPos: (index) => {
      dispatch(STARTPOS(index))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Experiment);
