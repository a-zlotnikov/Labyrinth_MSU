import React, {Component} from 'react';
import classes from './Layout.module.css';

// eslint-disable-next-line react/prefer-stateless-function
class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
