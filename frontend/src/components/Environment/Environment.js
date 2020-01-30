import React, {Component} from 'react';
import classes from './Environment.module.css';
import Loader from '../../containers/Loader/Loader';
import EnvironmentList from './EnvironmentList/EnvironmentList';

class Environment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: '',
    };
  }

  componentDidMount = async () => {
    const response = await fetch('/environment');
    const results = await response.json();
    this.setState({
      results,
    });
  };

  onStartEx = async (props) => {
    const response = await fetch(
      '/startExp',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: props.name,
          field: props.field,
          archive: true
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    this.props.history.push(`/experiment/${result.id}`);

  };

  onDelete = async id => {
    const response = await fetch('/environment', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id}),
    });
    const results = await response.json();
    this.setState({
      results,
    });
  };

  render() {
    return (
      !this.state.results ?
        <Loader/> :
        (<div className={classes.Environment}>
          <h1>Архив сред</h1>
          {this.state.results.map((elem, index) =>
            <EnvironmentList {...elem} key={index} onDelete={this.onDelete}
                             onStartEx={this.onStartEx}/>,
          )}
        </div>)
    );
  }
}

export default Environment;
