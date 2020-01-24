import React, {Component} from 'react';
import classes from './Results.module.css';
import ResultList from './ResultList/ResultList';

class Results extends Component {
  constructor (props) {
    super (props)
    
    this.state = {
      results: ''
    }
    
  }
  
  componentDidMount = async () => {
    const response = await fetch ('/results');
    const results = await response.json ();
    this.setState({
      results
    });
    console.log(this.state.results)
  };
  
  render() {
    return this.state.results ? (
      <div>
        {this.state.results.map( (result,i) => <ResultList {...result} key={i} /> )}
      </div>
    ) : <div>Loading...</div>
  }
}

export default Results;