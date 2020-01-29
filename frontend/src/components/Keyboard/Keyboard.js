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
                <div className={'keyBtn'}>
                  <div className={'left'}>t</div>
                  <div className={'right'}>?</div>
                </div>
                <div className={'keyBtn'}>
                  <div className={'left'}>h</div>
                  <div className={'right'}>_</div>
                </div>
                <div className={'keyBtn'}>
                  <div className={'left'}>o</div>
                  <div className={'right'}>i</div>
                </div>
              </div>
              <div className={'keyBtnRow'}>
                <div className={'keyBtn'}>
                  <div className={'left'}>j</div>
                  <div className={'right'}>q</div>
                </div>
                <div className={'keyBtn'}>
                  <div className={'left'}>╎</div>
                  <div className={'right'}>b</div>
                </div>
                <div className={'keyBtn'}>
                  <div className={'left'}>s</div>
                  <div className={'right'}>l</div>
                </div>
              </div>
              <div className={'keyBtnRow'}>
                <div className={'keyBtn'}>
                  <div className={'left'}>e</div>
                  <div className={'right'}>x</div>
                </div>
                <div className={'keyBtn'}>
                  <div className={'left'}>w</div>
                  <div className={'right'}>z</div>
                </div>
                <div className={'keyBtn'}>
                  <div className={'left'}>r</div>
                  <div className={'right'}>m</div>
                </div>
              </div>
              <div className={'keyBtnRow'}>
                <div className={'keyWideBtn'}>
                  <div className={'left'}>y</div>
                  <div className={'right'}>d</div>
                </div>
                <div className={'keyBtn'}>
                  <div className={'left'}>k</div>
                  <div className={'right'}>g</div>
                </div>
              </div>
            </div>
            <div className={'keyLongBtn'}>
              <div className={'left'}>+</div>
              <div className={'right'}>a</div>
            </div>
          </div>
        </div>
    );
  }
}

export default Keyboard;
