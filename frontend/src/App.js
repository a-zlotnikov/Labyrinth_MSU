import React, { Component } from 'react';
import Layout from './Layout/Layout';
import SignUp from './components/SignUp';

class App extends Component {
  render() {
    return (
      <Layout>
        <div>
            Hello Mouse
        </div>
        <SignUp/>
      </Layout>
    );
  }
}

export default App;
