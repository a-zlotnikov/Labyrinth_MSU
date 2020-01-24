import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Layout from './Layout/Layout';
import SignIn from './components/SignIn/SignIn';
import Mainpage from './containers/mainpage/mainpage';
import Navbar from './containers/Navbar/Navbar';
import Field from './components/Field/Field';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: '',
      loading: true
    };
  }
  
  componentDidMount = async () => {
    this.setState({loading: true});
    const response = await fetch('/users');
    const result = await response.json();
    this.setState({user: result, loading: false});
    console.log(this.state.user)
  };
  
  render() {
    return (this.state.loading === true) ? (<div>Loading...</div>) :
      (this.state.user.user === undefined) ? (<div><Route path={'/'} component={SignIn}/></div>) :
        (<Layout>
        <div>
          <Route render={(props) =>{
            return (
              <div>
                <Navbar {...props} username={this.state.user.user.username} />
              </div>
            );
          }} />
          <Route path={'/'} component={Mainpage}/>
        </div>
      </Layout>
    )
  }
}

export default App;
