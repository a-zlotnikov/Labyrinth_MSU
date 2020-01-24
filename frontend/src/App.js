import React, {Component} from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Layout from './Layout/Layout';
import SignIn from './components/SignIn/SignIn';
import Mainpage from './containers/mainpage/mainpage';
import Navbar from './containers/Navbar/Navbar';
import SignUp from './components/SignUp/SignUp';
import Field from './components/Field/Field';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        user: {
          username: 'Reiko',
          category: 'Преподаватель',
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
            <Router>
              <div>
                <Route render={(props) => {
                  return (
                    <div>
                      <Navbar {...props} options={this.state.user.user}/>
                    </div>
                  );
                }}/>
                <Switch>
                  <Route path={'/registration'} component={SignUp}/>
                  <Route path={'/constructor'} component={Field}/>
                  <Route exact path={'/'} render={(props) => {
                    return (
                      <div>
                        <Mainpage {...props} options={this.state.user.user}/>
                      </div>
                    );
                  }}/>
                </Switch>
              </div>
            </Router>
          </Layout>
        );
  }
}

export default App;
