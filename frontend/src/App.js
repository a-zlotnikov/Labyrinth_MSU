import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Layout from './Layout/Layout';
import SignIn from './components/SignIn/SignIn';
import Mainpage from './containers/mainpage/mainpage';
import Navbar from './containers/Navbar/Navbar';
import Field from './components/Field/Field';
import SignUp from './components/SignUp/SignUp';
import UserList from './components/UserList/UserList';

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
    this.setState({user: result.user, loading: false});
  };
  
  render() {
    return (this.state.loading === true) ? (<div>Loading...</div>) :
      (this.state.user === undefined) ? (<div><Route path={'/'} component={SignIn}/></div>) :
        (<Layout>
        <div>
          <Route render={(props) =>{
            return (
              <div>
                <Navbar {...props} username={this.state.user.user} />
              </div>
            );
          }} />
          <Route path={'/'} component={Mainpage}/>
          <Route path={'/registration'} component={SignUp}/>
          <Route path={'/users'} component={UserList}/>
        </div>
      </Layout>
    )
  }
}

export default App;
