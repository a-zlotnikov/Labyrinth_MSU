import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ADDVALUE, CHANGEVALUE, fetchField} from '../../store/creators/creators';
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
      fieldName: '',
      saveStatus: false,
      nameStatus: false,
    };
  }

  componentDidMount() {
    this.props.onClick();
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
      }
    };
    document.onkeydown = getValue;
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
      default:
        this.changeValue(e.target.id);
        break;
    }
  };

  cellStatus = (e) => {
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
    }

    const currentState = this.state;
    for (let key in currentState) {
      if (key === 'fieldName') {
        currentState[key] = currentState[key];
      } else if (key === translate) {
        currentState[key] = !currentState[key];
      } else {
        currentState[key] = false;
      }
    }
    this.setState(currentState);
  };

  fieldName = (e) => {
    this.setState({fieldName: e.target.value});
  };

  saveField = async () => {
    this.setState({
      nameStatus: false,
      saveStatus: false,
    });
    if (this.state.fieldName.length > 0) {
      const response = await fetch(
          '/saveField',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.state.fieldName,
              field: this.props.constructor,
            }),
          },
      );
      const result = await response.json();
      if (result) {
        this.setState({saveStatus: true});
      }
    } else {
      this.setState({nameStatus: true});
    }
  };

  startExperiment = async () => {

    const response = await fetch(
        '/startExp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.fieldName,
            field: this.props.constructor,
          }),
        },
    );
    const result = await response.json();
    console.log(result);
    if (result.id) {
      this.props.history.push(`/experiment/${result.id}`);
    } else {
      this.setState({nameStatus: true});
    }

    // if(this.state.saveStatus){
    //
    // }
    // this.props.history.push('/experiment/123')
  };

  render() {

    return (
        <div className='board'>
          <input className={'constInput'} onChange={this.fieldName} value={this.state.fieldName} placeholder={'Введите имя среды'}/>
          {this.state.saveStatus && <div>Среда сохранена</div>}
          {this.state.nameStatus && <div>Введите имя</div>}

          <div className={'constMainBox'}>
            <div className={'constFieldBox'}>
              {this.props.constructor &&
              this.props.constructor.map((element, i) => {
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
              <StatusButtons wall={this.state.wall} food={this.state.food} fakeFood={this.state.fakeFood} entry={this.state.entry} exit={this.state.exit} pedal={this.state.pedal} cellStatus={this.cellStatus}/>
            </div>
          </div>
          <div className={'constBottomBtnsBox'}>
            <div>
              <button className={'constStatusBtn'} onClick={this.saveField}>Сохранить среду</button>
            </div>
            <div>
              <button className={'constStatusBtn'} onClick={this.startExperiment}>Начать эксперимент</button>
            </div>
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
      dispatch(CHANGEVALUE(value, changedValue));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
