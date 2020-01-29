import React, {Component} from 'react';
import './Keyboard.css';

class Keyboard extends Component {
  render() {
    return (
        <div className={'Keyboard unselectable'}>
          <div className={'keyBtnRow keyTopRow'}>
            <div className={'keyBtnTop'}>/</div>
            <div className={'keyBtnTop'}>*</div>
            <div className={'keyBtnTop'}>-</div>
          </div>
          <div className={'keyBtnRow'}>
            <div>
              <div className={'keyBtnRow'}>
                <div className={'keyBtn'}>7</div>
                <div className={'keyBtn'}>8</div>
                <div className={'keyBtn'}>9</div>
              </div>
              <div className={'keyBtnRow'}>
                <div className={'keyBtn'}>4</div>
                <div className={'keyBtn'}>5</div>
                <div className={'keyBtn'}>6</div>
              </div>
              <div className={'keyBtnRow'}>
                <div className={'keyBtn'}>1</div>
                <div className={'keyBtn'}>2</div>
                <div className={'keyBtn'}>3</div>
              </div>
              <div className={'keyBtnRow'}>
                <div className={'keyWideBtn'}>0</div>
                <div className={'keyBtn'}>.</div>
              </div>
            </div>
            <div className={'keyLongBtn'}>+</div>
          </div>
        </div>
    );
  }
}

export default Keyboard;
