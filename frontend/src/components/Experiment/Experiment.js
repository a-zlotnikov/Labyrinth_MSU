import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  CHANGECOMP,
  expField,
  MOVEDOWN,
  MOVELEFT,
  MOVERIGHT,
  MOVEUP,
  newExp,
  NEWVALUE,
  saveExp,
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
      expName: '',
      timer: 0,
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

  componentWillUnmount(){
    clearInterval(this.intervalId);
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
        console.log('start position');
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
      case 'Стартовая позиция':
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

  timer() {
    this.setState({
      timer: this.state.timer + 1
    });
    if(!this.state.expBegin) {
      clearInterval(this.intervalId);
    }
  }

  startExp = () => {
    this.setState({expBegin: true});
    this.intervalId = setInterval(this.timer.bind(this), 1000);
    const move = (e) => {

      const x = e.key;
      if (this.state.expBegin) {
        switch (x) {
          case 'ArrowUp':
            e.preventDefault();
            this.props.moveUp(this.state.timer);
            this.setState({expStatus: !this.state.moveStatus});
            break;
          case 'ArrowDown':
            e.preventDefault();
            this.props.moveDown(this.state.timer);
            this.setState({expStatus: !this.state.moveStatus});
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.props.moveRight(this.state.timer);
            this.setState({expStatus: !this.state.moveStatus});
            break;
          case 'ArrowLeft':
            e.preventDefault();
            this.props.moveLeft(this.state.timer);
            this.setState({expStatus: !this.state.moveStatus});
            break;
        }
      }
    };

    document.onkeydown = move;

  };

  finishExp = () => {
    this.setState({expBegin: false});
    this.props.saveExperiment(this.props.match.params.id, this.state.expName,
        this.props.expField.moves, this.props.expField.name);
    this.props.newExp(this.props.expField.name);
  };

  newExpName = (e) => {
    this.setState({expName: e.target.value});
  };

  render() {
    return (
        <div className='board'>
          <div className={'expInputBox'}>
            <div className={'expInputs'}>
              <div>Название среды:</div>
              <div>
                Тип эксперимента:
                <select>
                  <option>ABC</option>
                  <option>DEF</option>
                  <option>123</option>
                </select>
              </div>
              <div>Название эксперимента:<input onChange={this.newExpName}/></div>
              <div>Номер опыта:<input/></div>
              <div>Имя особи:<input/></div>
            </div>
            <div className={'expTypeDescription'}>описание эксперимента: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut purus non mi iaculis vulputate. Curabitur fermentum, magna et consectetur iaculis, lorem ante condimentum elit, id vehicula lectus nisl ut velit. Nulla dignissim tortor et nibh placerat, sed tristique odio vestibulum. Praesent erat velit, maximus sed turpis non, egestas mollis libero. Nam eu massa eu dolor elementum ullamcorper. Ut cursus hendrerit dapibus. Nam id orci lectus. In iaculis rutrum purus. Phasellus quis mi id erat vestibulum sodales efficitur quis lacus. Duis nulla metus, interdum at nunc sed, pretium imperdiet dui.</div>
          </div>
          {this.state.expBegin ? <div className={'expProgress'}>Эксперимент в процессе</div> : <div className={'expProgress'}></div>}
          <div className={'expMainBox'}>
            <div>
              {this.props.expField.field &&
              this.props.expField.field.line.map((element, i) => {
                return (
                    <div key={`${element} ${i}`}>{element.line.map(component => {
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

            <div>
              <div className={'expTimer'}><div>Таймер:</div> <div className={'expTimerInt'}>{this.state.timer}</div><div>сек.</div></div>
              <div className={'expTimer'}>Подкреплений: <div className={'expTimerInt'}>?</div></div>
              <Keyboard/>
              <div className={'expStatusBtnsContainer'}>
                <StatusButtons class={'expStatusBtnsBox'}
                               btnClass={'expButton'} wall={this.state.wall}
                               food={this.state.food}
                               fakeFood={this.state.fakeFood}
                               entry={this.state.entry} exit={this.state.exit}
                               pedal={this.state.pedal}
                               cellStatus={this.cellStatusExp}/>
              </div>
              <div className={'startBtnsRow'}>
                <div>
                  <button className={'expStartButton'}
                          onClick={this.cellStatusExp}>Стартовая позиция
                  </button>
                </div>
                <div>
                  {this.state.expBegin ?
                      <button className={'expStartButton'}
                              onClick={this.finishExp}>Завершить
                        эксперимент</button> :
                      <button className={'expStartButton'} onClick={this.startExp}>Начать
                        эксперимент</button>}
                </div>
              </div>
            </div>
          </div>
          <div>{this.props.expField.moves &&
          this.props.expField.moves.map((element, i) => {
            for (let key in element){
              return <span key={i}>{key}: {element[key]}</span>
            }
          //   return (
          //   <span key={i}>{element}</span>
          // )
          })}</div>
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
    moveUp: (timer) => {
      dispatch(MOVEUP(timer));
    },
    moveDown: (timer) => {
      dispatch(MOVEDOWN(timer));
    },
    moveRight: (timer) => {
      dispatch(MOVERIGHT(timer));
    },
    moveLeft: (timer) => {
      dispatch(MOVELEFT(timer));
    },
    saveExperiment: (id, expName, moves, envName) => {
      dispatch(saveExp(id, expName, moves, envName));
    },
    newExp: (envName) => {
      dispatch(newExp(envName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Experiment);
