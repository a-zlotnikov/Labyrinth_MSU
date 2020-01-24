import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './Layout/Layout';
import SignIn from './components/SignIn/SignIn';
import Mainpage from './containers/mainpage/mainpage';
import Navbar from './containers/Navbar/Navbar';
import Field from './components/Field/Field';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: {
        user: {
          username: 'Reiko',
          category: 'Студент',
        },
      },
      loading: false,
    };
  }
  
  componentDidMount = async () => {
    // this.setState({loading: true});
    // const response = await fetch('/users');
    // const result = await response.json();
    // this.setState({user: result.user, loading: false});
  };
  
  render() {
    return (this.state.loading === true) ? (<Layout>
        <div>Loading...</div>
      </Layout>) :
      (this.state.user === undefined) ? (<Layout>
          <div><Route path={'/'} component={SignIn}/></div>
        </Layout>) :
        (<Layout>
            <Switch>
            <div>
              <Route render={(props) => {
                return (
                  <div>
                    <Navbar {...props} options={this.state.user.user}/>
                    <Mainpage {...props} options={this.state.user.user}/>
                  </div>
                  
                );
              }}/>
              <Route path={''} component={''}/>
              <Route path={''} component={''}/>
              <Route path={''} component={''}/>
              <Route path={''} component={''}/>
            </div>
            </Switch>
          </Layout>
        );
  }
}

export default App;
