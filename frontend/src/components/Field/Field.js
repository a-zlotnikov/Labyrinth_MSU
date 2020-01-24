import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ADDVALUE, fetchField, CHANGEVALUE} from '../../store/creators/creators';
import './Field.css';

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wall: false,
      food: false,
      start: false,
      newValueStatus: false
    };
  }

  componentDidMount() {
    this.props.onClick();
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.constructor === this.props.constructor) {
  //     this.props.onClick();
  //   }
  // }
  wall = () => {
    this.setState({
      wall: !this.state.wall,
      food: false,
      start: false,
    });
  };

  food = () => {
    this.setState({
      wall: false,
      food: !this.state.food,
      start: false,
    });
  };

  start = () => {
    this.setState({
      wall: false,
      food: false,
      start: !this.state.start,
    });
  };

  changeValue = (prevValue) => {
    const getValue = (e) => {
      const x = e.keyCode;
      const letter = String.fromCharCode(x);
      this.props.newValue(prevValue, letter);
      console.log(letter);
    };
    document.onkeydown=getValue
  };


  action = (e) => {
    // debugger
    console.log(e.target.innerText);
    switch (true) {
      case this.state.wall:
        this.props.action(e.target.innerText, 'wall');
        break;
      case this.state.food:
        this.props.action(e.target.innerText, 'food');
        break;
      case this.state.start:
        this.props.action(e.target.innerText, 'start');
        break;
      default:
        this.changeValue(e.target.innerText);
        break;
    }
  };

  render() {

    return (
        <div className='board'>
          {this.state.wall && <div>WALL</div>}
          {this.state.food && <div>FOOD</div>}
          {this.state.start && <div>START</div>}

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
                    case component.start:
                      action = 'start comp';
                      break;
                    default:
                      action = 'comp';
                      break;
                  }

                  return (
                      <span key={component.index}
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
            <button onClick={this.wall}>Build wall</button>
            <button onClick={this.food}>Food</button>
            <button onClick={this.start}>Start position</button>
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
