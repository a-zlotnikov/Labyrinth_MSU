import React, {Component} from 'react';
import {connect} from 'react-redux'
import {expField} from '../../store/creators/creators';
import '../Field/Field.css'

class Experiment extends Component {

  componentDidMount() {
    this.props.fullField(this.props.match.params.id)
  }

  render() {
    console.log(this.props.expField);
    return (
        <div className='board'>
          {this.props.expField._id}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expField: state.expField.expField
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fullField: (id) => {
      dispatch(expField(id))
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Experiment);
