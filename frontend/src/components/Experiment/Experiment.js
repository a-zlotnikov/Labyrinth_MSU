import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  CHANGECOMP,
  expField,
  MOVEDOWN,
  MOVELEFT,
  MOVERIGHT,
  MOVEUP,
  NEWVALUE,
  STARTPOS,
} from '../../store/creators/creators';
import '../Field/Field.css';
import StatusButtons from '../StatusButtons/StatusButtons';
import Keyboard from '../Keyboard/Keyboard';
import './Experiment.css';

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
      changeStatus: false,
      startPosition: false,
      moveStatus: false,
      expBegin: false,
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

  startExp = () => {
    this.setState({expBegin: true});

    const move = (e) => {

      const x = e.key;
      if (this.state.expBegin) {
        switch (x) {
          case 'ArrowUp':
            e.preventDefault();
            this.props.moveUp();
            this.setState({expStatus: !this.state.moveStatus});
            break;
          case 'ArrowDown':
            e.preventDefault();
            this.props.moveDown();
            this.setState({expStatus: !this.state.moveStatus});
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.props.moveRight();
            this.setState({expStatus: !this.state.moveStatus});
            break;
          case 'ArrowLeft':
            e.preventDefault();
            this.props.moveLeft();
            this.setState({expStatus: !this.state.moveStatus});
            break;
        }
      }
    };

    document.onkeydown = move;

  };

  finishExp = () => {
    this.setState({expBegin: false});
  };

  render() {
    return (
        <div className='board'>

          {this.state.startPosition && <div>Стартовая позиция</div>}
          {this.state.expBegin && <div><b>Эксперимент в процессе</b></div>}

          <div className={'expMainBox'}>
            <div>
              {this.props.expField.env &&
              this.props.expField.env.field.line.map((element, i) => {
                return (
                    <div key={`${element} ${i}`}>{element.line.map(
                        component => {
                          let action;
                          switch (true) {
                            case component.start:
                              action = 'start comp';
                              break;
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
            </div>

            <Keyboard/>
          </div>


          <div>{this.props.expField.moves &&
          this.props.expField.moves.map((element) => {
            return <span>{element}</span>;
          })}</div>
          <div className={'expStatusBtnsContainer'}>
            <StatusButtons class={'expStatusBtnsBox'}
                           btnClass={'expButton'} wall={this.state.wall}
                           food={this.state.food}
                           fakeFood={this.state.fakeFood}
                           entry={this.state.entry} exit={this.state.exit}
                           pedal={this.state.pedal}
                           cellStatus={this.cellStatusExp}/>
          </div>
          <div>
            <button className={'expButton'}
                    onClick={this.cellStatusExp}>Стартовая позиция
            </button>
          </div>
          <div>
            {this.state.expBegin ?
                <button className={'expButton'}
                        onClick={this.finishExp}>Завершить
                  эксперимент</button> :
                <button className={'expButton'} onClick={this.startExp}>Начать
                  эксперимент</button>}
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
      dispatch(STARTPOS(index));
    },
    moveUp: () => {
      dispatch(MOVEUP());
    },
    moveDown: () => {
      dispatch(MOVEDOWN());
    },
    moveRight: () => {
      dispatch(MOVERIGHT());
    },
    moveLeft: () => {
      dispatch(MOVELEFT());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Experiment);
