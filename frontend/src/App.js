import React, {Component} from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Layout from './Layout/Layout';
import SignIn from './components/SignIn/SignIn';
import Mainpage from './containers/mainpage/mainpage';
import Navbar from './containers/Navbar/Navbar';
import SignUp from './components/SignUp/SignUp';
import Field from './components/Field/Field';
import UserList from './components/UserList/UserList';
import Documentation from './components/Documentation/Documentation';
import Results from './components/Results/Results';
import ResultDetail from './components/Results/ResultDetail/ResultDetail';
import Loader from './containers/Loader/Loader';
import Experiment from './components/Experiment/Experiment';

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
        <Loader />
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

                        {/*<Route path={'/constructor'} component={Field}/>*/}
                        <Route path={'/constructor'} render={
                          (props)=>{
                            return (
                                <div>
                                  <Field {...props} />
                                </div>
                            )
                          }
                        } />
                        <Route path={'/experiment/:id'} render={
                          (props)=>{
                            return (
                                <div>
                                  <Experiment {...props} />
                                </div>
                            )
                          }
                        } />
                        <Route exact path={'/results'} render={(props) => {
                          return (
                            <div>
                              <Results {...props} options={this.state.user.user}/>
                            </div>
                          );
                        }}/>

                        <Route path={'/results/:id'} component={ResultDetail}/>
                        <Route path={'/users'} component={UserList}/>
                        <Route path={'/readme'} component={Documentation}/>

                        <Route exact path={'/'} render={(props) => {
                          return (
                              <div>
                                <Mainpage {...props} options={this.state.user.user}/>
                                <SignIn/>
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
