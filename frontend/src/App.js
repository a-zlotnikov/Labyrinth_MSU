import React, {Component} from 'react';
import Layout from './Layout/Layout';
import SignUp from './components/SignUp/SignUp';
import Mainpage from './containers/mainpage/mainpage';
import Navbar from './containers/Navbar/Navbar';
import Field from './components/Field/Field';

class App extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Navbar/>
          <Mainpage/>
          <Field />
        </div>
        <SignUp/>
      </Layout>
    );
  }
}

export default App;
