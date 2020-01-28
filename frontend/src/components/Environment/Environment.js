import React, {Component} from 'react';
import classes from './Environment.module.css'
import Loader from '../../containers/Loader/Loader';
import EnvironmentList from './EnvironmentList/EnvironmentList';

class Environment extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      results: ''
    }
    
    
  }
  
  componentDidMount = async () => {
    const response = await fetch('/environment');
    const results = await response.json();
    this.setState({
      results
    });
    // console.log(this.state.results);
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
          <EnvironmentList {...elem} key={index} onDelete={this.onDelete}/>
        )}
      </div>)
    )
  }
}

export default Environment;