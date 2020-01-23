import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ADDVALUE, CHANGEVALUE, fetchField} from '../../store/creators/creators';
import './Field.css';

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: null,
      wall: false,
      food: false,
      start: false,
    };
  }

  componentDidMount() {
    this.props.onClick();
    console.log(this.props.constructor);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.constructor === this.props.constructor) {
      this.props.onClick();
    }
  }

  wall = () => {
    this.setState({
      wall: true,
      food: false,
      start: false,
    });
  };

  food = () => {
    this.setState({
      wall: false,
      food: true,
      start: false,
    });
  };

  start = () => {
    this.setState({
      wall: false,
      food: false,
      start: true,
    });
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
        // debugger
// this.props.newValue(e.target.innerText, );
        // !!!
        // this.setState({newValueStatus: !this.state.newValueStatus});
        break;
    }
  };

  render() {
    console.log(this.props.constructor);
    return (
        <div className='board'>
          {this.state.wall && <div>WALL</div>}
          {this.state.food && <div>FOOD</div>}
          {this.state.start && <div>START</div>}

          {this.props.constructor && this.props.constructor.map((element) => {
            console.log(123123123123);
            console.log(element);
            return (
                <div key={element._id}>{element.line.map(component => {
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
                      <span key={component.value} className={action}
                            onClick={this.action}>
                        {component.value}
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
    action: (value, change) => {
      dispatch(ADDVALUE(value, change));
    },
    // newValue: (value, changedValue) => {
    //   dispatch(CHANGEVALUE(value, changedValue))
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
